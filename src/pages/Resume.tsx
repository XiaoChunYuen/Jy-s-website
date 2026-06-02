import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { useCMS } from '../cms/CMSContext';
import { useLanguage } from '../i18n/LanguageContext';
import { fadeInUpCompact, staggerContainerCompact, staggerItemCompact } from '../shared/animations';

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

  const isZh = language === 'zh';
  const resumeUrl = content.resumeFile?.file_url || '';
  const resumeTitle = isZh ? content.resumeHeaderTitleZh : content.resumeHeaderTitle;
  const downloadText = isZh ? content.resumeDownloadTextZh : content.resumeDownloadText;
  const pageTitle = resumeTitle || (isZh ? '个人简历' : 'Resume');
  const openText = isZh ? '新窗口打开' : 'Open';
  const emptyText = isZh
    ? '还没有上传简历 PDF。请先在后台上传文件。'
    : 'No resume PDF has been uploaded yet.';

  return (
    <main className="w-full min-h-screen bg-white">
      <section className="pt-16 pb-8 md:pt-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerCompact}
            className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <motion.div variants={staggerItemCompact} className="mb-3">
                <span className="inline-flex items-center px-3 py-1.5 bg-stone-100 text-stone-600 text-[10px] font-medium tracking-[0.2em] uppercase rounded-full">
                  {t.resume.subtitle}
                </span>
              </motion.div>
              <motion.h1
                variants={staggerItemCompact}
                className="font-serif italic text-4xl md:text-5xl text-stone-900"
              >
                {pageTitle}
              </motion.h1>
            </div>

            {resumeUrl && (
              <motion.div variants={staggerItemCompact} className="flex flex-wrap items-center gap-2">
                <a
                  href={resumeUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-[11px] font-medium rounded-full hover:bg-stone-800 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  {downloadText || t.resume.downloadPDF}
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-stone-600 bg-stone-100 text-[11px] font-medium rounded-full hover:bg-stone-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {openText}
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {resumeUrl ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpCompact}
              className="overflow-hidden border border-stone-200 bg-stone-100 shadow-[0_24px_80px_rgba(28,25,23,0.08)]"
            >
              <iframe
                title={pageTitle}
                src={`${resumeUrl}#view=FitH`}
                className="h-[76vh] min-h-[640px] w-full bg-white"
              />
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpCompact}
              className="flex min-h-[420px] flex-col items-center justify-center border border-dashed border-stone-300 bg-stone-50 px-6 text-center"
            >
              <FileText className="mb-4 h-10 w-10 text-stone-300" />
              <p className="text-[14px] text-stone-500">{emptyText}</p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
