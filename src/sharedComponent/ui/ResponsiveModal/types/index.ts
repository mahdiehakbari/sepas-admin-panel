import { ReactNode } from 'react';

export interface IResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;

  animationDuration?: number;
}
