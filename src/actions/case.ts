"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

/**
 * 创建新案例
 *
 * @param formData - 表单数据
 * @returns 成功或失败的消息对象
 */
export async function createCase(formData: FormData) {
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
    });

    if (!dbUser) {
      return {
        success: false,
        message: "用户不存在",
      };
    }

    // 提取表单数据
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const result = formData.get("result") as string | null;
    const dateStr = formData.get("date") as string | null;

    // 验证必填字段
    if (!title || !description) {
      return {
        success: false,
        message: "请填写标题和案情描述",
      };
    }

    // 创建案例
    await prisma.caseStudy.create({
      data: {
        userId: dbUser.id,
        title,
        description,
        result: result || null,
        date: dateStr ? new Date(dateStr) : null,
      },
    });

    // 刷新缓存
    revalidatePath("/dashboard/cases");

    return {
      success: true,
      message: "案例已添加",
    };
  } catch (error) {
    console.error("创建案例失败:", error);
    return {
      success: false,
      message: "添加失败，请稍后重试",
    };
  }
}

/**
 * 删除案例
 *
 * @param caseId - 案例 ID
 * @returns 成功或失败的消息对象
 */
export async function deleteCase(caseId: string) {
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
    });

    if (!dbUser) {
      return {
        success: false,
        message: "用户不存在",
      };
    }

    // 验证案例是否属于当前用户
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: caseId },
    });

    if (!caseStudy) {
      return {
        success: false,
        message: "案例不存在",
      };
    }

    if (caseStudy.userId !== dbUser.id) {
      return {
        success: false,
        message: "无权删除此案例",
      };
    }

    // 删除案例
    await prisma.caseStudy.delete({
      where: { id: caseId },
    });

    // 刷新缓存
    revalidatePath("/dashboard/cases");

    return {
      success: true,
      message: "案例已删除",
    };
  } catch (error) {
    console.error("删除案例失败:", error);
    return {
      success: false,
      message: "删除失败，请稍后重试",
    };
  }
}
