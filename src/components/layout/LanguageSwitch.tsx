import { useLanguage } from '../../i18n/LanguageContext';

interface LanguageSwitchProps {
  isScrolled?: boolean;
}

export function LanguageSwitch({ isScrolled = true }: LanguageSwitchProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center rounded-full p-1 transition-colors duration-300 ${
      isScrolled ? 'bg-stone-100/80' : 'bg-white/20'
    }`}>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-1.5 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-stone-900 shadow-sm'
            : isScrolled
            ? 'text-stone-500 hover:text-stone-700'
            : 'text-white/80 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('zh')}
        className={`px-4 py-1.5 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-200 ${
          language === 'zh'
            ? 'bg-white text-stone-900 shadow-sm'
            : isScrolled
            ? 'text-stone-500 hover:text-stone-700'
            : 'text-white/80 hover:text-white'
        }`}
      >
        中
      </button>
    </div>
  );
}
