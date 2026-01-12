import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { UserButton } from "@clerk/nextjs";
import { getOrCreateUser } from "@/lib/auth-sync";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 获取 Clerk 用户
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  // 同步用户到数据库
  const dbUser = await getOrCreateUser({
    clerkId: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress || "",
    name: clerkUser.fullName || clerkUser.firstName || clerkUser.username,
    avatarUrl: clerkUser.imageUrl,
  });

  // 获取用户显示名称
  const displayName = dbUser.name || clerkUser.firstName || clerkUser.username || "用户";

  return (
    <div className="flex h-screen bg-slate-50">
      {/* 桌面端侧边栏 */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      {/* 主内容区域 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
          <div className="flex items-center gap-4">
            {/* 移动端菜单按钮 */}
            <MobileNav />

            {/* 面包屑标题 */}
            <h1 className="text-lg font-semibold text-slate-900">
              {displayName} 的后台
            </h1>
          </div>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-4">
            {/* 发布状态指示 */}
            {dbUser.siteConfig?.isPublished ? (
              <span className="hidden items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 sm:flex">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                已发布
              </span>
            ) : (
              <span className="hidden items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 sm:flex">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                未发布
              </span>
            )}

            {/* 用户头像菜单 */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
              afterSignOutUrl="/"
            />
          </div>
        </header>

        {/* 主内容区 - 可滚动 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
