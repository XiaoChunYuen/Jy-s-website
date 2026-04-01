import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, ArrowLeft, Eye } from 'lucide-react';
import { useCMS } from '../cms/CMSContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { content, isLoading, getCaseStudyBySlug } = useCMS();

  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  // Fallback data if no case study found
  const heroTitle = caseStudy?.hero_title || 'The Future of Urban Transit';
  const heroImage = caseStudy?.hero_image || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=2000';
  const duration = caseStudy?.duration || '12 Weeks (Fall 2023)';
  const role = caseStudy?.role || 'Lead UI/UX Designer';
  const platform = caseStudy?.platform || 'iOS & Web Dashboard';
  const client = caseStudy?.client || 'Metropolis Transit Auth.';
  const backgroundContent = caseStudy?.background_content || 'Urban congestion in the metropolitan area had reached a critical threshold...';
  const myRoleContent = caseStudy?.my_role_content || 'I led the end-to-end design process...';
  const methodIntro = caseStudy?.method_intro || 'We utilized a Mixed-Methods Research approach:';
  const methodItems = caseStudy?.method_items || [
    'Contextual inquiry with 50+ daily commuters across three transit hubs.',
    'Rapid iterative prototyping using low-fidelity wireframes to test navigation flow.',
    'Quantitative analysis of existing trip-planning data to identify friction points.'
  ];
  const resultStat1Value = caseStudy?.result_stat1_value || '22%';
  const resultStat1Label = caseStudy?.result_stat1_label || 'Reduction in booking time';
  const resultStat2Value = caseStudy?.result_stat2_value || '4.8/5';
  const resultStat2Label = caseStudy?.result_stat2_label || 'User satisfaction rating';
  const reflectionContent = caseStudy?.reflection_content || 'This project taught me the importance of "graceful friction"...';
  const ctaTitle = caseStudy?.cta_title || 'Want the deep dive?';
  const ctaButtonText = caseStudy?.cta_button_text || 'View Full Report';
  const galleryImages = caseStudy?.gallery_images || [
    'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  ];
  const galleryCaptions = caseStudy?.gallery_captions || ['Phase 01: Information Architecture', 'Phase 02: High-Fidelity Interface'];

  return (
    <main className="w-full">
      {/* Header Section */}
      <section className="bg-stone-50 pt-16 pb-12">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Breadcrumbs */}
          <motion.div
            className="flex items-center space-x-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link to="/" className="hover:text-stone-900 transition-colors">
              {content.navWork}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-stone-900">{heroTitle}</span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            className="font-serif italic text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-tight mb-8 max-w-5xl text-stone-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {heroTitle}
          </motion.h1>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative mb-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <img
              src={heroImage}
              alt={heroTitle}
              className="w-full h-[50vh] md:h-[65vh] object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Metadata */}
      <section className="py-12 border-y border-stone-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { label: 'Duration', value: duration },
              { label: 'Role', value: role },
              { label: 'Platform', value: platform },
              { label: 'Client', value: client },
            ].map((item) => (
              <motion.div key={item.label} variants={staggerItem}>
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-2">
                  {item.label}
                </div>
                <div className="text-[14px] font-medium text-stone-900">{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-20">
              <ContentSection title={caseStudy?.background_title || 'Background'}>
                <p className="text-[15px] text-stone-600 leading-[1.8]">
                  {backgroundContent}
                </p>
              </ContentSection>

              <ContentSection title={caseStudy?.my_role_title || 'My Role'}>
                <p className="text-[15px] text-stone-600 leading-[1.8]">
                  {myRoleContent}
                </p>
              </ContentSection>

              <ContentSection title={caseStudy?.method_title || 'Method'}>
                <div className="bg-stone-50 p-8 md:p-10 rounded-lg">
                  <p className="mb-6 text-[15px] text-stone-800 leading-relaxed">
                    {methodIntro}
                  </p>
                  <ul className="space-y-4">
                    {methodItems.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-[14px] text-stone-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ContentSection>

              <ContentSection title={caseStudy?.results_title || 'Results'}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="bg-stone-900 text-white p-8 rounded-lg">
                    <div className="font-serif italic text-5xl md:text-6xl mb-3">{resultStat1Value}</div>
                    <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-400">
                      {resultStat1Label}
                    </div>
                  </div>
                  <div className="bg-stone-100 p-8 rounded-lg">
                    <div className="font-serif italic text-5xl md:text-6xl mb-3 text-stone-900">
                      {resultStat2Value.includes('/') ? (
                        <>
                          {resultStat2Value.split('/')[0]}
                          <span className="text-3xl text-stone-400">/{resultStat2Value.split('/')[1]}</span>
                        </>
                      ) : (
                        resultStat2Value
                      )}
                    </div>
                    <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-500">
                      {resultStat2Label}
                    </div>
                  </div>
                </div>
              </ContentSection>

              <ContentSection title={caseStudy?.reflection_title || 'Reflection'}>
                <p className="text-[15px] text-stone-600 leading-[1.8]">
                  {reflectionContent}
                </p>
              </ContentSection>
            </div>

            {/* Right Column - Sticky */}
            <div className="lg:col-span-5">
              <motion.div
                className="lg:sticky lg:top-32 space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {galleryImages.slice(0, 2).map((img, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <img
                      src={img}
                      alt={galleryCaptions[index] || `Gallery ${index + 1}`}
                      className={`w-full ${index === 0 ? 'aspect-square' : 'aspect-[4/3]'} object-cover rounded-lg mb-6`}
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}

                {caseStudy?.cta_title && (
                  <motion.div
                    variants={staggerItem}
                    className="bg-stone-50 border border-stone-100 p-8 rounded-lg text-center"
                  >
                    <Eye className="w-6 h-6 text-stone-400 mx-auto mb-4" />
                    <h3 className="font-serif italic text-2xl mb-6 text-stone-900">
                      {ctaTitle}
                    </h3>
                    <a
                      href={caseStudy.cta_link || '#'}
                      className="w-full bg-stone-900 text-white px-6 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-stone-800 transition-colors rounded-md flex items-center justify-center gap-3"
                    >
                      <span>{ctaButtonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span
              variants={staggerItem}
              className="block text-[11px] font-semibold tracking-[0.3em] uppercase text-stone-400 mb-4"
            >
              {content.caseStudyProcess}
            </motion.span>
            <motion.h2
              variants={staggerItem}
              className="font-serif italic text-3xl md:text-4xl text-stone-900"
            >
              Project Gallery
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {galleryImages.map((src, index) => (
              <motion.div key={index} variants={staggerItem}>
                <div className="group overflow-hidden rounded-lg mb-4">
                  <img
                    src={src}
                    alt={galleryCaptions[index] || `Gallery ${index + 1}`}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-500">
                  {galleryCaptions[index] || `Phase 0${index + 1}`}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Next Project Navigation */}
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <Link
              to="/"
              className="group flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-stone-900 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-1">
                  {content.caseStudyPrevious}
                </div>
                <div className="font-serif italic text-xl">{content.caseStudyBackToWork}</div>
              </div>
            </Link>

            <Link
              to="/"
              className="group flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors md:flex-row-reverse"
            >
              <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-stone-900 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="md:text-right">
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-1">
                  {content.caseStudyNextProject}
                </div>
                <div className="font-serif italic text-xl">
                  {content.projects[1]?.title || 'Next Project'}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper component for content sections
interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
}

function ContentSection({ title, children }: ContentSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-6">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
