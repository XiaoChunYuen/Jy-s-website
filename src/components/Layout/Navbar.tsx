import { useState, useEffect } from 'react';
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

  // Check if we're on the home page (Hero background page)
  const isHomePage = location.pathname === '/';

  // Track scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force white background on non-home pages
  const shouldUseLightBg = !isHomePage || isScrolled;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  // Navigation items with CMS data
  const navItems = [
    { path: '/', label: language === 'zh' ? content.navWorkZh : content.navWork },
    { path: '/services', label: language === 'zh' ? content.navServicesZh : content.navServices },
    { path: '/resume', label: language === 'zh' ? content.navResumeZh : content.navResume },
    { path: '/contact', label: language === 'zh' ? content.navContactZh : content.navContact },
  ];

  if (isLoading) {
    return <div className="h-[72px]" />;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          shouldUseLightBg
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 max-w-[1400px] mx-auto w-full">
          {/* Logo - always in English */}
          <Link
            to="/"
            className={`flex items-center gap-2 font-serif italic text-2xl font-medium tracking-tight transition-colors duration-300 ${
              shouldUseLightBg ? 'text-stone-900' : 'text-white'
            }`}
          >
            <Heart className="w-5 h-5 fill-current" />
            <span>Jy's Channel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-[13px] font-medium tracking-wide">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-all duration-300 pb-1 border-b-2 ${
                  isActive(item.path)
                    ? shouldUseLightBg
                      ? 'text-stone-900 border-stone-900'
                      : 'text-white border-white'
                    : shouldUseLightBg
                    ? 'text-stone-500 border-transparent hover:text-stone-900'
                    : 'text-white/80 border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageSwitch isScrolled={shouldUseLightBg} />

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${shouldUseLightBg ? 'text-stone-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${shouldUseLightBg ? 'text-stone-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          } ${shouldUseLightBg ? 'bg-white/95 backdrop-blur-md' : 'bg-black/50 backdrop-blur-md'}`}
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block text-[14px] font-medium ${
                  shouldUseLightBg ? 'text-stone-900' : 'text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-[72px]" />
    </>
  );
}
