import i18n from '@/i18n';

export const getThItems = () => [
  { id: 1, label: i18n.t('settlement_status:row') },
  { id: 2, label: i18n.t('settlement_status:transaction_number') },
  { id: 3, label: i18n.t('settlement_status:settlement_date') },
  { id: 4, label: i18n.t('settlement_status:settlement_amount') },
  { id: 5, label: i18n.t('settlement_status:settlement_status') },
  // { id: 6, label: i18n.t('settlement_status:action') },
];
