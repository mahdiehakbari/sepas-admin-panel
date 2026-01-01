import i18n from '@/i18n';

export const getThItems = () => [
  { id: 1, label: i18n.t('transaction:row') },
  { id: 4, label: i18n.t('transaction:transaction_number') },
  { id: 8, label: i18n.t('financial:transaction_type') },
  { id: 5, label: i18n.t('transaction:transaction_date') },
  { id: 6, label: i18n.t('transaction:amount') },
  { id: 3, label: i18n.t('transaction:customer_name') },
  { id: 2, label: i18n.t('transaction:acceptor_name') },
];
