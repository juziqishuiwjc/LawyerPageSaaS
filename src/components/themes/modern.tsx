import { ThemeData } from "@/types";
import { Mail, Phone, MapPin, Gavel, Briefcase } from "lucide-react";

interface ModernThemeProps {
  data: ThemeData;
}

export function ModernTheme({ data }: ModernThemeProps) {
  const { user, siteConfig, cases, specialties } = data;
  const primaryColor = siteConfig?.primaryColor || "#1e40af";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 头部大图区域 */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: primaryColor }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          {/* 头像 */}
          <div className="mb-6 flex justify-center">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || "律师头像"}
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
            ) : (
              <div
                className="flex h-32 w-32 items-center justify-center rounded-full text-4xl font-bold text-white shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                {user.name?.charAt(0) || "律"}
              </div>
            )}
          </div>

          {/* 姓名和头衔 */}
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            {user.name || "律师"}
          </h1>
          {user.title && (
            <p
              className="mt-2 text-xl font-medium"
              style={{ color: primaryColor }}
            >
              {user.title}
            </p>
          )}
          {user.organization && (
            <p className="mt-2 text-slate-600">{user.organization}</p>
          )}

          {/* 快速联系方式 */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {user.phone && (
              <a
                href={`tel:${user.phone}`}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Phone className="h-5 w-5" style={{ color: primaryColor }} />
                <span>{user.phone}</span>
              </a>
            )}
            {user.email && (
              <a
                href={`mailto:${user.email}`}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Mail className="h-5 w-5" style={{ color: primaryColor }} />
                <span className="hidden sm:inline">{user.email}</span>
                <span className="sm:hidden">邮箱</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 主要内容区 */}
      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* 个人简介 */}
        {user.bio && (
          <section className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div className="mb-4 flex items-center gap-2">
              <div
                className="h-8 w-1 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
              <h2 className="text-2xl font-bold text-slate-900">关于我</h2>
            </div>
            <p className="whitespace-pre-wrap text-lg leading-relaxed text-slate-700">
              {user.bio}
            </p>
          </section>
        )}

        {/* 擅长领域 */}
        {specialties && specialties.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <div
                className="h-8 w-1 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
              <h2 className="text-2xl font-bold text-slate-900">擅长领域</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {specialties.map((specialty) => (
                <div
                  key={specialty.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: primaryColor + "15" }}
                  >
                    <Briefcase className="h-5 w-5" style={{ color: primaryColor }} />
                  </div>
                  <span className="font-medium text-slate-900">{specialty.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 成功案例 */}
        {cases && cases.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <div
                className="h-8 w-1 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
              <h2 className="text-2xl font-bold text-slate-900">成功案例</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {cases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {caseItem.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{caseItem.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {caseItem.date && (
                      <span className="text-xs text-slate-500">
                        {new Date(caseItem.date).toLocaleDateString("zh-CN")}
                      </span>
                    )}
                    {caseItem.result && (
                      <span
                        className="rounded-full px-3 py-1 text-xs font-medium text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {caseItem.result}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 联系卡片 */}
        <section className="rounded-2xl p-8 text-white" style={{ backgroundColor: primaryColor }}>
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">需要法律服务？</h2>
            <p className="mb-6 text-white/90">
              如需咨询，请通过以下方式联系我
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {user.phone && (
                <a
                  href={`tel:${user.phone}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-medium transition-colors hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                  电话咨询
                </a>
              )}
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-medium transition-colors hover:bg-white/20"
                >
                  <Mail className="h-4 w-4" />
                  发送邮件
                </a>
              )}
            </div>

            {/* 微信二维码 */}
            {user.wechatQr && (
              <div className="mt-8">
                <p className="mb-3 text-sm text-white/80">微信扫码咨询</p>
                <img
                  src={user.wechatQr}
                  alt="微信二维码"
                  className="mx-auto h-32 w-32 rounded-lg bg-white p-2"
                />
              </div>
            )}
          </div>
        </section>

        {/* 执业信息 */}
        {user.licenseNo && (
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>执业证号：{user.licenseNo}</p>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} {user.name}. 保留所有权利。
          </p>
          <p className="mt-2 text-xs text-slate-500">
            本网站内容仅供参考，不构成法律意见
          </p>
        </div>
      </footer>
    </div>
  );
}
