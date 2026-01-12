"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

/**
 * 更新网站配置
 *
 * @param formData - 表单数据
 * @returns 成功或失败的消息对象
 */
export async function updateSiteConfig(formData: FormData) {
  // 验证用户身份
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "未登录，请先登录",
    };
  }

  try {
    // 获取数据库用户
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { siteConfig: true },
    });

    if (!dbUser) {
      return {
        success: false,
        message: "用户不存在",
      };
    }

    // 提取表单数据
    const slug = formData.get("slug") as string | null;
    const themeId = formData.get("themeId") as string | null;
    const primaryColor = formData.get("primaryColor") as string | null;
    const isPublishedStr = formData.get("isPublished") as string | null;
    const isPublished = isPublishedStr === "true";

    // 验证 slug 格式（只允许字母、数字和连字符）
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      return {
        success: false,
        message: "网址后缀只能包含小写字母、数字和连字符",
      };
    }

    // 如果要更新 slug，检查唯一性
    if (slug && slug !== dbUser.siteConfig?.slug) {
      const existing = await prisma.siteConfig.findUnique({
        where: { slug },
      });

      if (existing) {
        return {
          success: false,
          message: "该网址后缀已被占用，请更换",
        };
      }
    }

    // 使用 upsert 更新或创建配置
    await prisma.siteConfig.upsert({
      where: { userId: dbUser.id },
      create: {
        userId: dbUser.id,
        slug: slug || dbUser.clerkId.substring(0, 8),
        themeId: themeId || "classic",
        primaryColor: primaryColor || "#1e40af",
        isPublished,
      },
      update: {
        ...(slug ? { slug } : {}),
        ...(themeId ? { themeId } : {}),
        ...(primaryColor ? { primaryColor } : {}),
        isPublished,
      },
    });

    // 刷新缓存
    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "网站设置已更新",
    };
  } catch (error) {
    console.error("更新网站设置失败:", error);
    return {
      success: false,
      message: "更新失败，请稍后重试",
    };
  }
}
