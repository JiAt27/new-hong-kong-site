import { useTranslation } from 'react-i18next';

export default function LanguageToggle({ light = false }: { light?: boolean }) {
  const { i18n } = useTranslation();
  const isEs = i18n.language.startsWith('es');
  const base = light ? 'text-white/50' : 'text-navy-300';
  const active = light ? 'text-white font-bold' : 'text-brand-red font-bold';

  return (
    <button
      onClick={() => i18n.changeLanguage(isEs ? 'en' : 'es')}
      className="flex items-center gap-0.5 text-sm font-display transition-colors cursor-pointer"
      aria-label={isEs ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={isEs ? active : base}>ES</span>
      <span className={base}>/</span>
      <span className={!isEs ? active : base}>EN</span>
    </button>
  );
}
