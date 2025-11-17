import i18n from '@/i18n';

export const getThItems = () => [
  { id: 1, label: i18n.t('transaction:row') },
  { id: 2, label: i18n.t('transaction:customer_name') },
  { id: 3, label: i18n.t('transaction:phone_number') },
  { id: 4, label: i18n.t('transaction:transaction_date') },
  { id: 5, label: i18n.t('transaction:transaction_amount') },
  { id: 6, label: i18n.t('transaction:transaction_status') },
];
