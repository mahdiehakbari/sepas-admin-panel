import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { IContentStateWrapperProps } from './types';

export const ContentStateWrapper = ({
  loading,
  loadingText,
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

  return <>{children}</>;
};
