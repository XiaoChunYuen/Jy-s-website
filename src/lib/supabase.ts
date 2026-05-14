import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseKey : 'placeholder-anon-key'
);

// Database types
export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'image' | 'background' | 'file';
  updated_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  title_zh: string;
  category: string;
  category_zh: string;
  description: string;
  description_zh: string;
  image_url: string;
  link: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface AboutContent {
  id: string;
  title: string;
  title_zh: string;
  paragraphs: string[];
  paragraphs_zh: string[];
  photos: string[];
  updated_at: string;
}

export interface ResumeFile {
  id: string;
  file_url: string;
  file_name: string;
  updated_at: string;
}

export interface ResumeExperience {
  id: string;
  title: string;
  title_zh: string;
  company: string;
  company_zh: string;
  period: string;
  description: string;
  description_zh: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface ResumeEducation {
  id: string;
  degree: string;
  degree_zh: string;
  school: string;
  school_zh: string;
  period: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface ResumeSkill {
  id: string;
  name: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface ResumeInternship {
  id: string;
  title: string;
  title_zh: string;
  company: string;
  company_zh: string;
  period: string;
  description: string;
  description_zh: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface ResumeCompetition {
  id: string;
  title: string;
  title_zh: string;
  organizer: string;
  organizer_zh: string;
  period: string;
  description: string;
  description_zh: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface ResumeCampus {
  id: string;
  title: string;
  title_zh: string;
  organization: string;
  organization_zh: string;
  period: string;
  description: string;
  description_zh: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  title_zh: string;
  description: string;
  description_zh: string;
  icon: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface SocialLink {
  id: string;
  name: string;
  icon: string;
  url: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface CaseStudy {
  id: string;
  project_id: string;
  slug: string;
  hero_title: string;
  hero_title_zh: string;
  hero_image: string;
  duration: string;
  duration_zh: string;
  role: string;
  role_zh: string;
  platform: string;
  platform_zh: string;
  client: string;
  client_zh: string;
  background_title: string;
  background_title_zh: string;
  background_content: string;
  background_content_zh: string;
  my_role_title: string;
  my_role_title_zh: string;
  my_role_content: string;
  my_role_content_zh: string;
  method_title: string;
  method_title_zh: string;
  method_intro: string;
  method_intro_zh: string;
  method_items: string[];
  method_items_zh: string[];
  results_title: string;
  results_title_zh: string;
  result_stat1_label: string;
  result_stat1_label_zh: string;
  result_stat1_value: string;
  result_stat2_label: string;
  result_stat2_label_zh: string;
  result_stat2_value: string;
  reflection_title: string;
  reflection_title_zh: string;
  reflection_content: string;
  reflection_content_zh: string;
  gallery_images: string[];
  gallery_captions: string[];
  gallery_captions_zh: string[];
  cta_title: string;
  cta_title_zh: string;
  cta_button_text: string;
  cta_button_text_zh: string;
  cta_link: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
