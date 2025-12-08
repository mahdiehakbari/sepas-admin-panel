'use client';
import { DentistDefinitionRadio } from '@/features/DentistDefinition';
import { Button } from '@/sharedComponent/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DentistDefinition = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');
  const handleClick = () => {};
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='w-[300px] md:w-md shadow-[0px_0px_6px_0px_#0000001F] p-4 rounded-2xl '>
        <DentistDefinitionRadio selected={selected} setSelected={setSelected} />
        <Button
          disabled={selected == ''}
          className='mt-8 w-full'
          onClick={handleClick}
        >
          {t('dental-society:confirm')}
        </Button>
      </div>
    </div>
  );
};

export default DentistDefinition;
