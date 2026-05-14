# Supabase Storage Buckets 配置

## 需要创建的 Buckets

在 Supabase Dashboard → Storage 中创建以下 buckets：

| Bucket 名称 | 用途 | 文件类型 |
|------------|------|----------|
| `hero-backgrounds` | 首页 Hero 背景图 | 图片 |
| `portfolio-images` | 作品集项目封面 | 图片 |
| `about-photos` | 关于我页面照片 | 图片 |
| `resume-files` | 简历 PDF | PDF |
| `case-study-images` | 作品集详情页图片 | 图片 |
| `avatars` | 用户头像 | 图片 |

## 创建步骤

1. 打开 Supabase Dashboard → Storage
2. 点击 **New bucket**
3. 输入 Bucket 名称
4. 勾选 **Public bucket**（重要！否则图片无法访问）
5. 点击 **Save**

## 设置权限（Policies）

对每个 bucket，点击 **Policies** 标签，添加以下策略：

### 1. 允许匿名用户读取（SELECT）
- **Policy name**: `Allow public read`
- **Allowed operation**: SELECT
- **Target roles**: `anon`, `authenticated`
- **Policy definition**: `true`

### 2. 允许匿名用户上传（INSERT）
- **Policy name**: `Allow public insert`
- **Allowed operation**: INSERT
- **Target roles**: `anon`, `authenticated`
- **Policy definition**: `true`

### 3. 允许匿名用户更新（UPDATE）
- **Policy name**: `Allow public update`
- **Allowed operation**: UPDATE
- **Target roles**: `anon`, `authenticated`
- **Policy definition**: `true`

### 4. 允许匿名用户删除（DELETE）
- **Policy name**: `Allow public delete`
- **Allowed operation**: DELETE
- **Target roles**: `anon`, `authenticated`
- **Policy definition**: `true`

> **注意**: 以上权限设置适用于开发环境。生产环境应该限制为已认证用户！

## 常见问题

### 400 错误
文件名包含中文或特殊字符时，现在代码已经使用 `encodeURIComponent()` 对文件名进行编码。

### 401/403 错误
检查 bucket 的权限策略是否正确设置，特别是是否允许 `anon` 角色访问。

### 404 错误
检查 bucket 名称是否正确，以及文件是否上传成功。
