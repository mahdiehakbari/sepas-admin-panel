import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { IPageHeaderProps } from './types';
import { Button } from '@/sharedComponent/ui/Button/Button';
import { CircleStackIcon } from '@heroicons/react/24/solid';

export const PageHeader: React.FC<IPageHeaderProps> = ({
  titleKey,
  onFilterClick,
  filterTextKey = 'panel:filter',
  handleRemoveFilter,
  remove,
}) => {
  const { t } = useTranslation();
  return (
    <div className='mx-auto mt-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-black font-bold text-lg'>{t(titleKey)}</h1>
        <div className='flex items-center gap-4'>
          {remove == true && (
            <Button
              variant='outline'
              onClick={handleRemoveFilter}
              className='w-[90px]'
            >
              {t('panel:remove_filter')}
            </Button>
          )}
          <Button onClick={onFilterClick} className='w-[75px]'>
            {remove == true && (
              <span className='inline-block h-2 w-2 ml-1 rounded-full bg-red-500' />
            )}
            <Image
              src='/assets/icons/filter.svg'
              alt='filter'
              width={16}
              height={16}
            />

            {t(filterTextKey)}
          </Button>
        </div>
      </div>
    </div>
  );
};
