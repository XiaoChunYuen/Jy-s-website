import { motion } from 'framer-motion';
import { ArrowRight, Layers, Palette, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMS } from '../cms/CMSContext';
import { useLanguage } from '../i18n/LanguageContext';
import { fadeInUp, staggerContainer, staggerItem } from '../shared/animations';

const serviceIcons = [Palette, Search, Layers, Sparkles];

export function Services() {
  const { content, isLoading } = useCMS();
  const { language } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  const isZh = language === 'zh';
  const services = content.services;
  const featureImage = content.servicesFeatureImage;

  return (
    <main className="w-full bg-[#fbfaf8]">
      <section className="relative overflow-hidden pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-end gap-10 px-6 lg:grid-cols-[1fr_420px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={staggerItem}
              className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.3em] text-stone-400"
            >
              {isZh ? content.servicesWhatIDoZh : content.servicesWhatIDo}
            </motion.span>
            <motion.h1
              variants={staggerItem}
              className="font-serif italic text-5xl leading-[1.04] text-stone-950 md:text-7xl lg:text-8xl"
            >
              {isZh ? content.servicesTitleZh : content.servicesTitle}
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="mt-8 max-w-xl text-[15px] leading-[1.9] text-stone-600"
            >
              {isZh ? content.servicesCtaDescZh : content.servicesCtaDesc}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-[8px] border border-stone-200 bg-stone-100 shadow-[0_30px_90px_rgba(28,25,23,0.10)]">
              {featureImage ? (
                <img
                  src={featureImage}
                  alt={isZh ? '服务页视觉图' : 'Services visual'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-8 text-center text-[13px] leading-7 text-stone-400">
                  {isZh ? '在后台上传一张服务页图片后，这里会展示你的视觉风格。' : 'Upload a services image in the dashboard to fill this visual area.'}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={staggerContainer}
          >
            {services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              const title = isZh ? service.title_zh || service.title : service.title;
              const description = isZh ? service.description_zh || service.description : service.description;

              return (
                <motion.article
                  key={service.id}
                  variants={staggerItem}
                  className="grid grid-cols-1 gap-8 border-t border-stone-200 py-10 md:grid-cols-[180px_1fr_260px] md:py-12"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-[12px] font-medium text-stone-300">{String(index + 1).padStart(2, '0')}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-stone-700">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif italic text-3xl leading-tight text-stone-950 md:text-4xl">
                      {title || (isZh ? '未命名服务' : 'Untitled service')}
                    </h2>
                    <p className="mt-5 max-w-2xl text-[15px] leading-[1.9] text-stone-600">
                      {description || (isZh ? '在后台补充这项服务的描述。' : 'Add the description for this service in the dashboard.')}
                    </p>
                  </div>

                  <div className="hidden overflow-hidden rounded-[8px] bg-stone-100 md:block">
                    {featureImage ? (
                      <img
                        src={featureImage}
                        alt=""
                        className="h-full min-h-[170px] w-full object-cover opacity-90"
                        style={{ objectPosition: `${35 + index * 12}% center` }}
                      />
                    ) : (
                      <div className="h-full min-h-[170px] bg-[linear-gradient(135deg,#f5f2ec,#e7e1d8)]" />
                    )}
                  </div>
                </motion.article>
              );
            })}

            {services.length === 0 && (
              <div className="flex min-h-[260px] items-center justify-center rounded-[8px] border border-dashed border-stone-300 bg-stone-50 px-6 text-center text-[14px] text-stone-500">
                {isZh ? '尚未配置服务内容。' : 'No services configured yet.'}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="bg-stone-950 py-16 md:py-20">
        <motion.div
          className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div>
            <h2 className="font-serif italic text-3xl text-white md:text-4xl">
              {isZh ? content.servicesCtaTitleZh : content.servicesCtaTitle}
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-[1.8] text-stone-400">
              {isZh ? content.servicesCtaDescZh : content.servicesCtaDesc}
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-stone-950 transition-colors hover:bg-stone-200"
          >
            {isZh ? content.servicesCtaButtonZh : content.servicesCtaButton}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
