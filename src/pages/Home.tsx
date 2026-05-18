import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '../cms/CMSContext';
import { useLanguage } from '../i18n/LanguageContext';
import { fadeInUp, staggerContainer, staggerItem } from '../shared/animations';
import { siteAssets } from '../shared/siteAssets';
import './PhotoGallery.css';

function HeroSection({
  backgroundImage,
  title = "Welcome to Jy's Channel",
  subtitle = 'Explore · Create · Share',
  primaryCta,
  secondaryCta,
}: {
  backgroundImage: string;
  title?: string;
  subtitle?: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative w-full min-h-[700px] overflow-hidden -mt-[88px] pt-[88px]">
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Hero background"
          fetchPriority="high"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.05)_22%,rgba(247,245,241,0.10)_56%,rgba(247,245,241,0.96)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.58)_42%,rgba(255,255,255,0)_78%)]" />
      </div>

      <div className="relative z-10 flex min-h-[700px] items-end justify-center px-6 pb-16 pt-32 sm:pb-20">
        <div className="mx-auto w-full max-w-4xl text-center">
          <div
            className={`transition-all duration-1000 delay-150 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-flex items-center rounded-full border border-black/6 bg-white/65 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500 backdrop-blur-md shadow-[0_12px_30px_rgba(28,25,23,0.06)]">
              Personal portfolio
            </span>
          </div>

          <h1
            className={`mt-8 font-serif text-5xl md:text-6xl lg:text-7xl text-stone-950 leading-[0.95] tracking-tight transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={`mx-auto mt-6 max-w-2xl text-[15px] md:text-lg text-stone-700 leading-[1.7] transition-all duration-1000 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {subtitle}
            </p>
          )}

          <div
            className={`mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Link
              to={primaryCta.to}
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_20px_40px_rgba(28,25,23,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800"
            >
              <span>{primaryCta.label}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to={secondaryCta.to}
              className="inline-flex items-center rounded-full border border-stone-900/12 bg-white/68 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-stone-800 backdrop-blur-md shadow-[0_12px_30px_rgba(28,25,23,0.06)] transition-all duration-300 hover:bg-white"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoGallery({ photos }: { photos: string[] }) {
  const [mainIndex, setMainIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const displayPhotos = photos.length > 0 ? photos : [...siteAssets.aboutPhotos];

  const scatterPositions = [
    { x: -200, y: -90, rotate: -14, scale: 0.95, zIndex: 5 },
    { x: 180, y: -70, rotate: 10, scale: 1.0, zIndex: 6 },
    { x: -160, y: 120, rotate: -6, scale: 0.9, zIndex: 4 },
    { x: 210, y: 100, rotate: 16, scale: 0.92, zIndex: 5 },
    { x: 10, y: -160, rotate: 4, scale: 0.98, zIndex: 7 },
  ];

  const handlePhotoClick = (index: number) => {
    setMainIndex(index);
  };

  return (
    <div
      className="photo-scatter"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="main-photo">
        <AnimatePresence mode="wait">
          <motion.img
            key={mainIndex}
            src={displayPhotos[mainIndex]}
            alt="Portrait"
            className="main-photo__image"
            loading="eager"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: isHovered ? 0.88 : 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </AnimatePresence>
      </div>

      {displayPhotos.map((photo, index) => {
        if (index === mainIndex) {
          return null;
        }
        const pos = scatterPositions[index % scatterPositions.length];

        return (
          <motion.div
            key={photo + index}
            className="scatter-photo"
            initial={false}
            animate={{
              x: isHovered ? pos.x : 0,
              y: isHovered ? pos.y : 0,
              rotate: isHovered ? pos.rotate : 0,
              scale: isHovered ? pos.scale : 0.55,
              opacity: isHovered ? 1 : 0,
              zIndex: pos.zIndex,
            }}
            whileHover={{
              scale: 1.08,
              rotate: 0,
              zIndex: 50,
              transition: { duration: 0.2 },
            }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 22,
              mass: 0.8,
              delay: isHovered ? index * 0.04 : 0,
            }}
            style={{
              position: 'absolute',
              cursor: 'pointer',
            }}
            onClick={() => handlePhotoClick(index)}
          >
            <img
              src={photo}
              alt={`Portrait ${index + 1}`}
              className="scatter-photo__image"
              loading="lazy"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

interface ProjectCardProps {
  to: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  category: string;
  index: number;
  viewProject: string;
}

function ProjectCard({ to, imageSrc, imageAlt, title, category, viewProject }: ProjectCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <Link to={to} className="group block">
        <div className="overflow-hidden mb-6 bg-stone-100 relative aspect-[4/3]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-all duration-500 flex items-center justify-center">
            <span className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              {viewProject}
            </span>
          </div>
        </div>

        <h3 className="text-3xl font-serif italic mb-3 text-stone-900 relative overflow-hidden">
          <span className="block transform group-hover:-translate-y-full transition-transform duration-500">
            {title}
          </span>
          <span className="absolute top-0 left-0 block transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-stone-600">
            {title}
          </span>
        </h3>

        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 group-hover:text-stone-600 transition-colors">
          {category}
        </p>
      </Link>
    </motion.div>
  );
}

export function Home() {
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
  const heroTitle = isZh ? content.heroTitleZh : content.heroTitle;
  const heroSubtitle = isZh ? content.heroSubtitleZh : content.heroSubtitle;
  const aboutTitle = isZh ? content.aboutTitleZh : content.aboutTitle;
  const aboutParagraphs = isZh ? content.aboutParagraphsZh : content.aboutParagraphs;
  const getInTouch = isZh ? content.getInTouchZh : content.getInTouch;
  const viewResume = isZh ? content.viewResumeZh : content.viewResume;
  const portfolioLabel = isZh ? content.portfolioLabelZh : content.portfolioLabel;
  const portfolioTitle = isZh ? content.portfolioTitleZh : content.portfolioTitle;
  const portfolioDesc = isZh ? content.portfolioDescZh : content.portfolioDesc;
  const viewProject = isZh ? content.viewProjectZh : content.viewProject;

  return (
    <main className="w-full">
      <HeroSection
        backgroundImage={content.heroBackground}
        title={heroTitle}
        subtitle={heroSubtitle}
        primaryCta={{ label: viewProject, to: '#featured-work' }}
        secondaryCta={{ label: viewResume, to: '/resume' }}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div
              className="flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <PhotoGallery photos={content.aboutPhotos} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={staggerItem}
                className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8 text-stone-900"
              >
                {aboutTitle}
              </motion.h2>

              <div className="space-y-5 text-[16px] text-stone-600 leading-[1.8]">
                {aboutParagraphs.slice(0, 3).map((text, index) => (
                  <motion.p key={index} variants={staggerItem}>
                    {text}
                  </motion.p>
                ))}
              </div>

              <motion.div variants={staggerItem} className="flex flex-wrap gap-4 mt-10">
                <Link
                  to="/contact"
                  className="bg-stone-900 text-white px-8 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-stone-800 transition-colors rounded-md"
                >
                  {getInTouch}
                </Link>
                <Link
                  to="/resume"
                  className="border border-stone-300 px-8 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors rounded-md"
                >
                  {viewResume}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="featured-work" className="relative scroll-mt-32">
        <div className="relative py-24 md:py-32 bg-stone-50">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <motion.div
                className="md:col-span-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
              >
                <motion.span
                  variants={staggerItem}
                  className="block text-[11px] font-semibold tracking-[0.3em] uppercase text-stone-400 mb-6"
                >
                  {portfolioLabel}
                </motion.span>
                <motion.h2
                  variants={staggerItem}
                  className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.1]"
                >
                  {portfolioTitle}
                </motion.h2>
              </motion.div>

              <motion.div
                className="md:col-span-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
              >
                <p className="text-[14px] text-stone-500 leading-[1.8]">
                  {portfolioDesc}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {content.projects.slice(0, 2).map((project, index) => (
              <motion.div
                key={project.id}
                className={index === 1 ? 'md:mt-24' : ''}
                variants={staggerItem}
              >
                <ProjectCard
                  to={`/project/${project.slug}`}
                  imageSrc={project.image_url || siteAssets.projects.urbanMobility}
                  imageAlt={isZh ? project.title_zh || project.title : project.title}
                  title={isZh ? project.title_zh || project.title : project.title}
                  category={isZh ? project.category_zh || project.category : project.category}
                  index={index}
                  viewProject={viewProject}
                />
              </motion.div>
            ))}

            {content.projects.length === 0 && (
              <>
                <ProjectCard
                  to="/project/urban-mobility"
                  imageSrc={siteAssets.projects.urbanMobility}
                  imageAlt="Urban Transit"
                  title={isZh ? '城市出行' : 'Urban Mobility'}
                  category={isZh ? 'UI/UX 设计 • 2023' : 'UI/UX Design • 2023'}
                  index={0}
                  viewProject={viewProject}
                />
                <motion.div className="md:mt-24" variants={staggerItem}>
                  <ProjectCard
                    to="/project/fintech-dashboard"
                    imageSrc={siteAssets.projects.fintechDashboard}
                    imageAlt="Fintech Dashboard"
                    title={isZh ? '金融科技仪表盘' : 'Fintech Dashboard'}
                    category={isZh ? '产品设计 • 2023' : 'Product Design • 2023'}
                    index={1}
                    viewProject={viewProject}
                  />
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
