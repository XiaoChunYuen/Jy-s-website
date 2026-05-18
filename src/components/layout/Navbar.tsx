import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { LanguageSwitch } from './LanguageSwitch';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCMS } from '../../cms/CMSContext';

export function Navbar() {
  const location = useLocation();
  const { language } = useLanguage();
  const { content, isLoading } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const useSolidChrome = !isHomePage || isScrolled;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', label: language === 'zh' ? content.navWorkZh : content.navWork },
    { path: '/services', label: language === 'zh' ? content.navServicesZh : content.navServices },
    { path: '/resume', label: language === 'zh' ? content.navResumeZh : content.navResume },
    { path: '/contact', label: language === 'zh' ? content.navContactZh : content.navContact },
  ];

  if (isLoading) {
    return <div className="h-[88px]" />;
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 pt-4 sm:pt-5">
          <div className="relative flex items-center justify-between gap-4">
            <Link
              to="/"
              className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2.5 font-serif italic text-xl font-medium tracking-tight transition-all duration-300 ${
                useSolidChrome
                  ? 'bg-white/88 text-stone-900 shadow-[0_12px_40px_rgba(28,25,23,0.08)] backdrop-blur-xl'
                  : 'text-white'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Jy's Channel</span>
            </Link>

            <div className="hidden md:flex flex-1 justify-center">
              <div
                className={`flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-300 ${
                  useSolidChrome
                    ? 'bg-white/88 shadow-[0_20px_50px_rgba(28,25,23,0.12)] backdrop-blur-xl ring-1 ring-black/5'
                    : 'bg-white/16 backdrop-blur-md ring-1 ring-white/18'
                }`}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`rounded-full px-4 py-2 text-[12px] font-medium tracking-[0.02em] transition-all duration-300 ${
                      isActive(item.path)
                        ? useSolidChrome
                          ? 'bg-stone-900 text-white'
                          : 'bg-white text-stone-900'
                        : useSolidChrome
                          ? 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                          : 'text-white/86 hover:bg-white/12 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="hidden md:block">
                <LanguageSwitch isScrolled={useSolidChrome} />
              </div>

              <button
                className={`md:hidden rounded-full p-3 transition-all duration-300 ${
                  useSolidChrome
                    ? 'bg-white/88 text-stone-900 shadow-[0_12px_40px_rgba(28,25,23,0.08)] backdrop-blur-xl'
                    : 'bg-white/16 text-white backdrop-blur-md'
                }`}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div
            className={`md:hidden mt-3 overflow-hidden rounded-[28px] transition-all duration-300 ${
              isMobileMenuOpen
                ? 'max-h-[360px] opacity-100'
                : 'max-h-0 opacity-0 pointer-events-none'
            } ${
              useSolidChrome
                ? 'bg-white/92 shadow-[0_20px_50px_rgba(28,25,23,0.14)] backdrop-blur-xl'
                : 'bg-black/25 backdrop-blur-xl'
            }`}
          >
            <div className="px-4 py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`rounded-2xl px-4 py-3 text-[14px] font-medium transition-colors ${
                      isActive(item.path)
                        ? useSolidChrome
                          ? 'bg-stone-900 text-white'
                          : 'bg-white text-stone-900'
                        : useSolidChrome
                          ? 'text-stone-700 hover:bg-stone-100'
                          : 'text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                <LanguageSwitch isScrolled={useSolidChrome} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-[88px]" />
    </>
  );
}
