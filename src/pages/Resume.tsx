import { motion } from 'framer-motion';
import { useCMS } from '../cms/CMSContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Download, Eye, GraduationCap, Briefcase, Trophy, Users } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

interface ResumeItem {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
}

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  items: ResumeItem[];
  index: number;
}

function Section({ icon, title, items, index }: SectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="border-t border-stone-200 py-10 md:py-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
        {/* Left: Section Title */}
        <motion.div variants={staggerItem} className="md:col-span-3">
          <div className="flex items-center gap-2 text-stone-400">
            {icon}
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">
              {title}
            </span>
          </div>
        </motion.div>

        {/* Right: Content */}
        <div className="md:col-span-9">
          <div className="space-y-8">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                className="group"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                  <h3 className="text-[15px] font-medium text-stone-900">{item.title}</h3>
                  <span className="text-[12px] text-stone-400 tracking-wide">
                    {item.period}
                  </span>
                </div>

                <div className="text-[13px] text-stone-500 mb-2">{item.subtitle}</div>

                {item.description && (
                  <p className="text-[13px] text-stone-600 leading-relaxed">{item.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function Resume() {
  const { content, isLoading } = useCMS();
  const { t, language } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-400 text-sm">Loading...</div>
      </div>
    );
  }

  // Use CMS data if available, otherwise fallback to translations
  const educationList: ResumeItem[] = content.resumeEducations?.length > 0
    ? content.resumeEducations.map((edu: any) => ({
        title: edu.degree,
        subtitle: edu.school,
        period: edu.period,
        description: edu.description
      }))
    : t.resume.educationList;

  const internshipList: ResumeItem[] = content.resumeInternships?.length > 0
    ? content.resumeInternships.map((item: any) => ({
        title: item.title,
        subtitle: item.company,
        period: item.period,
        description: item.description
      }))
    : t.resume.internshipList;

  const competitionList: ResumeItem[] = content.resumeCompetitions?.length > 0
    ? content.resumeCompetitions.map((item: any) => ({
        title: item.title,
        subtitle: item.organizer,
        period: item.period,
        description: item.description
      }))
    : t.resume.competitionList;

  const campusList: ResumeItem[] = content.resumeCampus?.length > 0
    ? content.resumeCampus.map((item: any) => ({
        title: item.title,
        subtitle: item.organization,
        period: item.period,
        description: item.description
      }))
    : t.resume.campusList;

  const hasResumeFile = content.resumeFile?.file_url;

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Header */}
      <section className="pt-16 pb-6 md:pt-20 md:pb-8">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <motion.div variants={staggerItem} className="mb-3">
                <span className="inline-flex items-center px-3 py-1.5 bg-stone-100 text-stone-600 text-[10px] font-medium tracking-wider uppercase rounded-full">
                  {t.resume.subtitle}
                </span>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="font-serif italic text-3xl md:text-4xl text-stone-900"
              >
                {language === 'zh' ? '个人简历' : 'Resume'}
              </motion.h1>
            </div>

            {/* PDF Actions */}
            <motion.div variants={staggerItem} className="flex items-center gap-2">
              {hasResumeFile ? (
                <>
                  <a
                    href={content.resumeFile.file_url}
                    download
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-[11px] font-medium rounded-full hover:bg-stone-800 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t.resume.downloadPDF}
                  </a>
                  <a
                    href={content.resumeFile.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-stone-600 bg-stone-100 text-[11px] font-medium rounded-full hover:bg-stone-200 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {t.resume.previewPDF}
                  </a>
                </>
              ) : (
                <span className="text-[12px] text-stone-400 italic">
                  {t.resume.noFile}
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Resume Content */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-6">
          <Section
            icon={<GraduationCap className="w-4 h-4" />}
            title={t.resume.education}
            items={educationList}
            index={0}
          />

          <Section
            icon={<Briefcase className="w-4 h-4" />}
            title={t.resume.internship}
            items={internshipList}
            index={1}
          />

          <Section
            icon={<Trophy className="w-4 h-4" />}
            title={t.resume.competition}
            items={competitionList}
            index={2}
          />

          <Section
            icon={<Users className="w-4 h-4" />}
            title={t.resume.campus}
            items={campusList}
            index={3}
          />
        </div>
      </section>
    </main>
  );
}
