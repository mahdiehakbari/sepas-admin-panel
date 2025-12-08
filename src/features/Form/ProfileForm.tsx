'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import { useAuthStore } from '@/store/Auth/authStore';
import { IProfileFormProps } from './types';
// import { useProfileForm } from './hooks/useProfileForm';
// import { useProfileSubmit } from './hooks/useProfileSubmit';
// import { PersonalInfoSection } from './sections/PersonalInfoSection';
// import { BankInfoSection } from './sections/BankInfoSection';
// import { AddressInfoSection } from './sections/AddressInfoSection';
import { useTranslation } from 'react-i18next';
import { PersonalInfoSection } from './PersonalInfoSection';
import { useProfileForm } from './hooks/useProfileForm';
import { useProfileSubmit } from './hooks/useProfileSubmit';

export const ProfileForm: React.FC<IProfileFormProps> = ({
  name,
  handleBack,
  setIsEditing,
  setShowProfileModal,
  setShowCreditNoteModal,
  setUser,
  userData,
}) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    errors,
    provinces,
    cities,
    handleProvinceChange,
    savedPhone,
  } = useProfileForm(userData);

  const { onSubmit, isLoading } = useProfileSubmit({
    name,
    setIsEditing,
    setShowProfileModal,
    setShowCreditNoteModal,
    setUser,
  });

  useEffect(() => {
    const phone = user?.phoneNumber || savedPhone;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (phone) setPhoneNumber(phone);
  }, [savedPhone, user]);

  return (
    <div
      className={`${name == 'credit' ? 'md:w-[800px]' : 'max-w-4xl mx-auto'}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-6 bg-(--block-color) border border-border-color rounded-lg space-y-6'>
          <PersonalInfoSection
            t={t}
            {...{ register, errors, control, userData }}
            phoneNumber={phoneNumber}
          />
          {/* <BankInfoSection t={t} {...{ register, errors, userData }} />
          <AddressInfoSection
            t={t}
            {...{
              register,
              errors,
              provinces,
              cities,
              handleProvinceChange,
              userData,
            }}
          /> */}
        </div>

        <div className='md:flex justify-end gap-4 my-6'>
          <Button
            variant='outline'
            disabled={isLoading}
            type='button'
            onClick={handleBack}
            className='mb-2 w-full  md:w-[161px] '
          >
            {t('profile:return')}
          </Button>
          <Button
            disabled={isLoading}
            type='submit'
            className='mb-2 w-full md:w-[161px]'
          >
            {isLoading ? (
              <SpinnerDiv size='sm' className='text-white' />
            ) : (
              t('profile:register_info')
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
