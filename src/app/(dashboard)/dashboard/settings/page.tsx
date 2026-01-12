import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  // 获取当前用户
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  // 获取数据库用户和网站配置
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    include: { siteConfig: true },
  });

  if (!dbUser) {
    redirect("/dashboard");
  }

  // 获取应用基础 URL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">网站设置</h1>
        <p className="mt-1 text-sm text-slate-600">
          配置您的主页网址、外观风格和发布状态
        </p>
      </div>

      {/* 设置表单 */}
      <SettingsForm
        siteConfig={dbUser.siteConfig}
        appUrl={appUrl}
      />
    </div>
  );
}
