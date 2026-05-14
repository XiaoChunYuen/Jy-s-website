import type * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, ArrowLeft, Eye } from 'lucide-react';
import { useCMS } from '../cms/CMSContext';
import { useLanguage } from '../i18n/LanguageContext';
import { fadeInUp, staggerContainer, staggerItem } from '../shared/animations';
import { siteAssets } from '../shared/siteAssets';

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { content, isLoading, getCaseStudyBySlug } = useCMS();
  const { language } = useLanguage();

  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  const isZh = language === 'zh';

  // Fallback data if no case study found
  const heroTitle = (isZh ? caseStudy?.hero_title_zh || caseStudy?.hero_title : caseStudy?.hero_title) || (isZh ? '城市交通的未来' : 'The Future of Urban Transit');
  const heroImage = caseStudy?.hero_image || siteAssets.projects.urbanMobility;
  const duration = (isZh ? caseStudy?.duration_zh || caseStudy?.duration : caseStudy?.duration) || (isZh ? '12周 (2023秋季)' : '12 Weeks (Fall 2023)');
  const role = (isZh ? caseStudy?.role_zh || caseStudy?.role : caseStudy?.role) || (isZh ? '首席 UI/UX 设计师' : 'Lead UI/UX Designer');
  const platform = (isZh ? caseStudy?.platform_zh || caseStudy?.platform : caseStudy?.platform) || (isZh ? 'iOS 与 Web 仪表盘' : 'iOS & Web Dashboard');
  const client = (isZh ? caseStudy?.client_zh || caseStudy?.client : caseStudy?.client) || (isZh ? '大都会交通局' : 'Metropolis Transit Auth.');
  const backgroundTitle = (isZh ? caseStudy?.background_title_zh || caseStudy?.background_title : caseStudy?.background_title) || (isZh ? '背景' : 'Background');
  const backgroundContent = (isZh ? caseStudy?.background_content_zh || caseStudy?.background_content : caseStudy?.background_content) || (isZh ? '城市拥堵已经达到临界点...' : 'Urban congestion in the metropolitan area had reached a critical threshold...');
  const myRoleTitle = (isZh ? caseStudy?.my_role_title_zh || caseStudy?.my_role_title : caseStudy?.my_role_title) || (isZh ? '我的角色' : 'My Role');
  const myRoleContent = (isZh ? caseStudy?.my_role_content_zh || caseStudy?.my_role_content : caseStudy?.my_role_content) || (isZh ? '我负责端到端的设计流程...' : 'I led the end-to-end design process...');
  const methodTitle = (isZh ? caseStudy?.method_title_zh || caseStudy?.method_title : caseStudy?.method_title) || (isZh ? '方法' : 'Method');
  const methodIntro = (isZh ? caseStudy?.method_intro_zh || caseStudy?.method_intro : caseStudy?.method_intro) || (isZh ? '我们采用了混合方法研究：' : 'We utilized a Mixed-Methods Research approach:');
  const methodItems = (isZh ? caseStudy?.method_items_zh?.length ? caseStudy.method_items_zh : caseStudy?.method_items : caseStudy?.method_items) || (
    isZh
      ? ['在三个交通枢纽对 50 多名日常通勤者进行情境访谈。', '使用低保真线框快速迭代原型，测试导航流程。', '分析现有行程规划数据，识别关键摩擦点。']
      : ['Contextual inquiry with 50+ daily commuters across three transit hubs.', 'Rapid iterative prototyping using low-fidelity wireframes to test navigation flow.', 'Quantitative analysis of existing trip-planning data to identify friction points.']
  );
  const resultStat1Value = caseStudy?.result_stat1_value || '22%';
  const resultStat1Label = (isZh ? caseStudy?.result_stat1_label_zh || caseStudy?.result_stat1_label : caseStudy?.result_stat1_label) || (isZh ? '预订时间减少' : 'Reduction in booking time');
  const resultStat2Value = caseStudy?.result_stat2_value || '4.8/5';
  const resultStat2Label = (isZh ? caseStudy?.result_stat2_label_zh || caseStudy?.result_stat2_label : caseStudy?.result_stat2_label) || (isZh ? '用户满意度评分' : 'User satisfaction rating');
  const resultsTitle = (isZh ? caseStudy?.results_title_zh || caseStudy?.results_title : caseStudy?.results_title) || (isZh ? '结果' : 'Results');
  const reflectionTitle = (isZh ? caseStudy?.reflection_title_zh || caseStudy?.reflection_title : caseStudy?.reflection_title) || (isZh ? '反思' : 'Reflection');
  const reflectionContent = (isZh ? caseStudy?.reflection_content_zh || caseStudy?.reflection_content : caseStudy?.reflection_content) || (isZh ? '这个项目让我重新理解了“优雅摩擦”的重要性...' : 'This project taught me the importance of "graceful friction"...');
  const ctaTitle = (isZh ? caseStudy?.cta_title_zh || caseStudy?.cta_title : caseStudy?.cta_title) || (isZh ? '想深入了解？' : 'Want the deep dive?');
  const ctaButtonText = (isZh ? caseStudy?.cta_button_text_zh || caseStudy?.cta_button_text : caseStudy?.cta_button_text) || (isZh ? '查看完整报告' : 'View Full Report');
  const galleryImages = caseStudy?.gallery_images || [
    siteAssets.gallery.primary,
    siteAssets.gallery.secondary,
  ];
  const galleryCaptions = (isZh ? caseStudy?.gallery_captions_zh?.length ? caseStudy.gallery_captions_zh : caseStudy?.gallery_captions : caseStudy?.gallery_captions) || (
    isZh ? ['阶段 01：信息架构', '阶段 02：高保真界面'] : ['Phase 01: Information Architecture', 'Phase 02: High-Fidelity Interface']
  );
  const navWork = isZh ? content.navWorkZh : content.navWork;
  const caseStudyProcess = isZh ? content.caseStudyProcessZh : content.caseStudyProcess;
  const caseStudyPrevious = isZh ? content.caseStudyPreviousZh : content.caseStudyPrevious;
  const caseStudyBackToWork = isZh ? content.caseStudyBackToWorkZh : content.caseStudyBackToWork;
  const caseStudyNextProject = isZh ? content.caseStudyNextProjectZh : content.caseStudyNextProject;
  const nextProjectTitle = content.projects[1] ? (isZh ? content.projects[1].title_zh || content.projects[1].title : content.projects[1].title) : (isZh ? '下一个项目' : 'Next Project');

  return (
    <main className="w-full">
      {/* Header Section */}
      <section className="bg-stone-50 pt-16 pb-10">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* Breadcrumbs */}
          <motion.div
            className="flex items-center space-x-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link to="/" className="hover:text-stone-900 transition-colors">
              {navWork}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-stone-900">{heroTitle}</span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-4 max-w-4xl text-stone-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {heroTitle}
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            className="w-16 h-px bg-stone-300 mt-8"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>
      </section>

      {/* Hero Image — reduced height */}
      <section className="relative mb-12">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={heroImage}
                alt={heroTitle}
                className="w-full h-[35vh] md:h-[45vh] max-h-[420px] object-cover"
                fetchPriority="high"
              />
              {/* Bottom gradient overlay for smooth transition to content */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-50/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metadata — refined with vertical dividers */}
      <section className="py-10 border-y border-stone-100 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            className="flex flex-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { label: isZh ? '周期' : 'Duration', value: duration },
              { label: isZh ? '角色' : 'Role', value: role },
              { label: isZh ? '平台' : 'Platform', value: platform },
              { label: isZh ? '客户' : 'Client', value: client },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className={`flex-1 min-w-[140px] py-2 ${idx > 0 ? 'md:border-l md:border-stone-100 md:pl-8' : ''} ${idx > 0 ? 'mt-4 md:mt-0' : ''}`}
              >
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-1.5">
                  {item.label}
                </div>
                <div className="text-[14px] font-medium text-stone-900 leading-snug">{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column — wider for better reading */}
            <div className="lg:col-span-8">
              <ContentSection number="01" title={backgroundTitle}>
                <p className="text-[16px] text-stone-600 leading-[1.85]">
                  {backgroundContent}
                </p>
              </ContentSection>

              <ContentSection number="02" title={myRoleTitle}>
                <p className="text-[16px] text-stone-600 leading-[1.85]">
                  {myRoleContent}
                </p>
              </ContentSection>

              <ContentSection number="03" title={methodTitle}>
                <p className="text-[15px] text-stone-700 leading-relaxed mb-8 italic">
                  {methodIntro}
                </p>
                <div className="space-y-0">
                  {methodItems.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-5 py-5 border-t border-stone-100 first:border-t-0"
                    >
                      <span className="text-[11px] font-semibold tracking-wider text-stone-300 mt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[15px] text-stone-600 leading-[1.7]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </ContentSection>

              <ContentSection number="04" title={resultsTitle}>
                <div className="flex items-stretch gap-0">
                  <div className="flex-1 pr-8">
                    <div className="font-serif italic text-5xl md:text-6xl text-stone-900 leading-none mb-3">
                      {resultStat1Value}
                    </div>
                    <div className="w-8 h-px bg-stone-300 mb-3" />
                    <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-500">
                      {resultStat1Label}
                    </div>
                  </div>
                  <div className="w-px bg-stone-200" />
                  <div className="flex-1 pl-8">
                    <div className="font-serif italic text-5xl md:text-6xl text-stone-900 leading-none mb-3">
                      {resultStat2Value.includes('/') ? (
                        <>
                          {resultStat2Value.split('/')[0]}
                          <span className="text-3xl text-stone-400">/{resultStat2Value.split('/')[1]}</span>
                        </>
                      ) : (
                        resultStat2Value
                      )}
                    </div>
                    <div className="w-8 h-px bg-stone-300 mb-3" />
                    <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-500">
                      {resultStat2Label}
                    </div>
                  </div>
                </div>
              </ContentSection>

              <ContentSection number="05" title={reflectionTitle}>
                <blockquote className="relative pl-6 border-l-2 border-stone-200">
                  <p className="text-[16px] text-stone-600 leading-[1.85]">
                    {reflectionContent}
                  </p>
                </blockquote>
              </ContentSection>
            </div>

            {/* Right Column — Sticky, smaller images */}
            <div className="lg:col-span-4">
              <motion.div
                className="lg:sticky lg:top-32 space-y-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {galleryImages.slice(0, 2).map((img, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <figure className="group">
                      <div className="overflow-hidden rounded-lg shadow-sm mb-3">
                        <img
                          src={img}
                          alt={galleryCaptions[index] || `Gallery ${index + 1}`}
                          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                      <figcaption className="text-[11px] text-stone-400 tracking-wide">
                        {galleryCaptions[index] || `Phase 0${index + 1}`}
                      </figcaption>
                    </figure>
                  </motion.div>
                ))}

                {caseStudy?.cta_title && (
                  <motion.div
                    variants={staggerItem}
                    className="pt-6 border-t border-stone-100"
                  >
                    <p className="text-[13px] text-stone-500 leading-relaxed mb-5">
                      {ctaTitle}
                    </p>
                    <a
                      href={caseStudy.cta_link || '#'}
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-900 hover:text-stone-600 transition-colors group"
                    >
                      <span>{ctaButtonText}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery — smaller, more refined */}
      <section className="py-16 md:py-20 bg-stone-50">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span
              variants={staggerItem}
              className="block text-[10px] font-semibold tracking-[0.3em] uppercase text-stone-400 mb-3"
            >
              {caseStudyProcess}
            </motion.span>
            <motion.h2
              variants={staggerItem}
              className="font-serif italic text-2xl md:text-3xl text-stone-900"
            >
              {isZh ? '项目图集' : 'Project Gallery'}
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {galleryImages.map((src, index) => (
              <motion.div key={index} variants={staggerItem}>
                <figure className="group">
                  <div className="overflow-hidden rounded-lg mb-3 shadow-sm">
                    <img
                      src={src}
                      alt={galleryCaptions[index] || `Gallery ${index + 1}`}
                      className="w-full aspect-[16/10] object-cover transition-all duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="text-[11px] font-medium tracking-[0.1em] uppercase text-stone-500">
                    {galleryCaptions[index] || `Phase 0${index + 1}`}
                  </figcaption>
                </figure>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Next Project Navigation */}
      <section className="py-14 bg-white border-t border-stone-100">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <Link
              to="/"
              className="group flex items-center gap-4 text-stone-500 hover:text-stone-900 transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-stone-400 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-0.5">
                  {caseStudyPrevious}
                </div>
                <div className="font-serif italic text-lg">{caseStudyBackToWork}</div>
              </div>
            </Link>

            <Link
              to="/"
              className="group flex items-center gap-4 text-stone-500 hover:text-stone-900 transition-colors md:flex-row-reverse"
            >
              <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-stone-400 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="md:text-right">
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-0.5">
                  {caseStudyNextProject}
                </div>
                <div className="font-serif italic text-lg">
                  {nextProjectTitle}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Refined content section with chapter numbering
interface ContentSectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function ContentSection({ number, title, children }: ContentSectionProps) {
  return (
    <motion.article
      className="pb-14 mb-14 border-b border-stone-100 last:border-b-0 last:pb-0 last:mb-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="flex items-baseline gap-4 mb-8">
        <span className="text-[10px] font-semibold tracking-wider text-stone-300">
          {number}
        </span>
        <div className="flex-1 h-px bg-stone-100" />
        <h2 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400">
          {title}
        </h2>
      </div>
      {children}
    </motion.article>
  );
}
