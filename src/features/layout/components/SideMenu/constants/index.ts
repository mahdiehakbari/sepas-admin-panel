import i18n from '@/i18n';

export const getSideBarItems = () => [
  {
    label: i18n.t('panel:borrower_installments'),
    path: '#',
    icon: '/assets/icons/installments.svg',
  },
  {
    label: i18n.t('panel:acceptor_settlement'),
    path: '/panel/reports/settlement',
    icon: '/assets/icons/installments.svg',
  },
];
