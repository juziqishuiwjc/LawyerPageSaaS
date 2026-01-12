/**
 * auth-sync.ts
 *
 * Clerk 用户与 Prisma 数据库同步工具
 *
 * 用法：在需要获取当前用户的页面或 API 中调用
 * const user = await getCurrentUser(clerkUserId);
 *
 * 功能：
 * 1. 根据 clerkId 查询数据库中的用户
 * 2. 如果不存在，自动创建基础 User 记录
 * 3. 返回数据库中的 User 对象
 */

import { prisma } from "./prisma";

/**
 * 通过 Clerk 用户 ID 获取或创建数据库用户
 *
 * @param clerkId - Clerk 用户的唯一标识
 * @param email - 用户邮箱（创建新用户时需要）
 * @param name - 用户姓名（可选）
 * @param avatarUrl - 头像 URL（可选）
 * @returns 数据库中的 User 对象
 */
export async function getOrCreateUser({
  clerkId,
  email,
  name,
  avatarUrl,
}: {
  clerkId: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
}) {
  // 1. 先尝试查找现有用户
  let user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      siteConfig: true,
      cases: true,
      specialties: true,
    },
  });

  // 2. 如果不存在，创建新用户
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId,
        email,
        name: name || "",
        avatarUrl: avatarUrl || null,
      },
      include: {
        siteConfig: true,
        cases: true,
        specialties: true,
      },
    });
  }

  return user;
}

/**
 * 通过 Clerk 用户 ID 获取数据库用户（仅查询，不创建）
 *
 * @param clerkId - Clerk 用户的唯一标识
 * @returns 数据库中的 User 对象，如果不存在则返回 null
 */
export async function getUserByClerkId(clerkId: string) {
  return await prisma.user.findUnique({
    where: { clerkId },
    include: {
      siteConfig: true,
      cases: {
        orderBy: { date: "desc" },
      },
      specialties: {
        orderBy: { name: "asc" },
      },
    },
  });
}

/**
 * 更新用户信息
 *
 * @param clerkId - Clerk 用户的唯一标识
 * @param data - 要更新的字段
 * @returns 更新后的 User 对象
 */
export async function updateUser(
  clerkId: string,
  data: {
    name?: string;
    avatarUrl?: string | null;
    title?: string | null;
    licenseNo?: string | null;
    organization?: string | null;
    phone?: string | null;
    wechatQr?: string | null;
    bio?: string | null;
  }
) {
  return await prisma.user.update({
    where: { clerkId },
    data,
    include: {
      siteConfig: true,
      cases: true,
      specialties: true,
    },
  });
}

/**
 * 获取或创建用户的网站配置
 *
 * @param clerkId - Clerk 用户的唯一标识
 * @param slug - 个性化后缀（可选，默认使用 clerkId 的前 8 位）
 * @returns SiteConfig 对象
 */
export async function getOrCreateSiteConfig(clerkId: string, slug?: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { siteConfig: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 如果已有配置，直接返回
  if (user.siteConfig) {
    return user.siteConfig;
  }

  // 创建新的默认配置
  const defaultSlug = slug || clerkId.substring(0, 8);

  return await prisma.siteConfig.create({
    data: {
      userId: user.id,
      slug: defaultSlug,
      themeId: "classic",
      primaryColor: "#1e40af",
      isPublished: false,
    },
  });
}

/**
 * 更新网站配置
 *
 * @param clerkId - Clerk 用户的唯一标识
 * @param data - 要更新的配置字段
 * @returns 更新后的 SiteConfig 对象
 */
export async function updateSiteConfig(
  clerkId: string,
  data: {
    slug?: string;
    themeId?: string;
    primaryColor?: string;
    isPublished?: boolean;
  }
) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { siteConfig: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 如果没有配置，先创建
  if (!user.siteConfig) {
    return await prisma.siteConfig.create({
      data: {
        userId: user.id,
        slug: data.slug || user.clerkId.substring(0, 8),
        themeId: data.themeId || "classic",
        primaryColor: data.primaryColor || "#1e40af",
        isPublished: data.isPublished ?? false,
      },
    });
  }

  // 更新现有配置
  return await prisma.siteConfig.update({
    where: { userId: user.id },
    data,
  });
}
