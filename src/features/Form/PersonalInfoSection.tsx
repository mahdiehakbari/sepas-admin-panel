import React, { useEffect, useState } from 'react';
import { DateInput, FormTitle, Input, SelectInput } from '@/sharedComponent/ui';
import { RegisterOptions } from 'react-hook-form';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import { validationRules } from './utils/validationRules';
import { IPersonalInfoSectionProps } from './types';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  API_CONTRACT_GET,
  API_CONTRACT_POST,
} from '@/config/api_address.config';
import Image from 'next/image';

export const PersonalInfoSection: React.FC<IPersonalInfoSectionProps> = ({
  t,
  register,
  errors,
  control,
  userData,
  phoneNumber,
  base64Image,
  setBase64Image,
}) => {
  const rules = validationRules(t);
  const token = Cookies.get('token');
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
      };
    }
  };
  const genderItems = [
    { id: 1, name: t('dental-society:man') },
    { id: 2, name: t('dental-society:woman') },
  ];
  const educationalItems = [
    { id: 0, name: 'پست دکترا' },
    { id: 1, name: 'دکترا' },
    { id: 2, name: 'استاد' },
    { id: 3, name: 'استاد' },
  ];

  const contractItems = [
    { id: 0, name: t('dental-society:cash_settlement') },
    { id: 1, name: t('dental-society:bi_monthly') },
    { id: 2, name: t('dental-society:four_monthly') },
    { id: 3, name: t('dental-society:six_monthly') },
  ];

  // useEffect(() => {
  //   axios
  //     .get(API_CONTRACT_GET, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((resp) => {
  //       axios
  //         .post(
  //           API_CONTRACT_POST,
  //           {
  //             merchantId: resp.data.merchantId,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               'Content-Type': 'application/json',
  //             },
  //           },
  //         )
  //         .then((resp) => {})
  //         .catch();
  //     })
  //     .catch();
  // }, []);

  return (
    <section>
      <FormTitle title={t('dental-society:personal_info')} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-right mb-4'>
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
          defaultValue={''}
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

        {/* <DateInput
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
        /> */}

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
          label={t('dental-society:doctor_title')}
          name='professionalTitle'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.professionalTitle ?? ''}
        />
        <Input
          label={t('dental-society:medical_system_number')}
          name='medicalCertificateNumber'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.medicalCertificateNumber ?? ''}
        />

        {/* <SelectInput
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
        /> */}

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
      <div className='flex items-center flex-col mb-10'>
        <p className='mb-2 text-gray-600 text-sm '>آپلود عکس</p>
        <label className='rounded-2xl relative cursor-pointer w-32 h-32 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center'>
          {image ? (
            <img
              src={image}
              alt='Uploaded'
              className='w-full h-full object-cover rounded-2xl'
            />
          ) : (
            <span className='text-white text-4xl font-bold'>+</span>
          )}
          <input
            type='file'
            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            onChange={handleImageChange}
          />
        </label>
      </div>
    </section>
  );
};
