import i18n from '@/i18n';

export const getSideBarItems = () => [
  {
    label: i18n.t('profile:user_account'),
    path: '/panel/userAccount',
    icon: '/assets/icons/white-user-acc.svg',
  },
  {
    label: i18n.t('profile:requests_list'),
    path: '/panel/requestList',
    icon: '/assets/icons/document.svg',
  },
  {
    label: i18n.t('profile:transactions_list'),
    path: '/panel/transactionList',
    icon: '/assets/icons/transaction-list.svg',
  },
  {
    label: i18n.t('profile:my_plans'),
    path: '/panel/myPlans',
    icon: '/assets/icons/my-plans.svg',
  },
];
