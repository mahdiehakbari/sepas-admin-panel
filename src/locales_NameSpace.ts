export const localesNS = [
  'login',
  'panel',
  'installment',
  'transaction',
  'status_transaction',
] as const;
export type LocaleNS = (typeof localesNS)[number];

export const languages = ['en', 'fa'] as const;
export type Language = (typeof languages)[number];
