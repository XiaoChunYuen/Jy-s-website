import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCMS } from '../cms/CMSContext';
import './PhotoGallery.css';

// Animation variants
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

  const scatterPositions = [
    { x: -180, y: -80, rotate: -12, scale: 0.85, zIndex: 5 },
    { x: 160, y: -60, rotate: 8, scale: 0.9, zIndex: 6 },
    { x: -140, y: 100, rotate: -5, scale: 0.8, zIndex: 4 },
    { x: 190, y: 90, rotate: 15, scale: 0.82, zIndex: 5 },
    { x: 0, y: -140, rotate: 3, scale: 0.88, zIndex: 7 },
  ];

  return (
    <div
      className="photo-scatter"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`main-photo ${isHovered ? 'main-photo--scattered' : ''}`}>
        <img
          src={displayPhotos[mainIndex]}
          alt="Portrait"
          className="main-photo__image"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>

      {displayPhotos.map((photo, index) => {
        if (index === mainIndex) return null;
        const pos = scatterPositions[index % scatterPositions.length];

        return (
          <motion.div
            key={index}
            className="scatter-photo"
            initial={false}
            animate={{
              x: isHovered ? pos.x : 0,
              y: isHovered ? pos.y : 0,
              rotate: isHovered ? pos.rotate : 0,
              scale: isHovered ? pos.scale : 0.5,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: isHovered ? index * 0.03 : 0,
            }}
            style={{
              position: 'absolute',
              zIndex: pos.zIndex,
              cursor: 'pointer',
            }}
            onClick={() => setMainIndex(index)}
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  return (
    <main className="w-full">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={content.heroBackground}
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
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
                {content.aboutTitle}
              </motion.h2>

              <div className="space-y-5 text-[16px] text-stone-600 leading-[1.8]">
                {content.aboutParagraphs.slice(0, 3).map((text, index) => (
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
                  {content.getInTouch}
                </Link>
                <Link
                  to="/resume"
                  className="border border-stone-300 px-8 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors rounded-md"
                >
                  {content.viewResume}
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
                  {content.portfolioLabel}
                </motion.span>
                <motion.h2
                  variants={staggerItem}
                  className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.1]"
                >
                  {content.portfolioTitle}
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
                  {content.portfolioDesc}
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
                  imageAlt={project.title}
                  title={project.title}
                  category={project.category}
                  index={index}
                  viewProject={content.viewProject}
                />
              </motion.div>
            ))}

            {content.projects.length === 0 && (
              <>
                <ProjectCard
                  to="/project/urban-mobility"
                  imageSrc="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1000"
                  imageAlt="Urban Transit"
                  title="Urban Mobility"
                  category="UI/UX Design • 2023"
                  index={0}
                  viewProject={content.viewProject}
                />
                <motion.div className="md:mt-24" variants={staggerItem}>
                  <ProjectCard
                    to="/project/fintech-dashboard"
                    imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
                    imageAlt="Fintech Dashboard"
                    title="Fintech Dashboard"
                    category="Product Design • 2023"
                    index={1}
                    viewProject={content.viewProject}
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
