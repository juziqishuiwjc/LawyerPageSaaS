import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* 导航栏 */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
                <span className="text-xl font-bold text-white">律</span>
              </div>
              <span className="text-xl font-semibold text-slate-900">LawyerPage</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                登录
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                免费开始
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] items-center py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              为律师打造的
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                专业个人主页
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              无需编程知识，只需填写资料，即可生成专业的律师个人主页。
              <br />
              展示您的专业形象，让更多客户找到您。
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="rounded-lg bg-slate-900 px-8 py-3 text-base font-semibold text-white hover:bg-slate-800"
              >
                免费创建主页
              </Link>
              <Link
                href="#features"
                className="rounded-lg border border-slate-300 px-8 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                了解更多
              </Link>
            </div>

            {/* 特性展示 */}
            <div id="features" className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">多款模板</h3>
                <p className="mt-2 text-sm text-slate-600">精选专业模板，适合各类律师风格</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">一键发布</h3>
                <p className="mt-2 text-sm text-slate-600">填写资料后即可生成，无需等待</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">移动友好</h3>
                <p className="mt-2 text-sm text-slate-600">完美适配手机、平板、电脑</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
