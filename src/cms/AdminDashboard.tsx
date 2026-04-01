import { useState, useRef, useEffect } from 'react';
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
import { supabase } from '../lib/supabase';
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

    for (const file of Array.from(files)) {
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
      </div>
    </div>
  );
}

// ============================================
// Portfolio Editor
// ============================================
function PortfolioEditor() {
  const [label, setLabel] = useState('');
  const [labelZh, setLabelZh] = useState('');
  const [title, setTitle] = useState('');
  const [titleZh, setTitleZh] = useState('');
  const [desc, setDesc] = useState('');
  const [descZh, setDescZh] = useState('');

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
      </div>
    </div>
  );
}

// ============================================
// Projects Editor
// ============================================
function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

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
                  placeholder="Title (English)"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                />
                <input
                  type="text"
                  placeholder="Title (Chinese)"
                  value={project.title_zh}
                  onChange={(e) => updateProject(project.id, 'title_zh', e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Category (English)"
                  value={project.category}
                  onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                />
                <input
                  type="text"
                  placeholder="Category (Chinese)"
                  value={project.category_zh}
                  onChange={(e) => updateProject(project.id, 'category_zh', e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <textarea
                  placeholder="Description (English)"
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                />
                <textarea
                  placeholder="Description (Chinese)"
                  value={project.description_zh}
                  onChange={(e) => updateProject(project.id, 'description_zh', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                />
              </div>

              <input
                type="text"
                placeholder="Link URL"
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
    </div>
  );
}

// ============================================
// Case Studies Editor
// ============================================
function CaseStudiesEditor() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

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

  const addMethodItem = (id: string, lang: 'en' | 'zh') => {
    const cs = caseStudies.find((c) => c.id === id);
    if (!cs) return;

    if (lang === 'en') {
      updateCaseStudy(id, 'method_items', [...(cs.method_items || []), '']);
    } else {
      updateCaseStudy(id, 'method_items_zh', [...(cs.method_items_zh || []), '']);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif italic text-3xl text-stone-900">Case Studies</h2>
          <p className="text-[14px] text-stone-500 mt-1">Detailed project case studies for the portfolio detail page</p>
        </div>
        <button
          onClick={addCaseStudy}
          className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 text-[13px] font-medium rounded-md hover:bg-stone-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Case Study
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
                {/* Hero Section */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">Hero Section</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Hero Title (EN)"
                      value={cs.hero_title}
                      onChange={(e) => updateCaseStudy(cs.id, 'hero_title', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Hero Title (ZH)"
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
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">Project Info</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Duration (EN)"
                      value={cs.duration}
                      onChange={(e) => updateCaseStudy(cs.id, 'duration', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Duration (ZH)"
                      value={cs.duration_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'duration_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Role (EN)"
                      value={cs.role}
                      onChange={(e) => updateCaseStudy(cs.id, 'role', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Role (ZH)"
                      value={cs.role_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'role_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Platform (EN)"
                      value={cs.platform}
                      onChange={(e) => updateCaseStudy(cs.id, 'platform', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Platform (ZH)"
                      value={cs.platform_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'platform_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Client (EN)"
                      value={cs.client}
                      onChange={(e) => updateCaseStudy(cs.id, 'client', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Client (ZH)"
                      value={cs.client_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'client_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                {/* Background */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">Background</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea
                      placeholder="Background Content (EN)"
                      value={cs.background_content}
                      onChange={(e) => updateCaseStudy(cs.id, 'background_content', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                    <textarea
                      placeholder="Background Content (ZH)"
                      value={cs.background_content_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'background_content_zh', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                  </div>
                </div>

                {/* My Role */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">My Role</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea
                      placeholder="My Role Content (EN)"
                      value={cs.my_role_content}
                      onChange={(e) => updateCaseStudy(cs.id, 'my_role_content', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                    <textarea
                      placeholder="My Role Content (ZH)"
                      value={cs.my_role_content_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'my_role_content_zh', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                  </div>
                </div>

                {/* Method */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">Method</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea
                      placeholder="Method Intro (EN)"
                      value={cs.method_intro}
                      onChange={(e) => updateCaseStudy(cs.id, 'method_intro', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                    <textarea
                      placeholder="Method Intro (ZH)"
                      value={cs.method_intro_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'method_intro_zh', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                  </div>
                  {/* Method Items */}
                  <div className="space-y-2">
                    <label className="text-[12px] text-stone-500">Method Items (EN)</label>
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
                        placeholder={`Item ${i + 1}`}
                        className="w-full px-4 py-2 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                      />
                    ))}
                    <button
                      onClick={() => addMethodItem(cs.id, 'en')}
                      className="flex items-center gap-2 text-[13px] text-stone-600 hover:text-stone-900"
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">Results</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Stat 1 Label (EN)"
                      value={cs.result_stat1_label}
                      onChange={(e) => updateCaseStudy(cs.id, 'result_stat1_label', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Stat 1 Label (ZH)"
                      value={cs.result_stat1_label_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'result_stat1_label_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Stat 1 Value (e.g., 45%)"
                      value={cs.result_stat1_value}
                      onChange={(e) => updateCaseStudy(cs.id, 'result_stat1_value', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Stat 2 Value"
                      value={cs.result_stat2_value}
                      onChange={(e) => updateCaseStudy(cs.id, 'result_stat2_value', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                {/* Reflection */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">Reflection</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea
                      placeholder="Reflection Content (EN)"
                      value={cs.reflection_content}
                      onChange={(e) => updateCaseStudy(cs.id, 'reflection_content', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                    <textarea
                      placeholder="Reflection Content (ZH)"
                      value={cs.reflection_content_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'reflection_content_zh', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-4">
                  <h4 className="text-[13px] font-medium text-stone-900 uppercase tracking-wider">CTA Section</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="CTA Title (EN)"
                      value={cs.cta_title}
                      onChange={(e) => updateCaseStudy(cs.id, 'cta_title', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="CTA Title (ZH)"
                      value={cs.cta_title_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'cta_title_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Button Text (EN)"
                      value={cs.cta_button_text}
                      onChange={(e) => updateCaseStudy(cs.id, 'cta_button_text', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Button Text (ZH)"
                      value={cs.cta_button_text_zh}
                      onChange={(e) => updateCaseStudy(cs.id, 'cta_button_text_zh', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="CTA Link URL"
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
            <p className="text-[14px] text-stone-500">No case studies yet. Click "Add Case Study" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Services Editor
// ============================================
function ServicesEditor() {
  const [services, setServices] = useState<Service[]>([]);
  const [cta, setCta] = useState({
    title: '',
    titleZh: '',
    desc: '',
    descZh: '',
    button: '',
    buttonZh: ''
  });

  const icons = ['Palette', 'Layers', 'Search', 'Globe', 'Sparkles', 'Zap'];

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

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="font-serif italic text-3xl text-stone-900 mb-2">Services</h2>
        <p className="text-[14px] text-stone-500">Manage your services and CTA section</p>
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
                    placeholder="Title (English)"
                    value={service.title}
                    onChange={(e) => updateService(service.id, 'title', e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                  />
                  <input
                    type="text"
                    placeholder="Title (Chinese)"
                    value={service.title_zh}
                    onChange={(e) => updateService(service.id, 'title_zh', e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <textarea
                    placeholder="Description (English)"
                    value={service.description}
                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 resize-none"
                  />
                  <textarea
                    placeholder="Description (Chinese)"
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
              placeholder="CTA Title (EN)"
              value={cta.title}
              onChange={(e) => setCta({ ...cta, title: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
            <input
              type="text"
              placeholder="CTA Title (ZH)"
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
              placeholder="Button Text (EN)"
              value={cta.button}
              onChange={(e) => setCta({ ...cta, button: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
            <input
              type="text"
              placeholder="Button Text (ZH)"
              value={cta.buttonZh}
              onChange={(e) => setCta({ ...cta, buttonZh: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Resume Editor
// ============================================
function ResumeEditor() {
  const [experiences, setExperiences] = useState<ResumeExperience[]>([]);
  const [educations, setEducations] = useState<ResumeEducation[]>([]);
  const [skills, setSkills] = useState<ResumeSkill[]>([]);
  const [resumeFile, setResumeFile] = useState<string>('');
  const [labels, setLabels] = useState({
    headerTitle: '',
    headerTitleZh: '',
    experience: '',
    experienceZh: '',
    education: '',
    educationZh: '',
    skills: '',
    skillsZh: '',
    download: '',
    downloadZh: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addExperience = () => {
    const newExp: ResumeExperience = {
      id: `temp-${Date.now()}`,
      title: '',
      title_zh: '',
      company: '',
      company_zh: '',
      period: '',
      description: '',
      description_zh: '',
      order: experiences.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const updateExperience = (id: string, field: keyof ResumeExperience, value: string) => {
    setExperiences(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addEducation = () => {
    const newEdu: ResumeEducation = {
      id: `temp-${Date.now()}`,
      degree: '',
      degree_zh: '',
      school: '',
      school_zh: '',
      period: '',
      order: educations.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setEducations([...educations, newEdu]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter((e) => e.id !== id));
  };

  const updateEducation = (id: string, field: keyof ResumeEducation, value: string) => {
    setEducations(educations.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addSkill = () => {
    const newSkill: ResumeSkill = {
      id: `temp-${Date.now()}`,
      name: '',
      order: skills.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const updateSkill = (id: string, value: string) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, name: value } : s)));
  };

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    const fileName = `resume-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('resume-files').upload(fileName, file);

    if (error) {
      alert('Upload failed: ' + error.message);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('resume-files').getPublicUrl(fileName);
    setResumeFile(publicUrl);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="font-serif italic text-3xl text-stone-900 mb-2">Resume</h2>
        <p className="text-[14px] text-stone-500">Manage your resume content and PDF file</p>
      </div>

      {/* Labels */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <h3 className="text-[14px] font-medium text-stone-900 mb-4">Section Labels</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Header Title (EN)"
            value={labels.headerTitle}
            onChange={(e) => setLabels({ ...labels, headerTitle: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Header Title (ZH)"
            value={labels.headerTitleZh}
            onChange={(e) => setLabels({ ...labels, headerTitleZh: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Experience Label (EN)"
            value={labels.experience}
            onChange={(e) => setLabels({ ...labels, experience: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Experience Label (ZH)"
            value={labels.experienceZh}
            onChange={(e) => setLabels({ ...labels, experienceZh: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Education Label (EN)"
            value={labels.education}
            onChange={(e) => setLabels({ ...labels, education: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Education Label (ZH)"
            value={labels.educationZh}
            onChange={(e) => setLabels({ ...labels, educationZh: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Skills Label (EN)"
            value={labels.skills}
            onChange={(e) => setLabels({ ...labels, skills: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Skills Label (ZH)"
            value={labels.skillsZh}
            onChange={(e) => setLabels({ ...labels, skillsZh: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Download Button (EN)"
            value={labels.download}
            onChange={(e) => setLabels({ ...labels, download: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Download Button (ZH)"
            value={labels.downloadZh}
            onChange={(e) => setLabels({ ...labels, downloadZh: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
        </div>
      </div>

      {/* PDF Upload */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <h3 className="text-[14px] font-medium text-stone-900 mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Resume PDF
        </h3>
        <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handlePDFUpload}
            className="hidden"
          />

          {resumeFile ? (
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-[14px] text-stone-600 mb-2">Resume uploaded successfully!</p>
              <div className="flex gap-3 justify-center">
                <a
                  href={resumeFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-blue-600 hover:underline"
                >
                  View PDF
                </a>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[13px] text-stone-600 hover:text-stone-900"
                >
                  Replace
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-stone-400" />
              </div>
              <p className="text-[14px] text-stone-600 mb-4">Upload your resume PDF</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-stone-900 text-white px-4 py-2 text-[13px] font-medium rounded-md hover:bg-stone-800 transition-colors"
              >
                Select PDF File
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-medium text-stone-900 flex items-center gap-2">
            <BriefcaseIcon className="w-4 h-4" />
            Experience
          </h3>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 text-[12px] font-medium rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Experience
          </button>
        </div>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="p-4 border border-stone-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] text-stone-500">Experience {index + 1}</span>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Job Title (EN)"
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                  />
                  <input
                    type="text"
                    placeholder="Job Title (ZH)"
                    value={exp.title_zh}
                    onChange={(e) => updateExperience(exp.id, 'title_zh', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Company (EN)"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                  />
                  <input
                    type="text"
                    placeholder="Company (ZH)"
                    value={exp.company_zh}
                    onChange={(e) => updateExperience(exp.id, 'company_zh', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Period (e.g., 2021 — Present)"
                  value={exp.period}
                  onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                />
                <div className="grid grid-cols-2 gap-3">
                  <textarea
                    placeholder="Description (EN)"
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900 resize-none"
                  />
                  <textarea
                    placeholder="Description (ZH)"
                    value={exp.description_zh}
                    onChange={(e) => updateExperience(exp.id, 'description_zh', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900 resize-none"
                  />
                </div>
              </div>
            </div>
          ))}

          {experiences.length === 0 && (
            <div className="text-center py-6 bg-stone-50 rounded-lg border border-dashed border-stone-300">
              <p className="text-[13px] text-stone-500">No experience entries yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Education */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-medium text-stone-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Education
          </h3>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 text-[12px] font-medium rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Education
          </button>
        </div>

        <div className="space-y-4">
          {educations.map((edu, index) => (
            <div key={edu.id} className="p-4 border border-stone-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] text-stone-500">Education {index + 1}</span>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Degree (EN)"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                  />
                  <input
                    type="text"
                    placeholder="Degree (ZH)"
                    value={edu.degree_zh}
                    onChange={(e) => updateEducation(edu.id, 'degree_zh', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="School (EN)"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                  />
                  <input
                    type="text"
                    placeholder="School (ZH)"
                    value={edu.school_zh}
                    onChange={(e) => updateEducation(edu.id, 'school_zh', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Period (e.g., 2014 — 2018)"
                  value={edu.period}
                  onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>
          ))}

          {educations.length === 0 && (
            <div className="text-center py-6 bg-stone-50 rounded-lg border border-dashed border-stone-300">
              <p className="text-[13px] text-stone-500">No education entries yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-medium text-stone-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Skills
          </h3>
          <button
            onClick={addSkill}
            className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 text-[12px] font-medium rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Skill
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-1 bg-stone-100 px-3 py-2 rounded-md">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, e.target.value)}
                placeholder="Skill name"
                className="bg-transparent text-[13px] text-stone-700 focus:outline-none w-24"
              />
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-stone-400 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {skills.length === 0 && (
            <p className="text-[13px] text-stone-500">No skills added yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Contact Editor
// ============================================
function ContactEditor() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
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

  const icons = ['Linkedin', 'Instagram', 'Dribbble', 'Github', 'Twitter', 'Youtube', 'Globe'];

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: `temp-${Date.now()}`,
      name: '',
      icon: 'Globe',
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

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="font-serif italic text-3xl text-stone-900 mb-2">Contact</h2>
        <p className="text-[14px] text-stone-500">Manage contact page content and social links</p>
      </div>

      {/* Contact Info */}
      <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-6">
        <h3 className="text-[14px] font-medium text-stone-900">Contact Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Let's Connect Label (EN)"
            value={contact.letsConnect}
            onChange={(e) => setContact({ ...contact, letsConnect: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Let's Connect Label (ZH)"
            value={contact.letsConnectZh}
            onChange={(e) => setContact({ ...contact, letsConnectZh: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Page Title (EN)"
            value={contact.title}
            onChange={(e) => setContact({ ...contact, title: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
          />
          <input
            type="text"
            placeholder="Page Title (ZH)"
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

        <div className="pt-4 border-t border-stone-100">
          <h4 className="text-[13px] font-medium text-stone-700 mb-4">Email Section</h4>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Label (EN)"
              value={contact.emailLabel}
              onChange={(e) => setContact({ ...contact, emailLabel: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
            <input
              type="text"
              placeholder="Label (ZH)"
              value={contact.emailLabelZh}
              onChange={(e) => setContact({ ...contact, emailLabelZh: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Description (EN)"
              value={contact.emailDesc}
              onChange={(e) => setContact({ ...contact, emailDesc: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
            <input
              type="text"
              placeholder="Description (ZH)"
              value={contact.emailDescZh}
              onChange={(e) => setContact({ ...contact, emailDescZh: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 mt-4"
          />
        </div>

        <div className="pt-4 border-t border-stone-100">
          <h4 className="text-[13px] font-medium text-stone-700 mb-4">Social Section</h4>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Label (EN)"
              value={contact.socialLabel}
              onChange={(e) => setContact({ ...contact, socialLabel: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
            <input
              type="text"
              placeholder="Label (ZH)"
              value={contact.socialLabelZh}
              onChange={(e) => setContact({ ...contact, socialLabelZh: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Description (EN)"
              value={contact.socialDesc}
              onChange={(e) => setContact({ ...contact, socialDesc: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
            <input
              type="text"
              placeholder="Description (ZH)"
              value={contact.socialDescZh}
              onChange={(e) => setContact({ ...contact, socialDescZh: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-medium text-stone-900 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Social Links
          </h3>
          <button
            onClick={addSocialLink}
            className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 text-[12px] font-medium rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Link
          </button>
        </div>

        <div className="space-y-3">
          {socialLinks.map((link, index) => (
            <div key={link.id} className="flex items-center gap-3 p-3 border border-stone-200 rounded-lg">
              <span className="text-[12px] text-stone-400 w-6">{index + 1}</span>
              <select
                value={link.icon}
                onChange={(e) => updateSocialLink(link.id, 'icon', e.target.value)}
                className="px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
              >
                {icons.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Platform Name"
                value={link.name}
                onChange={(e) => updateSocialLink(link.id, 'name', e.target.value)}
                className="flex-1 px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
              />
              <input
                type="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                className="flex-1 px-3 py-2 border border-stone-200 rounded-md text-[13px] focus:outline-none focus:border-stone-900"
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
              <p className="text-[13px] text-stone-500">No social links added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
