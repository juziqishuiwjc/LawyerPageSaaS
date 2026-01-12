import { ThemeData } from "@/types";
import { Mail, Phone, MapPin, Gavel } from "lucide-react";
import Image from "next/image";

interface ClassicThemeProps {
  data: ThemeData;
}

export function ClassicTheme({ data }: ClassicThemeProps) {
  const { user, siteConfig, cases, specialties } = data;
  const primaryColor = siteConfig?.primaryColor || "#1e40af";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <header
        className="border-b shadow-sm"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold text-white">
            {user.name || "律师主页"}
          </h1>
          {user.title && (
            <p className="text-sm text-white/80">{user.title}</p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row">
          {/* 左侧个人信息栏 */}
          <aside
            className="w-full md:w-1/3 p-6 text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {/* 头像 */}
            <div className="mb-6 flex justify-center">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name || "律师头像"}
                  className="h-32 w-32 rounded-full border-4 border-white/20 object-cover"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 text-4xl font-bold">
                  {user.name?.charAt(0) || "律"}
                </div>
              )}
            </div>

            {/* 基本信息 */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                {user.title && (
                  <p className="text-white/80">{user.title}</p>
                )}
                {user.organization && (
                  <p className="text-sm text-white/70">{user.organization}</p>
                )}
              </div>

              <div className="h-px bg-white/20" />

              {/* 联系方式 */}
              <div className="space-y-3">
                {user.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                )}
                {user.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm break-all">{user.email}</span>
                  </div>
                )}
                {user.licenseNo && (
                  <div className="flex items-center gap-3">
                    <Gavel className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs text-white/70">
                      执业证号：{user.licenseNo}
                    </span>
                  </div>
                )}
              </div>

              {/* 微信二维码 */}
              {user.wechatQr && (
                <>
                  <div className="h-px bg-white/20" />
                  <div className="text-center">
                    <p className="mb-2 text-sm">微信咨询</p>
                    <img
                      src={user.wechatQr}
                      alt="微信二维码"
                      className="mx-auto h-32 w-32 rounded-lg bg-white p-2"
                    />
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* 右侧内容区 */}
          <main className="w-full md:w-2/3 p-6">
            {/* 个人简介 */}
            {user.bio && (
              <section className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2
                  className="mb-4 text-xl font-bold"
                  style={{ color: primaryColor }}
                >
                  个人简介
                </h2>
                <p className="whitespace-pre-wrap text-slate-700">{user.bio}</p>
              </section>
            )}

            {/* 擅长领域 */}
            {specialties && specialties.length > 0 && (
              <section className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2
                  className="mb-4 text-xl font-bold"
                  style={{ color: primaryColor }}
                >
                  擅长领域
                </h2>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty) => (
                    <span
                      key={specialty.id}
                      className="rounded-full px-3 py-1.5 text-sm font-medium"
                      style={{
                        backgroundColor: primaryColor + "15",
                        color: primaryColor,
                      }}
                    >
                      {specialty.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* 成功案例 */}
            {cases && cases.length > 0 && (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2
                  className="mb-4 text-xl font-bold"
                  style={{ color: primaryColor }}
                >
                  成功案例
                </h2>
                <div className="space-y-4">
                  {cases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                    >
                      <h3 className="font-semibold text-slate-900">
                        {caseItem.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {caseItem.description}
                      </p>
                      {caseItem.result && (
                        <div
                          className="mt-2 inline-block rounded px-2 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: "#dcfce7",
                            color: "#166534",
                          }}
                        >
                          结果：{caseItem.result}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} {user.name}. 保留所有权利。</p>
          <p className="mt-1 text-xs text-slate-500">
            本网站内容仅供参考，不构成法律意见
          </p>
        </div>
      </footer>
    </div>
  );
}
