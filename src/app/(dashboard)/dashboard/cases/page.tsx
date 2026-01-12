import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CreateCaseDialog } from "@/components/dashboard/create-case-dialog";
import { CaseCard } from "./case-card";
import { FileText } from "lucide-react";

export default async function CasesPage() {
  // 获取当前用户
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  // 获取数据库用户
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  if (!dbUser) {
    redirect("/dashboard");
  }

  // 获取案例列表（按日期降序）
  const cases = await prisma.caseStudy.findMany({
    where: { userId: dbUser.id },
    orderBy: { date: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">成功案例</h1>
          <p className="mt-1 text-sm text-slate-600">
            管理您的成功案例，展示专业能力
          </p>
        </div>
        <CreateCaseDialog />
      </div>

      {/* 案例列表 */}
      {cases.length === 0 ? (
        // 空状态
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-16">
          <FileText className="h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-medium text-slate-900">
            暂无案例
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            点击上方"添加案例"按钮，记录您的第一个成功案例
          </p>
        </div>
      ) : (
        // 案例卡片网格
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.id} case={caseItem} />
          ))}
        </div>
      )}
    </div>
  );
}
