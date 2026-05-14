# Supabase 配置指南

## 第一步：运行 SQL 创建数据库表

1. 打开 Supabase Dashboard: https://dfhgclgxpjczwhqegier.supabase.co
2. 点击左侧菜单 **SQL Editor**
3. 点击 **New query**
4. 复制 `supabase_setup.sql` 文件中的全部内容（在项目根目录）
5. 粘贴到 SQL Editor 中
6. 点击 **Run** 按钮执行

这会自动创建所有需要的表：
- `site_settings` - 网站设置
- `projects` - 作品集项目
- `about_content` - 关于我页面内容
- `resume_files` - 简历文件
- `resume_experience` - 工作经历
- `resume_education` - 教育背景
- `resume_skills` - 技能
- `services` - 服务
- `social_links` - 社交媒体链接
- `case_studies` - 作品集详情页

## 第二步：创建 Storage Buckets（图片上传用）

### 在 Supabase Dashboard 中操作：

1. 点击左侧菜单 **Storage**
2. 点击 **New bucket** 按钮，依次创建以下 buckets：

| Bucket 名称 | 用途 |
|------------|------|
| `hero-backgrounds` | 首页 Hero 背景图 |
| `portfolio-images` | 作品集项目图片 |
| `about-photos` | 关于我页面照片 |
| `resume-files` | 简历 PDF 文件 |
| `case-study-images` | 作品集详情页图片 |
| `avatars` | 头像图片 |

### 设置每个 bucket 的权限：

1. 创建 bucket 时勾选 **Public bucket**（让文件可以公开访问）
2. 或者创建后点击 bucket，进入 **Policies** 标签设置：
   - SELECT 策略：`true`（允许所有人读取）
   - INSERT 策略：`true`（允许上传）
   - UPDATE 策略：`true`（允许更新）
   - DELETE 策略：`true`（允许删除）

## 第三步：确认环境变量

确保 `.env` 文件中有以下内容：

```
VITE_SUPABASE_URL=https://dfhgclgxpjczwhqegier.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmaGdjbGd4cGpjendocWVnaWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODU2NjMsImV4cCI6MjA5MDM2MTY2M30.Yw-6kcPryknBd4KI6y6wxfoR82ndEAMm19tPA0pdsHs
```

**注意**：必须使用 `anon` key，不是 `service_role` key。

## 第四步：重启项目

```bash
npm run dev
```

访问 http://localhost:5174/admin 登录后台。

## 常见问题

### 1. 406 错误
如果看到 406 Not Acceptable 错误，说明表还没有创建成功。请检查 SQL 是否运行成功。

### 2. 401 Unauthorized
- 检查 `.env` 文件中的 `VITE_SUPABASE_ANON_KEY` 是否正确
- 确保使用的是 **anon** key（角色是 `anon`）

### 3. 图片上传失败
- 检查 Storage buckets 是否已创建
- 检查 bucket 的权限设置是否正确
- 检查文件大小是否超过限制（默认 50MB）

### 4. 数据没有保存
- 检查浏览器控制台的错误信息
- 检查 RLS 策略是否正确设置（允许写入）

## API 密钥位置

在 Supabase Dashboard 中：
1. 点击左侧 **Project Settings**
2. 点击 **Data API**
3. 找到 **anon** public 的 API Key

不要泄露 `service_role` key！
