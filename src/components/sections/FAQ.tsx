import { useTranslation } from 'react-i18next';
import { faqKeys } from '../../data/faq';
import AccordionItem from '../ui/AccordionItem';
import SectionWrapper from '../layout/SectionWrapper';

export default function FAQ() {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 text-center mb-10">
          {t('faq.title')}
        </h2>

        <div className="bg-brand-cream rounded-2xl p-6 sm:p-8">
          {faqKeys.map((key) => (
            <AccordionItem
              key={key}
              question={t(`faq.items.${key}.q`)}
              answer={t(`faq.items.${key}.a`)}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
