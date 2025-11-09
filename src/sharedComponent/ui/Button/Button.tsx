import { forwardRef } from 'react';
import { ButtonProps } from './types';
import { cn } from '@/sharedComponent/lib/utils';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'cursor-pointer inline-flex items-center justify-center font-medium rounded-[8px] transition-colors focus:outline-none  disabled:opacity-50 disabled:pointer-events-none',

          variant === 'primary' &&
            'bg-[var(--second-primary)] text-white hover:bg-[var(--second-primary-hover)] focus:ring-[var(--second-primary-hover)] disabled:bg-[var(--second-primary-disabled)]  disabled:text-[var(--text-disabled)]',

          variant === 'outline' &&
            'bg-transparent border border-primary text-primary hover:border-[var(--second-primary-hover)] hover:text-[var(--second-primary-hover)] disabled:bg-[var(--button-outline-disabled)] disabled:text-[var(--text-disabled)] disabled:border-[var(--border-color-gray)]',

          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' &&
            'w-[161px] h-[42px] text-base font-[500] text-[16px]',
          size === 'lg' && 'w-[275px] h-[42px] font-[500] text-[16px]',

          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };
