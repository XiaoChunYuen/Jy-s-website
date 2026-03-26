/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Globe } from "lucide-react";
import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

// ScrollToTop component to handle routing scroll behavior
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="project/urban-mobility" element={<CaseStudy />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="resume" element={<Resume />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

function Layout() {
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-[1400px] mx-auto w-full">
        <Link to="/" className="font-serif italic text-2xl font-medium tracking-tight text-stone-900">Portfolio</Link>
        <div className="hidden md:flex items-center space-x-10 text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-500">
          <Link to="/" className={`${isActive('/') ? 'text-stone-900 border-b-2 border-stone-900' : 'hover:text-stone-900'} transition-colors pb-1`}>{t.nav.work}</Link>
          <Link to="/about" className={`${isActive('/about') ? 'text-stone-900 border-b-2 border-stone-900' : 'hover:text-stone-900'} transition-colors pb-1`}>{t.nav.about}</Link>
          <Link to="/services" className={`${isActive('/services') ? 'text-stone-900 border-b-2 border-stone-900' : 'hover:text-stone-900'} transition-colors pb-1`}>{t.nav.services}</Link>
          <Link to="/contact" className={`${isActive('/contact') ? 'text-stone-900 border-b-2 border-stone-900' : 'hover:text-stone-900'} transition-colors pb-1`}>{t.nav.contact}</Link>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-stone-100/80 rounded-full p-1">
            <button 
              onClick={() => setLanguage('en')} 
              className={`px-4 py-1.5 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-200 ${language === 'en' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('zh')} 
              className={`px-4 py-1.5 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-200 ${language === 'zh' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
            >
              中
            </button>
          </div>
          <Link to="/resume" className="rounded-full border border-stone-200 bg-white text-stone-700 px-7 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-stone-50 hover:text-stone-900 hover:border-stone-300 transition-all shadow-sm">
            {t.nav.resume}
          </Link>
        </div>
      </nav>

      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

function Home() {
  const { t } = useLanguage();
  return (
    <main className="max-w-[1200px] mx-auto px-6 pt-16 pb-24">
      <h1 className="font-serif italic text-6xl md:text-8xl lg:text-[100px] leading-[0.85] tracking-tight mb-24 max-w-4xl text-stone-900">
        {t.home.hero}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
        <Link to="/project/urban-mobility" className="group block">
          <div className="overflow-hidden mb-6 bg-stone-100">
            <img 
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1000" 
              alt="Urban Transit" 
              className="w-full aspect-[4/3] object-cover grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-3xl font-serif italic mb-3 text-stone-900">{t.home.project1.title}</h2>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400">{t.home.project1.category}</p>
        </Link>

        <Link to="/project/urban-mobility" className="group block md:mt-24">
          <div className="overflow-hidden mb-6 bg-stone-100">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
              alt="Fintech Dashboard" 
              className="w-full aspect-[4/3] object-cover grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-3xl font-serif italic mb-3 text-stone-900">{t.home.project2.title}</h2>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400">{t.home.project2.category}</p>
        </Link>
      </div>
    </main>
  );
}

function CaseStudy() {
  const { t } = useLanguage();
  return (
    <main className="max-w-[1200px] mx-auto px-6 pt-16 pb-24">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-10">
        <Link to="/" className="hover:text-stone-900 transition-colors">{t.caseStudy.breadcrumbs.work}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-stone-900">{t.caseStudy.breadcrumbs.current}</span>
      </div>

      {/* Hero Title */}
      <h1 className="font-serif italic text-6xl md:text-8xl lg:text-[120px] leading-[0.85] tracking-tight mb-16 max-w-5xl text-stone-900">
        {t.caseStudy.hero}
      </h1>

      {/* Hero Image */}
      <div className="relative mb-24">
        <img 
          src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=2000" 
          alt="Urban Transit" 
          className="w-full h-[50vh] md:h-[70vh] object-cover grayscale opacity-90"
          referrerPolicy="no-referrer"
        />
        {/* Decorative dotted line (SVG) */}
        <div className="absolute -bottom-16 right-12 md:right-32 w-64 h-32 hidden md:block opacity-40">
           <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20 Q 80 100 190 20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" fill="none" className="text-stone-500" />
           </svg>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-stone-200 py-10 mb-24">
        <div>
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-3">{t.caseStudy.meta.duration}</div>
          <div className="text-[13px] font-medium text-stone-900">{t.caseStudy.meta.durationValue}</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-3">{t.caseStudy.meta.role}</div>
          <div className="text-[13px] font-medium text-stone-900">{t.caseStudy.meta.roleValue}</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-3">{t.caseStudy.meta.platform}</div>
          <div className="text-[13px] font-medium text-stone-900">{t.caseStudy.meta.platformValue}</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-3">{t.caseStudy.meta.client}</div>
          <div className="text-[13px] font-medium text-stone-900">{t.caseStudy.meta.clientValue}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-24">
          <Section title={t.caseStudy.sections.background.title}>
            {t.caseStudy.sections.background.content}
          </Section>

          <Section title={t.caseStudy.sections.myRole.title}>
            {t.caseStudy.sections.myRole.content}
          </Section>

          <Section title={t.caseStudy.sections.method.title}>
            <div className="bg-[#f4f0ea] p-8 md:p-12">
              <p className="mb-8 text-[15px] text-stone-800 leading-relaxed">
                {t.caseStudy.sections.method.intro}
              </p>
              <ul className="space-y-5">
                {t.caseStudy.sections.method.items.map((item, idx) => (
                  <ListItem key={idx}>{item}</ListItem>
                ))}
              </ul>
            </div>
          </Section>

          <Section title={t.caseStudy.sections.results.title}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-4">
              <div className="border-l-2 border-blue-600 pl-6">
                <div className="font-serif italic text-6xl md:text-7xl mb-4 text-stone-900">22%</div>
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 leading-relaxed">{t.caseStudy.sections.results.stat1}</div>
              </div>
              <div className="border-l-2 border-blue-600 pl-6">
                <div className="font-serif italic text-6xl md:text-7xl mb-4 text-stone-900">4.8<span className="text-4xl text-stone-300">/5</span></div>
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 leading-relaxed">{t.caseStudy.sections.results.stat2}</div>
              </div>
            </div>
          </Section>

          <Section title={t.caseStudy.sections.reflection.title}>
            {t.caseStudy.sections.reflection.content}
          </Section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-8">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800" 
            alt="Designer working" 
            className="w-full aspect-square object-cover grayscale opacity-90"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800" 
            alt="Device detail" 
            className="w-full aspect-[4/3] object-cover grayscale opacity-90"
            referrerPolicy="no-referrer"
          />
          
          <div className="bg-white border border-stone-200 p-12 text-center mt-12 shadow-sm">
            <h3 className="font-serif italic text-3xl mb-8 text-stone-900">{t.caseStudy.deepDive.title}</h3>
            <button className="w-full bg-blue-600 text-white px-6 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3">
              <span>{t.caseStudy.deepDive.button}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Gallery */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400">{t.caseStudy.gallery.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1000" 
              alt="Information Architecture" 
              className="w-full aspect-[4/3] object-cover mb-6 grayscale opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400">
              {t.caseStudy.gallery.phase1}
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
              alt="High-Fidelity Interface" 
              className="w-full aspect-[4/3] object-cover mb-6 grayscale opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400">
              {t.caseStudy.gallery.phase2}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function About() {
  const { t } = useLanguage();
  return (
    <main className="max-w-[1000px] mx-auto px-6 pt-16 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="font-serif italic text-6xl md:text-8xl mb-8 text-stone-900">{t.about.title}</h1>
          <div className="space-y-6 text-[15px] text-stone-600 leading-[1.8]">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
            alt="Portrait" 
            className="w-full aspect-[3/4] object-cover grayscale opacity-90"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </main>
  );
}

function Services() {
  const { t } = useLanguage();
  return (
    <main className="max-w-[1000px] mx-auto px-6 pt-16 pb-24">
      <h1 className="font-serif italic text-6xl md:text-8xl mb-16 text-stone-900">{t.services.title}</h1>
      
      <div className="space-y-16">
        {t.services.items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-12">
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400">0{index + 1}</div>
            <div className="md:col-span-2">
              <h2 className="font-serif italic text-3xl mb-4 text-stone-900">{item.title}</h2>
              <p className="text-[15px] text-stone-600 leading-[1.8]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function Contact() {
  const { t } = useLanguage();
  return (
    <main className="max-w-[800px] mx-auto px-6 pt-16 pb-12 text-center flex flex-col min-h-[calc(100vh-140px)]">
      <div className="flex-grow">
        <h1 className="font-serif italic text-6xl md:text-8xl mb-8 text-stone-900">{t.contact.title}</h1>
        <p className="text-[15px] text-stone-600 leading-[1.8] mb-16 max-w-lg mx-auto">
          {t.contact.desc}
        </p>
        
        <a href={`mailto:${t.contact.email}`} className="inline-block bg-stone-900 text-white px-10 py-5 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-stone-800 transition-colors mb-24">
          {t.contact.email}
        </a>
      </div>

      {/* Footer moved to Contact page */}
      <footer className="border-t border-stone-200 pt-20 pb-8 text-center mt-auto">
        <div className="font-serif italic text-4xl text-stone-800 mb-12">{t.footer.title}</div>
        <div className="flex justify-center space-x-10 text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-500 mb-12">
          <a href="#" className="hover:text-stone-900 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Instagram</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Dribbble</a>
        </div>
        <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400">
          {t.footer.copyright}
        </div>
      </footer>
    </main>
  );
}

function Resume() {
  const { t } = useLanguage();
  return (
    <main className="max-w-[800px] mx-auto px-6 pt-16 pb-24">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
        <h1 className="font-serif italic text-6xl md:text-8xl text-stone-900">{t.about.resumeTitle}</h1>
        <button className="rounded-full border border-stone-200 bg-white px-7 py-3 text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm self-start md:self-auto">
          {t.about.downloadResume}
        </button>
      </div>
      
      <div className="space-y-16">
        <section>
          <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-8 border-b border-stone-200 pb-4">{t.about.experience}</h2>
          
          <div className="space-y-10">
            {t.about.jobs.map((job, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <h3 className="text-lg font-medium text-stone-900">{job.title}</h3>
                  <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-stone-500">{job.period}</span>
                </div>
                <div className="text-[14px] text-stone-500 mb-4">{job.company}</div>
                <p className="text-[14px] text-stone-600 leading-[1.6]">{job.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-8 border-b border-stone-200 pb-4">{t.about.education}</h2>
          
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h3 className="text-lg font-medium text-stone-900">{t.about.eduItem.degree}</h3>
              <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-stone-500">{t.about.eduItem.period}</span>
            </div>
            <div className="text-[14px] text-stone-500">{t.about.eduItem.school}</div>
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-8 border-b border-stone-200 pb-4">{t.about.skills}</h2>
          <div className="flex flex-wrap gap-3">
            {t.about.skillList.map(skill => (
              <span key={skill} className="bg-stone-100 px-4 py-2 text-[12px] text-stone-600 rounded-full">{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-12 h-px bg-stone-300"></div>
        <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400">{title}</h2>
      </div>
      <div className="text-[15px] text-stone-600 leading-[1.8]">
        {children}
      </div>
    </section>
  );
}

function ListItem({ children }: { children: React.ReactNode; key?: React.Key }) {
  return (
    <li className="flex items-start space-x-4">
      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
      <span className="text-[15px] text-stone-600 leading-[1.6]">{children}</span>
    </li>
  );
}
