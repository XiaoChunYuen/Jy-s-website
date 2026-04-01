import { motion } from 'framer-motion';
import { useCMS } from '../cms/CMSContext';
import { Palette, Layers, Search, Globe, Sparkles, Zap } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Layers,
  Search,
  Globe,
  Sparkles,
  Zap,
};

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

export function Services() {
  const { content, isLoading } = useCMS();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  return (
    <main className="w-full">
      {/* Header Section with subtle background */}
      <section className="relative bg-stone-50 py-20 md:py-28">
        <div className="max-w-[1000px] mx-auto px-6">
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
              {content.servicesWhatIDo}
            </motion.span>
            <motion.h1
              variants={staggerItem}
              className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-stone-900 leading-[1.1]"
            >
              {content.servicesTitle}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div
            className="space-y-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {content.services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Palette;

              return (
                <motion.div
                  key={service.id}
                  variants={staggerItem}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 md:py-16 border-b border-stone-100 last:border-b-0"
                >
                  {/* Number & Icon */}
                  <div className="md:col-span-3 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-stone-600" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-1">
                        0{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-9">
                    <h2 className="font-serif italic text-2xl md:text-3xl mb-4 text-stone-900">
                      {service.title}
                    </h2>
                    <p className="text-[15px] text-stone-600 leading-[1.8] max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Fallback if no services */}
            {content.services.length === 0 && (
              <div className="text-center py-12 text-stone-400">
                No services configured yet.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-stone-900">
        <motion.div
          className="max-w-[800px] mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="font-serif italic text-3xl md:text-4xl text-white mb-6">
            {content.servicesCtaTitle}
          </h2>
          <p className="text-stone-400 text-[15px] leading-[1.8] mb-10 max-w-lg mx-auto">
            {content.servicesCtaDesc}
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-stone-900 px-10 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-stone-100 transition-colors rounded-md"
          >
            {content.servicesCtaButton}
          </a>
        </motion.div>
      </section>
    </main>
  );
}
