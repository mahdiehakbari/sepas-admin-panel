import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { IContentStateWrapperProps } from './types';

export const ContentStateWrapper = ({
  loading,
  isEmpty,
  loadingText,
  emptyText,
  children,
}: IContentStateWrapperProps) => {
  if (loading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <SpinnerDiv size='lg' />
        <p className='px-2'>{loadingText}</p>
      </div>
    );
  }

  if (isEmpty) {
    return <div className='text-center mt-10 text-gray-500'>{emptyText}</div>;
  }

  return <>{children}</>;
};
