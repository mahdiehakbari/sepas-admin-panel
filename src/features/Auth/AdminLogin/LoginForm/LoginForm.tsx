'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Button } from '@/sharedComponent/ui';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { ILoginFormValues } from './types';
import { useTranslation } from 'react-i18next';
import { useLogin } from './hooks/useLogin';
import { passwordRules, phoneRules } from './utils/validators';

export default function LoginForm() {
  const { t } = useTranslation();
  const { onSubmit, loadingButton, showPassword, toggleShowPassword } =
    useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginFormValues>({ mode: 'onChange' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-center'>
        <Image
          src='/assets/icons/logo.svg'
          alt='logo'
          width={64}
          height={64}
          className='mb-4'
        />
      </div>

      <h2 className='text-[18px] font-bold text-center mb-2'>
        {t('login:login_admin_panel')}
      </h2>
      <p className='text-[#6A6A6A] text-center mb-8 font-medium text-[14px]'>
        {t('login:user_name_pass')}
      </p>

      <div className='mb-4'>
        <input
          type='text'
          inputMode='numeric'
          placeholder={t('login:phone_number')}
          {...register('phoneNumber', phoneRules(t))}
          className={`w-full px-4 py-2 border rounded-lg outline-primary ${
            errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.phoneNumber && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div className='mb-[72px] relative'>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={t('login:password')}
          {...register('password', passwordRules(t))}
          className={`w-full px-4 py-2 border rounded-lg  outline-primary ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />

        <button
          type='button'
          onClick={toggleShowPassword}
          className='h-[41px] absolute inset-y-0 left-3 flex items-center justify-center px-2 text-gray-600'
        >
          <Image src='/assets/icons/eye.svg' alt='eye' width={20} height={20} />
        </button>

        {errors.password && (
          <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
        )}
      </div>

      <Button type='submit' disabled={!isValid} className='w-full'>
        {loadingButton ? <SpinnerDiv /> : t('login:login_panel')}
      </Button>
    </form>
  );
}
