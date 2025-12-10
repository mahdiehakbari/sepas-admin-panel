import i18n from '@/i18n';

export const getSideBarItems = () => [
  {
    label: i18n.t('panel:borrower_installments'),
    path: '/panel/reports/installment',
    icon: '/assets/icons/installments.svg',
  },
  {
    label: i18n.t('panel:acceptor_settlement'),
    path: '/panel/reports/settlement',
    icon: '/assets/icons/installments.svg',
  },
];
export const getDentistrySideBarItems = () => [
  {
    label: i18n.t('dental-society:dentist_definition'),
    path: '/panel/dentistDefinition',
    icon: '/assets/icons/transactions.svg',
  },
  {
    label: i18n.t('dental-society:request_list'),
    path: '',
    icon: '/assets/icons/transactions.svg',
  },
  {
    label: i18n.t('dental-society:performance_report'),
    path: '',
    icon: '/assets/icons/status-up.svg',
  },
  {
    label: i18n.t('dental-society:doctor_list'),
    path: '',
    icon: '/assets/icons/tag-user.svg',
  },
];
