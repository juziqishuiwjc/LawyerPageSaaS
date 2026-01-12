"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { updateUserProfile } from "@/actions/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@prisma/client";

interface ProfileFormProps {
  user: User;
}

// 提交按钮组件（使用 useFormStatus 获取加载状态）
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "保存中..." : "保存更改"}
    </Button>
  );
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 获取头像首字母
  const getInitials = (name?: string | null) => {
    if (!name) return "律";
    return name.charAt(0).toUpperCase();
  };

  // 处理表单提交
  async function handleSubmit(formData: FormData) {
    const result = await updateUserProfile(formData);
    if (result.success) {
      setMessage({ type: "success", text: result.message });
    } else {
      setMessage({ type: "error", text: result.message });
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* 基本资料卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>基本资料</CardTitle>
          <CardDescription>
            这些信息将显示在您的律师主页上，帮助潜在客户了解您
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 消息提示 */}
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

          {/* 头像设置 */}
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">头像</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatarUrl || undefined} />
                <AvatarFallback className="bg-slate-900 text-white text-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  id="avatarUrl"
                  name="avatarUrl"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  defaultValue={user.avatarUrl || ""}
                />
                <p className="mt-1 text-xs text-slate-500">
                  暂不支持上传，请输入图片链接（可使用微信头像链接）
                </p>
              </div>
            </div>
          </div>

          {/* 姓名 */}
          <div className="space-y-2">
            <Label htmlFor="name">姓名 *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="王吉成"
              defaultValue={user.name || ""}
              required
            />
          </div>

          {/* 头衔 */}
          <div className="space-y-2">
            <Label htmlFor="title">头衔</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="高级合伙人 / 专职律师"
              defaultValue={user.title || ""}
            />
            <p className="text-xs text-slate-500">
              如：高级合伙人、专职律师、律师助理等
            </p>
          </div>

          {/* 执业证号 */}
          <div className="space-y-2">
            <Label htmlFor="licenseNo">执业证号</Label>
            <Input
              id="licenseNo"
              name="licenseNo"
              type="text"
              placeholder="执业证号"
              defaultValue={user.licenseNo || ""}
            />
          </div>

          {/* 所属律所 */}
          <div className="space-y-2">
            <Label htmlFor="organization">所属律所</Label>
            <Input
              id="organization"
              name="organization"
              type="text"
              placeholder="江西吉泰律师事务所"
              defaultValue={user.organization || ""}
            />
          </div>

          {/* 手机号 */}
          <div className="space-y-2">
            <Label htmlFor="phone">联系电话</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="183-0796-5661"
              defaultValue={user.phone || ""}
            />
          </div>

          {/* 微信二维码 */}
          <div className="space-y-2">
            <Label htmlFor="wechatQr">微信二维码链接</Label>
            <Input
              id="wechatQr"
              name="wechatQr"
              type="url"
              placeholder="https://example.com/wechat-qr.jpg"
              defaultValue={user.wechatQr || ""}
            />
            <p className="text-xs text-slate-500">
              上传微信二维码图片后，复制图片链接填入此处
            </p>
          </div>

          {/* 个人简介 */}
          <div className="space-y-2">
            <Label htmlFor="bio">个人简介</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="简要介绍您的专业领域、执业经验等..."
              className="min-h-[120px]"
              defaultValue={user.bio || ""}
            />
            <p className="text-xs text-slate-500">
              建议填写您的专业领域、执业年限、擅长案例类型等信息
            </p>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
