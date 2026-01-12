import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminUserTable } from "./admin-user-table";
import { Shield } from "lucide-react";

// 🔑 超级管理员邮箱列表 - 在这里添加可以访问管理后台的邮箱
const ADMIN_EMAILS = [
  "945356844@qq.com",  // 你的邮箱（注意：应该是 .com 不是 .con）
];

export default async function AdminPage() {
  // 获取当前登录用户
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  // 获取用户邮箱
  const userEmail = clerkUser.emailAddresses[0]?.emailAddress;

  // 🔒 权限检查：只有管理员邮箱才能访问
  if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    redirect("/dashboard");
  }

  // 查询所有用户及其网站配置
  const users = await prisma.user.findMany({
    include: {
      siteConfig: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 统计数据
  const totalUsers = users.length;
  const publishedSites = users.filter((u) => u.siteConfig?.isPublished).length;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">超级管理后台</h1>
          <p className="text-sm text-slate-600">
            管理所有律师用户和网站
          </p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
          <p className="text-sm text-slate-600">总用户数</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totalUsers}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
          <p className="text-sm text-slate-600">已发布网站</p>
          <p className="mt-2 text-3xl font-semibold text-green-600">{publishedSites}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
          <p className="text-sm text-slate-600">未发布网站</p>
          <p className="mt-2 text-3xl font-semibold text-slate-400">{totalUsers - publishedSites}</p>
        </div>
      </div>

      {/* 用户列表 */}
      <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-900/5">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">用户列表</h2>
        </div>
        <AdminUserTable users={users} appUrl={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"} />
      </div>

      {/* 管理员提示 */}
      <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
        <p>
          <strong>提示：</strong>当前以管理员身份登录（{userEmail}）。此页面仅对管理员可见。
        </p>
      </div>
    </div>
  );
}
