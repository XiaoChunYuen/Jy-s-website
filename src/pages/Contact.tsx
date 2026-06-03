import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, Globe, Mail } from 'lucide-react';
import { useCMS } from '../cms/CMSContext';
import { useLanguage } from '../i18n/LanguageContext';
import { fadeInUp, staggerContainer, staggerItem } from '../shared/animations';

function getOpenHref(value: string) {
  const trimmed = value.trim();
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return '';
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export function Contact() {
  const { content, isLoading } = useCMS();
  const { language } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  const isZh = language === 'zh';
  const contactMethods = content.socialLinks;
  const featureImage = content.contactFeatureImage;

  const handleCopy = async (id: string, value: string) => {
    try {
      await copyText(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1800);
    } catch (error) {
      console.error('Copy failed:', error);
      alert(isZh ? '复制失败，请手动复制。' : 'Copy failed. Please copy it manually.');
    }
  };

  return (
    <main className="w-full bg-[#fbfaf8]">
      <section className="pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={staggerItem}
              className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.3em] text-stone-400"
            >
              {isZh ? content.contactLetsConnectZh : content.contactLetsConnect}
            </motion.span>
            <motion.h1
              variants={staggerItem}
              className="font-serif italic text-5xl leading-[1.04] text-stone-950 md:text-7xl lg:text-8xl"
            >
              {isZh ? content.contactTitleZh : content.contactTitle}
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="mt-8 max-w-xl text-[15px] leading-[1.9] text-stone-600"
            >
              {isZh ? content.contactDescZh : content.contactDesc}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="overflow-hidden rounded-[8px] border border-stone-200 bg-stone-100 shadow-[0_30px_90px_rgba(28,25,23,0.10)]"
          >
            <div className="aspect-[4/3]">
              {featureImage ? (
                <img
                  src={featureImage}
                  alt={isZh ? '联系页视觉图' : 'Contact visual'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-8 text-center text-[13px] leading-7 text-stone-400">
                  {isZh ? '在后台上传联系页图片后，这里会变成你的个人视觉区域。' : 'Upload a contact image in the dashboard to fill this visual area.'}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-[320px_1fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeInUp}
          >
            <div className="sticky top-28">
              <Mail className="mb-6 h-8 w-8 text-stone-300" />
              <h2 className="font-serif italic text-3xl text-stone-950">
                {isZh ? content.contactSocialLabelZh : content.contactSocialLabel}
              </h2>
              <p className="mt-4 text-[14px] leading-[1.8] text-stone-500">
                {isZh ? content.contactSocialDescZh : content.contactSocialDesc}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-4"
          >
            {contactMethods.map((method) => {
              const openHref = getOpenHref(method.url);
              const isCopied = copiedId === method.id;

              return (
                <motion.article
                  key={method.id}
                  variants={staggerItem}
                  className="grid grid-cols-1 gap-5 rounded-[8px] border border-stone-200 bg-[#fbfaf8] p-5 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="mb-3 flex items-center gap-2 text-stone-400">
                      <Globe className="h-4 w-4" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                        {method.name}
                      </span>
                    </div>
                    <p className="break-all text-[16px] leading-7 text-stone-950">{method.url}</p>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(method.id, method.url)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-100"
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {isCopied ? (isZh ? '已复制' : 'Copied') : (isZh ? '复制' : 'Copy')}
                    </button>

                    {openHref && (
                      <a
                        href={openHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-stone-950 px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-stone-800"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {isZh ? '打开' : 'Open'}
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}

            {contactMethods.length === 0 && (
              <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[8px] border border-dashed border-stone-300 bg-stone-50 px-6 text-center">
                <Globe className="mb-4 h-9 w-9 text-stone-300" />
                <p className="text-[14px] text-stone-500">
                  {isZh ? '还没有添加联系方式。' : 'No contact methods have been added yet.'}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white py-12">
        <motion.div
          className="mx-auto max-w-6xl px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="font-serif italic text-3xl text-stone-800">
              {isZh ? content.footerTitleZh : content.footerTitle}
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
              {isZh ? content.footerCopyrightZh : content.footerCopyright}
            </div>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
