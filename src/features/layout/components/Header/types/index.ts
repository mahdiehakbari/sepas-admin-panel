export type NavItem = { id: number; label: string; href: string };

export interface IMobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
