# LawyerPage-SaaS

面向律师的 SaaS 平台，律师可以通过简单的后台界面输入个人信息，一键生成专业的个人主页。

## 项目简介

LawyerPage 是一个为律师设计的个人主页生成平台。律师用户无需编程知识，只需填写个人资料、选择模板风格，即可快速生成专业的个人主页。

### 核心功能

- **用户认证**：使用 Clerk 实现安全的登录/注册
- **资料管理**：填写个人简介、专业领域、案例、联系方式
- **模板系统**：多款专业模板可选（经典、现代、极简）
- **实时预览**：即时预览生成的个人主页
- **一键发布**：发布后获得专属链接

## 技术栈

- **前端框架**：Next.js 16 (App Router)
- **UI 组件**：React + Tailwind CSS
- **数据库**：Prisma ORM + SQLite (开发) / Postgres (生产)
- **认证**：Clerk
- **表单处理**：React Hook Form + Zod
- **部署**：Vercel

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env`：

```bash
cp .env.example .env
```

然后编辑 `.env` 文件，填写 Clerk API Keys：

```env
DATABASE_URL="file:./dev.db"

# Clerk 认证配置
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
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # 认证页面（登录/注册）
│   │   ├── (dashboard)/      # 后台页面
│   │   │   ├── dashboard/    # 后台首页
│   │   │   ├── profile/      # 个人资料编辑
│   │   │   ├── templates/    # 模板选择
│   │   │   ├── preview/      # 网站预览
│   │   │   └── settings/     # 账户设置
│   │   ├── lawyer/           # 律师公开主页
│   │   ├── api/              # API Routes
│   │   ├── layout.tsx        # 根布局
│   │   ├── page.tsx          # 首页
│   │   └── globals.css       # 全局样式
│   ├── components/           # React 组件
│   │   ├── ui/               # 基础 UI 组件
│   │   ├── auth/             # 认证组件
│   │   ├── dashboard/        # 后台组件
│   │   └── lawyer-page/      # 律师主页模板
│   ├── lib/                  # 工具函数
│   │   ├── prisma.ts         # Prisma 客户端
│   │   └── utils.ts          # 通用工具
│   ├── types/                # TypeScript 类型
│   └── middleware.ts         # Next.js 中间件
├── .env                      # 环境变量
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 数据库模型

### Lawyer（律师）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| clerkUserId | String | Clerk 用户 ID |
| username | String | 用户名（用于 URL） |
| name | String | 姓名 |
| avatar | String? | 头像 URL |
| title | String? | 职称 |
| organization | String? | 律所名称 |
| location | String? | 城市/地区 |
| bio | String? | 个人简介 |
| specialties | String? | 擅长领域（JSON） |
| experience | Int? | 执业年限 |
| phone | String? | 电话 |
| email | String? | 邮箱 |
| wechat | String? | 微信号 |
| officeAddress | String? | 办公地址 |
| template | String | 选择的模板 |
| themeColor | String | 主题色 |
| isPublished | Boolean | 是否已发布 |
| viewCount | Int | 访问次数 |

### Case（案例）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| lawyerId | String | 所属律师 |
| title | String | 案件标题 |
| category | String | 案件类型 |
| description | String? | 案件描述 |
| outcome | String? | 案件结果 |
| year | Int? | 案件年份 |

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

# 数据库相关
npm run db:push      # 推送 schema 到数据库
npm run db:studio    # 打开 Prisma Studio
```

## 开发路线

### 阶段1：认证系统 ✅
- [x] Next.js 项目初始化
- [x] Clerk 集成配置
- [x] 登录/注册页面
- [x] 中间件路由保护
- [x] 数据库模型设计

### 阶段2：律师资料编辑（待开发）
- [ ] 后台导航布局
- [ ] 个人资料表单
- [ ] 头像上传
- [ ] 案例管理

### 阶段3：模板系统（待开发）
- [ ] 模板选择器
- [ ] 3套模板设计
- [ ] 实时预览

### 阶段4：网站生成（待开发）
- [ ] 动态路由 `/lawyer/[username]`
- [ ] SEO 优化
- [ ] 发布/取消发布

### 阶段5：管理员后台（待开发）
- [ ] 管理员角色判断
- [ ] 律师用户列表
- [ ] 用户管理操作

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 更换数据库为 PostgreSQL（生产环境）

### 环境变量配置

在生产环境，需要将 DATABASE_URL 更换为 PostgreSQL 连接字符串。

## 许可证

MIT License

## 作者

Wang Jicheng (王吉成)
江西吉泰律师事务所
