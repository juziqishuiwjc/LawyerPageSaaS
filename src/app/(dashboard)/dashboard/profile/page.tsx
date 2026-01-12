import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateUserProfile } from "@/actions/user";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  // 获取当前用户
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  // 从数据库获取用户数据
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  if (!dbUser) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">个人资料</h1>
        <p className="mt-1 text-sm text-slate-600">
          完善您的个人信息，这些信息将显示在您的律师主页上
        </p>
      </div>

      {/* 表单卡片 */}
      <ProfileForm user={dbUser} />
    </div>
  );
}
