import { useTranslation } from 'react-i18next';
import { Button } from '@/sharedComponent/ui';
import Image from 'next/image';
import { IPageHeaderProps } from './types';

export const PageHeader: React.FC<IPageHeaderProps> = ({
  titleKey,
  onFilterClick,
  filterTextKey = 'panel:filter',
}) => {
  const { t } = useTranslation();
  return (
    <div className='mx-auto mt-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-black font-bold text-lg mb-4'>{t(titleKey)}</h1>
        <Button onClick={onFilterClick} className='w-[75px]'>
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
  );
};
