"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createCase } from "@/actions/case";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateCaseDialogProps {
  onCreated?: () => void;
}

// 提交按钮组件
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "保存中..." : "保存案例"}
    </Button>
  );
}

export function CreateCaseDialog({ onCreated }: CreateCaseDialogProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 处理表单提交
  async function handleSubmit(formData: FormData) {
    const result = await createCase(formData);
    if (result.success) {
      setMessage({ type: "success", text: result.message });
      // 延迟关闭对话框，让用户看到成功消息
      setTimeout(() => {
        setOpen(false);
        setMessage(null);
        onCreated?.();
      }, 500);
    } else {
      setMessage({ type: "error", text: result.message });
    }
  }

  // 重置表单状态
  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
    if (!newOpen) {
      setMessage(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          添加案例
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>添加成功案例</DialogTitle>
          <DialogDescription>
            记录您的成功案例，展示您的专业能力
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          {/* 消息提示 */}
          {message && (
            <div
              className={`rounded-lg p-3 text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* 案件标题 */}
          <div className="space-y-2">
            <Label htmlFor="title">案件标题 *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="如：张某某诈骗案辩护"
              required
            />
          </div>

          {/* 案情描述 */}
          <div className="space-y-2">
            <Label htmlFor="description">案情描述 *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="简要描述案件情况、辩护要点等..."
              className="min-h-[100px]"
              required
            />
          </div>

          {/* 判决结果 */}
          <div className="space-y-2">
            <Label htmlFor="result">判决结果 / 辩护效果</Label>
            <Input
              id="result"
              name="result"
              type="text"
              placeholder="如：检察院撤回起诉、缓刑三年等"
            />
          </div>

          {/* 案件日期 */}
          <div className="space-y-2">
            <Label htmlFor="date">案件日期</Label>
            <Input
              id="date"
              name="date"
              type="date"
            />
            <p className="text-xs text-slate-500">
              可选：案发日期或判决日期
            </p>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end pt-2">
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
