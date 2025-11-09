'use client';

import { Button } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface LoginFormValues {
  username: string;
  password: string;
}

export default function AdminLogin() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login data:', data);
  };

  return (
    <div className='h-[90vh] flex items-center justify-center  p-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md p-8'>
        <div className='flex justify-center'>
          <Image
            src='/assets/icons/logo.svg'
            alt='payment-status'
            width={64}
            height={64}
            className='mb-4'
          />
        </div>
        <h2 className='text-[18px] font-bold text-black mb-2 text-center'>
          {t('login:login_admin_panel')}
        </h2>
        <p className='text-[#6A6A6A] text-center mb-8 font-medium text-[14px]'>
          {t('login:user_name_pass')}
        </p>

        {/* Username */}
        <div className='mb-4'>
          <input
            type='text'
            placeholder={t('login:user_name')}
            {...register('username', {
              required: {
                value: true,
                message: t('login:user_name_required') as string,
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.username && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.username.message}
            </p>
          )}
        </div>

        <div className='mb-[72px] relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('login:password')}
            {...register('password', {
              required: {
                value: true,
                message: t('login:password_required') as string,
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none  ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />

          {/* Toggle button */}
          <button
            type='button'
            onClick={() => setShowPassword((s) => !s)}
            className='h-[41px] absolute inset-y-0 left-3 flex items-center justify-center px-2 text-gray-600 font-bold text-lg select-none cursor-pointer'
            aria-label={showPassword ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور'}
            title={showPassword ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور'}
          >
            <Image
              src='/assets/icons/eye.svg'
              alt='logo'
              width={20}
              height={20}
            />
          </button>

          {errors.password && (
            <p id='password-error' className='text-red-500 text-sm mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot password */}
        {/* <div className='text-right mb-6'>
          <a href='#' className='text-blue-600 text-sm hover:underline'>
            فراموشی رمز عبور
          </a>
        </div> */}

        {/* Submit button */}
        <Button type='submit' disabled={!isValid} className='w-full'>
          {t('login:login_panel')}
        </Button>
      </form>
    </div>
  );
}
