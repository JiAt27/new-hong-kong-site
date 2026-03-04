import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import logoImg from '../../assets/images/logo.png';

const navItems = [
  { key: 'products', href: '#productos' },
  { key: 'whySpecial', href: '#por-que' },
  { key: 'testimonials', href: '#testimonios' },
  { key: 'story', href: '#historia' },
  { key: 'howToCook', href: '#cocinar' },
  { key: 'faq', href: '#faq' },
  { key: 'whereToBuy', href: '#donde-comprar' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-cream/95 backdrop-blur-md shadow-md'
          : 'bg-gradient-to-b from-navy-900/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24 sm:h-28">
          <a href="#" className="flex-shrink-0">
            <img
              src={logoImg}
              alt="NEW HONG KONG"
              className={`transition-all duration-300 ${scrolled ? 'h-20 sm:h-24' : 'h-28 sm:h-36'}`}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`text-sm font-display font-medium transition-colors ${
                  scrolled
                    ? 'text-navy-600 hover:text-brand-red'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          <LanguageToggle light={!scrolled} />
        </div>
      </div>

      {/* Mobile pill navigation */}
      <div className="lg:hidden relative">
        <nav className="overflow-x-auto scrollbar-hide px-4 pb-2" aria-label="Mobile navigation">
          <div className="flex gap-2 min-w-max">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`whitespace-nowrap px-4 py-2 text-xs font-display font-semibold rounded-full transition-colors ${
                  scrolled
                    ? 'bg-navy-500/10 text-navy-600 hover:bg-navy-500 hover:text-white'
                    : 'bg-white/15 text-white/90 hover:bg-white/30'
                }`}
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>
        </nav>
        {/* Fade hint — indicates scrollable content to the right */}
        <div
          className={`pointer-events-none absolute right-0 top-0 bottom-2 w-10 ${
            scrolled
              ? 'bg-gradient-to-l from-brand-cream/90 to-transparent'
              : 'bg-gradient-to-l from-navy-900/40 to-transparent'
          }`}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
