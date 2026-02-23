export interface Store {
  name: string;
  address: string;
  area: string;
  mapsUrl: string;
}

export const stores: Store[] = [
  {
    name: 'Arte Sano',
    address: 'Atzala 1802, Atzala, 72810 San Andrés Cholula, Pue.',
    area: 'Cholula',
    mapsUrl: 'https://www.google.com/maps/search/Arte+Sano+Ecological+Tienda+Cholula',
  },
  {
    name: 'La Regiomontana',
    address: '15 sur 1514, Residencial Zerezotla',
    area: 'Zerezotla',
    mapsUrl: 'https://www.google.com/maps/search/La+Regiomontana+Zerezotla+Cholula',
  },
];

export const WHATSAPP_NUMBER = '522216534481';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function getWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}
