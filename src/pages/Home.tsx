import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../cms/CMSContext';
import { useLanguage } from '../i18n/LanguageContext';
import { fadeInUp, staggerContainer, staggerItem } from '../shared/animations';
import './PhotoGallery.css';

// Compact Hero Section - 60vh height, full width
function HeroSection({ backgroundImage, title = "Welcome to Jy's Channel", subtitle = "Explore · Create · Share" }: {
  backgroundImage: string;
  title?: string;
  subtitle?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] flex items-center justify-center overflow-hidden -mt-[72px] pt-[72px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Hero background"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          referrerPolicy="no-referrer"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1
          className={`font-serif italic text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`text-base md:text-lg text-white/90 font-light tracking-[0.15em] uppercase transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

// Photo Gallery Component with Framer Motion
function PhotoGallery({ photos }: { photos: string[] }) {
  const [mainIndex, setMainIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const displayPhotos = photos.length > 0 ? photos : [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=800',
  ];

  // Larger spread radius & bigger scales for visible scattered photos
  const scatterPositions = [
    { x: -200, y: -90, rotate: -14, scale: 0.95, zIndex: 5 },
    { x: 180, y: -70, rotate: 10, scale: 1.0, zIndex: 6 },
    { x: -160, y: 120, rotate: -6, scale: 0.9, zIndex: 4 },
    { x: 210, y: 100, rotate: 16, scale: 0.92, zIndex: 5 },
    { x: 10, y: -160, rotate: 4, scale: 0.98, zIndex: 7 },
  ];

  const handlePhotoClick = (index: number) => {
    setMainIndex(index);
    // Keep hover state so user can keep browsing
  };

  return (
    <div
      className="photo-scatter"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Photo with crossfade on switch */}
      <div className="main-photo">
        <AnimatePresence mode="wait">
          <motion.img
            key={mainIndex}
            src={displayPhotos[mainIndex]}
            alt="Portrait"
            className="main-photo__image"
            referrerPolicy="no-referrer"
            loading="eager"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: isHovered ? 0.88 : 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </AnimatePresence>
      </div>

      {displayPhotos.map((photo, index) => {
        if (index === mainIndex) return null;
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
              type: "spring",
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
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Project Card Component
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
            referrerPolicy="no-referrer"
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
      {/* Hero Section */}
      <HeroSection
        backgroundImage={content.heroBackground}
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      {/* About Section - Below the fold */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Photo Gallery */}
            <motion.div
              className="flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <PhotoGallery photos={content.aboutPhotos} />
            </motion.div>

            {/* About Content */}
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

      {/* Portfolio Section */}
      <section className="relative">
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
                  imageSrc={project.image_url || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1000'}
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
                  imageSrc="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1000"
                  imageAlt="Urban Transit"
                  title={isZh ? '城市出行' : 'Urban Mobility'}
                  category={isZh ? 'UI/UX 设计 • 2023' : 'UI/UX Design • 2023'}
                  index={0}
                  viewProject={viewProject}
                />
                <motion.div className="md:mt-24" variants={staggerItem}>
                  <ProjectCard
                    to="/project/fintech-dashboard"
                    imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
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
