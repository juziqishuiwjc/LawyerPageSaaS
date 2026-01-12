import { User, SiteConfig, CaseStudy, Specialty } from "@prisma/client";

// 包含关联数据的 User 类型
export type UserWithRelations = User & {
  siteConfig: SiteConfig | null;
  cases: CaseStudy[];
  specialties: Specialty[];
};

// 模板数据类型（从 SiteConfig 关联查询获取）
export type ThemeData = {
  user: User & {
    cases: CaseStudy[];
    specialties: Specialty[];
  };
  siteConfig: SiteConfig;
  cases: CaseStudy[];
  specialties: Specialty[];
};

// 包含 User 的 SiteConfig 类型
export type SiteConfigWithUser = SiteConfig & {
  user: User;
};

// 模板类型
export type ThemeId = "classic" | "modern";

// 用户资料表单数据类型
export interface UserProfileData {
  name?: string;
  avatarUrl?: string | null;
  title?: string | null;
  licenseNo?: string | null;
  organization?: string | null;
  phone?: string | null;
  wechatQr?: string | null;
  bio?: string | null;
  specialties?: string[]; // 专门领域名称数组
}

// 案例表单数据类型
export interface CaseStudyData {
  id?: string;
  title: string;
  description: string;
  result?: string | null;
  date?: Date | null;
}

// 网站配置表单数据类型
export interface SiteConfigData {
  slug: string;
  themeId: ThemeId;
  primaryColor: string;
  isPublished: boolean;
}
