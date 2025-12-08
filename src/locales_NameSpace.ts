export const localesNS = [
  'login',
  'panel',
  'installment',
  'transaction',
  'status_transaction',
  'customer-management',
  'dental-society',
] as const;
export type LocaleNS = (typeof localesNS)[number];

export const languages = ['en', 'fa'] as const;
export type Language = (typeof languages)[number];
