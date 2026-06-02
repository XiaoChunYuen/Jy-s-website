import type * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { useCMS } from '../cms/CMSContext';
import { useLanguage } from '../i18n/LanguageContext';
import { fadeInUp, staggerContainer, staggerItem } from '../shared/animations';
import { siteAssets } from '../shared/siteAssets';

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

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { content, isLoading, getCaseStudyBySlug } = useCMS();
  const { language } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  const isZh = language === 'zh';
  const project = slug ? content.projects.find((item) => item.slug === slug) : undefined;
  const caseStudy = slug
    ? getCaseStudyBySlug(slug) || (project ? content.caseStudies.find((item) => item.project_id === project.id) : undefined)
    : undefined;

  const pickText = (zhValue?: string, enValue?: string, fallback = '') => {
    if (isZh) {
      return zhValue || enValue || fallback;
    }

    return enValue || zhValue || fallback;
  };

  const projectTitle = pickText(project?.title_zh, project?.title, isZh ? '未命名作品' : 'Untitled Project');
  const projectDescription = pickText(project?.description_zh, project?.description);
  const projectCategory = pickText(project?.category_zh, project?.category);

  const heroTitle = pickText(caseStudy?.hero_title_zh, caseStudy?.hero_title, projectTitle);
  const heroImage = caseStudy?.hero_image || project?.image_url || siteAssets.projects.urbanMobility;
  const duration = pickText(caseStudy?.duration_zh, caseStudy?.duration);
  const role = pickText(caseStudy?.role_zh, caseStudy?.role);
  const platform = pickText(caseStudy?.platform_zh, caseStudy?.platform);
  const client = pickText(caseStudy?.client_zh, caseStudy?.client, projectCategory);
  const backgroundTitle = pickText(caseStudy?.background_title_zh, caseStudy?.background_title, isZh ? '项目概览' : 'Overview');
  const backgroundContent = pickText(caseStudy?.background_content_zh, caseStudy?.background_content, projectDescription);
  const myRoleTitle = pickText(caseStudy?.my_role_title_zh, caseStudy?.my_role_title, isZh ? '我的角色' : 'My Role');
  const myRoleContent = pickText(caseStudy?.my_role_content_zh, caseStudy?.my_role_content);
  const methodTitle = pickText(caseStudy?.method_title_zh, caseStudy?.method_title, isZh ? '方法' : 'Method');
  const methodIntro = pickText(caseStudy?.method_intro_zh, caseStudy?.method_intro);
  const methodItems = isZh && caseStudy?.method_items_zh?.length ? caseStudy.method_items_zh : caseStudy?.method_items || [];
  const resultsTitle = pickText(caseStudy?.results_title_zh, caseStudy?.results_title, isZh ? '结果' : 'Results');
  const resultStat1Value = caseStudy?.result_stat1_value || '';
  const resultStat1Label = pickText(caseStudy?.result_stat1_label_zh, caseStudy?.result_stat1_label);
  const resultStat2Value = caseStudy?.result_stat2_value || '';
  const resultStat2Label = pickText(caseStudy?.result_stat2_label_zh, caseStudy?.result_stat2_label);
  const reflectionTitle = pickText(caseStudy?.reflection_title_zh, caseStudy?.reflection_title, isZh ? '复盘' : 'Reflection');
  const reflectionContent = pickText(caseStudy?.reflection_content_zh, caseStudy?.reflection_content);
  const ctaTitle = pickText(caseStudy?.cta_title_zh, caseStudy?.cta_title, isZh ? '查看项目' : 'View the project');
  const ctaButtonText = pickText(caseStudy?.cta_button_text_zh, caseStudy?.cta_button_text, isZh ? '打开链接' : 'Open Link');
  const ctaLink = caseStudy?.cta_link || project?.link || '';
  const galleryImages = caseStudy?.gallery_images?.length ? caseStudy.gallery_images : [];
  const galleryCaptions = isZh && caseStudy?.gallery_captions_zh?.length ? caseStudy.gallery_captions_zh : caseStudy?.gallery_captions || [];

  const navWork = isZh ? content.navWorkZh : content.navWork;
  const caseStudyProcess = isZh ? content.caseStudyProcessZh : content.caseStudyProcess;
  const caseStudyPrevious = isZh ? content.caseStudyPreviousZh : content.caseStudyPrevious;
  const caseStudyBackToWork = isZh ? content.caseStudyBackToWorkZh : content.caseStudyBackToWork;
  const caseStudyNextProject = isZh ? content.caseStudyNextProjectZh : content.caseStudyNextProject;
  const currentProjectIndex = project ? content.projects.findIndex((item) => item.id === project.id) : -1;
  const nextProject = currentProjectIndex >= 0 ? content.projects[currentProjectIndex + 1] || content.projects[0] : content.projects[0];
  const nextProjectTitle = nextProject ? pickText(nextProject.title_zh, nextProject.title) : (isZh ? '下一个项目' : 'Next Project');

  if (!project && !caseStudy) {
    return (
      <main className="min-h-screen bg-white pt-24">
        <div className="max-w-[760px] mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-3 text-[12px] text-stone-500 hover:text-stone-900 transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" />
            {caseStudyBackToWork}
          </Link>
          <h1 className="font-serif italic text-4xl md:text-6xl text-stone-900 mb-6">
            {isZh ? '没有找到这个作品' : 'Project not found'}
          </h1>
          <p className="text-[15px] text-stone-500 leading-[1.8]">
            {isZh ? '这个详情页没有匹配到后台项目。请检查 Projects 里的 Detail Page Slug 是否和当前网址一致。' : 'This detail page does not match a project in the CMS. Check that the project slug matches the current URL.'}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      <section className="bg-white pt-16 pb-10">
        <div className="max-w-[1100px] mx-auto px-6">
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

          <motion.h1
            className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tight mb-5 max-w-4xl text-stone-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {heroTitle}
          </motion.h1>
        </div>
      </section>

      <section className="relative mb-12">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="relative overflow-hidden rounded-lg bg-stone-100">
              <img
                src={heroImage}
                alt={heroTitle}
                className="w-full h-[35vh] md:h-[52vh] max-h-[560px] object-cover"
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {(duration || role || platform || client) && (
        <section className="py-10 border-y border-stone-100 bg-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { label: isZh ? '周期' : 'Duration', value: duration },
                { label: isZh ? '角色' : 'Role', value: role },
                { label: isZh ? '平台' : 'Platform', value: platform },
                { label: isZh ? '类别' : 'Category', value: client },
              ].filter((item) => item.value).map((item) => (
                <motion.div key={item.label} variants={staggerItem}>
                  <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-1.5">
                    {item.label}
                  </div>
                  <div className="text-[14px] font-medium text-stone-900 leading-snug">{item.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-8">
              {backgroundContent && (
                <ContentSection number="01" title={backgroundTitle}>
                  <p className="text-[16px] text-stone-600 leading-[1.85]">
                    {backgroundContent}
                  </p>
                </ContentSection>
              )}

              {myRoleContent && (
                <ContentSection number="02" title={myRoleTitle}>
                  <p className="text-[16px] text-stone-600 leading-[1.85]">
                    {myRoleContent}
                  </p>
                </ContentSection>
              )}

              {(methodIntro || methodItems.length > 0) && (
                <ContentSection number="03" title={methodTitle}>
                  {methodIntro && (
                    <p className="text-[15px] text-stone-700 leading-relaxed mb-8 italic">
                      {methodIntro}
                    </p>
                  )}
                  {methodItems.length > 0 && (
                    <div className="space-y-0">
                      {methodItems.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-5 py-5 border-t border-stone-100 first:border-t-0">
                          <span className="text-[11px] font-semibold tracking-wider text-stone-300 mt-0.5">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[15px] text-stone-600 leading-[1.7]">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </ContentSection>
              )}

              {(resultStat1Value || resultStat2Value) && (
                <ContentSection number="04" title={resultsTitle}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {resultStat1Value && (
                      <StatBlock value={resultStat1Value} label={resultStat1Label} />
                    )}
                    {resultStat2Value && (
                      <StatBlock value={resultStat2Value} label={resultStat2Label} />
                    )}
                  </div>
                </ContentSection>
              )}

              {reflectionContent && (
                <ContentSection number="05" title={reflectionTitle}>
                  <blockquote className="relative pl-6 border-l-2 border-stone-200">
                    <p className="text-[16px] text-stone-600 leading-[1.85]">
                      {reflectionContent}
                    </p>
                  </blockquote>
                </ContentSection>
              )}
            </div>

            <div className="lg:col-span-4">
              <motion.div
                className="lg:sticky lg:top-32 space-y-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {galleryImages.slice(0, 2).map((img, index) => (
                  <motion.div key={img + index} variants={staggerItem}>
                    <figure>
                      <div className="overflow-hidden rounded-lg shadow-sm mb-3 bg-stone-100">
                        <img
                          src={img}
                          alt={galleryCaptions[index] || `Gallery ${index + 1}`}
                          className="w-full aspect-[4/5] object-cover"
                          loading="lazy"
                        />
                      </div>
                      {galleryCaptions[index] && (
                        <figcaption className="text-[11px] text-stone-400 tracking-wide">
                          {galleryCaptions[index]}
                        </figcaption>
                      )}
                    </figure>
                  </motion.div>
                ))}

                {ctaLink && (
                  <motion.div variants={staggerItem} className="pt-6 border-t border-stone-100">
                    <p className="text-[13px] text-stone-500 leading-relaxed mb-5">
                      {ctaTitle}
                    </p>
                    <a
                      href={ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-900 hover:text-stone-600 transition-colors group"
                    >
                      <span>{ctaButtonText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {galleryImages.length > 1 && (
        <section className="py-16 md:py-20 bg-stone-50">
          <div className="max-w-[1100px] mx-auto px-6">
            <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.span variants={staggerItem} className="block text-[10px] font-semibold tracking-[0.3em] uppercase text-stone-400 mb-3">
                {caseStudyProcess}
              </motion.span>
              <motion.h2 variants={staggerItem} className="font-serif italic text-2xl md:text-3xl text-stone-900">
                {isZh ? '项目图集' : 'Project Gallery'}
              </motion.h2>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              {galleryImages.map((src, index) => (
                <motion.div key={src + index} variants={staggerItem}>
                  <figure>
                    <div className="overflow-hidden rounded-lg mb-3 shadow-sm bg-stone-100">
                      <img
                        src={src}
                        alt={galleryCaptions[index] || `Gallery ${index + 1}`}
                        className="w-full aspect-[16/10] object-cover"
                        loading="lazy"
                      />
                    </div>
                    {galleryCaptions[index] && (
                      <figcaption className="text-[11px] font-medium tracking-[0.1em] uppercase text-stone-500">
                        {galleryCaptions[index]}
                      </figcaption>
                    )}
                  </figure>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-14 bg-white border-t border-stone-100">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <Link to="/" className="group flex items-center gap-4 text-stone-500 hover:text-stone-900 transition-colors">
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

            {nextProject && nextProject.id !== project?.id && (
              <Link to={`/project/${nextProject.slug}`} className="group flex items-center gap-4 text-stone-500 hover:text-stone-900 transition-colors md:flex-row-reverse">
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
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif italic text-5xl md:text-6xl text-stone-900 leading-none mb-3">
        {value.includes('/') ? (
          <>
            {value.split('/')[0]}
            <span className="text-3xl text-stone-400">/{value.split('/')[1]}</span>
          </>
        ) : (
          value
        )}
      </div>
      {label && (
        <>
          <div className="w-8 h-px bg-stone-300 mb-3" />
          <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-500">
            {label}
          </div>
        </>
      )}
    </div>
  );
}
