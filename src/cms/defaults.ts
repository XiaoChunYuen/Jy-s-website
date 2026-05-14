import type {
  Project,
  ResumeExperience,
  ResumeEducation,
  ResumeSkill,
  ResumeInternship,
  ResumeCompetition,
  ResumeCampus,
  Service,
  SocialLink,
  CaseStudy,
} from '../lib/supabase';
import { siteAssets } from '../shared/siteAssets';

export type SiteSettingsMap = Record<string, string>;

export interface CMSContent {
  // Loading state
  isLoading: boolean;

  // Site Settings (from site_settings table)
  settings: SiteSettingsMap;

  // Hero
  heroBackground: string;
  heroTitle: string;
  heroTitleZh: string;
  heroSubtitle: string;
  heroSubtitleZh: string;

  // Navigation
  navWork: string;
  navWorkZh: string;
  navAbout: string;
  navAboutZh: string;
  navServices: string;
  navServicesZh: string;
  navContact: string;
  navContactZh: string;
  navResume: string;
  navResumeZh: string;

  // About
  aboutTitle: string;
  aboutTitleZh: string;
  aboutParagraphs: string[];
  aboutParagraphsZh: string[];
  aboutPhotos: string[];

  // Portfolio Section
  portfolioLabel: string;
  portfolioLabelZh: string;
  portfolioTitle: string;
  portfolioTitleZh: string;
  portfolioDesc: string;
  portfolioDescZh: string;
  viewProject: string;
  viewProjectZh: string;
  getInTouch: string;
  getInTouchZh: string;
  viewResume: string;
  viewResumeZh: string;

  // Projects
  projects: Project[];

  // Case Studies
  caseStudies: CaseStudy[];

  // Services
  servicesTitle: string;
  servicesTitleZh: string;
  servicesWhatIDo: string;
  servicesWhatIDoZh: string;
  services: Service[];
  servicesCtaTitle: string;
  servicesCtaTitleZh: string;
  servicesCtaDesc: string;
  servicesCtaDescZh: string;
  servicesCtaButton: string;
  servicesCtaButtonZh: string;

  // Resume
  resumeHeaderTitle: string;
  resumeHeaderTitleZh: string;
  resumeExperienceLabel: string;
  resumeExperienceLabelZh: string;
  resumeEducationLabel: string;
  resumeEducationLabelZh: string;
  resumeSkillsLabel: string;
  resumeSkillsLabelZh: string;
  resumeDownloadText: string;
  resumeDownloadTextZh: string;
  resumeExperiences: ResumeExperience[];
  resumeEducations: ResumeEducation[];
  resumeSkills: ResumeSkill[];
  resumeInternships: ResumeInternship[];
  resumeCompetitions: ResumeCompetition[];
  resumeCampus: ResumeCampus[];
  resumeFile: import('../lib/supabase').ResumeFile | null;

  // Contact
  contactLetsConnect: string;
  contactLetsConnectZh: string;
  contactTitle: string;
  contactTitleZh: string;
  contactDesc: string;
  contactDescZh: string;
  contactEmail: string;
  contactEmailLabel: string;
  contactEmailLabelZh: string;
  contactEmailDesc: string;
  contactEmailDescZh: string;
  contactSocialLabel: string;
  contactSocialLabelZh: string;
  contactSocialDesc: string;
  contactSocialDescZh: string;
  socialLinks: SocialLink[];

  // Footer
  footerTitle: string;
  footerTitleZh: string;
  footerCopyright: string;
  footerCopyrightZh: string;
  footerAuthor: string;
  footerAuthorZh: string;

  // Case Study Common
  caseStudyBackToWork: string;
  caseStudyBackToWorkZh: string;
  caseStudyNextProject: string;
  caseStudyNextProjectZh: string;
  caseStudyPrevious: string;
  caseStudyPreviousZh: string;
  caseStudyProcess: string;
  caseStudyProcessZh: string;
}

export const defaultSettings: SiteSettingsMap = {
  // Hero
  hero_background: siteAssets.hero,
  hero_title: "Welcome to Jy's Channel",
  hero_title_zh: '欢迎来到 Jy 的频道',
  hero_subtitle: 'Explore \u00B7 Create \u00B7 Share',
  hero_subtitle_zh: '探索 \u00B7 创造 \u00B7 分享',

  // Navigation
  nav_work: 'Work',
  nav_work_zh: '作品',
  nav_about: 'About',
  nav_about_zh: '关于',
  nav_services: 'Services',
  nav_services_zh: '服务',
  nav_contact: 'Contact',
  nav_contact_zh: '联系',
  nav_resume: 'Resume',
  nav_resume_zh: '简历',

  // Portfolio Section
  portfolio_label: 'Portfolio',
  portfolio_label_zh: '作品集',
  portfolio_title: 'Selected Work',
  portfolio_title_zh: '精选作品',
  portfolio_desc: 'A curated collection of projects spanning product design, user experience, and digital innovation.',
  portfolio_desc_zh: '精心策划的项目集，涵盖产品设计、用户体验和数字创新。',

  // Home
  home_view_project: 'View Project',
  home_view_project_zh: '查看项目',
  home_get_in_touch: 'Get in Touch',
  home_get_in_touch_zh: '联系我',
  home_view_resume: 'View Resume',
  home_view_resume_zh: '查看简历',

  // Services
  services_what_i_do: 'What I Do',
  services_what_i_do_zh: '我的服务',
  services_cta_title: 'Have a project in mind?',
  services_cta_title_zh: '有项目想法？',
  services_cta_desc: "I'm always open to discussing product design work or partnership opportunities.",
  services_cta_desc_zh: '我随时乐意讨论产品设计工作或合作机会。',
  services_cta_button: 'Get in Touch',
  services_cta_button_zh: '联系我',

  // Contact
  contact_lets_connect: "Let's Connect",
  contact_lets_connect_zh: '保持联系',
  contact_title: 'Get in Touch',
  contact_title_zh: '联系我',
  contact_desc: 'I am always open to discussing product design work or partnership opportunities.',
  contact_desc_zh: '我随时乐意讨论产品设计工作或合作机会。',
  contact_email_label: 'Email',
  contact_email_label_zh: '邮箱',
  contact_email_desc: 'For project inquiries and collaborations',
  contact_email_desc_zh: '项目咨询与合作',
  contact_social_label: 'Social',
  contact_social_label_zh: '社交媒体',
  contact_social_desc: 'Follow me for updates and behind-the-scenes',
  contact_social_desc_zh: '关注我获取最新动态',
  contact_email: 'hello@example.com',

  // Resume
  resume_header_title: 'Experience & Education',
  resume_header_title_zh: '经历与教育',
  resume_experience_label: 'Experience',
  resume_experience_label_zh: '工作经历',
  resume_education_label: 'Education',
  resume_education_label_zh: '教育背景',
  resume_skills_label: 'Skills',
  resume_skills_label_zh: '技能',
  resume_download_text: 'Download PDF',
  resume_download_text_zh: '下载 PDF',

  // Footer
  footer_title: 'Student Portfolio',
  footer_title_zh: '学生作品集',
  footer_copyright: '\u00A9 2024 Student Portfolio',
  footer_copyright_zh: '\u00A9 2024 学生作品集',
  footer_author: 'Alex Chen \u2013 Designer',
  footer_author_zh: 'Alex Chen \u2013 设计师',

  // Case Study
  case_study_back_to_work: 'Back to Work',
  case_study_back_to_work_zh: '返回作品',
  case_study_next_project: 'Next Project',
  case_study_next_project_zh: '下一个项目',
  case_study_previous: 'Previous',
  case_study_previous_zh: '上一个',
  case_study_process: 'Process',
  case_study_process_zh: '过程',
};

export const defaultContent: CMSContent = {
  isLoading: true,
  settings: defaultSettings,

  // Hero
  heroBackground: defaultSettings.hero_background,
  heroTitle: defaultSettings.hero_title,
  heroTitleZh: defaultSettings.hero_title_zh,
  heroSubtitle: defaultSettings.hero_subtitle,
  heroSubtitleZh: defaultSettings.hero_subtitle_zh,

  // Navigation
  navWork: defaultSettings.nav_work,
  navWorkZh: defaultSettings.nav_work_zh,
  navAbout: defaultSettings.nav_about,
  navAboutZh: defaultSettings.nav_about_zh,
  navServices: defaultSettings.nav_services,
  navServicesZh: defaultSettings.nav_services_zh,
  navContact: defaultSettings.nav_contact,
  navContactZh: defaultSettings.nav_contact_zh,
  navResume: defaultSettings.nav_resume,
  navResumeZh: defaultSettings.nav_resume_zh,

  // About
  aboutTitle: 'About Me',
  aboutTitleZh: '关于我',
  aboutParagraphs: [
    'I am a digital product designer with a background in architecture, which deeply influences my approach to structuring information and building scalable design systems.',
    'Currently, I focus on creating elegant, user-centric experiences for complex enterprise tools and consumer applications.',
    "When I'm not pushing pixels, you can find me exploring vintage typography, brewing specialty coffee, or photographing brutalist architecture.",
  ],
  aboutParagraphsZh: [
    '我是一名拥有建筑学背景的数字产品设计师，这深刻影响了我构建信息和构建可扩展设计系统的方法。',
    '目前，我专注于为复杂的企业工具和消费者应用程序创建优雅的、以用户为中心的体验。',
    '当我不沉迷于像素时，你会发现我在探索复古排版、冲泡特色咖啡或拍摄粗野主义建筑。',
  ],
  aboutPhotos: [...siteAssets.aboutPhotos],

  // Portfolio Section
  portfolioLabel: defaultSettings.portfolio_label,
  portfolioLabelZh: defaultSettings.portfolio_label_zh,
  portfolioTitle: defaultSettings.portfolio_title,
  portfolioTitleZh: defaultSettings.portfolio_title_zh,
  portfolioDesc: defaultSettings.portfolio_desc,
  portfolioDescZh: defaultSettings.portfolio_desc_zh,
  viewProject: defaultSettings.home_view_project,
  viewProjectZh: defaultSettings.home_view_project_zh,
  getInTouch: defaultSettings.home_get_in_touch,
  getInTouchZh: defaultSettings.home_get_in_touch_zh,
  viewResume: defaultSettings.home_view_resume,
  viewResumeZh: defaultSettings.home_view_resume_zh,

  // Projects
  projects: [],

  // Case Studies
  caseStudies: [],

  // Services
  servicesTitle: defaultSettings.services_what_i_do,
  servicesTitleZh: defaultSettings.services_what_i_do_zh,
  servicesWhatIDo: defaultSettings.services_what_i_do,
  servicesWhatIDoZh: defaultSettings.services_what_i_do_zh,
  services: [],
  servicesCtaTitle: defaultSettings.services_cta_title,
  servicesCtaTitleZh: defaultSettings.services_cta_title_zh,
  servicesCtaDesc: defaultSettings.services_cta_desc,
  servicesCtaDescZh: defaultSettings.services_cta_desc_zh,
  servicesCtaButton: defaultSettings.services_cta_button,
  servicesCtaButtonZh: defaultSettings.services_cta_button_zh,

  // Resume
  resumeHeaderTitle: defaultSettings.resume_header_title,
  resumeHeaderTitleZh: defaultSettings.resume_header_title_zh,
  resumeExperienceLabel: defaultSettings.resume_experience_label,
  resumeExperienceLabelZh: defaultSettings.resume_experience_label_zh,
  resumeEducationLabel: defaultSettings.resume_education_label,
  resumeEducationLabelZh: defaultSettings.resume_education_label_zh,
  resumeSkillsLabel: defaultSettings.resume_skills_label,
  resumeSkillsLabelZh: defaultSettings.resume_skills_label_zh,
  resumeDownloadText: defaultSettings.resume_download_text,
  resumeDownloadTextZh: defaultSettings.resume_download_text_zh,
  resumeExperiences: [],
  resumeEducations: [],
  resumeSkills: [],
  resumeInternships: [],
  resumeCompetitions: [],
  resumeCampus: [],
  resumeFile: null,

  // Contact
  contactLetsConnect: defaultSettings.contact_lets_connect,
  contactLetsConnectZh: defaultSettings.contact_lets_connect_zh,
  contactTitle: defaultSettings.contact_title,
  contactTitleZh: defaultSettings.contact_title_zh,
  contactDesc: defaultSettings.contact_desc,
  contactDescZh: defaultSettings.contact_desc_zh,
  contactEmail: defaultSettings.contact_email,
  contactEmailLabel: defaultSettings.contact_email_label,
  contactEmailLabelZh: defaultSettings.contact_email_label_zh,
  contactEmailDesc: defaultSettings.contact_email_desc,
  contactEmailDescZh: defaultSettings.contact_email_desc_zh,
  contactSocialLabel: defaultSettings.contact_social_label,
  contactSocialLabelZh: defaultSettings.contact_social_label_zh,
  contactSocialDesc: defaultSettings.contact_social_desc,
  contactSocialDescZh: defaultSettings.contact_social_desc_zh,
  socialLinks: [],

  // Footer
  footerTitle: defaultSettings.footer_title,
  footerTitleZh: defaultSettings.footer_title_zh,
  footerCopyright: defaultSettings.footer_copyright,
  footerCopyrightZh: defaultSettings.footer_copyright_zh,
  footerAuthor: defaultSettings.footer_author,
  footerAuthorZh: defaultSettings.footer_author_zh,

  // Case Study Common
  caseStudyBackToWork: defaultSettings.case_study_back_to_work,
  caseStudyBackToWorkZh: defaultSettings.case_study_back_to_work_zh,
  caseStudyNextProject: defaultSettings.case_study_next_project,
  caseStudyNextProjectZh: defaultSettings.case_study_next_project_zh,
  caseStudyPrevious: defaultSettings.case_study_previous,
  caseStudyPreviousZh: defaultSettings.case_study_previous_zh,
  caseStudyProcess: defaultSettings.case_study_process,
  caseStudyProcessZh: defaultSettings.case_study_process_zh,
};
