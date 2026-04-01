# CMS 完整设置指南

## 1. 创建 Supabase 账号

访问 https://supabase.com 并注册账号

## 2. 创建新项目

- 点击 "New Project"
- 填写项目名称（如：jy-portfolio）
- 选择区域（建议选离你最近的）
- 等待项目创建完成

## 3. 获取 API 密钥

- 进入项目 Dashboard
- 点击左侧 "Project Settings" → "API"
- 复制以下两个值：
  - `URL` → 填入 `.env` 文件的 `VITE_SUPABASE_URL`
  - `anon/public` → 填入 `.env` 文件的 `VITE_SUPABASE_ANON_KEY`

## 4. 创建数据库表

在 Supabase SQL Editor 中执行以下完整 SQL：

```sql
-- ============================================
-- 1. Site Settings Table (全局设置)
-- ============================================
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(255) NOT NULL UNIQUE,
  value TEXT,
  type VARCHAR(50) DEFAULT 'text',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. Projects Table (项目列表)
-- ============================================
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  title_zh VARCHAR(255),
  category VARCHAR(255),
  category_zh VARCHAR(255),
  description TEXT,
  description_zh TEXT,
  image_url TEXT,
  link VARCHAR(255),
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. About Content Table (关于我)
-- ============================================
CREATE TABLE about_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255),
  title_zh VARCHAR(255),
  paragraphs TEXT[],
  paragraphs_zh TEXT[],
  photos TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. Resume Files Table (简历PDF)
-- ============================================
CREATE TABLE resume_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. Resume Experience Table (工作经历)
-- ============================================
CREATE TABLE resume_experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_zh VARCHAR(255),
  company VARCHAR(255) NOT NULL,
  company_zh VARCHAR(255),
  period VARCHAR(100),
  description TEXT,
  description_zh TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. Resume Education Table (教育背景)
-- ============================================
CREATE TABLE resume_education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  degree VARCHAR(255) NOT NULL,
  degree_zh VARCHAR(255),
  school VARCHAR(255) NOT NULL,
  school_zh VARCHAR(255),
  period VARCHAR(100),
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. Resume Skills Table (技能列表)
-- ============================================
CREATE TABLE resume_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. Services Table (服务列表)
-- ============================================
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_zh VARCHAR(255),
  description TEXT,
  description_zh TEXT,
  icon VARCHAR(50) DEFAULT 'Palette',
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. Case Studies Table (作品集详情)
-- ============================================
CREATE TABLE case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  hero_title VARCHAR(255),
  hero_title_zh VARCHAR(255),
  hero_image TEXT,
  duration VARCHAR(100),
  duration_zh VARCHAR(100),
  role VARCHAR(255),
  role_zh VARCHAR(255),
  platform VARCHAR(255),
  platform_zh VARCHAR(255),
  client VARCHAR(255),
  client_zh VARCHAR(255),
  background_title VARCHAR(255) DEFAULT 'Background',
  background_title_zh VARCHAR(255) DEFAULT '背景',
  background_content TEXT,
  background_content_zh TEXT,
  my_role_title VARCHAR(255) DEFAULT 'My Role',
  my_role_title_zh VARCHAR(255) DEFAULT '我的角色',
  my_role_content TEXT,
  my_role_content_zh TEXT,
  method_title VARCHAR(255) DEFAULT 'Method',
  method_title_zh VARCHAR(255) DEFAULT '方法',
  method_intro TEXT,
  method_intro_zh TEXT,
  method_items TEXT[],
  method_items_zh TEXT[],
  results_title VARCHAR(255) DEFAULT 'Results',
  results_title_zh VARCHAR(255) DEFAULT '结果',
  result_stat1_label VARCHAR(255),
  result_stat1_label_zh VARCHAR(255),
  result_stat1_value VARCHAR(100),
  result_stat2_label VARCHAR(255),
  result_stat2_label_zh VARCHAR(255),
  result_stat2_value VARCHAR(100),
  reflection_title VARCHAR(255) DEFAULT 'Reflection',
  reflection_title_zh VARCHAR(255) DEFAULT '反思',
  reflection_content TEXT,
  reflection_content_zh TEXT,
  gallery_images TEXT[],
  gallery_captions TEXT[],
  gallery_captions_zh TEXT[],
  cta_title VARCHAR(255),
  cta_title_zh VARCHAR(255),
  cta_button_text VARCHAR(100),
  cta_button_text_zh VARCHAR(100),
  cta_link TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 10. Social Links Table (社交链接)
-- ============================================
CREATE TABLE social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50) DEFAULT 'Link',
  url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 插入默认数据
-- ============================================

-- Site Settings (全局设置)
INSERT INTO site_settings (key, value, type) VALUES
  ('hero_background', 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2000', 'background'),
  ('hero_title', "Welcome to Jy's Channel", 'text'),
  ('hero_title_zh', '欢迎来到 Jy 的频道', 'text'),
  ('hero_subtitle', 'Explore · Create · Share', 'text'),
  ('hero_subtitle_zh', '探索 · 创造 · 分享', 'text'),
  ('contact_email', 'hello@example.com', 'text'),
  ('portfolio_label', 'Portfolio', 'text'),
  ('portfolio_label_zh', '作品集', 'text'),
  ('portfolio_title', 'Selected Work', 'text'),
  ('portfolio_title_zh', '精选作品', 'text'),
  ('portfolio_desc', 'A curated collection of projects spanning product design, user experience, and digital innovation.', 'text'),
  ('portfolio_desc_zh', '精心策划的项目集，涵盖产品设计、用户体验和数字创新。', 'text'),
  ('footer_title', 'Student Portfolio', 'text'),
  ('footer_title_zh', '学生作品集', 'text'),
  ('footer_copyright', '© 2024 Student Portfolio', 'text'),
  ('footer_copyright_zh', '© 2024 学生作品集', 'text'),
  ('footer_author', 'Alex Chen – Designer', 'text'),
  ('footer_author_zh', 'Alex Chen – 设计师', 'text'),
  ('services_cta_title', 'Have a project in mind?', 'text'),
  ('services_cta_title_zh', '有项目想法？', 'text'),
  ('services_cta_desc', 'I\'m always open to discussing product design work or partnership opportunities.', 'text'),
  ('services_cta_desc_zh', '我随时乐意讨论产品设计工作或合作机会。', 'text'),
  ('services_cta_button', 'Get in Touch', 'text'),
  ('services_cta_button_zh', '联系我', 'text'),
  ('contact_lets_connect', 'Let\'s Connect', 'text'),
  ('contact_lets_connect_zh', '保持联系', 'text'),
  ('contact_title', 'Get in Touch', 'text'),
  ('contact_title_zh', '联系我', 'text'),
  ('contact_desc', 'I am always open to discussing product design work or partnership opportunities.', 'text'),
  ('contact_desc_zh', '我随时乐意讨论产品设计工作或合作机会。', 'text'),
  ('contact_email_label', 'Email', 'text'),
  ('contact_email_label_zh', '邮箱', 'text'),
  ('contact_email_desc', 'For project inquiries and collaborations', 'text'),
  ('contact_email_desc_zh', '项目咨询与合作', 'text'),
  ('contact_social_label', 'Social', 'text'),
  ('contact_social_label_zh', '社交媒体', 'text'),
  ('contact_social_desc', 'Follow me for updates and behind-the-scenes', 'text'),
  ('contact_social_desc_zh', '关注我获取最新动态', 'text'),
  ('resume_header_title', 'Experience & Education', 'text'),
  ('resume_header_title_zh', '经历与教育', 'text'),
  ('resume_experience_label', 'Experience', 'text'),
  ('resume_experience_label_zh', '工作经历', 'text'),
  ('resume_education_label', 'Education', 'text'),
  ('resume_education_label_zh', '教育背景', 'text'),
  ('resume_skills_label', 'Skills', 'text'),
  ('resume_skills_label_zh', '技能', 'text'),
  ('resume_download_text', 'Download PDF', 'text'),
  ('resume_download_text_zh', '下载 PDF', 'text'),
  ('nav_work', 'Work', 'text'),
  ('nav_work_zh', '作品', 'text'),
  ('nav_about', 'About', 'text'),
  ('nav_about_zh', '关于', 'text'),
  ('nav_services', 'Services', 'text'),
  ('nav_services_zh', '服务', 'text'),
  ('nav_contact', 'Contact', 'text'),
  ('nav_contact_zh', '联系', 'text'),
  ('nav_resume', 'Resume', 'text'),
  ('nav_resume_zh', '简历', 'text'),
  ('home_view_project', 'View Project', 'text'),
  ('home_view_project_zh', '查看项目', 'text'),
  ('home_get_in_touch', 'Get in Touch', 'text'),
  ('home_get_in_touch_zh', '联系我', 'text'),
  ('home_view_resume', 'View Resume', 'text'),
  ('home_view_resume_zh', '查看简历', 'text'),
  ('services_what_i_do', 'What I Do', 'text'),
  ('services_what_i_do_zh', '我的服务', 'text'),
  ('case_study_back_to_work', 'Back to Work', 'text'),
  ('case_study_back_to_work_zh', '返回作品', 'text'),
  ('case_study_next_project', 'Next Project', 'text'),
  ('case_study_next_project_zh', '下一个项目', 'text'),
  ('case_study_previous', 'Previous', 'text'),
  ('case_study_previous_zh', '上一个', 'text'),
  ('case_study_process', 'Process', 'text'),
  ('case_study_process_zh', '过程', 'text');

-- About Content (关于我)
INSERT INTO about_content (title, title_zh, paragraphs, paragraphs_zh, photos) VALUES
  ('About Me', '关于我',
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
   ]);

-- Projects (项目)
INSERT INTO projects (slug, title, title_zh, category, category_zh, description, description_zh, image_url, "order", is_active) VALUES
  ('urban-mobility', 'Urban Mobility', '城市出行', 'UI/UX Design • 2023', 'UI/UX 设计 • 2023',
   'A comprehensive urban transit app redesign', '全面的城市交通应用重新设计',
   'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1000', 1, true),
  ('fintech-dashboard', 'Fintech Dashboard', '金融科技仪表盘', 'Product Design • 2023', '产品设计 • 2023',
   'Enterprise financial data visualization platform', '企业财务数据可视化平台',
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000', 2, true);

-- Resume Experience (工作经历)
INSERT INTO resume_experience (title, title_zh, company, company_zh, period, description, description_zh, "order", is_active) VALUES
  ('Senior Product Designer', '高级产品设计师', 'TechNova Solutions', 'TechNova Solutions',
   '2021 — Present', '2021 — 至今',
   'Led the redesign of the core enterprise dashboard, improving user task completion rate by 40%. Established and maintained the company-wide design system.',
   '领导核心企业仪表盘的重新设计，将用户任务完成率提高了40%。建立并维护了全公司的设计系统。',
   1, true),
  ('UI/UX Designer', 'UI/UX 设计师', 'Creative Studio Alpha', 'Creative Studio Alpha',
   '2018 — 2021', '2018 — 2021',
   'Collaborated with cross-functional teams to deliver responsive web applications for clients in fintech and healthcare sectors.',
   '与跨职能团队合作，为金融科技和医疗保健领域的客户交付响应式 Web 应用程序。',
   2, true);

-- Resume Education (教育背景)
INSERT INTO resume_education (degree, degree_zh, school, school_zh, period, "order", is_active) VALUES
  ('BFA in Interaction Design', '交互设计美术学士', 'Rhode Island School of Design (RISD)', '罗德岛设计学院 (RISD)', '2014 — 2018', 1, true);

-- Resume Skills (技能)
INSERT INTO resume_skills (name, "order", is_active) VALUES
  ('Figma', 1, true),
  ('Prototyping', 2, true),
  ('User Research', 3, true),
  ('Design Systems', 4, true),
  ('HTML/CSS', 5, true),
  ('React', 6, true),
  ('Wireframing', 7, true),
  ('Usability Testing', 8, true);

-- Services (服务)
INSERT INTO services (title, title_zh, description, description_zh, icon, "order", is_active) VALUES
  ('Product Design', '产品设计',
   'End-to-end product design from initial concept to high-fidelity prototypes. I specialize in complex web applications and mobile experiences, ensuring every touchpoint is intuitive and aligned with business goals.',
   '从初始概念到高保真原型的端到端产品设计。我专注于复杂的 Web 应用程序和移动体验，确保每个接触点都直观且符合业务目标。',
   'Palette', 1, true),
  ('Design Systems', '设计系统',
   'Building scalable, accessible, and comprehensive design systems that empower engineering teams to build faster while maintaining visual consistency across all platforms.',
   '构建可扩展、可访问且全面的设计系统，使工程团队能够更快地构建，同时保持所有平台的视觉一致性。',
   'Layers', 2, true),
  ('UX Research', '用户体验研究',
   'Conducting user interviews, usability testing, and competitive analysis to uncover actionable insights that drive product strategy and validate design decisions.',
   '进行用户访谈、可用性测试和竞争分析，以发现可操作的见解，从而推动产品战略并验证设计决策。',
   'Search', 3, true);

-- Social Links (社交链接)
INSERT INTO social_links (name, icon, url, "order", is_active) VALUES
  ('LinkedIn', 'Linkedin', 'https://linkedin.com', 1, true),
  ('Instagram', 'Instagram', 'https://instagram.com', 2, true),
  ('Dribbble', 'Dribbble', 'https://dribbble.com', 3, true);

-- Case Studies (作品集详情) - 示例数据
INSERT INTO case_studies (
  project_id, slug, hero_title, hero_title_zh, hero_image,
  duration, duration_zh, role, role_zh, platform, platform_zh, client, client_zh,
  background_content, background_content_zh,
  my_role_content, my_role_content_zh,
  method_intro, method_intro_zh,
  method_items, method_items_zh,
  result_stat1_label, result_stat1_label_zh, result_stat1_value,
  result_stat2_label, result_stat2_label_zh, result_stat2_value,
  reflection_content, reflection_content_zh,
  gallery_images, gallery_captions, gallery_captions_zh,
  cta_title, cta_title_zh, cta_button_text, cta_button_text_zh, cta_link,
  is_active
)
SELECT
  p.id, 'urban-mobility-case', 'The Future of Urban Transit', '城市交通的未来',
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=2000',
  '12 Weeks (Fall 2023)', '12周 (2023秋季)', 'Lead UI/UX Designer', '首席 UI/UX 设计师',
  'iOS & Web Dashboard', 'iOS & Web 仪表盘', 'Metropolis Transit Auth.', '大都会交通局',
  'Urban congestion in the metropolitan area had reached a critical threshold, resulting in a 34% decrease in public transit efficiency over the last decade. Our objective was to redesign the core navigation engine to prioritize multimodal transit—seamlessly blending rail, bus, and micro-mobility options into a single, cohesive user experience.',
  '大都市区的城市拥堵已达到临界点，导致过去十年公共交通效率下降了34%。我们的目标是重新设计核心导航引擎，优先考虑多模式交通——将铁路、公交和微型交通选项无缝融合到一个连贯的用户体验中。',
  'I led the end-to-end design process, from initial stakeholder interviews to high-fidelity prototyping. Working alongside two front-end developers, I ensured that the visual language maintained the "Dynamic Editorial" aesthetic while adhering to strict accessibility standards (WCAG 2.1 AA).',
  '我领导了端到端的设计过程，从最初的利益相关者访谈到高保真原型设计。与两名前端开发人员合作，我确保视觉语言保持"动态编辑"的美感，同时遵守严格的可访问性标准 (WCAG 2.1 AA)。',
  'We utilized a Mixed-Methods Research approach:',
  '我们采用了混合方法研究：',
  ARRAY[
    'Contextual inquiry with 50+ daily commuters across three transit hubs.',
    'Rapid iterative prototyping using low-fidelity wireframes to test navigation flow.',
    'Quantitative analysis of existing trip-planning data to identify friction points.'
  ],
  ARRAY[
    '在三个交通枢纽对50多名日常通勤者进行情境调查。',
    '使用低保真线框进行快速迭代原型设计，以测试导航流程。',
    '对现有行程规划数据进行定量分析，以识别摩擦点。'
  ],
  'Reduction in booking time', '预订时间减少', '45%',
  'User satisfaction rating', '用户满意度评分', '4.8/5',
  'This project taught me the importance of "graceful friction"—sometimes slowing a user down to confirm a critical multimodal connection is better than a seamless but error-prone automated journey. The Electric Blue accents served not just as branding, but as high-contrast beacons for decision-making moments.',
  '这个项目教会了我"优雅摩擦"的重要性——有时让用户慢下来确认关键的多模式连接，比无缝但容易出错的自动化旅程更好。电光蓝的口音不仅作为品牌标识，而且作为决策时刻的高对比度信标。',
  ARRAY[
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'
  ],
  ARRAY['Phase 01: Information Architecture', 'Phase 02: High-Fidelity Interface'],
  ARRAY['阶段 01: 信息架构', '阶段 02: 高保真界面'],
  'Want the deep dive?', '想深入了解？', 'View Full Report', '查看完整报告', '#',
  true
FROM projects p WHERE p.slug = 'urban-mobility';
```

## 5. 创建 Storage Buckets

在 Supabase Dashboard 中：

1. 点击左侧 "Storage"
2. 点击 "New bucket"
3. 创建两个 bucket：
   - `images` (公开)
   - `files` (公开)
4. 点击每个 bucket → "Policies" → "New Policy"
5. 选择 "For full customization..."
6. 设置允许所有用户读写（用于开发）：
   - Allowed operation: ALL
   - Target roles: anon, authenticated

## 6. 修改 Admin 密码

编辑 `src/cms/AdminLogin.tsx` 文件：

```typescript
const ADMIN_PASSWORD = '你的密码';
```

## 7. 访问管理后台

1. 运行项目：`npm run dev`
2. 访问：`http://localhost:3000/admin`
3. 输入密码登录

## 后台功能说明

### 全局设置
- 导航栏文字（中英文）
- Footer 内容
- 作品集区域标题和描述

### Hero 背景
- 上传首页背景图片
- 编辑中英文标题和副标题

### About Me
- 编辑标题（中英文）
- 上传照片墙图片（5张）
- 编辑段落文字（中英文）

### Projects
- 添加/删除/编辑项目
- 每个项目包含：标题（中英文）、分类（中英文）、描述、图片、链接

### Case Studies (作品集详情)
- 关联到具体项目
- 编辑 Hero 区域、项目信息（周期、角色、平台、客户）
- 编辑背景、我的角色、方法、结果、反思等区块
- 上传图库图片

### Services
- 添加/删除服务
- 每项包含：标题（中英文）、描述（中英文）、图标
- 编辑 CTA 区域文字

### Resume
- 上传简历 PDF
- 管理工作经历
- 管理教育背景
- 管理技能列表

### Contact
- 编辑联系页面文字
- 管理社交链接

## 安全提示

1. 生产环境请修改 Admin 密码
2. 配置正确的 Storage Policies（限制匿名用户写入）
3. 定期备份数据库
4. 考虑添加 RLS (Row Level Security) 规则保护数据
