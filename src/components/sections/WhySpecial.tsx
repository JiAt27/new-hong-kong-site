import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SectionWrapper from '../layout/SectionWrapper';
import { CloudPatternOverlay } from '../ui/CloudPattern';

const badgeKeys = ['meat', 'handmade', 'noMsg', 'noPreservatives', 'water', 'fresh', 'local'] as const;

const badgeIcons: Record<string, string> = {
  meat: '\u{1F969}',      // cut of meat
  handmade: '\u{1F91F}',  // hand
  noMsg: '\u{2716}',      // heavy multiplication
  noPreservatives: '\u{1F331}', // seedling
  water: '\u{1F4A7}',     // droplet
  fresh: '\u{2744}',      // snowflake
  local: '\u{1F1F2}\u{1F1FD}', // MX flag
};

export default function WhySpecial() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const shouldShow = visible || reducedMotion;

  useEffect(() => {
    if (reducedMotion) return;
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <SectionWrapper id="por-que" className="py-16 sm:py-24 bg-navy-500 text-white relative">
      <CloudPatternOverlay color="white" opacity={0.06} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            {t('whySpecial.title')}
          </h2>
          <p className="text-navy-200 text-lg">{t('whySpecial.subtitle')}</p>
        </div>

        {/* Badges grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {badgeKeys.map((key, i) => (
            <div
              key={key}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/15 transition-colors"
              style={{
                animation: shouldShow && !reducedMotion
                  ? `stamp-pop 0.5s ease-out ${i * 0.1}s both`
                  : undefined,
                opacity: shouldShow ? 1 : 0,
              }}
            >
              <span className="text-2xl mb-2 block" aria-hidden="true">
                {badgeIcons[key]}
              </span>
              <p className="text-sm font-display font-semibold leading-snug">
                {t(`whySpecial.badges.${key}`)}
              </p>
            </div>
          ))}

          {/* School lunch callout */}
          <div
            className="bg-brand-gold/20 backdrop-blur-sm rounded-xl p-4 text-center border border-brand-gold/30"
            style={{
              animation: visible && !reducedMotion
                ? `stamp-pop 0.5s ease-out ${badgeKeys.length * 0.1}s both`
                : undefined,
              opacity: visible || reducedMotion ? 1 : 0,
            }}
          >
            <span className="text-2xl mb-2 block" aria-hidden="true">{'\u{1F392}'}</span>
            <p className="text-sm font-display font-semibold leading-snug text-brand-gold">
              {t('whySpecial.lunch')}
            </p>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
