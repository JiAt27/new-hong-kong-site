import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionWrapper from '../layout/SectionWrapper';

const methods = [
  {
    key: 'steam',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M14 28c0-5.5 4.5-10 10-10s10 4.5 10 10" />
        <path strokeLinecap="round" d="M10 36h28" />
        <path strokeLinecap="round" d="M18 20c-1-3-1-6 1-9M24 18c0-3 0-6 2-9M30 20c1-3 1-6-1-9" opacity="0.5" />
      </svg>
    ),
  },
  {
    key: 'panFry',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="22" cy="30" rx="14" ry="6" />
        <path strokeLinecap="round" d="M36 30l8-4" />
        <path strokeLinecap="round" d="M16 26c1-2 2-3 3-3s2 1 3 3M24 26c1-2 2-3 3-3s2 1 3 3" opacity="0.6" />
      </svg>
    ),
  },
  {
    key: 'boil',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M12 20h24v16a4 4 0 01-4 4H16a4 4 0 01-4-4V20z" />
        <path strokeLinecap="round" d="M10 20h28" />
        <circle cx="20" cy="32" r="2" opacity="0.4" />
        <circle cx="28" cy="30" r="1.5" opacity="0.4" />
        <circle cx="24" cy="35" r="1" opacity="0.4" />
        <path strokeLinecap="round" d="M20 16c0-2 1-4 2-5M28 16c0-2-1-4-2-5" opacity="0.5" />
      </svg>
    ),
  },
  {
    key: 'airFry',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="12" width="28" height="26" rx="4" />
        <circle cx="24" cy="25" r="8" />
        <path strokeLinecap="round" d="M20 25c0-2 2-4 4-4s4 2 4 4" opacity="0.5" />
        <circle cx="34" cy="16" r="1.5" fill="currentColor" opacity="0.4" />
        <path strokeLinecap="round" d="M14 10V8M34 10V8" opacity="0.3" />
      </svg>
    ),
  },
];

const servingKeys = ['salsa', 'salad', 'soup', 'noodles', 'peanut', 'kids'] as const;

const servingEmojis: Record<string, string> = {
  salsa: '🌶️',
  salad: '🥗',
  soup: '🍲',
  noodles: '🍜',
  peanut: '🥜',
  kids: '👶',
};

export default function HowToCook() {
  const { t } = useTranslation();
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <SectionWrapper id="cocinar" className="py-16 sm:py-24 bg-brand-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
            {t('howToCook.title')}
          </h2>
          <p className="text-navy-500 text-lg">{t('howToCook.subtitle')}</p>
        </div>

        {/* Warning */}
        <div className="bg-brand-red/10 border border-brand-red/30 rounded-xl px-6 py-4 text-center mb-10">
          <p className="font-display font-bold text-brand-red text-sm sm:text-base tracking-wide">
            {t('howToCook.warning')}
          </p>
        </div>

        {/* Method cards + Video — side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-8">
          {/* Method cards — stacked vertically on desktop to sit alongside video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {methods.map((method) => (
              <div
                key={method.key}
                className="bg-white rounded-2xl p-5 shadow-sm border border-navy-100 text-center lg:text-left lg:flex lg:items-center lg:gap-5 hover:shadow-md transition-shadow"
              >
                <div className="text-navy-500 flex justify-center lg:justify-start mb-3 lg:mb-0 lg:flex-shrink-0">
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-navy-800 mb-2 lg:mb-1">
                    {t(`howToCook.methods.${method.key}.title`)}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">
                    {t(`howToCook.methods.${method.key}.steps`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Vertical Video in phone frame */}
          <div className="flex justify-center">
            <div className="relative w-[260px] sm:w-[280px] rounded-[2.5rem] overflow-hidden bg-navy-900 shadow-2xl border-[5px] border-navy-800">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-navy-800 rounded-b-xl z-20" />

              {!videoPlaying ? (
                <button
                  onClick={() => setVideoPlaying(true)}
                  className="relative w-full aspect-[9/16] bg-gradient-to-b from-navy-700 to-navy-900 flex items-center justify-center group cursor-pointer"
                  aria-label={t('howToCook.videoTitle')}
                >
                  {/* Decorative steam lines */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-4 opacity-20">
                    <div className="w-0.5 h-12 bg-white rounded-full animate-pulse" />
                    <div className="w-0.5 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <div className="w-0.5 h-10 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-18 h-18 bg-brand-red/90 rounded-full flex items-center justify-center group-hover:bg-brand-red group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="font-display font-bold text-white text-sm drop-shadow-md px-4 text-center">
                      {t('howToCook.videoTitle')}
                    </span>
                  </div>

                  {/* Decorative dumpling */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-6xl opacity-20">
                    🥟
                  </div>
                </button>
              ) : (
                <video
                  className="w-full aspect-[9/16] object-cover"
                  autoPlay
                  controls
                  playsInline
                  src="/cooking-video.mp4"
                />
              )}
            </div>
          </div>
        </div>

        {/* Chicken note */}
        <p className="text-center text-sm text-navy-400 italic mb-12">
          {t('howToCook.chickenNote')}
        </p>

        {/* Serving Suggestions */}
        <div className="mt-4">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy-800 text-center mb-2">
            {t('howToCook.servingTitle')}
          </h3>
          <p className="text-navy-500 text-center mb-8">
            {t('howToCook.servingSubtitle')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {servingKeys.map((key) => (
              <div
                key={key}
                className="bg-white rounded-xl p-4 shadow-sm border border-navy-100 text-center hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mb-2 block">{servingEmojis[key]}</span>
                <p className="text-sm text-navy-700 leading-relaxed font-body">
                  {t(`howToCook.servings.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
