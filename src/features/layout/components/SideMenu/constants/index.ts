import i18n from '@/i18n';

export const getSideBarItems = () => [
  {
    label: i18n.t('panel:user_account'),
    path: '/panel/reports/installments',
    icon: '/assets/icons/installments.svg',
  },
  {
    label: i18n.t('panel:borrower_installments'),
    path: '',
    icon: '/assets/icons/document.svg',
  },
  {
    label: i18n.t('panel:acceptor_settlement'),
    path: '',
    icon: '/assets/icons/transaction-list.svg',
  },
];
