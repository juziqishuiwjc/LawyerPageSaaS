import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      {/* 欢迎卡片 */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
        <h1 className="text-2xl font-semibold text-slate-900">
          欢迎使用 LawyerPage
        </h1>
        <p className="mt-2 text-slate-600">
          完成以下步骤，创建您的专业律师主页
        </p>
      </div>

      {/* 步骤指南 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
            1
          </div>
          <h3 className="text-lg font-semibold text-slate-900">填写个人资料</h3>
          <p className="mt-2 text-sm text-slate-600">
            完善您的个人信息、专业领域、联系方式等
          </p>
          <a
            href="/dashboard/profile"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            前往填写 →
          </a>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">
            2
          </div>
          <h3 className="text-lg font-semibold text-slate-900">选择模板风格</h3>
          <p className="mt-2 text-sm text-slate-600">
            从多款专业模板中选择最适合您的一款
          </p>
          <a
            href="/dashboard/settings"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            选择模板 →
          </a>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 font-semibold">
            3
          </div>
          <h3 className="text-lg font-semibold text-slate-900">预览并发布</h3>
          <p className="mt-2 text-sm text-slate-600">
            实时预览您的主页，确认后一键发布
          </p>
          <a
            href="/dashboard/settings"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            预览网站 →
          </a>
        </div>
      </div>

      {/* 账户信息 */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
        <h2 className="text-lg font-semibold text-slate-900">账户信息</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">邮箱</span>
            <span className="font-medium text-slate-900">{user.emailAddresses[0]?.emailAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">用户ID</span>
            <span className="font-mono text-xs text-slate-500">{user.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
