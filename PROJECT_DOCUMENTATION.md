# 个人作品集网站 - 项目文档

## 项目概述

一个基于 React + TypeScript + Tailwind CSS 开发的个人作品集网站，集成了 Supabase 后端服务，支持完整的 CMS 内容管理功能。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | React 18 + TypeScript |
| 构建工具 | Vite |
| 样式 | Tailwind CSS |
| 图标 | Lucide React |
| 后端服务 | Supabase (PostgreSQL + Storage + Auth) |
| 路由 | React Router |
| 国际化 | 自定义 i18n 实现 |

## 项目结构

```
src/
├── cms/                    # CMS 后台管理系统
│   ├── AdminDashboard.tsx  # 主控制台（所有内容编辑）
│   ├── AdminLogin.tsx      # 登录页面
│   └── CMSContext.tsx      # CMS 数据上下文
├── components/
│   ├── Layout/             # 布局组件
│   │   ├── Navbar.tsx      # 导航栏
│   │   └── LanguageSwitch.tsx
│   └── ui/                 # 基础 UI 组件
├── hooks/                  # 自定义 Hooks
├── i18n/                   # 国际化
├── lib/
│   └── supabase.ts         # Supabase 客户端和类型定义
├── pages/                  # 页面组件
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Resume.tsx
│   ├── Contact.tsx
│   └── CaseStudy.tsx
└── router/
    └── AppRouter.tsx       # 路由配置
```

## CMS 功能模块

### 1. 首页 Hero 区域
- 背景图片上传/更换
- 标题和副标题编辑（中英双语）

### 2. 关于我
- 标题编辑
- 多段落文本编辑
- 照片画廊管理（多图上传/删除/排序）

### 3. 作品集
- 项目增删改查
- 项目封面图上传
- 项目元数据编辑（标题、分类、描述、链接）
- 显示/隐藏控制

### 4. 作品集详情页（案例研究）
- 完整的案例详情编辑
- Hero 区域（标题、背景图）
- 项目信息（时长、角色、平台、客户）
- 背景介绍
- 我的职责
- 方法论（带列表项）
- 成果数据（统计数字）
- 反思总结
- 图片画廊
- CTA 区域

### 5. 服务
- 服务项增删改查
- 图标选择
- 描述编辑（中英双语）

### 6. 简历
- PDF 文件上传/更新
- 工作经历管理
- 教育背景管理
- 技能列表管理

### 7. 联系页面
- 社交媒体链接管理
- 邮箱、电话设置

### 8. 页脚
- 版权信息编辑
- 社交链接显示控制

## 数据库结构

### 表列表

| 表名 | 用途 |
|------|------|
| `site_settings` | 网站全局设置（Hero 背景、联系信息等） |
| `projects` | 作品集项目 |
| `about_content` | 关于我页面内容 |
| `resume_files` | 简历 PDF 文件 |
| `resume_experience` | 工作经历 |
| `resume_education` | 教育背景 |
| `resume_skills` | 技能列表 |
| `services` | 服务项 |
| `social_links` | 社交媒体链接 |
| `case_studies` | 作品集详情页 |

### 关键设计决策

1. **单表存储多语言内容**：每个文本字段都有 `_zh` 后缀的中文版本，如 `title` / `title_zh`
2. **数组类型存储列表**：使用 PostgreSQL 数组类型存储段落、列表项、画廊图片等
3. **软删除替代物理删除**：使用 `is_active` 字段控制显示，而非删除记录
4. **order 字段控制排序**：所有列表数据都有 `order` 字段用于自定义排序

## Storage 存储桶配置

| 存储桶 | 用途 | 权限 |
|--------|------|------|
| `hero-backgrounds` | 首页背景图 | Public Read + Write |
| `portfolio-images` | 作品集封面 | Public Read + Write |
| `about-photos` | 关于页面照片 | Public Read + Write |
| `resume-files` | 简历 PDF | Public Read + Write |
| `case-study-images` | 案例详情图片 | Public Read + Write |
| `avatars` | 用户头像 | Public Read + Write |

## 关键问题与解决方案

### 问题 1：图片上传后 400 错误

**现象**：图片上传到 Supabase Storage 成功，但获取图片 URL 时返回 400 Bad Request

**原因**：代码中使用了未定义的 `getStorageUrl()` 辅助函数来获取图片的公开 URL

**解决方案**：
```typescript
// 错误做法（手动拼接或调用不存在函数）
const url = getStorageUrl(bucket, fileName);

// 正确做法（使用 Supabase SDK）
const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
```

**修复位置**：AdminDashboard.tsx 中的 5 个上传处理函数

### 问题 2：406 Not Acceptable 错误

**现象**：API 请求返回 406

**原因**：Supabase 数据库表尚未创建

**解决方案**：运行 `supabase_setup.sql` 中的 SQL 脚本创建所有表和 RLS 策略

### 问题 3：401 Unauthorized 错误

**现象**：API 请求返回 401

**原因**：使用了错误的 API Key（使用了 service_role key 而非 anon key）

**解决方案**：更新 `.env` 文件，使用正确的 `VITE_SUPABASE_ANON_KEY`

## 认证机制

- **方式**：简单的密码验证（无用户系统）
- **密码**：存储在 `site_settings` 表中，通过 AdminLogin 验证
- **状态**：使用 localStorage 保存登录状态

## 国际化实现

- 所有内容字段都支持中英双语
- 使用 `LanguageContext` 管理当前语言状态
- 翻译内容存储在 `translations.ts`
- CMS 编辑界面同时显示两个语言的输入框

## 环境变量

```
VITE_SUPABASE_URL=https://dfhgclgxpjczwhqegier.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建
npm run build

# 预览
npm run preview
```

## 部署后配置清单

1. [ ] 运行 SQL 脚本创建数据库表
2. [ ] 创建所有 Storage buckets 并设置公开权限
3. [ ] 配置 RLS 策略允许匿名读写
4. [ ] 设置管理员密码
5. [ ] 上传初始内容（Logo、Hero 背景等）

## 未来优化方向

1. **图片压缩**：上传前压缩图片以减少存储和带宽
2. **CDN 配置**：为 Storage 配置自定义 CDN 域名
3. **多用户支持**：添加基于邮箱/密码的认证系统
4. **版本控制**：内容修改历史记录
5. **草稿功能**：支持保存草稿而非直接发布
6. **SEO 优化**：动态生成 meta 标签和 sitemap
