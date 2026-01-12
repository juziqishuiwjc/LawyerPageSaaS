import { SignIn } from "@clerk/nextjs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900">
            <span className="text-xl font-bold text-white">律</span>
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">LawyerPage</h1>
          <p className="mt-2 text-sm text-slate-600">律师个人主页生成平台</p>
        </div>
        {children}
      </div>
    </div>
  );
}
