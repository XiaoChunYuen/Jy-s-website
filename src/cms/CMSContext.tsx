import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  supabase,
  type Project,
  type ResumeExperience,
  type ResumeEducation,
  type ResumeSkill,
  type ResumeInternship,
  type ResumeCompetition,
  type ResumeCampus,
  type Service,
  type SocialLink,
  type CaseStudy,
  type SiteSettings
} from '../lib/supabase';
import { defaultSettings, defaultContent, type CMSContent, type SiteSettingsMap } from './defaults';

interface CMSContextType {
  content: CMSContent;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
  getSetting: (key: string) => string;
  getCaseStudyBySlug: (slug: string) => CaseStudy | undefined;
  getCaseStudyByProjectId: (projectId: string) => CaseStudy | undefined;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CMSContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettingsMap>(defaultSettings);

  const fetchContent = async () => {
    try {
      setIsLoading(true);

      // 创建带超时的 fetch 辅助函数
      const fetchWithTimeout = async <T, F>(
        promise: PromiseLike<T>,
        timeoutMs: number = 3000,
        fallback: F
      ): Promise<T | F> => {
        try {
          const timeoutPromise = new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeoutMs)
          );
          return await Promise.race([Promise.resolve(promise), timeoutPromise]);
        } catch (error) {
          console.warn('Fetch timeout or error:', error);
          return fallback;
        }
      };

      // 1. 获取 Site Settings
      const settingsPromise = supabase
        .from('site_settings')
        .select('*');

      const settingsResult = await fetchWithTimeout(settingsPromise, 3000, { data: null, error: null });

      const mergedSettings = { ...defaultSettings };
      if (settingsResult.data && Array.isArray(settingsResult.data)) {
        settingsResult.data.forEach((setting: SiteSettings) => {
          mergedSettings[setting.key] = setting.value;
        });
      }
      setSettings(mergedSettings);

      // 2. 获取 Projects
      const projectsPromise = supabase
        .from('projects')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      const projectsResult = await fetchWithTimeout(projectsPromise, 3000, { data: null, error: null });
      const projects = projectsResult.data || [];

      // 3. 获取 About Content
      const aboutPromise = supabase
        .from('about_content')
        .select('*')
        .single();

      const aboutResult = await fetchWithTimeout(aboutPromise, 3000, { data: null, error: null });
      const about = aboutResult.data;

      // 4. 获取 Services
      const servicesPromise = supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      const servicesResult = await fetchWithTimeout(servicesPromise, 3000, { data: null, error: null });
      const services = servicesResult.data || [];

      // 5. 获取 Resume Data
      const resumeFilePromise = supabase
        .from('resume_files')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const resumeFileResult = await fetchWithTimeout(resumeFilePromise, 2000, { data: null, error: null });
      const resumeFile = resumeFileResult.data;

      const experiencesPromise = supabase
        .from('resume_experience')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      const experiencesResult = await fetchWithTimeout(experiencesPromise, 2000, { data: null, error: null });
      const experiences = experiencesResult.data || [];

      const educationPromise = supabase
        .from('resume_education')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      const educationResult = await fetchWithTimeout(educationPromise, 2000, { data: null, error: null });
      const educations = educationResult.data || [];

      const skillsPromise = supabase
        .from('resume_skills')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      const skillsResult = await fetchWithTimeout(skillsPromise, 2000, { data: null, error: null });
      const skills = skillsResult.data || [];

      const internshipsPromise = supabase
        .from('resume_internships')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      const internshipsResult = await fetchWithTimeout(internshipsPromise, 2000, { data: null, error: null });
      const internships = internshipsResult.data || [];

      const competitionsPromise = supabase
        .from('resume_competitions')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      const competitionsResult = await fetchWithTimeout(competitionsPromise, 2000, { data: null, error: null });
      const competitions = competitionsResult.data || [];

      const campusPromise = supabase
        .from('resume_campus')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      const campusResult = await fetchWithTimeout(campusPromise, 2000, { data: null, error: null });
      const campus = campusResult.data || [];

      // 6. 获取 Social Links
      const socialLinksPromise = supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      const socialLinksResult = await fetchWithTimeout(socialLinksPromise, 2000, { data: null, error: null });
      const socialLinks = socialLinksResult.data || [];

      // 7. 获取 Case Studies
      const caseStudiesPromise = supabase
        .from('case_studies')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      const caseStudiesResult = await fetchWithTimeout(caseStudiesPromise, 3000, { data: null, error: null });
      const caseStudies = caseStudiesResult.data || [];

      // 合并所有内容
      const updatedContent: CMSContent = {
        isLoading: false,
        settings: mergedSettings,

        // Hero
        heroBackground: mergedSettings.hero_background || defaultContent.heroBackground,
        heroTitle: mergedSettings.hero_title || defaultContent.heroTitle,
        heroTitleZh: mergedSettings.hero_title_zh || defaultContent.heroTitleZh,
        heroSubtitle: mergedSettings.hero_subtitle || defaultContent.heroSubtitle,
        heroSubtitleZh: mergedSettings.hero_subtitle_zh || defaultContent.heroSubtitleZh,

        // Navigation
        navWork: mergedSettings.nav_work || defaultContent.navWork,
        navWorkZh: mergedSettings.nav_work_zh || defaultContent.navWorkZh,
        navAbout: mergedSettings.nav_about || defaultContent.navAbout,
        navAboutZh: mergedSettings.nav_about_zh || defaultContent.navAboutZh,
        navServices: mergedSettings.nav_services || defaultContent.navServices,
        navServicesZh: mergedSettings.nav_services_zh || defaultContent.navServicesZh,
        navContact: mergedSettings.nav_contact || defaultContent.navContact,
        navContactZh: mergedSettings.nav_contact_zh || defaultContent.navContactZh,
        navResume: mergedSettings.nav_resume || defaultContent.navResume,
        navResumeZh: mergedSettings.nav_resume_zh || defaultContent.navResumeZh,

        // About
        aboutTitle: about?.title || defaultContent.aboutTitle,
        aboutTitleZh: about?.title_zh || defaultContent.aboutTitleZh,
        aboutParagraphs: about?.paragraphs || defaultContent.aboutParagraphs,
        aboutParagraphsZh: about?.paragraphs_zh || defaultContent.aboutParagraphsZh,
        aboutPhotos: about?.photos || defaultContent.aboutPhotos,

        // Portfolio Section
        portfolioLabel: mergedSettings.portfolio_label || defaultContent.portfolioLabel,
        portfolioLabelZh: mergedSettings.portfolio_label_zh || defaultContent.portfolioLabelZh,
        portfolioTitle: mergedSettings.portfolio_title || defaultContent.portfolioTitle,
        portfolioTitleZh: mergedSettings.portfolio_title_zh || defaultContent.portfolioTitleZh,
        portfolioDesc: mergedSettings.portfolio_desc || defaultContent.portfolioDesc,
        portfolioDescZh: mergedSettings.portfolio_desc_zh || defaultContent.portfolioDescZh,
        viewProject: mergedSettings.home_view_project || defaultContent.viewProject,
        viewProjectZh: mergedSettings.home_view_project_zh || defaultContent.viewProjectZh,
        getInTouch: mergedSettings.home_get_in_touch || defaultContent.getInTouch,
        getInTouchZh: mergedSettings.home_get_in_touch_zh || defaultContent.getInTouchZh,
        viewResume: mergedSettings.home_view_resume || defaultContent.viewResume,
        viewResumeZh: mergedSettings.home_view_resume_zh || defaultContent.viewResumeZh,

        // Projects
        projects,

        // Case Studies
        caseStudies,

        // Services
        servicesTitle: mergedSettings.services_what_i_do || defaultContent.servicesTitle,
        servicesTitleZh: mergedSettings.services_what_i_do_zh || defaultContent.servicesTitleZh,
        servicesWhatIDo: mergedSettings.services_what_i_do || defaultContent.servicesWhatIDo,
        servicesWhatIDoZh: mergedSettings.services_what_i_do_zh || defaultContent.servicesWhatIDoZh,
        services,
        servicesCtaTitle: mergedSettings.services_cta_title || defaultContent.servicesCtaTitle,
        servicesCtaTitleZh: mergedSettings.services_cta_title_zh || defaultContent.servicesCtaTitleZh,
        servicesCtaDesc: mergedSettings.services_cta_desc || defaultContent.servicesCtaDesc,
        servicesCtaDescZh: mergedSettings.services_cta_desc_zh || defaultContent.servicesCtaDescZh,
        servicesCtaButton: mergedSettings.services_cta_button || defaultContent.servicesCtaButton,
        servicesCtaButtonZh: mergedSettings.services_cta_button_zh || defaultContent.servicesCtaButtonZh,

        // Resume
        resumeHeaderTitle: mergedSettings.resume_header_title || defaultContent.resumeHeaderTitle,
        resumeHeaderTitleZh: mergedSettings.resume_header_title_zh || defaultContent.resumeHeaderTitleZh,
        resumeExperienceLabel: mergedSettings.resume_experience_label || defaultContent.resumeExperienceLabel,
        resumeExperienceLabelZh: mergedSettings.resume_experience_label_zh || defaultContent.resumeExperienceLabelZh,
        resumeEducationLabel: mergedSettings.resume_education_label || defaultContent.resumeEducationLabel,
        resumeEducationLabelZh: mergedSettings.resume_education_label_zh || defaultContent.resumeEducationLabelZh,
        resumeSkillsLabel: mergedSettings.resume_skills_label || defaultContent.resumeSkillsLabel,
        resumeSkillsLabelZh: mergedSettings.resume_skills_label_zh || defaultContent.resumeSkillsLabelZh,
        resumeDownloadText: mergedSettings.resume_download_text || defaultContent.resumeDownloadText,
        resumeDownloadTextZh: mergedSettings.resume_download_text_zh || defaultContent.resumeDownloadTextZh,
        resumeExperiences: experiences,
        resumeEducations: educations,
        resumeSkills: skills,
        resumeInternships: internships,
        resumeCompetitions: competitions,
        resumeCampus: campus,
        resumeFile: resumeFile,

        // Contact
        contactLetsConnect: mergedSettings.contact_lets_connect || defaultContent.contactLetsConnect,
        contactLetsConnectZh: mergedSettings.contact_lets_connect_zh || defaultContent.contactLetsConnectZh,
        contactTitle: mergedSettings.contact_title || defaultContent.contactTitle,
        contactTitleZh: mergedSettings.contact_title_zh || defaultContent.contactTitleZh,
        contactDesc: mergedSettings.contact_desc || defaultContent.contactDesc,
        contactDescZh: mergedSettings.contact_desc_zh || defaultContent.contactDescZh,
        contactEmail: mergedSettings.contact_email || defaultContent.contactEmail,
        contactEmailLabel: mergedSettings.contact_email_label || defaultContent.contactEmailLabel,
        contactEmailLabelZh: mergedSettings.contact_email_label_zh || defaultContent.contactEmailLabelZh,
        contactEmailDesc: mergedSettings.contact_email_desc || defaultContent.contactEmailDesc,
        contactEmailDescZh: mergedSettings.contact_email_desc_zh || defaultContent.contactEmailDescZh,
        contactSocialLabel: mergedSettings.contact_social_label || defaultContent.contactSocialLabel,
        contactSocialLabelZh: mergedSettings.contact_social_label_zh || defaultContent.contactSocialLabelZh,
        contactSocialDesc: mergedSettings.contact_social_desc || defaultContent.contactSocialDesc,
        contactSocialDescZh: mergedSettings.contact_social_desc_zh || defaultContent.contactSocialDescZh,
        socialLinks,

        // Footer
        footerTitle: mergedSettings.footer_title || defaultContent.footerTitle,
        footerTitleZh: mergedSettings.footer_title_zh || defaultContent.footerTitleZh,
        footerCopyright: mergedSettings.footer_copyright || defaultContent.footerCopyright,
        footerCopyrightZh: mergedSettings.footer_copyright_zh || defaultContent.footerCopyrightZh,
        footerAuthor: mergedSettings.footer_author || defaultContent.footerAuthor,
        footerAuthorZh: mergedSettings.footer_author_zh || defaultContent.footerAuthorZh,

        // Case Study Common
        caseStudyBackToWork: mergedSettings.case_study_back_to_work || defaultContent.caseStudyBackToWork,
        caseStudyBackToWorkZh: mergedSettings.case_study_back_to_work_zh || defaultContent.caseStudyBackToWorkZh,
        caseStudyNextProject: mergedSettings.case_study_next_project || defaultContent.caseStudyNextProject,
        caseStudyNextProjectZh: mergedSettings.case_study_next_project_zh || defaultContent.caseStudyNextProjectZh,
        caseStudyPrevious: mergedSettings.case_study_previous || defaultContent.caseStudyPrevious,
        caseStudyPreviousZh: mergedSettings.case_study_previous_zh || defaultContent.caseStudyPreviousZh,
        caseStudyProcess: mergedSettings.case_study_process || defaultContent.caseStudyProcess,
        caseStudyProcessZh: mergedSettings.case_study_process_zh || defaultContent.caseStudyProcessZh,
      };

      setContent(updatedContent);

    } catch (error) {
      console.error('Error fetching CMS content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const getSetting = (key: string): string => {
    return settings[key] || '';
  };

  const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
    return content.caseStudies.find(cs => cs.slug === slug);
  };

  const getCaseStudyByProjectId = (projectId: string): CaseStudy | undefined => {
    return content.caseStudies.find(cs => cs.project_id === projectId);
  };

  return (
    <CMSContext.Provider value={{
      content,
      isLoading,
      refreshContent: fetchContent,
      getSetting,
      getCaseStudyBySlug,
      getCaseStudyByProjectId
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
