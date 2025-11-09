type TSize = 'sm' | 'md' | 'lg';

export const SpinnerDiv = ({
  size = 'md',
  className = '',
  ariaLabel = 'Loading',
}: {
  size?: TSize;
  className?: string;
  ariaLabel?: string;
}) => {
  const sizes: Record<TSize, string> = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-4',
  };

  return (
    <div
      role='status'
      aria-label={ariaLabel}
      className={`inline-block ${sizes[size]} rounded-full border-blue-600 border-t-transparent animate-spin ${className}`}
    />
  );
};
