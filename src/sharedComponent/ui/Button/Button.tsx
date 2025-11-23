import { forwardRef } from 'react';
import { ButtonProps } from './types';
import { cn } from '@/sharedComponent/lib/utils';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'cursor-pointer inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none  disabled:opacity-50 disabled:pointer-events-none',

          variant === 'primary' &&
            'bg-(--second-primary) text-white hover:bg-(--second-primary-hover) focus:ring-(--second-primary-hover) disabled:bg-(--second-primary-disabled)  disabled:text-(--text-disabled)',

          variant === 'outline' &&
            'bg-transparent border border-primary text-primary hover:border-(--second-primary-hover) hover:text-(--second-primary-hover) disabled:bg-(--button-outline-disabled) disabled:text-(--text-disabled) disabled:border-gray',

          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' &&
            'w-[161px] h-[42px] text-base font-medium text-[16px]',
          size === 'lg' && 'w-[275px] h-[42px] font-medium text-[16px]',

          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };
