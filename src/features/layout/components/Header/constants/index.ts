import i18n from '@/i18n';
import { NavItem } from '../types';

export const getNavItems = (): NavItem[] => [
  { id: 1, label: i18n.t('home:main_page'), href: '/' },
  { id: 2, label: i18n.t('home:Frequently'), href: '/' },
  { id: 3, label: i18n.t('home:contact_us'), href: '/' },
];
