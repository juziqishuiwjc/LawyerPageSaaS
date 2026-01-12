"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * 更新用户个人资料
 *
 * @param formData - 表单数据
 * @returns 成功或失败的消息对象
 */
export async function updateUserProfile(formData: FormData) {
  // 验证用户身份
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "未登录，请先登录",
    };
  }

  try {
    // 提取表单数据
    const name = formData.get("name") as string | null;
    const avatarUrl = formData.get("avatarUrl") as string | null;
    const title = formData.get("title") as string | null;
    const licenseNo = formData.get("licenseNo") as string | null;
    const organization = formData.get("organization") as string | null;
    const phone = formData.get("phone") as string | null;
    const wechatQr = formData.get("wechatQr") as string | null;
    const bio = formData.get("bio") as string | null;

    // 更新数据库
    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        name: name || undefined,
        avatarUrl: avatarUrl || null,
        title: title || null,
        licenseNo: licenseNo || null,
        organization: organization || null,
        phone: phone || null,
        wechatQr: wechatQr || null,
        bio: bio || null,
      },
    });

    // 刷新缓存
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "个人资料已更新",
    };
  } catch (error) {
    console.error("更新个人资料失败:", error);
    return {
      success: false,
      message: "更新失败，请稍后重试",
    };
  }
}
