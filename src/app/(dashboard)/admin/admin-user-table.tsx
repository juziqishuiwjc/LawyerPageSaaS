import { ExternalLink } from "lucide-react";
import type { User, SiteConfig } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";

interface UserWithSiteConfig extends User {
  siteConfig: SiteConfig | null;
}

interface AdminUserTableProps {
  users: UserWithSiteConfig[];
  appUrl: string;
}

export function AdminUserTable({ users, appUrl }: AdminUserTableProps) {
  if (users.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        暂无用户
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-sm">
            <th className="px-6 py-3 font-medium text-slate-700">用户</th>
            <th className="px-6 py-3 font-medium text-slate-700">邮箱</th>
            <th className="px-6 py-3 font-medium text-slate-700">Slug</th>
            <th className="px-6 py-3 font-medium text-slate-700">状态</th>
            <th className="px-6 py-3 font-medium text-slate-700">注册时间</th>
            <th className="px-6 py-3 font-medium text-slate-700 text-right">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50">
              {/* 用户信息 */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name || "头像"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-600">
                      {user.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-slate-900">
                      {user.name || "未命名"}
                    </p>
                    {user.title && (
                      <p className="text-xs text-slate-500">{user.title}</p>
                    )}
                  </div>
                </div>
              </td>

              {/* 邮箱 */}
              <td className="px-6 py-4 text-sm text-slate-600">
                {user.email}
              </td>

              {/* Slug */}
              <td className="px-6 py-4 text-sm">
                {user.siteConfig?.slug ? (
                  <code className="rounded bg-slate-100 px-2 py-1 text-slate-700">
                    {user.siteConfig.slug}
                  </code>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>

              {/* 发布状态 */}
              <td className="px-6 py-4">
                {user.siteConfig?.isPublished ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-600" />
                    已发布
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    未发布
                  </span>
                )}
              </td>

              {/* 注册时间 */}
              <td className="px-6 py-4 text-sm text-slate-600">
                {formatDistanceToNow(new Date(user.createdAt), {
                  addSuffix: true,
                  locale: zhCN,
                })}
              </td>

              {/* 操作 */}
              <td className="px-6 py-4 text-right">
                {user.siteConfig?.slug && user.siteConfig?.isPublished ? (
                  <a
                    href={`${appUrl}/site/${user.siteConfig.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800"
                  >
                    访问网站
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">未发布</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
