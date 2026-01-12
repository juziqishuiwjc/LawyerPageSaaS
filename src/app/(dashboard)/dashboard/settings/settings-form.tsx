"use client";

import { useState, useTransition } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { updateSiteConfig } from "@/actions/site";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SiteConfig } from "@prisma/client";

// 预设颜色选项
const colorOptions = [
  { name: "深蓝", value: "#1e40af" },
  { name: "黑色", value: "#1f2937" },
  { name: "红色", value: "#dc2626" },
  { name: "金色", value: "#b8945e" },
  { name: "绿色", value: "#059669" },
];

// 模板选项
const templateOptions = [
  { value: "classic", label: "经典稳重" },
  { value: "modern", label: "现代简约" },
];

interface SettingsFormProps {
  siteConfig: SiteConfig | null;
  appUrl: string;
}

export function SettingsForm({ siteConfig, appUrl }: SettingsFormProps) {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  // 当前值
  const slug = siteConfig?.slug || "";
  const themeId = siteConfig?.themeId || "classic";
  const primaryColor = siteConfig?.primaryColor || "#1e40af";
  const isPublished = siteConfig?.isPublished || false;

  // 复制链接
  function copyLink() {
    const fullUrl = `${appUrl}/site/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // 处理表单提交
  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await updateSiteConfig(formData);
      if (result.success) {
        setMessage({ type: "success", text: result.message });
      } else {
        setMessage({ type: "error", text: result.message });
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* 全局消息提示 */}
      {message && (
        <div
          className={`rounded-lg p-4 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 卡片 1: 域名设置 */}
      <Card>
        <CardHeader>
          <CardTitle>域名设置</CardTitle>
          <CardDescription>
            设置您的个性化网址后缀，让客户更容易记住您
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slug">您的网站地址</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">{appUrl}/site/</span>
              <Input
                id="slug"
                name="slug"
                type="text"
                placeholder="wang"
                defaultValue={slug}
                className="flex-1"
                pattern="[a-z0-9-]+"
                title="只能包含小写字母、数字和连字符"
              />
            </div>
            <p className="text-xs text-slate-500">
              只能包含小写字母、数字和连字符，如：wang-lawyer
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 卡片 2: 外观设计 */}
      <Card>
        <CardHeader>
          <CardTitle>外观设计</CardTitle>
          <CardDescription>
            选择您喜欢的模板风格和主题颜色
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 模板选择 */}
          <div className="space-y-2">
            <Label htmlFor="themeId">模板风格</Label>
            <Select name="themeId" defaultValue={themeId}>
              <SelectTrigger>
                <SelectValue placeholder="选择模板" />
              </SelectTrigger>
              <SelectContent>
                {templateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 主题色选择 */}
          <div className="space-y-3">
            <Label>主题颜色</Label>
            <RadioGroup name="primaryColor" defaultValue={primaryColor}>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((color) => (
                  <label
                    key={color.value}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
                  >
                    <RadioGroupItem value={color.value} id={`color-${color.value}`} />
                    <div
                      className="h-6 w-6 rounded-full border border-slate-200"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-sm">{color.name}</span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* 卡片 3: 发布状态 */}
      <Card>
        <CardHeader>
          <CardTitle>发布状态</CardTitle>
          <CardDescription>
            控制您的网站是否对外公开
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 发布开关 */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isPublished" className="text-base">
                网站发布
              </Label>
              <p className="text-sm text-slate-600">
                开启后，您的网站将对外公开访问
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="hidden"
                name="isPublished"
                value={isPublished ? "false" : "true"}
                id="isPublished-value"
              />
              <Switch
                id="isPublished"
                checked={isPublished}
                onCheckedChange={(checked) => {
                  // 更新隐藏的值
                  const input = document.getElementById("isPublished-value") as HTMLInputElement;
                  if (input) input.value = checked ? "true" : "false";
                }}
                onClick={(e) => {
                  const input = document.getElementById("isPublished-value") as HTMLInputElement;
                  if (input) {
                    input.value = e.currentTarget.getAttribute("data-state") === "checked" ? "false" : "true";
                  }
                }}
              />
            </div>
          </div>

          {/* 发布状态显示 */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            {isPublished ? (
              // 已发布状态
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-medium text-green-700">网站已发布</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-white px-3 py-2">
                  <a
                    href={`${appUrl}/site/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    {appUrl}/site/{slug}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={copyLink}
                    className="h-7 px-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        复制
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              // 未发布状态
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-slate-400" />
                <span className="text-sm text-slate-600">
                  网站未发布（访客无法访问）
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 保存按钮 */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "保存中..." : "保存更改"}
        </Button>
      </div>
    </form>
  );
}
