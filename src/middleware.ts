import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 定义公开路由（使用 (.) 后缀允许 Clerk 加载内部脚本）
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/site(.*)",  // 公开的律师主页
  "/",          // 首页也是公开的
]);

export default clerkMiddleware(async (auth, req) => {
  // 如果不是公开路由，则要求登录
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // 跳过 Next.js 内部路由和静态文件
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // 始终运行 API 路由
    "/(api|trpc)(.*)",
  ],
};
