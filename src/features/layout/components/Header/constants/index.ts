import i18n from '@/i18n';
import { NavItem } from '../types';

export const getNavItems = (): NavItem[] => [
  { id: 1, label: i18n.t('panel:main_page'), href: '/panel/dentalSociety' },
  { id: 2, label: i18n.t('panel:Frequently'), href: '/panel/dentalSociety' },
  { id: 3, label: i18n.t('panel:contact_us'), href: '/panel/dentalSociety' },
];
