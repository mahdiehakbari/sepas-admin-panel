import React from 'react';
import { FormTitle, Input } from '@/sharedComponent/ui';
import { IBankInfoSectionProps } from './types';

export const BankInfoSection: React.FC<IBankInfoSectionProps> = ({
  t,
  register,
  errors,
  userData,
}) => (
  <section>
    <FormTitle title={t('dental-society:bank_information')} />
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-right mb-12'>
      <Input
        label={t('dental-society:iban_number')}
        name='iban'
        register={register}
        errors={errors}
        textError={t('dental-society:field_required')}
        defaultValue={userData?.iban ?? ''}
      />
    </div>
  </section>
);
