import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SectionWrapper from '../layout/SectionWrapper';
import { CloudPatternOverlay } from '../ui/CloudPattern';
import JourneyMap from '../ui/JourneyMap';

const stops = [
  { key: 'shandong', color: '#C8102E' },
  { key: 'hongkong', color: '#E07C24' },
  { key: 'vancouver', color: '#2D6A4F' },
  { key: 'puebla', color: '#6B3FA0' },
] as const;

function TimelineStop({
  storyKey,
  color,
  index,
  isLast,
}: {
  storyKey: string;
  color: string;
  index: number;
  isLast: boolean;
}) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const shouldShow = visible || reducedMotion;

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-4 sm:gap-8">
      {/* Desktop: alternating sides */}
      <div className={`hidden sm:block flex-1 ${isEven ? 'text-right' : 'order-3 text-left'}`}>
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: shouldShow ? 1 : 0,
            transform: shouldShow
              ? 'translateX(0)'
              : `translateX(${isEven ? '30px' : '-30px'})`,
          }}
        >
          <span className="font-display text-sm font-bold" style={{ color }}>
            {t(`story.${storyKey}.year`)}
          </span>
          <h3 className="font-display text-xl font-bold text-navy-800 mt-1">
            {t(`story.${storyKey}.title`)}
          </h3>
          <p className="text-sm text-navy-600 mt-2 leading-relaxed max-w-xs inline-block">
            {t(`story.${storyKey}.text`)}
          </p>
        </div>
      </div>

      {/* Timeline spine */}
      <div className={`flex flex-col items-center flex-shrink-0 ${isEven ? '' : 'sm:order-2'}`}>
        <div
          className="w-5 h-5 rounded-full border-4 border-white shadow-md z-10 transition-all duration-500"
          style={{
            backgroundColor: shouldShow ? color : '#d4dce8',
            transform: shouldShow ? 'scale(1)' : 'scale(0.5)',
          }}
        />
        {!isLast && (
          <div className="w-0.5 h-24 sm:h-32 bg-navy-200 relative overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 bg-brand-red transition-all duration-1000 ease-out"
              style={{ height: shouldShow ? '100%' : '0%' }}
            />
          </div>
        )}
      </div>

      {/* Mobile: always right side */}
      <div className={`sm:hidden flex-1`}>
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: shouldShow ? 1 : 0,
            transform: shouldShow ? 'translateX(0)' : 'translateX(-20px)',
          }}
        >
          <span className="font-display text-sm font-bold" style={{ color }}>
            {t(`story.${storyKey}.year`)}
          </span>
          <h3 className="font-display text-lg font-bold text-navy-800 mt-1">
            {t(`story.${storyKey}.title`)}
          </h3>
          <p className="text-sm text-navy-600 mt-1 leading-relaxed">
            {t(`story.${storyKey}.text`)}
          </p>
        </div>
      </div>

      {/* Desktop: hidden placeholder for non-even side */}
      <div className={`hidden sm:block flex-1 ${isEven ? 'order-3' : ''}`} />
    </div>
  );
}

export default function OurStory() {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="historia" className="pt-10 sm:pt-14 pb-16 sm:pb-24 bg-brand-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
            {t('story.title')}
          </h2>
          <p className="text-navy-500 text-lg">{t('story.subtitle')}</p>
        </div>

        {/* Journey Map */}
        <JourneyMap />

        {/* Timeline */}
        <div className="relative">
          {stops.map((stop, i) => (
            <TimelineStop
              key={stop.key}
              storyKey={stop.key}
              color={stop.color}
              index={i}
              isLast={i === stops.length - 1}
            />
          ))}
        </div>

        {/* Narrative quote */}
        <div className="mt-12 bg-navy-500 text-white rounded-2xl p-8 text-center relative overflow-hidden">
          <CloudPatternOverlay color="white" opacity={0.05} />
          <div className="relative z-10">
            <svg className="w-8 h-8 text-brand-gold mx-auto mb-4 opacity-60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>
            <p className="text-sm sm:text-base leading-relaxed italic text-white/90 max-w-2xl mx-auto">
              {t('story.narrative')}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
