'use client';

import { useTranslation } from 'react-i18next';
import { DentistDefinitionRadioProps } from './types';

export default function DentistDefinitionRadio({
  selected,
  setSelected,
}: DentistDefinitionRadioProps) {
  const { t } = useTranslation();
  const options = [
    { value: 'single', label: t('dental-society:dentist_definition') },
    { value: 'group', label: t('dental-society:dentist_group_definition') },
  ];

  return (
    <div className='space-y-3'>
      {options.map((opt) => (
        <label
          key={opt.value}
          className='flex items-center gap-2 cursor-pointer p-2 font-medium text-[14px] text-(--radio-text) rounded-lg border border-gray-300 hover:bg-gray-100'
        >
          <input
            type='radio'
            name='options'
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => setSelected(opt.value)}
            className='h-4 w-4 accent-primary'
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
