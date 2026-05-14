import { motion } from 'framer-motion';
import { useCMS } from '../cms/CMSContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Mail, ArrowUpRight, Linkedin, Instagram, Dribbble, Github, Twitter, Youtube, Globe } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../shared/animations';

const iconMap = {
  Linkedin,
  Instagram,
  Dribbble,
  Github,
  Twitter,
  Youtube,
  Globe,
};

// 电话图标 - 蓝色
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#2563EB">
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.057 15.057 0 01-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1.01A11.36 11.36 0 018.59 3.99c0-.55-.45-1-1-1H4.08c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM5.03 5h1.5c.07.88.22 1.75.45 2.58l-1.2 1.21c-.4-1.21-.66-2.47-.75-3.79zM19 18.97c-1.32-.09-2.6-.35-3.8-.76l1.2-1.2c.85.24 1.72.39 2.6.45v1.51z"/>
    </svg>
  );
}

// 自定义微信图标 - 绿色
function WechatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#07C160">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
    </svg>
  );
}

// 小红书图标 - 红色书本SVG
function XiaohongshuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FE2C55">
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
    </svg>
  );
}

export function Contact() {
  const { content, isLoading } = useCMS();
  const { t, language } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  const isZh = language === 'zh';

  return (
    <main className="w-full">
      {/* Header Section */}
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

      {/* Contact Options */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Email Card */}
            <motion.div variants={staggerItem}>
              <div className="bg-stone-50 p-8 md:p-10 rounded-lg h-full">
                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center mb-6">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-serif italic text-2xl text-stone-900 mb-4">{isZh ? content.contactEmailLabelZh : content.contactEmailLabel}</h2>
                <p className="text-[14px] text-stone-500 mb-6 leading-[1.6]">
                  {isZh ? content.contactEmailDescZh : content.contactEmailDesc}
                </p>
                <a
                  href={`mailto:${content.contactEmail}`}
                  className="inline-flex items-center gap-2 text-stone-900 text-[13px] font-medium hover:gap-3 transition-all group"
                >
                  {content.contactEmail}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>

            {/* Social Links Card */}
            <motion.div variants={staggerItem}>
              <div className="bg-stone-50 p-8 md:p-10 rounded-lg h-full">
                <h2 className="font-serif italic text-2xl text-stone-900 mb-4">{isZh ? content.contactSocialLabelZh : content.contactSocialLabel}</h2>
                <p className="text-[14px] text-stone-500 mb-6 leading-[1.6]">
                  {isZh ? content.contactSocialDescZh : content.contactSocialDesc}
                </p>
                <div className="space-y-3">
                  {content.socialLinks.map((link) => {
                    const IconComponent = iconMap[link.icon] || Globe;
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-stone-600 hover:text-stone-900 transition-colors group"
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-[13px] font-medium">{link.name}</span>
                        <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                      </a>
                    );
                  })}

                  {/* Fallback social links - 电话、微信、小红书 */}
                  {content.socialLinks.length === 0 && (
                    <>
                      <a
                        href="tel:+8612345678900"
                        className="flex items-center gap-3 text-stone-600 hover:text-stone-900 transition-colors group"
                      >
                        <PhoneIcon className="w-4 h-4" />
                        <span className="text-[13px] font-medium">{t.contact.phone}</span>
                        <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-3 text-stone-600 hover:text-stone-900 transition-colors group"
                      >
                        <WechatIcon className="w-4 h-4" />
                        <span className="text-[13px] font-medium">{t.contact.wechat}</span>
                        <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                      </a>
                      <a
                        href="https://xiaohongshu.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-stone-600 hover:text-stone-900 transition-colors group"
                      >
                        <XiaohongshuIcon className="w-4 h-4" />
                        <span className="text-[13px] font-medium">{t.contact.xiaohongshu}</span>
                        <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 bg-white">
        <motion.div
          className="max-w-[800px] mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <div className="font-serif italic text-3xl text-stone-800 mb-8">{isZh ? content.footerTitleZh : content.footerTitle}</div>
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400">
            {isZh ? content.footerCopyrightZh : content.footerCopyright}
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
