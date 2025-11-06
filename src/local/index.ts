import { sv } from './sv';
import { en } from './en';

export const translations = {
  sv,
  en,
};

export type Language = keyof typeof translations;