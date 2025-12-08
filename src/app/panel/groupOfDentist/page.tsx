'use client';
import { Button } from '@/sharedComponent/ui';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';

const GroupOfDentist = () => {
  const { t } = useTranslation();
  return (
    <div className='w-full p-6 bg-(--gray-bg) rounded-2xl'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-[16px] text-black font-normal'>
          {t('dental-society:using_excel')}
        </h3>

        <a
          href='/assets/file/doctors_info_template.xlsx'
          download
          className='flex items-center gap-2'
        >
          <Image
            src='/assets/icons/excel.svg'
            alt='excel'
            width={24}
            height={24}
          />
          <span className='text-[16px] font-medium text-primary'>
            {t('dental-society:sample_excel')}
          </span>
        </a>
      </div>

      <div className='bg-white rounded-2xl border border-border-color flex flex-col items-center justify-center py-14 mb-2'>
        <p className='text-black font-normal text-[16px] mb-3'>
          {t('dental-society:select_upload')}
        </p>
        <Button>{t('dental-society:upload_file')}</Button>
      </div>
      <div className='mb-10'>
        <div className='flex items-center gap-2 mb-2'>
          <Image
            src='/assets/icons/info-simple.svg'
            alt='info-simple'
            width={16}
            height={16}
          />
          <span className='text-[12px] font-normal text-(--radio-text)'>
            {t('dental-society:excel_format')}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Image
            src='/assets/icons/info-simple.svg'
            alt='info-simple'
            width={16}
            height={16}
          />
          <span className='text-[12px] font-normal text-(--radio-text)'>
            {t('dental-society:complete_excel')}
          </span>
        </div>
      </div>

      <div className='flex justify-end'>
        <Button disabled>{t('dental-society:confirm_continue')}</Button>
      </div>
    </div>
  );
};

export default GroupOfDentist;
