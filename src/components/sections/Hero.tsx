import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getWhatsAppUrl } from '../../data/stores';
import heroBg from '../../assets/images/hero-bg.jpg';
import logoImg from '../../assets/images/logo.png';

export default function Hero() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className={`w-full h-full object-cover ${!reducedMotion ? 'animate-ken-burns' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-navy-900/70" />
      </div>

      {/* Floating clouds */}
      {!reducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="animate-float-clouds absolute top-[15%] left-0 w-[200%] h-16 opacity-[0.07]">
            <svg viewBox="0 0 2880 60" className="w-full h-full fill-white">
              <circle cx="120" cy="30" r="25" /><circle cx="150" cy="25" r="20" /><circle cx="175" cy="30" r="15" />
              <circle cx="450" cy="35" r="22" /><circle cx="480" cy="30" r="28" /><circle cx="510" cy="35" r="18" />
              <circle cx="900" cy="28" r="24" /><circle cx="930" cy="23" r="18" />
              <circle cx="1300" cy="32" r="26" /><circle cx="1330" cy="27" r="20" />
              <circle cx="1560" cy="30" r="25" /><circle cx="1590" cy="25" r="20" /><circle cx="1615" cy="30" r="15" />
              <circle cx="1890" cy="35" r="22" /><circle cx="1920" cy="30" r="28" />
              <circle cx="2340" cy="28" r="24" /><circle cx="2740" cy="32" r="26" />
            </svg>
          </div>
          <div className="animate-float-clouds absolute bottom-[20%] left-0 w-[200%] h-12 opacity-[0.05]" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
            <svg viewBox="0 0 2880 50" className="w-full h-full fill-white">
              <circle cx="200" cy="25" r="20" /><circle cx="230" cy="20" r="16" />
              <circle cx="700" cy="28" r="22" /><circle cx="730" cy="23" r="17" />
              <circle cx="1150" cy="25" r="20" /><circle cx="1180" cy="20" r="15" />
              <circle cx="1640" cy="25" r="20" /><circle cx="1670" cy="20" r="16" />
              <circle cx="2140" cy="28" r="22" /><circle cx="2590" cy="25" r="20" />
            </svg>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.img
          src={logoImg}
          alt="NEW HONG KONG"
          className="w-28 sm:w-36 md:w-40 mx-auto mb-8 drop-shadow-2xl"
          initial={reducedMotion ? undefined : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
        />

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight"
          initial={reducedMotion ? undefined : { y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {t('hero.headline')}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-white/90 mb-3 font-body max-w-xl mx-auto"
          initial={reducedMotion ? undefined : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {t('hero.subheadline')}
        </motion.p>

        <motion.p
          className="text-sm sm:text-base text-brand-gold/80 italic font-display mb-10"
          initial={reducedMotion ? undefined : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.a
          href={getWhatsAppUrl('Hola, me gustaría hacer un pedido de dumplings')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-whatsapp hover:bg-[#1ebe5a] text-white font-display font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          initial={reducedMotion ? undefined : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t('hero.cta')}
        </motion.a>
      </div>

      {/* Scroll indicator */}
      {!reducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2.5 }}
        >
          <div className="animate-[bounce-down_2s_ease-in-out_infinite]">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      )}
    </section>
  );
}
