import React, { useEffect } from 'react';
import { FormTitle, Input, SelectInput } from '@/sharedComponent/ui';
import { IAddressInfoSectionProps } from './types';

export const AddressInfoSection: React.FC<IAddressInfoSectionProps> = ({
  t,
  register,
  errors,
  provinces,
  cities,
  handleProvinceChange,
  userData,
}) => {
  useEffect(() => {
    if (userData?.address?.provinceId) {
      handleProvinceChange(userData.address.provinceId);
    }
  }, [userData?.address?.provinceId]);
  return (
    <section>
      <FormTitle title={t('dental-society:address_info')} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-right mb-6'>
        {provinces.length > 0 && (
          <SelectInput
            label={t('dental-society:province')}
            name='province'
            register={register}
            options={provinces.map((p) => ({ value: p.id, label: p.name }))}
            onChange={handleProvinceChange}
            errors={errors}
            rules={{ required: t('dental-society:field_required') }}
            defaultValue={userData?.address?.provinceId ?? ''}
          />
        )}

        {cities.length > 0 && (
          <SelectInput
            label={t('dental-society:city')}
            name='cityId'
            register={register}
            options={cities.map((c) => ({ value: c.id, label: c.name }))}
            onChange={handleProvinceChange}
            errors={errors}
            rules={{ required: t('dental-society:field_required') }}
            defaultValue={userData?.address?.cityId ?? ''}
          />
        )}

        <Input
          label={t('dental-society:zip_code')}
          name='postalCode'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.address?.postalCode ?? ''}
        />
        <Input
          label={t('dental-society:office_number')}
          name='officeNumber'
          register={register}
          errors={errors}
          textError={t('dental-society:field_required')}
          defaultValue={userData?.address?.officeNumber ?? ''}
        />
      </div>

      <Input
        label={t('dental-society:address')}
        name='addressDetails'
        register={register}
        full
        errors={errors}
        textError={t('dental-society:field_required')}
        defaultValue={userData?.address?.details ?? ''}
      />
    </section>
  );
};
