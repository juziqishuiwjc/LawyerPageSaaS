import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ClassicTheme } from "@/components/themes/classic";
import { ModernTheme } from "@/components/themes/modern";
import type { Metadata } from "next";

// 强制动态渲染，避免 Vercel 构建时尝试静态生成
export const dynamic = "force-dynamic";

interface SitePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 生成动态元数据
export async function generateMetadata({ params }: SitePageProps): Promise<Metadata> {
  const { slug } = await params;

  const siteConfig = await prisma.siteConfig.findUnique({
    where: { slug },
    include: {
      user: true,
    },
  });

  if (!siteConfig || !siteConfig.isPublished) {
    return {
      title: "页面未找到",
    };
  }

  const user = siteConfig.user;

  return {
    title: `${user.name || "律师"} - ${user.organization || "律师主页"}`,
    description: user.bio || `专业律师 ${user.name} 的个人主页`,
  };
}

export default async function SitePage({ params }: SitePageProps) {
  const { slug } = await params;

  // 查询网站配置
  const siteConfig = await prisma.siteConfig.findUnique({
    where: { slug },
    include: {
      user: {
        include: {
          cases: {
            orderBy: { date: "desc" },
          },
          specialties: {
            orderBy: { name: "asc" },
          },
        },
      },
    },
  });

  // 检查是否存在
  if (!siteConfig) {
    notFound();
  }

  // 检查是否已发布
  if (!siteConfig.isPublished) {
    notFound();
  }

  // 构建数据对象
  const data = {
    user: siteConfig.user,
    siteConfig: siteConfig,
    cases: siteConfig.user.cases,
    specialties: siteConfig.user.specialties,
  };

  // 根据模板类型渲染
  const themeId = siteConfig.themeId as "classic" | "modern";

  if (themeId === "modern") {
    return <ModernTheme data={data} />;
  }

  return <ClassicTheme data={data} />;
}
