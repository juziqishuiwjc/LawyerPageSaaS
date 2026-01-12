"use client";

import { Trash2 } from "lucide-react";
import { deleteCase } from "@/actions/case";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { CaseStudy } from "@prisma/client";

interface CaseCardProps {
  case: CaseStudy;
}

export function CaseCard({ case: caseItem }: CaseCardProps) {
  // 格式化日期
  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="group">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="line-clamp-1">{caseItem.title}</CardTitle>
            {caseItem.date && (
              <CardDescription className="mt-1">
                {formatDate(caseItem.date)}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-slate-600">
          {caseItem.description}
        </p>
        {caseItem.result && (
          <div className="mt-3 rounded-md bg-green-50 px-3 py-1.5">
            <p className="text-xs font-medium text-green-800">
              结果：{caseItem.result}
            </p>
          </div>
        )}
      </CardContent>

      {/* 删除按钮 */}
      <div className="border-t border-slate-100 px-6 py-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center justify-end gap-2 text-sm text-red-600 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              删除案例
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认删除</AlertDialogTitle>
              <AlertDialogDescription>
                确定要删除案例《{caseItem.title}》吗？此操作无法撤销。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <form action={async () => {
                await deleteCase(caseItem.id);
                window.location.reload();
              }}>
                <AlertDialogAction
                  type="submit"
                  className="bg-red-600 hover:bg-red-700"
                >
                  确认删除
                </AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}
