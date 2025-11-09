import i18n from '@/i18n';

export const getThItems = () => [
  { id: 1, label: i18n.t('panel:row') },
  // { id: 2, label: i18n.t('panel:customer_name') },
  { id: 2, label: i18n.t('panel:settlement_name') },
  { id: 3, label: i18n.t('panel:settlement_date') },
  { id: 4, label: i18n.t('panel:settlement_amount') },
  { id: 5, label: i18n.t('panel:settlement_status') },
];
