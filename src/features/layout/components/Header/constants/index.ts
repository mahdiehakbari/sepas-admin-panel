import i18n from '@/i18n';
import { DropdownItem, NavItem } from '../types';

export const getNavItems = (): NavItem[] => [
  { id: 1, label: i18n.t('panel:main_page'), href: '/panel/dentalSociety' },
  { id: 2, label: i18n.t('panel:Frequently'), href: '/panel/dentalSociety' },
  { id: 3, label: i18n.t('panel:contact_us'), href: '/panel/dentalSociety' },
];

export const getDentistryAdminItems = (
  onLogout: () => void,
): DropdownItem[] => [
  {
    label: i18n.t('dental-society:dentist_definition'),
    image: '/assets/icons/transactions.svg',
    href: '/panel/dentistDefinition',
  },
  {
    label: i18n.t('dental-society:request_list'),
    image: '/assets/icons/transactions.svg',
    href: '#',
  },
  {
    label: i18n.t('dental-society:performance_report'),
    image: '/assets/icons/status-up.svg',
    href: '#',
  },
  {
    label: i18n.t('dental-society:doctor_list'),
    image: '/assets/icons/tag-user.svg',
    href: '#',
  },
  {
    label: i18n.t('panel:log_out'),
    image: '/assets/icons/logout.svg',
    danger: true,
    onClick: onLogout,
  },
];

export const getAdminItems = (onLogout: () => void): DropdownItem[] => [
  {
    label: i18n.t('panel:borrower_installments'),
    image: '/assets/icons/installments.svg',
    href: '/panel/reports/installment',
  },
  {
    label: i18n.t('panel:acceptor_settlement'),
    image: '/assets/icons/installments.svg',
    href: '/panel/reports/settlement',
  },
  {
    label: i18n.t('panel:transaction_list'),
    image: '/assets/icons/installments.svg',
    href: '/panel/transactionsList',
  },
  {
    label: i18n.t('panel:customer_management'),
    image: '/assets/icons/people.svg',
    href: '/panel/customerManagement',
  },
  {
    label: i18n.t('panel:Management_receivers'),
    image: '/assets/icons/profile-tick.svg',
    href: '/panel/managementReceivers',
  },

  {
    label: i18n.t('panel:log_out'),
    image: '/assets/icons/logout.svg',
    danger: true,
    onClick: onLogout,
  },
];
export const getFinancialItems = (onLogout: () => void): DropdownItem[] => [
  {
    label: i18n.t('panel:transaction_list'),
    image: '/assets/icons/transaction-financial.svg',
    href: '/panel/financialTransactionList',
  },
  {
    label: i18n.t('panel:borrowers_installments'),
    image: '/assets/icons/transaction-financial.svg',
    href: '#',
  },
  {
    label: i18n.t('panel:acceptor_settlement_list'),
    image: '/assets/icons/task-financial.svg',
    href: '/panel/financialSettlement',
  },
  // {
  //   label: i18n.t('financial:borrower_installment'),
  //   image: '/assets/icons/verify-financial.svg',
  //   href: '#',
  // },
  // {
  //   label: i18n.t('financial:recipient_settlement'),
  //   image: '/assets/icons/recipient_settlement.svg',
  //   href: '#',
  // },
  {
    label: i18n.t('panel:log_out'),
    image: '/assets/icons/logout.svg',
    danger: true,
    onClick: onLogout,
  },
];