export const phoneRules = (t: (key: string) => string) => ({
  required: { value: true, message: t('login:phone_number_required') },
  pattern: { value: /^[0-9]+$/, message: t('login:phone_number_numbers_only') },
  minLength: { value: 11, message: t('login:phone_number_invalid') },
});

export const passwordRules = (t: (key: string) => string) => ({
  required: { value: true, message: t('login:password_required') },
});
