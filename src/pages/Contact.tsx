import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, Globe } from 'lucide-react';
import { useCMS } from '../cms/CMSContext';
import { useLanguage } from '../i18n/LanguageContext';
import { fadeInUp, staggerContainer, staggerItem } from '../shared/animations';

function getOpenHref(value: string) {
  const trimmed = value.trim();
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return '';
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

  const handleCopy = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1800);
  };

  return (
    <main className="w-full">
      <section className="relative bg-stone-50 py-20 md:py-28">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.span
              variants={staggerItem}
              className="block text-[11px] font-semibold tracking-[0.3em] uppercase text-stone-400 mb-6"
            >
              {isZh ? content.contactLetsConnectZh : content.contactLetsConnect}
            </motion.span>
            <motion.h1
              variants={staggerItem}
              className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-stone-900 leading-[1.1] mb-8"
            >
              {isZh ? content.contactTitleZh : content.contactTitle}
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-[16px] text-stone-600 leading-[1.8] max-w-lg mx-auto"
            >
              {isZh ? content.contactDescZh : content.contactDesc}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={staggerItem}>
              <h2 className="font-serif italic text-3xl text-stone-900 mb-3">
                {isZh ? content.contactSocialLabelZh : content.contactSocialLabel}
              </h2>
              <p className="text-[14px] text-stone-500 leading-[1.7]">
                {isZh ? content.contactSocialDescZh : content.contactSocialDesc}
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="grid grid-cols-1 gap-4">
              {contactMethods.map((method) => {
                const openHref = getOpenHref(method.url);
                const isCopied = copiedId === method.id;

                return (
                  <div
                    key={method.id}
                    className="flex flex-col gap-4 rounded-lg border border-stone-200 bg-stone-50 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-2 text-stone-400">
                        <Globe className="h-4 w-4" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                          {method.name}
                        </span>
                      </div>
                      <p className="break-all text-[15px] text-stone-900">{method.url}</p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(method.id, method.url)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-stone-700 transition-colors hover:bg-stone-100"
                      >
                        {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {isCopied ? (isZh ? '已复制' : 'Copied') : (isZh ? '复制' : 'Copy')}
                      </button>

                      {openHref && (
                        <a
                          href={openHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-stone-800"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {isZh ? '打开' : 'Open'}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}

              {contactMethods.length === 0 && (
                <div className="flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-6 text-center">
                  <Globe className="mb-4 h-9 w-9 text-stone-300" />
                  <p className="text-[14px] text-stone-500">
                    {isZh ? '还没有添加联系方式。' : 'No contact methods have been added yet.'}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-stone-200 py-12 bg-white">
        <motion.div
          className="max-w-[800px] mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <div className="font-serif italic text-3xl text-stone-800 mb-8">
            {isZh ? content.footerTitleZh : content.footerTitle}
          </div>
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400">
            {isZh ? content.footerCopyrightZh : content.footerCopyright}
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
