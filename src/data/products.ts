import chivePorkImg from '../assets/images/products/chive-pork.jpg';
import cabbagePorkImg from '../assets/images/products/cabbage-pork.jpg';
import koreanChickenImg from '../assets/images/products/korean-chicken.jpg';
import veganoImg from '../assets/images/products/vegano.jpg';
import soupDumplingsImg from '../assets/images/products/soup-dumplings.jpg';
import salsaImg from '../assets/images/products/salsa.jpg';

export interface Product {
  id: string;
  i18nKey: string;
  image: string;
  color: string;
  colorClass: string;
  bgClass: string;
  isBestSeller?: boolean;
  isSeasonal?: boolean;
  whatsappMsg: string;
}

export const products: Product[] = [
  {
    id: 'chive-pork',
    i18nKey: 'chivePork',
    image: chivePorkImg,
    color: '#1B365D',
    colorClass: 'text-navy-500',
    bgClass: 'bg-navy-500',
    isBestSeller: true,
    whatsappMsg: 'Hola, me gustaría pedir los dumplings de cebollín y cerdo',
  },
  {
    id: 'cabbage-pork',
    i18nKey: 'cabbagePork',
    image: cabbagePorkImg,
    color: '#1B365D',
    colorClass: 'text-navy-500',
    bgClass: 'bg-navy-500',
    whatsappMsg: 'Hola, me gustaría pedir los dumplings de col y cerdo',
  },
  {
    id: 'korean-chicken',
    i18nKey: 'koreanChicken',
    image: koreanChickenImg,
    color: '#6B3FA0',
    colorClass: 'text-brand-purple',
    bgClass: 'bg-brand-purple',
    whatsappMsg: 'Hola, me gustaría pedir los dumplings de pollo coreano',
  },
  {
    id: 'vegan',
    i18nKey: 'vegan',
    image: veganoImg,
    color: '#2D6A4F',
    colorClass: 'text-brand-green',
    bgClass: 'bg-brand-green',
    whatsappMsg: 'Hola, me gustaría pedir los dumplings veganos',
  },
  {
    id: 'soup-dumplings',
    i18nKey: 'soupDumplings',
    image: soupDumplingsImg,
    color: '#E07C24',
    colorClass: 'text-brand-orange',
    bgClass: 'bg-brand-orange',
    isSeasonal: true,
    whatsappMsg: 'Hola, me gustaría pedir los dumplings de sopa',
  },
  {
    id: 'salsa',
    i18nKey: 'salsa',
    image: salsaImg,
    color: '#C8102E',
    colorClass: 'text-brand-red',
    bgClass: 'bg-brand-red',
    whatsappMsg: 'Hola, me gustaría pedir la salsa picante NEW HONG KONG',
  },
];
