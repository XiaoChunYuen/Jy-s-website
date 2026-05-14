-- ============================================
-- 完整的 CMS 数据库设置脚本
-- 在 Supabase SQL Editor 中运行此文件
-- ============================================

-- 1. 创建 site_settings 表（存储网站各种设置）
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'image', 'background', 'file')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建 projects 表（作品集项目）
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_zh TEXT,
  category TEXT NOT NULL,
  category_zh TEXT,
  description TEXT,
  description_zh TEXT,
  image_url TEXT,
  link TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建 about_content 表（关于我页面内容）
CREATE TABLE IF NOT EXISTS about_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT DEFAULT 'About Me',
  title_zh TEXT DEFAULT '关于我',
  paragraphs TEXT[] DEFAULT '{}',
  paragraphs_zh TEXT[] DEFAULT '{}',
  photos TEXT[] DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 创建 resume_files 表（简历 PDF 文件）
CREATE TABLE IF NOT EXISTS resume_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 创建 resume_experience 表（工作经历）
CREATE TABLE IF NOT EXISTS resume_experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_zh TEXT,
  company TEXT NOT NULL,
  company_zh TEXT,
  period TEXT,
  description TEXT,
  description_zh TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 创建 resume_education 表（教育背景）
CREATE TABLE IF NOT EXISTS resume_education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  degree TEXT NOT NULL,
  degree_zh TEXT,
  school TEXT NOT NULL,
  school_zh TEXT,
  period TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 创建 resume_skills 表（技能）
CREATE TABLE IF NOT EXISTS resume_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. 创建 services 表（服务）
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_zh TEXT,
  description TEXT,
  description_zh TEXT,
  icon TEXT DEFAULT 'sparkles',
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. 创建 social_links 表（社交媒体链接）
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. 创建 case_studies 表（作品集详情页）
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  hero_title TEXT,
  hero_title_zh TEXT,
  hero_image TEXT,
  duration TEXT,
  duration_zh TEXT,
  role TEXT,
  role_zh TEXT,
  platform TEXT,
  platform_zh TEXT,
  client TEXT,
  client_zh TEXT,
  background_title TEXT,
  background_title_zh TEXT,
  background_content TEXT,
  background_content_zh TEXT,
  my_role_title TEXT,
  my_role_title_zh TEXT,
  my_role_content TEXT,
  my_role_content_zh TEXT,
  method_title TEXT,
  method_title_zh TEXT,
  method_intro TEXT,
  method_intro_zh TEXT,
  method_items TEXT[] DEFAULT '{}',
  method_items_zh TEXT[] DEFAULT '{}',
  results_title TEXT,
  results_title_zh TEXT,
  result_stat1_label TEXT,
  result_stat1_label_zh TEXT,
  result_stat1_value TEXT,
  result_stat2_label TEXT,
  result_stat2_label_zh TEXT,
  result_stat2_value TEXT,
  reflection_title TEXT,
  reflection_title_zh TEXT,
  reflection_content TEXT,
  reflection_content_zh TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  gallery_captions TEXT[] DEFAULT '{}',
  gallery_captions_zh TEXT[] DEFAULT '{}',
  cta_title TEXT,
  cta_title_zh TEXT,
  cta_button_text TEXT,
  cta_button_text_zh TEXT,
  cta_link TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 插入默认数据
-- ============================================

-- 插入默认的 about_content 记录（只插入一条）
INSERT INTO about_content (title, title_zh, paragraphs, paragraphs_zh, photos)
VALUES (
  'About Me',
  '关于我',
  ARRAY[
    'I am a digital product designer with a background in architecture, which deeply influences my approach to structuring information and building scalable design systems.',
    'Currently, I focus on creating elegant, user-centric experiences for complex enterprise tools and consumer applications.',
    'When I''m not pushing pixels, you can find me exploring vintage typography, brewing specialty coffee, or photographing brutalist architecture.'
  ],
  ARRAY[
    '我是一名拥有建筑学背景的数字产品设计师，这深刻影响了我构建信息和构建可扩展设计系统的方法。',
    '目前，我专注于为复杂的企业工具和消费者应用程序创建优雅的、以用户为中心的体验。',
    '当我不沉迷于像素时，你会发现我在探索复古排版、冲泡特色咖啡或拍摄粗野主义建筑。'
  ],
  ARRAY[
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=800'
  ]
)
ON CONFLICT DO NOTHING;

-- 插入默认服务
INSERT INTO services (title, title_zh, description, description_zh, icon, "order")
VALUES
  ('Product Design', '产品设计', 'End-to-end product design from research to high-fidelity prototypes.', '从研究到高保真原型的端到端产品设计。', 'palette', 1),
  ('UX Research', '用户研究', 'User interviews, usability testing, and data-driven insights.', '用户访谈、可用性测试和数据驱动的洞察。', 'search', 2),
  ('Design Systems', '设计系统', 'Scalable component libraries and design documentation.', '可扩展的组件库和设计文档。', 'layers', 3)
ON CONFLICT DO NOTHING;

-- 插入示例社交媒体链接
INSERT INTO social_links (name, icon, url, "order")
VALUES
  ('Twitter', 'twitter', 'https://twitter.com', 1),
  ('LinkedIn', 'linkedin', 'https://linkedin.com', 2),
  ('Dribbble', 'dribbble', 'https://dribbble.com', 3)
ON CONFLICT DO NOTHING;

-- ============================================
-- 启用 RLS（行级安全）
-- ============================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 创建 RLS 策略
-- ============================================

-- 读取策略：任何人都可以读取
CREATE POLICY "Allow public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON about_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON resume_files FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON resume_experience FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON resume_education FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON resume_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON social_links FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON case_studies FOR SELECT USING (true);

-- 写入策略：任何人都可以写入（开发阶段）
-- 注意：生产环境应该限制为已认证用户
CREATE POLICY "Allow public insert" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON site_settings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON site_settings FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON projects FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON about_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON about_content FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON about_content FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON resume_files FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON resume_files FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON resume_files FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON resume_experience FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON resume_experience FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON resume_experience FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON resume_education FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON resume_education FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON resume_education FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON resume_skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON resume_skills FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON resume_skills FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON services FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON services FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON social_links FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON social_links FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON social_links FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON case_studies FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON case_studies FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON case_studies FOR DELETE USING (true);

-- ============================================
-- 创建 Storage Buckets（用于图片上传）
-- ============================================

-- 注意：bucket 需要通过 Supabase Dashboard 或 Storage API 创建
-- 这里提供 SQL 方式创建（如果 Supabase 支持）

-- 创建 buckets（在 SQL Editor 中可能不支持，需要在 Dashboard 中手动创建）
-- 或者使用 Supabase Storage API

/*
在 Supabase Dashboard 中手动创建以下 buckets：
1. hero-backgrounds - 用于首页背景图
2. portfolio-images - 用于作品集图片
3. about-photos - 用于关于我页面的照片
4. resume-files - 用于简历 PDF
5. case-study-images - 用于作品集详情页图片

每个 bucket 的权限设置：
- Public: 勾选 "Public bucket" 让所有文件可以公开访问
- 或者设置自定义访问策略
*/
