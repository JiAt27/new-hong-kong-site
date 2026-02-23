import { useTranslation } from 'react-i18next';
import { products } from '../../data/products';
import ProductCard from '../ui/ProductCard';
import SectionWrapper from '../layout/SectionWrapper';

export default function Products() {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="productos" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
            {t('products.title')}
          </h2>
          <p className="text-navy-500 text-lg">{t('products.subtitle')}</p>
        </div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
