export const faqKeys = ['what', 'frozen', 'refreeze', 'quantity', 'payment', 'delivery', 'allergens', 'authentic'] as const;
export type FaqKey = (typeof faqKeys)[number];
