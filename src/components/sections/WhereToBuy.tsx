import { useTranslation } from 'react-i18next';
import { stores } from '../../data/stores';
import { getWhatsAppUrl } from '../../data/stores';
import SectionWrapper from '../layout/SectionWrapper';

export default function WhereToBuy() {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="donde-comprar" className="py-16 sm:py-24 bg-brand-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 text-center mb-12">
          {t('whereToBuy.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Delivery card */}
          <div className="bg-whatsapp/10 border-2 border-whatsapp/30 rounded-2xl p-8 text-center flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-whatsapp/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-whatsapp" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.029-.504 1.008-1.124a23.76 23.76 0 00-1.392-6.656l-2.024-4.86A2.25 2.25 0 0016.05 4.5H7.95a2.25 2.25 0 00-2.098 1.44l-2.024 4.86A23.76 23.76 0 002.438 17.5c-.02.62.387 1.125 1.008 1.125H3.75" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-navy-800 mb-2">
                {t('whereToBuy.delivery.title')}
              </h3>
              <p className="text-sm text-navy-600 mb-6">
                {t('whereToBuy.delivery.subtitle')}
              </p>
            </div>
            <a
              href={getWhatsAppUrl('Hola, me gustaría información sobre entregas en Lomas')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-[#1ebe5a] text-white font-display font-bold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-md"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('whereToBuy.delivery.cta')}
            </a>
          </div>

          {/* Stores */}
          <div>
            <h3 className="font-display font-bold text-xl text-navy-800 mb-6 text-center md:text-left">
              {t('whereToBuy.stores.title')}
            </h3>
            <div className="space-y-4">
              {stores.map((store) => (
                <div
                  key={store.name}
                  className="bg-white rounded-xl p-5 shadow-sm border border-navy-100"
                >
                  <h4 className="font-display font-bold text-navy-800 mb-1">{store.name}</h4>
                  <p className="text-sm text-navy-500 mb-3">{store.address}</p>
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-display font-semibold text-brand-red hover:text-brand-red-dark transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {t('whereToBuy.stores.openMaps')}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
