interface IMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
  image: string;
}

export interface IDropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: IMenuItem[];
  position?: 'center' | 'left' | 'right';
}
