import i18n from '@/i18n';

export const getThItems = () => [
  { id: 1, label: i18n.t('panel:row') },
  { id: 2, label: i18n.t('panel:customer_name') },
  { id: 3, label: i18n.t('panel:national_code') },
  { id: 4, label: i18n.t('panel:account_no') },
  { id: 5, label: i18n.t('installment:due_date') },
  { id: 6, label: i18n.t('panel:amount') },
  { id: 7, label: i18n.t('panel:order') },
];
