import React from 'react';
import { DateInput, FormTitle, Input, SelectInput } from '@/sharedComponent/ui';
import { RegisterOptions } from 'react-hook-form';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import { validationRules } from './utils/validationRules';
import { IPersonalInfoSectionProps } from './types';

export const PersonalInfoSection: React.FC<IPersonalInfoSectionProps> = ({
  t,
  register,
  errors,
  control,
  userData,
  phoneNumber,
}) => {
  const rules = validationRules(t);

  const genderItems = [
    { id: 1, name: t('profile:man') },
    { id: 2, name: t('profile:woman') },
  ];

  return (
    <section>
      <FormTitle title={t('profile:identity_information')} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-right mb-12'>
        <Input
          label={t('profile:first_name')}
          name='firstName'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          defaultValue={userData?.firstName ?? ''}
        />

        <Input
          label={t('profile:last_name')}
          name='lastName'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          defaultValue={userData?.lastName ?? ''}
        />

        <Input
          label={t('profile:phone_number')}
          name='mobile'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          rules={rules.mobile as unknown as RegisterOptions<IProfileFormValues>}
          defaultValue={userData?.phoneNumber ?? phoneNumber}
          disabled={!!userData?.phoneNumber || !!phoneNumber}
        />

        <Input
          label={t('profile:national_id')}
          name='nationalId'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          rules={
            rules.nationalId as unknown as RegisterOptions<IProfileFormValues>
          }
          defaultValue={userData?.nationalId ?? ''}
        />

        <DateInput
          control={control}
          name='birthDate'
          label={t('profile:date_birth')}
          errors={errors}
          rules={{ required: t('profile:field_required') }}
          defaultValue={
            userData?.birthDate && !isNaN(Date.parse(userData.birthDate))
              ? userData.birthDate // ✅ رشته ISO، نه Date
              : undefined
          }
        />

        <SelectInput
          label={t('profile:gender')}
          name='gender'
          register={register}
          options={genderItems.map((c) => ({
            value: c.id.toString(),
            label: c.name,
          }))}
          errors={errors}
          rules={{ required: t('profile:field_required') }}
          defaultValue={
            userData?.gender !== undefined ? String(userData.gender) : ''
          }
        />

        <Input
          label={t('profile:email')}
          name='email'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          rules={{ required: false }}
          defaultValue={userData?.email ?? ''}
        />
      </div>
    </section>
  );
};
