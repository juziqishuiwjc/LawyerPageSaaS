# LawyerPage-SaaS

面向律师的 SaaS 平台，律师可以通过简单的后台界面输入个人信息，一键生成专业的个人主页。

## 项目简介

LawyerPage 是一个为律师设计的个人主页生成平台。律师用户无需编程知识，只需填写个人资料、选择模板风格，即可快速生成专业的个人主页。

### 核心功能

- **用户认证**：使用 Clerk 实现安全的登录/注册
- **资料管理**：填写个人简介、专业领域、案例、联系方式
- **案例管理**：添加、展示、删除成功案例
- **模板系统**：多款专业模板可选（经典稳重、现代简约）
- **网站配置**：自定义网址后缀、主题颜色、发布状态
- **管理员后台**：查看所有用户和网站统计
- **一键发布**：发布后获得专属链接 `/site/[slug]`

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **前端框架** | Next.js 16 | App Router |
| **UI 组件** | React + Tailwind CSS v4 + shadcn/ui | |
| **数据库** | Prisma ORM + PostgreSQL | Vercel Postgres |
| **认证** | Clerk | 用户管理 |
| **表单处理** | Server Actions + FormData | |
| **图标** | lucide-react | |
| **部署** | Vercel | 推荐平台 |

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/juziqishuiwjc/LawyerPageSaaS.git
cd LawyerPageSaaS
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env`：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填写以下配置：

```env
# ============================================================
# 数据库配置 (PostgreSQL - Vercel)
# ============================================================
# 本地开发时，从 Vercel Dashboard 复制以下两个值：
# POSTGRES_PRISMA_URL=
# POSTGRES_URL_NON_POOLING=

# ============================================================
# Clerk 认证配置
# ============================================================
# 1. 访问 https://clerk.com 注册账户
# 2. 创建新应用
# 3. 在 Dashboard > API Keys 获取以下值
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Clerk Webhook 密钥
CLERK_WEBHOOK_SECRET=whsec_xxxxx

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. 获取 Clerk API Keys

1. 访问 https://clerk.com 注册账户
2. 创建新应用
3. 在 Dashboard > API Keys 获取：
   - Publishable Key
   - Secret Key
4. 配置允许的重定向 URL：
   - `http://localhost:3000/sign-in`
   - `http://localhost:3000/sign-up`
   - `http://localhost:3000/dashboard`

### 4. 初始化数据库

```bash
# 生成 Prisma 客户端
npx prisma generate

# 推送数据库 schema
npx prisma db push
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

## 项目结构

```
LawyerPage-SaaS/
├── prisma/
│   └── schema.prisma          # 数据库模型
├── src/
│   ├── actions/               # Server Actions
│   │   ├── user.ts            # 用户资料更新
│   │   ├── case.ts            # 案例管理
│   │   └── site.ts            # 网站配置
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # 认证路由组
│   │   │   ├── layout.tsx
│   │   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   │   └── sign-up/[[...sign-up]]/page.tsx
│   │   ├── (dashboard)/      # 后台路由组
│   │   │   ├── layout.tsx    # 后台布局（侧边栏）
│   │   │   ├── dashboard/    # 后台首页
│   │   │   ├── profile/      # 个人资料编辑
│   │   │   ├── cases/        # 案例管理
│   │   │   └── settings/     # 网站设置
│   │   ├── admin/             # 超级管理员后台
│   │   ├── site/[slug]/      # 律师公开主页
│   │   ├── layout.tsx        # 根布局
│   │   ├── page.tsx          # 首页
│   │   └── globals.css       # 全局样式
│   ├── components/           # React 组件
│   │   ├── ui/               # shadcn/ui 基础组件
│   │   ├── dashboard/        # 后台组件
│   │   │   ├── sidebar.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── create-case-dialog.tsx
│   │   └── themes/           # 律师主页模板
│   │       ├── classic.tsx   # 经典稳重风格
│   │       └── modern.tsx    # 现代简约风格
│   ├── lib/                  # 工具函数
│   │   ├── prisma.ts         # Prisma 客户端
│   │   ├── auth-sync.ts      # Clerk 用户同步
│   │   └── utils.ts          # 通用工具
│   ├── types/                # TypeScript 类型
│   └── middleware.ts         # Next.js 中间件
├── .env                      # 环境变量
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 数据库模型

### User（律师用户）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| clerkId | String | Clerk 用户 ID |
| email | String | 邮箱 |
| name | String? | 姓名 |
| avatarUrl | String? | 头像 URL |
| title | String? | 职称（高级合伙人/专职律师） |
| licenseNo | String? | 执业证号 |
| organization | String? | 律所名称 |
| phone | String? | 联系电话 |
| wechatQr | String? | 微信二维码链接 |
| bio | String? | 个人简介 |

### SiteConfig（网站配置）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| userId | String | 所属用户 |
| slug | String | 个性化后缀（唯一） |
| themeId | String | 模板 ID（classic/modern） |
| primaryColor | String | 主色调 |
| isPublished | Boolean | 是否已发布 |

### CaseStudy（成功案例）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| title | String | 案件标题 |
| description | String | 案情描述 |
| result | String? | 判决结果 |
| date | DateTime? | 案件日期 |

### Specialty（擅长领域）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| name | String | 领域名称 |

## 页面路由

| 路由 | 说明 | 权限 |
|------|------|------|
| `/` | 营销首页 | 公开 |
| `/sign-in` | 登录页 | 公开 |
| `/sign-up` | 注册页 | 公开 |
| `/dashboard` | 后台首页 | 需登录 |
| `/dashboard/profile` | 个人资料编辑 | 需登录 |
| `/dashboard/cases` | 案例管理 | 需登录 |
| `/dashboard/settings` | 网站设置 | 需登录 |
| `/admin` | 超级管理后台 | 仅管理员 |
| `/site/[slug]` | 律师生成的主页 | 公开（已发布时） |

## 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

## 开发路线

### ✅ 阶段1：认证系统
- [x] Next.js 项目初始化
- [x] Clerk 集成配置
- [x] 登录/注册页面（catch-all 路由）
- [x] 中间件路由保护

### ✅ 阶段2：律师资料编辑
- [x] 后台导航布局（侧边栏 + 移动端菜单）
- [x] 个人资料表单
- [x] Server Actions 数据处理

### ✅ 阶段3：案例管理
- [x] 案例列表展示
- [x] 添加案例（Dialog 弹窗）
- [x] 删除案例（二次确认）

### ✅ 阶段4：网站设置
- [x] 域名设置（Slug 配置）
- [x] 模板选择（Classic/Modern）
- [x] 主题颜色选择
- [x] 发布开关

### ✅ 阶段5：模板系统
- [x] Classic 模板（经典稳重风格）
- [x] Modern 模板（现代简约风格）
- [x] 动态颜色应用
- [x] `/site/[slug]` 动态路由

### ✅ 阶段6：管理员后台
- [x] 管理员邮箱白名单
- [x] 用户列表展示
- [x] 统计数据面板
- [x] 快速访问用户网站

## 部署

### Vercel 部署（推荐）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Update"
   git push
   ```

2. **在 Vercel 导入项目**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "Add New..." → "Project"
   - 选择 GitHub 仓库

3. **配置环境变量**

   在 Vercel 项目设置中添加：
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   CLERK_SECRET_KEY
   NEXT_PUBLIC_APP_URL
   ```

4. **添加 Postgres 数据库**

   - 在项目设置中 → Database → Create Database
   - 选择 Postgres
   - Vercel 会自动添加环境变量

5. **推送数据库 Schema**

   在 Vercel 项目终端运行：
   ```bash
   npx prisma db push
   ```

### 环境变量列表

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `POSTGRES_PRISMA_URL` | Vercel Postgres 连接池 | 是 |
| `POSTGRES_URL_NON_POOLING` | Vercel Postgres 直连 | 是 |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk 公钥 | 是 |
| `CLERK_SECRET_KEY` | Clerk 私钥 | 是 |
| `NEXT_PUBLIC_APP_URL` | 应用 URL | 是 |

## 管理员配置

在 `src/app/(dashboard)/admin/page.tsx` 中修改 `ADMIN_EMAILS` 数组来添加管理员：

```typescript
const ADMIN_EMAILS = [
  "945356844@qq.com",  // 你的邮箱
  // 添加更多管理员邮箱...
];
```

## 许可证

MIT License

## 作者

**Wang Jicheng (王吉成)**
江西吉泰律师事务所

- 电话：183-0796-5661
- 微信：lawyer_wang_zz
- 地址：江西省吉安市吉州区平园路9号金光道大厦19楼
