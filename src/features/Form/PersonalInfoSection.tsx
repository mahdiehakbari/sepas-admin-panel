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
    { id: 1, name: t('dental-society:man') },
    { id: 2, name: t('dental-society:woman') },
  ];
  const educationalItems = [
    { id: 'PostDoctoral', name: 'پست دکترا' },
    { id: 'Doctoral', name: 'دکترا' },
    { id: 'Master', name: 'استاد' },
    { id: 'Bachelor', name: 'استاد' },
    { id: 'HighSchoolDiploma', name: 'دیپلم' },
  ];

  const contractItems = [
    { id: 'cash_settlement', name: t('dental-society:cash_settlement') },
    { id: 'bi_monthly', name: t('dental-society:bi_monthly') },
    { id: 'four_monthly', name: t('dental-society:four_monthly') },
    { id: 'six_monthly', name: t('dental-society:six_monthly') },
  ];

  return (
    <section>
      <FormTitle title={t('dental-society:personal_info')} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-right mb-12'>
        <Input
          label={t('dental-society:name')}
          name='firstName'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.firstName ?? ''}
        />

        <Input
          label={t('dental-society:last_name')}
          name='lastName'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.lastName ?? ''}
        />

        <Input
          label={t('dental-society:phone_number')}
          name='mobile'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          rules={rules.mobile as unknown as RegisterOptions<IProfileFormValues>}
          defaultValue={userData?.phoneNumber ?? phoneNumber}
          disabled={!!userData?.phoneNumber || !!phoneNumber}
        />

        <Input
          label={t('dental-society:national_id')}
          name='nationalId'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          rules={
            rules.nationalId as unknown as RegisterOptions<IProfileFormValues>
          }
          defaultValue={userData?.nationalId ?? ''}
        />

        <DateInput
          control={control}
          name='birthDate'
          label={t('dental-society:birth_date')}
          errors={errors}
          rules={{ required: t('dental-society:field_required') }}
          defaultValue={
            userData?.birthDate && !isNaN(Date.parse(userData.birthDate))
              ? userData.birthDate
              : undefined
          }
        />

        <SelectInput
          label={t('dental-society:gender')}
          name='gender'
          register={register}
          options={genderItems.map((c) => ({
            value: c.id.toString(),
            label: c.name,
          }))}
          errors={errors}
          rules={{ required: t('dental-society:field_required') }}
          defaultValue={
            userData?.gender !== undefined ? String(userData.gender) : ''
          }
        />

        <Input
          label={t('dental-society:medical_system_number')}
          name='medicalSystemNumber'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.medicalSystemNumber ?? ''}
        />

        <SelectInput
          label={t('dental-society:educational')}
          name='educational'
          register={register}
          options={educationalItems.map((c) => ({
            value: c.id.toString(),
            label: c.name,
          }))}
          errors={errors}
          rules={{ required: t('dental-society:field_required') }}
          defaultValue={
            userData?.educational !== undefined
              ? String(userData.educational)
              : ''
          }
        />

        <SelectInput
          label={t('dental-society:contract_type')}
          name='contractType'
          register={register}
          options={contractItems.map((c) => ({
            value: c.id.toString(),
            label: c.name,
          }))}
          errors={errors}
          rules={{ required: t('dental-society:field_required') }}
          defaultValue={
            userData?.contractType !== undefined
              ? String(userData.contractType)
              : ''
          }
        />

        <Input
          label={t('dental-society:email')}
          name='email'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          rules={{ required: false }}
          defaultValue={userData?.email ?? ''}
        />
      </div>
    </section>
  );
};
