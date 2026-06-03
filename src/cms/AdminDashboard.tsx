import { useState, useRef, useEffect } from 'react';
import type * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { compressImage } from '../lib/imageUtils';
import {
  LayoutDashboard,
  Image,
  FileText,
  Briefcase,
  Settings,
  LogOut,
  Upload,
  Plus,
  Trash2,
  GripVertical,
  Save,
  Eye,
  X,
  ChevronDown,
  ChevronUp,
  Palette,
  Layers,
  Search,
  Link as LinkIcon,
  GraduationCap,
  Briefcase as BriefcaseIcon,
  Sparkles,
  Globe,
  Menu,
  LayoutTemplate
} from 'lucide-react';
import { supabase } from '../lib/supabaseAdmin';
import type { Project, Service, ResumeExperience, ResumeEducation, ResumeSkill, SocialLink, CaseStudy } from '../lib/supabase';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'site', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
  { id: 'hero', label: 'Hero Background', icon: <Image className="w-4 h-4" /> },
  { id: 'about', label: 'About Me', icon: <FileText className="w-4 h-4" /> },
  { id: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
  { id: 'case-studies', label: 'Case Studies', icon: <FileText className="w-4 h-4" /> },
  { id: 'services', label: 'Services', icon: <Palette className="w-4 h-4" /> },
  { id: 'resume', label: 'Resume', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'contact', label: 'Contact', icon: <Globe className="w-4 h-4" /> },
];

type SiteSettingInput = {
  key: string;
  value: string;
  type?: 'text' | 'image' | 'background' | 'file';
};

const isPersistedId = (id: string) => !id.startsWith('temp-');

const toSlug = (value: string, fallback: string) => {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || fallback;
};

const loadSiteSettings = async (keys: string[]) => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key,value')
    .in('key', keys);

  if (error) {
    throw error;
  }

  return (data || []).reduce<Record<string, string>>((acc, setting) => {
    acc[setting.key] = setting.value || '';
    return acc;
  }, {});
};

const saveSiteSettings = async (settings: SiteSettingInput[]) => {
  const { error } = await supabase
    .from('site_settings')
    .upsert(
      settings.map((setting) => ({
        key: setting.key,
        value: setting.value,
        type: setting.type || 'text',
      })),
      { onConflict: 'key' }
    );

  if (error) {
    throw error;
  }
};

const uploadSettingImage = async (file: File, prefix: string) => {
  const compressedFile = await compressImage(file, {
    maxWidth: 1800,
    maxHeight: 1200,
    quality: 0.86,
  });
  const cleanFileName = compressedFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const fileName = `${prefix}-${Date.now()}-${cleanFileName}`;
  const { error } = await supabase.storage.from('hero-backgrounds').upload(fileName, compressedFile, {
    upsert: true,
  });

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage.from('hero-backgrounds').getPublicUrl(fileName);
  return publicUrl;
};

const buttonClass =
  'inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-3 text-[13px] font-medium rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('site');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    navigate('/admin');
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    alert('Saved successfully!');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-stone-900" />
            <h1 className="font-serif italic text-xl text-stone-900">CMS Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Site
            </a>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 text-[13px] font-medium rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-stone-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-stone-100 text-stone-900'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'site' && <SiteSettingsEditor />}
          {activeTab === 'hero' && <HeroEditor />}
          {activeTab === 'about' && <AboutEditor />}
          {activeTab === 'portfolio' && <PortfolioEditor />}
          {activeTab === 'projects' && <ProjectsEditor />}
          {activeTab === 'case-studies' && <CaseStudiesEditor />}
          {activeTab === 'services' && <ServicesEditor />}
          {activeTab === 'resume' && <ResumeEditor />}
          {activeTab === 'contact' && <ContactEditor />}
        </main>
      </div>
    </div>
  );
}

// ============================================
// Site Settings Editor (Navigation & Footer)
// ============================================
function SiteSettingsEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const [nav, setNav] = useState({
    work: 'Work', workZh: '作品',
    about: 'About', aboutZh: '关于',
    services: 'Services', servicesZh: '服务',
    contact: 'Contact', contactZh: '联系',
    resume: 'Resume', resumeZh: '简历',
  });
  const [footer, setFooter] = useState({
    title: 'Student Portfolio', titleZh: '学生作品集',
    copyright: '© 2024 Student Portfolio', copyrightZh: '© 2024 学生作品集',
    author: 'Alex Chen – Designer', authorZh: 'Alex Chen – 设计师',
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const settings = await loadSiteSettings([
          'nav_work',
          'nav_work_zh',
          'nav_about',
          'nav_about_zh',
          'nav_services',
          'nav_services_zh',
          'nav_contact',
          'nav_contact_zh',
          'nav_resume',
          'nav_resume_zh',
          'footer_title',
          'footer_title_zh',
          'footer_copyright',
          'footer_copyright_zh',
          'footer_author',
          'footer_author_zh',
        ]);

        setNav((current) => ({
          ...current,
          work: settings.nav_work ?? current.work,
          workZh: settings.nav_work_zh ?? current.workZh,
          about: settings.nav_about ?? current.about,
          aboutZh: settings.nav_about_zh ?? current.aboutZh,
          services: settings.nav_services ?? current.services,
          servicesZh: settings.nav_services_zh ?? current.servicesZh,
          contact: settings.nav_contact ?? current.contact,
          contactZh: settings.nav_contact_zh ?? current.contactZh,
          resume: settings.nav_resume ?? current.resume,
          resumeZh: settings.nav_resume_zh ?? current.resumeZh,
        }));

        setFooter((current) => ({
          ...current,
          title: settings.footer_title ?? current.title,
          titleZh: settings.footer_title_zh ?? current.titleZh,
          copyright: settings.footer_copyright ?? current.copyright,
          copyrightZh: settings.footer_copyright_zh ?? current.copyrightZh,
          author: settings.footer_author ?? current.author,
          authorZh: settings.footer_author_zh ?? current.authorZh,
        }));
      } catch (error) {
        console.error('Error loading site settings:', error);
        alert('Failed to load site settings: ' + (error as Error).message);
      }
    };

    loadContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSiteSettings([
        { key: 'nav_work', value: nav.work },
        { key: 'nav_work_zh', value: nav.workZh },
        { key: 'nav_about', value: nav.about },
        { key: 'nav_about_zh', value: nav.aboutZh },
        { key: 'nav_services', value: nav.services },
        { key: 'nav_services_zh', value: nav.servicesZh },
        { key: 'nav_contact', value: nav.contact },
        { key: 'nav_contact_zh', value: nav.contactZh },
        { key: 'nav_resume', value: nav.resume },
        { key: 'nav_resume_zh', value: nav.resumeZh },
        { key: 'footer_title', value: footer.title },
        { key: 'footer_title_zh', value: footer.titleZh },
        { key: 'footer_copyright', value: footer.copyright },
        { key: 'footer_copyright_zh', value: footer.copyrightZh },
        { key: 'footer_author', value: footer.author },
        { key: 'footer_author_zh', value: footer.authorZh },
      ]);
      alert('Site settings saved successfully!');
    } catch (error) {
      console.error('Site settings save error:', error);
      alert('Failed to save site settings: ' + (error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="font-serif italic text-3xl text-stone-900 mb-2">Site Settings</h2>
        <p className="text-[14px] text-stone-500">Manage navigation and footer content</p>
      </div>

      {/* Navigation */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <h3 className="text-[14px] font-medium text-stone-900 mb-4 flex items-center gap-2">
          <Menu className="w-4 h-4" />
          Navigation
        </h3>
        <div className="space-y-4">
          {Object.entries(nav).filter(([key]) => !key.endsWith('Zh')).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] text-stone-500 mb-1 capitalize">{key} (EN)</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setNav({ ...nav, [key]: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                />
              </div>
              <div>
                <label className="block text-[12px] text-stone-500 mb-1 capitalize">{key} (ZH)</label>
                <input
                  type="text"
                  value={nav[`${key}Zh` as keyof typeof nav]}
                  onChange={(e) => setNav({ ...nav, [`${key}Zh`]: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <h3 className="text-[14px] font-medium text-stone-900 mb-4 flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4" />
          Footer
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-stone-500 mb-1">Title (EN)</label>
              <input
                type="text"
                value={footer.title}
                onChange={(e) => setFooter({ ...footer, title: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block text-[12px] text-stone-500 mb-1">Title (ZH)</label>
              <input
                type="text"
                value={footer.titleZh}
                onChange={(e) => setFooter({ ...footer, titleZh: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-stone-500 mb-1">Copyright (EN)</label>
              <input
                type="text"
                value={footer.copyright}
                onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block text-[12px] text-stone-500 mb-1">Copyright (ZH)</label>
              <input
                type="text"
                value={footer.copyrightZh}
                onChange={(e) => setFooter({ ...footer, copyrightZh: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-stone-500 mb-1">Author (EN)</label>
              <input
                type="text"
                value={footer.author}
                onChange={(e) => setFooter({ ...footer, author: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block text-[12px] text-stone-500 mb-1">Author (ZH)</label>
              <input
                type="text"
                value={footer.authorZh}
                onChange={(e) => setFooter({ ...footer, authorZh: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleSave} disabled={isSaving} className={buttonClass}>
        <Save className="w-4 h-4" />
        {isSaving ? 'Saving...' : 'Save Site Settings'}
      </button>
    </div>
  );
}

// ============================================
// Hero Editor
// ============================================
function HeroEditor() {
  const [background, setBackground] = useState('');
  const [title, setTitle] = useState('');
  const [titleZh, setTitleZh] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [subtitleZh, setSubtitleZh] = useState('');
  const [isSavingText, setIsSavingText] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 加载现有数据
  useEffect(() => {
    const loadHeroSettings = async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .in('key', ['hero_background', 'hero_title', 'hero_title_zh', 'hero_subtitle', 'hero_subtitle_zh']);

      if (error) {
        console.error('Error loading hero settings:', error);
        return;
      }

      if (data) {
        data.forEach((setting) => {
          switch (setting.key) {
            case 'hero_background':
              setBackground(setting.value);
              break;
            case 'hero_title':
              setTitle(setting.value);
              break;
            case 'hero_title_zh':
              setTitleZh(setting.value);
              break;
            case 'hero_subtitle':
              setSubtitle(setting.value);
              break;
            case 'hero_subtitle_zh':
              setSubtitleZh(setting.value);
              break;
          }
        });
      }
    };

    loadHeroSettings();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 压缩图片
      const compressedFile = await compressImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.9,
      });

      // 清理文件名：只保留字母数字、连字符和下划线
      const cleanFileName = compressedFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const fileName = `hero-${Date.now()}-${cleanFileName}`;

      const { error } = await supabase.storage.from('hero-backgrounds').upload(fileName, compressedFile);

      if (error) {
        console.error('Upload error:', error);
        alert('Upload failed: ' + error.message);
        return;
      }

      const { data: { publicUrl } } = supabase.storage.from('hero-backgrounds').getPublicUrl(fileName);
      setBackground(publicUrl);

      // 立即保存到数据库
      const { error: saveError } = await supabase
        .from('site_settings')
        .upsert({ key: 'hero_background', value: publicUrl, type: 'background' }, { onConflict: 'key' });

      if (saveError) {
        console.error('Save error:', saveError);
        alert('Image uploaded but failed to save to database: ' + saveError.message);
      } else {
        console.log('Hero background saved to database');
      }
    } catch (error) {
      console.error('Image compression error:', error);
      alert('Image compression failed: ' + (error as Error).message);
    }
  };

  const handleSaveText = async () => {
    setIsSavingText(true);

    const updates = [
      { key: 'hero_title', value: title, type: 'text' },
      { key: 'hero_title_zh', value: titleZh, type: 'text' },
      { key: 'hero_subtitle', value: subtitle, type: 'text' },
      { key: 'hero_subtitle_zh', value: subtitleZh, type: 'text' },
    ];

    const { error } = await supabase
      .from('site_settings')
      .upsert(updates, { onConflict: 'key' });

    setIsSavingText(false);

    if (error) {
      console.error('Hero text save error:', error);
      alert('Failed to save hero text: ' + error.message);
      return;
    }

    alert('Hero text saved successfully!');
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif italic text-3xl text-stone-900 mb-8">Hero Section</h2>

      <div className="bg-white p-6 rounded-lg border border-stone-200 mb-6">
        <label className="block text-[13px] font-medium text-stone-700 mb-4">
          Background Image
        </label>
        <div className="relative aspect-video bg-stone-100 rounded-lg overflow-hidden mb-4">
          {background ? (
            <img src={background} alt="Hero" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-stone-400">
              <Image className="w-12 h-12" />
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 text-[13px] font-medium rounded-md flex items-center gap-2 hover:bg-white transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <p className="text-[12px] text-stone-500">
          Recommended: 1920x1080px or larger, landscape orientation
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-6">
        <div>
          <label className="block text-[13px] font-medium text-stone-700 mb-2">Title (English)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Welcome to Jy's Channel"
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-stone-700 mb-2">Title (Chinese)</label>
          <input
            type="text"
            value={titleZh}
            onChange={(e) => setTitleZh(e.target.value)}
            placeholder="欢迎来到 Jy 的频道"
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-stone-700 mb-2">Subtitle (English)</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Explore · Create · Share"
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-stone-700 mb-2">Subtitle (Chinese)</label>
          <input
            type="text"
            value={subtitleZh}
            onChange={(e) => setSubtitleZh(e.target.value)}
            placeholder="探索 · 创造 · 分享"
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
        </div>
        <button
          onClick={handleSaveText}
          disabled={isSavingText}
          className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-3 text-[13px] font-medium rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSavingText ? 'Saving...' : 'Save Hero Text'}
        </button>
      </div>
    </div>
  );
}

// ============================================
// About Editor
// ============================================
function AboutEditor() {
  const [title, setTitle] = useState('');
  const [titleZh, setTitleZh] = useState('');
  const [paragraphs, setParagraphs] = useState<string[]>(['']);
  const [paragraphsZh, setParagraphsZh] = useState<string[]>(['']);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 加载现有数据
  useEffect(() => {
    const loadAboutContent = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error loading about content:', error);
      } else if (data) {
        setTitle(data.title || '');
        setTitleZh(data.title_zh || '');
        setParagraphs(data.paragraphs?.length > 0 ? data.paragraphs : ['']);
        setParagraphsZh(data.paragraphs_zh?.length > 0 ? data.paragraphs_zh : ['']);
        setPhotos(data.photos || []);
      }
      setIsLoading(false);
    };

    loadAboutContent();
  }, []);

  const handleAddParagraph = () => {
    setParagraphs([...paragraphs, '']);
    setParagraphsZh([...paragraphsZh, '']);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files) as File[]) {
      try {
        // 压缩图片
        const compressedFile = await compressImage(file, {
          maxWidth: 1200,
          maxHeight: 1200,
          quality: 0.85,
        });

        // 清理文件名：只保留字母数字、连字符和下划线
        const cleanFileName = compressedFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const fileName = `about-${Date.now()}-${cleanFileName}`;

        const { error } = await supabase.storage.from('about-photos').upload(fileName, compressedFile);

        if (error) {
          console.error('Upload error:', error);
          alert('Upload failed: ' + error.message);
        } else {
          const { data: { publicUrl } } = supabase.storage.from('about-photos').getPublicUrl(fileName);
          uploadedUrls.push(publicUrl);
        }
      } catch (error) {
        console.error('Image compression error:', error);
        alert('Image compression failed: ' + (error as Error).message);
      }
    }

    // 更新本地状态
    const newPhotos = [...photos, ...uploadedUrls];
    setPhotos(newPhotos);

    // 立即保存到数据库 - 先尝试更新现有记录，如果没有则插入
    const { data: existing } = await supabase
      .from('about_content')
      .select('id')
      .maybeSingle();

    const saveData: any = {
      title: title || 'About Me',
      title_zh: titleZh || '关于我',
      paragraphs: paragraphs.length > 0 ? paragraphs : [''],
      paragraphs_zh: paragraphsZh.length > 0 ? paragraphsZh : [''],
      photos: newPhotos
    };

    if (existing?.id) {
      // 更新现有记录
      const { error: saveError } = await supabase
        .from('about_content')
        .update(saveData)
        .eq('id', existing.id);

      if (saveError) {
        console.error('Save error:', saveError);
        alert('Photos uploaded but failed to save to database: ' + saveError.message);
      } else {
        console.log('About photos saved to database');
      }
    } else {
      // 插入新记录
      const { error: saveError } = await supabase
        .from('about_content')
        .insert(saveData);

      if (saveError) {
        console.error('Save error:', saveError);
        alert('Photos uploaded but failed to save to database: ' + saveError.message);
      } else {
        console.log('About photos saved to database');
      }
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const saveAboutContent = async (nextPhotos = photos) => {
    setIsSaving(true);
    try {
      const { data: existing } = await supabase
        .from('about_content')
        .select('id')
        .maybeSingle();

      const saveData = {
        title,
        title_zh: titleZh,
        paragraphs,
        paragraphs_zh: paragraphsZh,
        photos: nextPhotos,
      };

      const { error } = existing?.id
        ? await supabase.from('about_content').update(saveData).eq('id', existing.id)
        : await supabase.from('about_content').insert(saveData);

      if (error) {
        throw error;
      }

      alert('About content saved successfully!');
    } catch (error) {
      console.error('About save error:', error);
      alert('Failed to save about content: ' + (error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif italic text-3xl text-stone-900 mb-8">About Me</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <label className="block text-[13px] font-medium text-stone-700 mb-4">Section Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="About Me"
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 mb-4"
          />
          <input
            type="text"
            value={titleZh}
            onChange={(e) => setTitleZh(e.target.value)}
            placeholder="关于我"
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
        </div>

        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <label className="block text-[13px] font-medium text-stone-700 mb-4">
            Photo Gallery (5 photos recommended)
          </label>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <img src={photo} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center text-stone-400 hover:border-stone-500 hover:text-stone-600 transition-colors"
            >
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-[12px]">Add Photo</span>
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <label className="block text-[13px] font-medium text-stone-700 mb-4">Paragraphs</label>
          <div className="space-y-4">
            {paragraphs.map((para, index) => (
              <div key={index} className="space-y-3">
                <textarea
                  value={para}
                  onChange={(e) => {
                    const newParas = [...paragraphs];
                    newParas[index] = e.target.value;
                    setParagraphs(newParas);
                  }}
                  placeholder={`Paragraph ${index + 1} (English)`}
                  rows={3}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                />
                <textarea
                  value={paragraphsZh[index] || ''}
                  onChange={(e) => {
                    const newParasZh = [...paragraphsZh];
                    newParasZh[index] = e.target.value;
                    setParagraphsZh(newParasZh);
                  }}
                  placeholder={`Paragraph ${index + 1} (Chinese)`}
                  rows={3}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleAddParagraph}
            className="mt-4 flex items-center gap-2 text-[13px] text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Paragraph
          </button>
        </div>

        <button onClick={() => saveAboutContent()} disabled={isSaving || isLoading} className={buttonClass}>
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save About Content'}
        </button>
      </div>
    </div>
  );
}

// ============================================
// Portfolio Editor
// ============================================
function PortfolioEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const [label, setLabel] = useState('');
  const [labelZh, setLabelZh] = useState('');
  const [title, setTitle] = useState('');
  const [titleZh, setTitleZh] = useState('');
  const [desc, setDesc] = useState('');
  const [descZh, setDescZh] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const settings = await loadSiteSettings([
          'portfolio_label',
          'portfolio_label_zh',
          'portfolio_title',
          'portfolio_title_zh',
          'portfolio_desc',
          'portfolio_desc_zh',
        ]);

        setLabel(settings.portfolio_label || '');
        setLabelZh(settings.portfolio_label_zh || '');
        setTitle(settings.portfolio_title || '');
        setTitleZh(settings.portfolio_title_zh || '');
        setDesc(settings.portfolio_desc || '');
        setDescZh(settings.portfolio_desc_zh || '');
      } catch (error) {
        console.error('Error loading portfolio settings:', error);
        alert('Failed to load portfolio settings: ' + (error as Error).message);
      }
    };

    loadContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSiteSettings([
        { key: 'portfolio_label', value: label },
        { key: 'portfolio_label_zh', value: labelZh },
        { key: 'portfolio_title', value: title },
        { key: 'portfolio_title_zh', value: titleZh },
        { key: 'portfolio_desc', value: desc },
        { key: 'portfolio_desc_zh', value: descZh },
      ]);
      alert('Portfolio settings saved successfully!');
    } catch (error) {
      console.error('Portfolio save error:', error);
      alert('Failed to save portfolio settings: ' + (error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif italic text-3xl text-stone-900 mb-8">Portfolio Section</h2>

      <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-stone-700 mb-2">Label (EN)</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Portfolio"
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-stone-700 mb-2">Label (ZH)</label>
            <input
              type="text"
              value={labelZh}
              onChange={(e) => setLabelZh(e.target.value)}
              placeholder="作品集"
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-stone-700 mb-2">Title (EN)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Selected Work"
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-stone-700 mb-2">Title (ZH)</label>
            <input
              type="text"
              value={titleZh}
              onChange={(e) => setTitleZh(e.target.value)}
              placeholder="精选作品"
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-stone-700 mb-2">Description (EN)</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="A curated collection of projects..."
              rows={3}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-stone-700 mb-2">Description (ZH)</label>
            <textarea
              value={descZh}
              onChange={(e) => setDescZh(e.target.value)}
              placeholder="精心策划的项目集..."
              rows={3}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
            />
          </div>
        </div>

        <button onClick={handleSave} disabled={isSaving} className={buttonClass}>
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Portfolio Section'}
        </button>
      </div>
    </div>
  );
}

// ============================================
// Projects Editor
// ============================================
function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [persistedIds, setPersistedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error loading projects:', error);
      alert('Failed to load projects: ' + error.message);
      return;
    }

    setProjects(data || []);
    setPersistedIds((data || []).map((project) => project.id));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = () => {
    const newProject: Project = {
      id: `temp-${Date.now()}`,
      slug: '',
      title: '',
      title_zh: '',
      category: '',
      category_zh: '',
      description: '',
      description_zh: '',
      image_url: '',
      link: '',
      order: projects.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleImageUpload = async (projectId: string, file: File) => {
    // 清理文件名：只保留字母数字、连字符和下划线
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `project-${Date.now()}-${cleanFileName}`;
    const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
      updateProject(projectId, 'image_url', publicUrl);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const currentPersistedIds = projects.filter((project) => isPersistedId(project.id)).map((project) => project.id);
      const removedIds = persistedIds.filter((id) => !currentPersistedIds.includes(id));

      if (removedIds.length > 0) {
        const { error } = await supabase.from('projects').delete().in('id', removedIds);
        if (error) throw error;
      }

      for (const [index, project] of projects.entries()) {
        const row = {
          slug: project.slug || toSlug(project.title || project.title_zh, `project-${index + 1}`),
          title: project.title,
          title_zh: project.title_zh,
          category: project.category,
          category_zh: project.category_zh,
          description: project.description,
          description_zh: project.description_zh,
          image_url: project.image_url,
          link: project.link,
          order: index + 1,
          is_active: project.is_active,
        };

        const { error } = isPersistedId(project.id)
          ? await supabase.from('projects').update(row).eq('id', project.id)
          : await supabase.from('projects').insert(row);

        if (error) throw error;
      }

      await loadProjects();
      alert('Projects saved successfully!');
    } catch (error) {
      console.error('Projects save error:', error);
      alert('Failed to save projects: ' + (error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif italic text-3xl text-stone-900">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 text-[13px] font-medium rounded-md hover:bg-stone-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="bg-white p-6 rounded-lg border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[13px] text-stone-500">
                <GripVertical className="w-4 h-4" />
                Project {index + 1}
              </div>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="aspect-video bg-stone-100 rounded-lg flex items-center justify-center overflow-hidden">
                {project.image_url ? (
                  <img src={project.image_url} alt="" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <button
                    onClick={() => fileInputRefs.current[project.id]?.click()}
                    className="flex flex-col items-center text-stone-400 hover:text-stone-600"
                  >
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-[12px]">Upload Project Image</span>
                  </button>
                )}
                <input
                  ref={(el) => { fileInputRefs.current[project.id] = el; }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(project.id, file);
                  }}
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="项目标题（英文，可选）"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                />
                <input
                  type="text"
                  placeholder="项目标题（中文）"
                  value={project.title_zh}
                  onChange={(e) => updateProject(project.id, 'title_zh', e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                />
              </div>

              <input
                type="text"
                placeholder="详情页路径 Slug，例如 reform-index"
                value={project.slug}
                onChange={(e) => updateProject(project.id, 'slug', e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="项目分类（英文，可选）"
                  value={project.category}
                  onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                />
                <input
                  type="text"
                  placeholder="项目分类（中文）"
                  value={project.category_zh}
                  onChange={(e) => updateProject(project.id, 'category_zh', e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <textarea
                  placeholder="项目描述（英文，可选）"
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                />
                <textarea
                  placeholder="项目描述（中文）"
                  value={project.description_zh}
                  onChange={(e) => updateProject(project.id, 'description_zh', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                />
              </div>

              <input
                type="text"
                placeholder="外部项目网址，例如 Streamlit / GitHub / 演示链接"
                value={project.link}
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12 bg-stone-50 rounded-lg border border-dashed border-stone-300">
            <Briefcase className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-[14px] text-stone-500">No projects yet. Click "Add Project" to create one.</p>
          </div>
        )}
      </div>

      <button onClick={handleSave} disabled={isSaving} className={`mt-6 ${buttonClass}`}>
        <Save className="w-4 h-4" />
        {isSaving ? 'Saving...' : 'Save Projects'}
      </button>
    </div>
  );
}

// ============================================
// Case Studies Editor
// ============================================
function CaseStudiesEditor() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [persistedIds, setPersistedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const loadCaseStudies = async () => {
    const [caseStudiesResult, projectsResult] = await Promise.all([
      supabase.from('case_studies').select('*').order('created_at', { ascending: false }),
      supabase.from('projects').select('*').order('order', { ascending: true }),
    ]);

    if (caseStudiesResult.error) {
      console.error('Error loading case studies:', caseStudiesResult.error);
      alert('Failed to load case studies: ' + caseStudiesResult.error.message);
      return;
    }

    if (projectsResult.error) {
      console.error('Error loading projects for case studies:', projectsResult.error);
      alert('Failed to load projects: ' + projectsResult.error.message);
      return;
    }

    setCaseStudies(caseStudiesResult.data || []);
    setPersistedIds((caseStudiesResult.data || []).map((caseStudy) => caseStudy.id));
    setProjects(projectsResult.data || []);
  };

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const addCaseStudy = () => {
    const newCaseStudy: CaseStudy = {
      id: `temp-${Date.now()}`,
      project_id: '',
      slug: '',
      hero_title: '',
      hero_title_zh: '',
      hero_image: '',
      duration: '',
      duration_zh: '',
      role: '',
      role_zh: '',
      platform: '',
      platform_zh: '',
      client: '',
      client_zh: '',
      background_title: 'Background',
      background_title_zh: '背景',
      background_content: '',
      background_content_zh: '',
      my_role_title: 'My Role',
      my_role_title_zh: '我的角色',
      my_role_content: '',
      my_role_content_zh: '',
      method_title: 'Method',
      method_title_zh: '方法',
      method_intro: '',
      method_intro_zh: '',
      method_items: [],
      method_items_zh: [],
      results_title: 'Results',
      results_title_zh: '结果',
      result_stat1_label: '',
      result_stat1_label_zh: '',
      result_stat1_value: '',
      result_stat2_label: '',
      result_stat2_label_zh: '',
      result_stat2_value: '',
      reflection_title: 'Reflection',
      reflection_title_zh: '反思',
      reflection_content: '',
      reflection_content_zh: '',
      gallery_images: [],
      gallery_captions: [],
      gallery_captions_zh: [],
      cta_title: '',
      cta_title_zh: '',
      cta_button_text: '',
      cta_button_text_zh: '',
      cta_link: '',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setCaseStudies([...caseStudies, newCaseStudy]);
    setExpandedId(newCaseStudy.id);
  };

  const removeCaseStudy = (id: string) => {
    setCaseStudies(caseStudies.filter((cs) => cs.id !== id));
  };

  const updateCaseStudy = (id: string, field: keyof CaseStudy, value: string | string[]) => {
    setCaseStudies(caseStudies.map((cs) => (cs.id === id ? { ...cs, [field]: value } : cs)));
  };

  const linkCaseStudyToProject = (caseStudyId: string, projectId: string) => {
    const project = projects.find((item) => item.id === projectId);

    setCaseStudies(caseStudies.map((cs) => {
      if (cs.id !== caseStudyId) return cs;

      return {
        ...cs,
        project_id: projectId,
        slug: project?.slug || cs.slug,
        hero_title: cs.hero_title || project?.title || '',
        hero_title_zh: cs.hero_title_zh || project?.title_zh || '',
        hero_image: cs.hero_image || project?.image_url || '',
        cta_link: cs.cta_link || project?.link || '',
      };
    }));
  };

  const addMethodItem = (id: string, lang: 'en' | 'zh') => {
    const cs = caseStudies.find((c) => c.id === id);
    if (!cs) return;

    if (lang === 'en') {
      updateCaseStudy(id, 'method_items', [...(cs.method_items || []), '']);
    } else {
      updateCaseStudy(id, 'method_items_zh', [...(cs.method_items_zh || []), '']);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const currentPersistedIds = caseStudies.filter((cs) => isPersistedId(cs.id)).map((cs) => cs.id);
      const removedIds = persistedIds.filter((id) => !currentPersistedIds.includes(id));

      if (removedIds.length > 0) {
        const { error } = await supabase.from('case_studies').delete().in('id', removedIds);
        if (error) throw error;
      }

      for (const [index, cs] of caseStudies.entries()) {
        const row = {
          project_id: cs.project_id || null,
          slug: cs.slug || toSlug(cs.hero_title || cs.hero_title_zh, `case-study-${index + 1}`),
          hero_title: cs.hero_title,
          hero_title_zh: cs.hero_title_zh,
          hero_image: cs.hero_image,
          duration: cs.duration,
          duration_zh: cs.duration_zh,
          role: cs.role,
          role_zh: cs.role_zh,
          platform: cs.platform,
          platform_zh: cs.platform_zh,
          client: cs.client,
          client_zh: cs.client_zh,
          background_title: cs.background_title,
          background_title_zh: cs.background_title_zh,
          background_content: cs.background_content,
          background_content_zh: cs.background_content_zh,
          my_role_title: cs.my_role_title,
          my_role_title_zh: cs.my_role_title_zh,
          my_role_content: cs.my_role_content,
          my_role_content_zh: cs.my_role_content_zh,
          method_title: cs.method_title,
          method_title_zh: cs.method_title_zh,
          method_intro: cs.method_intro,
          method_intro_zh: cs.method_intro_zh,
          method_items: cs.method_items || [],
          method_items_zh: cs.method_items_zh || [],
          results_title: cs.results_title,
          results_title_zh: cs.results_title_zh,
          result_stat1_label: cs.result_stat1_label,
          result_stat1_label_zh: cs.result_stat1_label_zh,
          result_stat1_value: cs.result_stat1_value,
          result_stat2_label: cs.result_stat2_label,
          result_stat2_label_zh: cs.result_stat2_label_zh,
          result_stat2_value: cs.result_stat2_value,
          reflection_title: cs.reflection_title,
          reflection_title_zh: cs.reflection_title_zh,
          reflection_content: cs.reflection_content,
          reflection_content_zh: cs.reflection_content_zh,
          gallery_images: cs.gallery_images || [],
          gallery_captions: cs.gallery_captions || [],
          gallery_captions_zh: cs.gallery_captions_zh || [],
          cta_title: cs.cta_title,
          cta_title_zh: cs.cta_title_zh,
          cta_button_text: cs.cta_button_text,
          cta_button_text_zh: cs.cta_button_text_zh,
          cta_link: cs.cta_link,
          is_active: cs.is_active,
        };

        const { error } = isPersistedId(cs.id)
          ? await supabase.from('case_studies').update(row).eq('id', cs.id)
          : await supabase.from('case_studies').insert(row);

        if (error) throw error;
      }

      await loadCaseStudies();
      alert('Case studies saved successfully!');
    } catch (error) {
      console.error('Case studies save error:', error);
      alert('Failed to save case studies: ' + (error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif italic text-3xl text-stone-900">案例详情</h2>
          <p className="text-[14px] text-stone-500 mt-1">给作品补充深度内容。普通作品只填 Projects 即可；这里用于补充背景、方法、结果、复盘和图集。</p>
        </div>
        <button
          onClick={addCaseStudy}
          className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 text-[13px] font-medium rounded-md hover:bg-stone-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加案例详情
        </button>
      </div>

      <div className="space-y-4">
        {caseStudies.map((cs, index) => (
          <div key={cs.id} className="bg-white rounded-lg border border-stone-200 overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === cs.id ? null : cs.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-stone-400" />
                <span className="text-[14px] font-medium text-stone-900">
                  {cs.hero_title || `Case Study ${index + 1}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCaseStudy(cs.id);
                  }}
                  className="text-red-500 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === cs.id ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </div>
            </button>

            {expandedId === cs.id && (
              <div className="p-4 border-t border-stone-200 space-y-6">
                {/* Project Link */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">关联作品</h4>
                  <select
                    value={cs.project_id || ''}
                    onChange={(e) => linkCaseStudyToProject(cs.id, e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 bg-white"
                  >
                    <option value="">请选择一个 Projects 里的作品</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title_zh || project.title || project.slug || '未命名作品'}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="详情页路径 Slug，例如 reform-index"
                    value={cs.slug}
                    onChange={(e) => updateCaseStudy(cs.id, 'slug', e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                  />
                  <p className="text-[12px] text-stone-500">
                    这个 slug 要和对应作品的详情页路径一致。选择作品后会自动带入，也可以手动微调。
                  </p>
                </div>

                {/* Hero Section */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">详情页头图</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="详情页标题（英文，可选）"
                      value={cs.hero_title}
                      onChange={(e) => updateCaseStudy(cs.id, 'hero_title', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="详情页标题（中文）"
                      value={cs.hero_title_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'hero_title_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div className="aspect-video bg-stone-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {cs.hero_image ? (
                      <img src={cs.hero_image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <button
                        onClick={() => fileInputRefs.current[`hero-${cs.id}`]?.click()}
                        className="flex flex-col items-center text-stone-400 hover:text-stone-600"
                      >
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-[12px]">Upload Hero Image</span>
                      </button>
                    )}
                    <input
                      ref={(el) => { fileInputRefs.current[`hero-${cs.id}`] = el; }}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // 清理文件名：只保留字母数字、连字符和下划线
                          const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
                          const fileName = `case-hero-${Date.now()}-${cleanFileName}`;
                          supabase.storage.from('case-study-images').upload(fileName, file).then(({ error }) => {
                            if (error) {
                              console.error('Upload error:', error);
                              alert('Upload failed: ' + error.message);
                            } else {
                              const { data: { publicUrl } } = supabase.storage.from('case-study-images').getPublicUrl(fileName);
                              updateCaseStudy(cs.id, 'hero_image', publicUrl);
                            }
                          });
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">项目信息</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="周期（英文，可选）"
                      value={cs.duration}
                      onChange={(e) => updateCaseStudy(cs.id, 'duration', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="周期（中文）"
                      value={cs.duration_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'duration_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="角色（英文，可选）"
                      value={cs.role}
                      onChange={(e) => updateCaseStudy(cs.id, 'role', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="角色（中文）"
                      value={cs.role_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'role_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="平台 / 技术（英文，可选）"
                      value={cs.platform}
                      onChange={(e) => updateCaseStudy(cs.id, 'platform', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="平台 / 技术（中文）"
                      value={cs.platform_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'platform_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="客户 / 类型（英文，可选）"
                      value={cs.client}
                      onChange={(e) => updateCaseStudy(cs.id, 'client', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="客户 / 类型（中文）"
                      value={cs.client_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'client_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                {/* Background */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">项目背景</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea
                      placeholder="项目背景（英文，可选）"
                      value={cs.background_content}
                      onChange={(e) => updateCaseStudy(cs.id, 'background_content', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                    <textarea
                      placeholder="项目背景（中文）"
                      value={cs.background_content_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'background_content_zh', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                  </div>
                </div>

                {/* My Role */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">我的角色</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea
                      placeholder="我的角色（英文，可选）"
                      value={cs.my_role_content}
                      onChange={(e) => updateCaseStudy(cs.id, 'my_role_content', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                    <textarea
                      placeholder="我的角色（中文）"
                      value={cs.my_role_content_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'my_role_content_zh', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                  </div>
                </div>

                {/* Method */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">方法过程</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea
                      placeholder="方法介绍（英文，可选）"
                      value={cs.method_intro}
                      onChange={(e) => updateCaseStudy(cs.id, 'method_intro', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                    <textarea
                      placeholder="方法介绍（中文）"
                      value={cs.method_intro_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'method_intro_zh', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                  </div>
                  {/* Method Items */}
                  <div className="space-y-2">
                    <label className="text-[12px] text-stone-500">方法步骤（英文，可选）</label>
                    {(cs.method_items || []).map((item, i) => (
                      <input
                        key={i}
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...(cs.method_items || [])];
                          newItems[i] = e.target.value;
                          updateCaseStudy(cs.id, 'method_items', newItems);
                        }}
                        placeholder={`Step ${i + 1}`}
                        className="w-full px-4 py-2 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                      />
                    ))}
                    <button
                      onClick={() => addMethodItem(cs.id, 'en')}
                      className="flex items-center gap-2 text-[13px] text-stone-600 hover:text-stone-900"
                    >
                      <Plus className="w-4 h-4" />
                      添加英文步骤
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] text-stone-500">方法步骤（中文）</label>
                    {(cs.method_items_zh || []).map((item, i) => (
                      <input
                        key={i}
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...(cs.method_items_zh || [])];
                          newItems[i] = e.target.value;
                          updateCaseStudy(cs.id, 'method_items_zh', newItems);
                        }}
                        placeholder={`步骤 ${i + 1}`}
                        className="w-full px-4 py-2 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                      />
                    ))}
                    <button
                      onClick={() => addMethodItem(cs.id, 'zh')}
                      className="flex items-center gap-2 text-[13px] text-stone-600 hover:text-stone-900"
                    >
                      <Plus className="w-4 h-4" />
                      添加中文步骤
                    </button>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">结果数据</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="数据 1 说明（英文，可选）"
                      value={cs.result_stat1_label}
                      onChange={(e) => updateCaseStudy(cs.id, 'result_stat1_label', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="数据 1 说明（中文）"
                      value={cs.result_stat1_label_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'result_stat1_label_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="数据 1 数值，例如 45%"
                      value={cs.result_stat1_value}
                      onChange={(e) => updateCaseStudy(cs.id, 'result_stat1_value', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="数据 2 说明（英文，可选）"
                      value={cs.result_stat2_label}
                      onChange={(e) => updateCaseStudy(cs.id, 'result_stat2_label', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="数据 2 说明（中文）"
                      value={cs.result_stat2_label_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'result_stat2_label_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />

                    <input
                      type="text"
                      placeholder="数据 2 数值，例如 4.8/5"
                      value={cs.result_stat2_value}
                      onChange={(e) => updateCaseStudy(cs.id, 'result_stat2_value', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                {/* Reflection */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">复盘</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea
                      placeholder="复盘内容（英文，可选）"
                      value={cs.reflection_content}
                      onChange={(e) => updateCaseStudy(cs.id, 'reflection_content', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                    <textarea
                      placeholder="复盘内容（中文）"
                      value={cs.reflection_content_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'reflection_content_zh', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">跳转按钮</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="按钮区标题（英文，可选）"
                      value={cs.cta_title}
                      onChange={(e) => updateCaseStudy(cs.id, 'cta_title', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="按钮区标题（中文）"
                      value={cs.cta_title_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'cta_title_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="按钮文字（英文，可选）"
                      value={cs.cta_button_text}
                      onChange={(e) => updateCaseStudy(cs.id, 'cta_button_text', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="按钮文字（中文）"
                      value={cs.cta_button_text_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'cta_button_text_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="跳转网址，例如 Streamlit / GitHub / 在线演示"
                    value={cs.cta_link}
                    onChange={(e) => updateCaseStudy(cs.id, 'cta_link', e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {caseStudies.length === 0 && (
          <div className="text-center py-12 bg-stone-50 rounded-lg border border-dashed border-stone-300">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-[14px] text-stone-500">还没有案例详情。点击“添加案例详情”创建一个。</p>
          </div>
        )}
      </div>

      <button onClick={handleSave} disabled={isSaving} className={`mt-6 ${buttonClass}`}>
        <Save className="w-4 h-4" />
        {isSaving ? 'Saving...' : '保存案例详情'}
      </button>
    </div>
  );
}

// ============================================
// Services Editor
// ============================================
function ServicesEditor() {
  const [services, setServices] = useState<Service[]>([]);
  const [persistedIds, setPersistedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [featureImage, setFeatureImage] = useState('');
  const serviceImageInputRef = useRef<HTMLInputElement>(null);
  const [cta, setCta] = useState({
    title: '',
    titleZh: '',
    desc: '',
    descZh: '',
    button: '',
    buttonZh: ''
  });

  const icons = ['Palette', 'Layers', 'Search', 'Globe', 'Sparkles', 'Zap'];

  const loadServices = async () => {
    const [{ data, error }, settings] = await Promise.all([
      supabase.from('services').select('*').order('order', { ascending: true }),
      loadSiteSettings([
        'services_cta_title',
        'services_cta_title_zh',
        'services_cta_desc',
        'services_cta_desc_zh',
        'services_cta_button',
        'services_cta_button_zh',
        'services_feature_image',
      ]),
    ]);

    if (error) {
      console.error('Error loading services:', error);
      alert('Failed to load services: ' + error.message);
      return;
    }

    setServices(data || []);
    setPersistedIds((data || []).map((service) => service.id));
    setCta({
      title: settings.services_cta_title || '',
      titleZh: settings.services_cta_title_zh || '',
      desc: settings.services_cta_desc || '',
      descZh: settings.services_cta_desc_zh || '',
      button: settings.services_cta_button || '',
      buttonZh: settings.services_cta_button_zh || '',
    });
    setFeatureImage(settings.services_feature_image || '');
  };

  useEffect(() => {
    loadServices().catch((error) => {
      console.error('Error loading services editor:', error);
      alert('Failed to load services editor: ' + (error as Error).message);
    });
  }, []);

  const addService = () => {
    const newService: Service = {
      id: `temp-${Date.now()}`,
      title: '',
      title_zh: '',
      description: '',
      description_zh: '',
      icon: 'Palette',
      order: services.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setServices([...services, newService]);
  };

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleFeatureImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const publicUrl = await uploadSettingImage(file, 'services-feature');
      setFeatureImage(publicUrl);
      await saveSiteSettings([{ key: 'services_feature_image', value: publicUrl, type: 'image' }]);
      alert('服务页图片已上传');
    } catch (error) {
      console.error('Services image upload error:', error);
      alert('服务页图片上传失败：' + (error as Error).message);
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSiteSettings([
        { key: 'services_cta_title', value: cta.title },
        { key: 'services_cta_title_zh', value: cta.titleZh },
        { key: 'services_cta_desc', value: cta.desc },
        { key: 'services_cta_desc_zh', value: cta.descZh },
        { key: 'services_cta_button', value: cta.button },
        { key: 'services_cta_button_zh', value: cta.buttonZh },
        { key: 'services_feature_image', value: featureImage, type: 'image' },
      ]);

      const currentPersistedIds = services.filter((service) => isPersistedId(service.id)).map((service) => service.id);
      const removedIds = persistedIds.filter((id) => !currentPersistedIds.includes(id));

      if (removedIds.length > 0) {
        const { error } = await supabase.from('services').delete().in('id', removedIds);
        if (error) throw error;
      }

      for (const [index, service] of services.entries()) {
        const row = {
          title: service.title,
          title_zh: service.title_zh,
          description: service.description,
          description_zh: service.description_zh,
          icon: service.icon,
          order: index + 1,
          is_active: service.is_active,
        };

        const { error } = isPersistedId(service.id)
          ? await supabase.from('services').update(row).eq('id', service.id)
          : await supabase.from('services').insert(row);

        if (error) throw error;
      }

      await loadServices();
      alert('Services saved successfully!');
    } catch (error) {
      console.error('Services save error:', error);
      alert('Failed to save services: ' + (error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="font-serif italic text-3xl text-stone-900 mb-2">Services</h2>
        <p className="text-[14px] text-stone-500">Manage your services and CTA section</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[14px] font-medium text-stone-900">服务页图片</h3>
            <p className="mt-1 text-[12px] text-stone-500">用于服务页首屏和服务模块的视觉区域。</p>
          </div>
          <button
            type="button"
            onClick={() => serviceImageInputRef.current?.click()}
            disabled={isUploadingImage}
            className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 text-[12px] font-medium rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            <Upload className="w-3 h-3" />
            {isUploadingImage ? '上传中...' : '上传图片'}
          </button>
        </div>
        <input
          ref={serviceImageInputRef}
          type="file"
          accept="image/*"
          onChange={handleFeatureImageUpload}
          className="hidden"
        />
        <div className="aspect-[16/9] overflow-hidden rounded-lg bg-stone-100 border border-stone-200">
          {featureImage ? (
            <img src={featureImage} alt="Services visual" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-stone-300">
              <Image className="h-10 w-10" />
            </div>
          )}
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[14px] font-medium text-stone-900">Services List</h3>
          <button
            onClick={addService}
            className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 text-[12px] font-medium rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Service
          </button>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={service.id} className="p-4 border border-stone-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] text-stone-500">Service {index + 1}</span>
                <button
                  onClick={() => removeService(service.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="服务标题（英文，可选）"
                    value={service.title}
                    onChange={(e) => updateService(service.id, 'title', e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                  />
                  <input
                    type="text"
                    placeholder="服务标题（中文）"
                    value={service.title_zh}
                    onChange={(e) => updateService(service.id, 'title_zh', e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <textarea
                    placeholder="服务描述（英文，可选）"
                    value={service.description}
                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                  />
                  <textarea
                    placeholder="服务描述（中文）"
                    value={service.description_zh}
                    onChange={(e) => updateService(service.id, 'description_zh', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-stone-500 mb-2">Icon</label>
                  <select
                    value={service.icon}
                    onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                  >
                    {icons.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="text-center py-8 bg-stone-50 rounded-lg border border-dashed border-stone-300">
              <Palette className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="text-[13px] text-stone-500">No services yet</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <h3 className="text-[14px] font-medium text-stone-900 mb-4">CTA Section</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="按钮区标题（英文，可选）"
              value={cta.title}
              onChange={(e) => setCta({ ...cta, title: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
            <input
              type="text"
              placeholder="按钮区标题（中文）"
              value={cta.titleZh}
              onChange={(e) => setCta({ ...cta, titleZh: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <textarea
              placeholder="CTA Description (EN)"
              value={cta.desc}
              onChange={(e) => setCta({ ...cta, desc: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
            />
            <textarea
              placeholder="CTA Description (ZH)"
              value={cta.descZh}
              onChange={(e) => setCta({ ...cta, descZh: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="按钮文字（英文，可选）"
              value={cta.button}
              onChange={(e) => setCta({ ...cta, button: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
            <input
              type="text"
              placeholder="按钮文字（中文）"
              value={cta.buttonZh}
              onChange={(e) => setCta({ ...cta, buttonZh: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>
      </div>

      <button onClick={handleSave} disabled={isSaving} className={buttonClass}>
        <Save className="w-4 h-4" />
        {isSaving ? 'Saving...' : 'Save Services'}
      </button>
    </div>
  );
}

// ============================================
// Resume Editor
// ============================================
function ResumeEditor() {
  const [resumeFileId, setResumeFileId] = useState<string>('');
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<string>('');
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadResume = async () => {
    const { data, error } = await supabase
      .from('resume_files')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    setResumeFileId(data?.id || '');
    setResumeFile(data?.file_url || '');
    setResumeFileName(data?.file_name || '');
  };

  useEffect(() => {
    loadResume().catch((error) => {
      console.error('Error loading resume file:', error);
      alert('加载简历文件失败：' + (error as Error).message);
    });
  }, []);

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      alert('请上传 PDF 格式的简历文件');
      e.target.value = '';
      return;
    }

    setIsUploadingResume(true);
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const fileName = `resume-${Date.now()}-${cleanFileName}`;
      const { error } = await supabase.storage
        .from('resume-files')
        .upload(fileName, file, {
          contentType: 'application/pdf',
          upsert: true,
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from('resume-files').getPublicUrl(fileName);
      const row = {
        file_url: publicUrl,
        file_name: file.name,
        updated_at: new Date().toISOString(),
      };

      const saveResult = resumeFileId
        ? await supabase.from('resume_files').update(row).eq('id', resumeFileId).select().maybeSingle()
        : await supabase.from('resume_files').insert(row).select().single();

      if (saveResult.error) throw saveResult.error;

      setResumeFile(publicUrl);
      setResumeFileName(file.name);
      setResumeFileId(saveResult.data?.id || resumeFileId);
      alert('简历 PDF 已上传并保存');
    } catch (error) {
      console.error('Resume PDF upload error:', error);
      alert('简历上传失败：' + (error as Error).message);
    } finally {
      setIsUploadingResume(false);
      e.target.value = '';
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="font-serif italic text-3xl text-stone-900 mb-2">简历 PDF</h2>
        <p className="text-[14px] text-stone-500">这里只需要上传或替换最终版简历 PDF。前台简历页会直接展示这个文件。</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <h3 className="text-[14px] font-medium text-stone-900 mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          当前简历文件
        </h3>
        <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handlePDFUpload}
            className="hidden"
          />

          {resumeFile ? (
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-[14px] text-stone-600 mb-1">当前简历已上传</p>
              {resumeFileName && (
                <p className="text-[12px] text-stone-400 mb-3">{resumeFileName}</p>
              )}
              <div className="flex gap-3 justify-center">
                <a
                  href={resumeFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-blue-600 hover:underline"
                >
                  查看 PDF
                </a>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingResume}
                  className="text-[13px] text-stone-600 hover:text-stone-900 disabled:opacity-50"
                >
                  {isUploadingResume ? '上传中...' : '替换文件'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-stone-400" />
              </div>
              <p className="text-[14px] text-stone-600 mb-4">上传你的简历 PDF</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingResume}
                className="bg-stone-900 text-white px-4 py-2 text-[13px] font-medium rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50"
              >
                {isUploadingResume ? '上传中...' : '选择 PDF 文件'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
function ContactEditor() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [persistedIds, setPersistedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [featureImage, setFeatureImage] = useState('');
  const contactImageInputRef = useRef<HTMLInputElement>(null);
  const [contact, setContact] = useState({
    letsConnect: '',
    letsConnectZh: '',
    title: '',
    titleZh: '',
    desc: '',
    descZh: '',
    email: '',
    emailLabel: '',
    emailLabelZh: '',
    emailDesc: '',
    emailDescZh: '',
    socialLabel: '',
    socialLabelZh: '',
    socialDesc: '',
    socialDescZh: ''
  });

  const loadContact = async () => {
    const [{ data, error }, settings] = await Promise.all([
      supabase.from('social_links').select('*').order('order', { ascending: true }),
      loadSiteSettings([
        'contact_lets_connect',
        'contact_lets_connect_zh',
        'contact_title',
        'contact_title_zh',
        'contact_desc',
        'contact_desc_zh',
        'contact_email',
        'contact_email_label',
        'contact_email_label_zh',
        'contact_email_desc',
        'contact_email_desc_zh',
        'contact_social_label',
        'contact_social_label_zh',
        'contact_social_desc',
        'contact_social_desc_zh',
        'contact_feature_image',
      ]),
    ]);

    if (error) {
      console.error('Error loading social links:', error);
      alert('Failed to load social links: ' + error.message);
      return;
    }

    setSocialLinks(data || []);
    setPersistedIds((data || []).map((link) => link.id));
    setContact({
      letsConnect: settings.contact_lets_connect || '',
      letsConnectZh: settings.contact_lets_connect_zh || '',
      title: settings.contact_title || '',
      titleZh: settings.contact_title_zh || '',
      desc: settings.contact_desc || '',
      descZh: settings.contact_desc_zh || '',
      email: settings.contact_email || '',
      emailLabel: settings.contact_email_label || '',
      emailLabelZh: settings.contact_email_label_zh || '',
      emailDesc: settings.contact_email_desc || '',
      emailDescZh: settings.contact_email_desc_zh || '',
      socialLabel: settings.contact_social_label || '',
      socialLabelZh: settings.contact_social_label_zh || '',
      socialDesc: settings.contact_social_desc || '',
      socialDescZh: settings.contact_social_desc_zh || '',
    });
    setFeatureImage(settings.contact_feature_image || '');
  };

  useEffect(() => {
    loadContact().catch((error) => {
      console.error('Error loading contact editor:', error);
      alert('Failed to load contact editor: ' + (error as Error).message);
    });
  }, []);

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: `temp-${Date.now()}`,
      name: '',
      icon: 'Contact',
      url: '',
      order: socialLinks.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setSocialLinks([...socialLinks, newLink]);
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter((l) => l.id !== id));
  };

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
    setSocialLinks(socialLinks.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const handleFeatureImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const publicUrl = await uploadSettingImage(file, 'contact-feature');
      setFeatureImage(publicUrl);
      await saveSiteSettings([{ key: 'contact_feature_image', value: publicUrl, type: 'image' }]);
      alert('联系页图片已上传');
    } catch (error) {
      console.error('Contact image upload error:', error);
      alert('联系页图片上传失败：' + (error as Error).message);
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSiteSettings([
        { key: 'contact_lets_connect', value: contact.letsConnect },
        { key: 'contact_lets_connect_zh', value: contact.letsConnectZh },
        { key: 'contact_title', value: contact.title },
        { key: 'contact_title_zh', value: contact.titleZh },
        { key: 'contact_desc', value: contact.desc },
        { key: 'contact_desc_zh', value: contact.descZh },
        { key: 'contact_email', value: contact.email },
        { key: 'contact_email_label', value: contact.emailLabel },
        { key: 'contact_email_label_zh', value: contact.emailLabelZh },
        { key: 'contact_email_desc', value: contact.emailDesc },
        { key: 'contact_email_desc_zh', value: contact.emailDescZh },
        { key: 'contact_social_label', value: contact.socialLabel },
        { key: 'contact_social_label_zh', value: contact.socialLabelZh },
        { key: 'contact_social_desc', value: contact.socialDesc },
        { key: 'contact_social_desc_zh', value: contact.socialDescZh },
        { key: 'contact_feature_image', value: featureImage, type: 'image' },
      ]);

      const currentPersistedIds = socialLinks.filter((link) => isPersistedId(link.id)).map((link) => link.id);
      const removedIds = persistedIds.filter((id) => !currentPersistedIds.includes(id));

      if (removedIds.length > 0) {
        const { error } = await supabase.from('social_links').delete().in('id', removedIds);
        if (error) throw error;
      }

      for (const [index, link] of socialLinks.entries()) {
        const row = {
          name: link.name,
          icon: link.icon,
          url: link.url,
          order: index + 1,
          is_active: link.is_active,
        };

        const { error } = isPersistedId(link.id)
          ? await supabase.from('social_links').update(row).eq('id', link.id)
          : await supabase.from('social_links').insert(row);

        if (error) throw error;
      }

      await loadContact();
      alert('联系页面已保存');
    } catch (error) {
      console.error('Contact save error:', error);
      alert('保存联系页面失败：' + (error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="font-serif italic text-3xl text-stone-900 mb-2">Contact</h2>
        <p className="text-[14px] text-stone-500">Manage contact page content and social links</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[14px] font-medium text-stone-900">联系页图片</h3>
            <p className="mt-1 text-[12px] text-stone-500">可以上传头像、工作照、生活照或适合联系页的视觉图。</p>
          </div>
          <button
            type="button"
            onClick={() => contactImageInputRef.current?.click()}
            disabled={isUploadingImage}
            className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 text-[12px] font-medium rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            <Upload className="w-3 h-3" />
            {isUploadingImage ? '上传中...' : '上传图片'}
          </button>
        </div>
        <input
          ref={contactImageInputRef}
          type="file"
          accept="image/*"
          onChange={handleFeatureImageUpload}
          className="hidden"
        />
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-stone-100 border border-stone-200">
          {featureImage ? (
            <img src={featureImage} alt="Contact visual" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-stone-300">
              <Image className="h-10 w-10" />
            </div>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-6">
        <h3 className="text-[14px] font-medium text-stone-900">页面文案</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="顶部小标题（英文，可选）"
            value={contact.letsConnect}
            onChange={(e) => setContact({ ...contact, letsConnect: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="顶部小标题（中文）"
            value={contact.letsConnectZh}
            onChange={(e) => setContact({ ...contact, letsConnectZh: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="页面标题（英文，可选）"
            value={contact.title}
            onChange={(e) => setContact({ ...contact, title: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="页面标题（中文）"
            value={contact.titleZh}
            onChange={(e) => setContact({ ...contact, titleZh: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <textarea
            placeholder="Description (EN)"
            value={contact.desc}
            onChange={(e) => setContact({ ...contact, desc: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
          />
          <textarea
            placeholder="Description (ZH)"
            value={contact.descZh}
            onChange={(e) => setContact({ ...contact, descZh: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
          />
        </div>

      </div>

      {/* Contact Methods */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[14px] font-medium text-stone-900 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              联系方式
            </h3>
            <p className="mt-1 text-[12px] text-stone-500">内容会显示在联系页，并提供复制按钮。只有以 https://、mailto:、tel: 开头的内容会显示打开按钮。</p>
          </div>
          <button
            onClick={addSocialLink}
            className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 text-[12px] font-medium rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-3 h-3" />
            添加联系方式
          </button>
        </div>

        <div className="space-y-3">
          {socialLinks.map((link, index) => (
            <div key={link.id} className="grid grid-cols-[32px_1fr_1.6fr_auto] items-center gap-3 p-3 border border-stone-200 rounded-lg">
              <span className="text-[12px] text-stone-400">{index + 1}</span>
              <input
                type="text"
                placeholder="名称，例如 微信 / 邮箱 / 电话 / 小红书"
                value={link.name}
                onChange={(e) => updateSocialLink(link.id, 'name', e.target.value)}
                className="px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
              />
              <input
                type="text"
                placeholder="内容，例如 wxid_123 / hello@example.com / https://..."
                value={link.url}
                onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                className="px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
              />
              <button
                onClick={() => removeSocialLink(link.id)}
                className="text-red-500 hover:text-red-600 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {socialLinks.length === 0 && (
            <div className="text-center py-6 bg-stone-50 rounded-lg border border-dashed border-stone-300">
              <Globe className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="text-[13px] text-stone-500">还没有添加联系方式</p>
            </div>
          )}
        </div>
      </div>

      <button onClick={handleSave} disabled={isSaving} className={buttonClass}>
        <Save className="w-4 h-4" />
        {isSaving ? '保存中...' : '保存联系页面'}
      </button>
    </div>
  );
}
