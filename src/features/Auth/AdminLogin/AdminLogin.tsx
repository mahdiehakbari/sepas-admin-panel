'use client';

import { API_LOGIN } from '@/config/api_address.config';
import { Button } from '@/sharedComponent/ui';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { useAuthStore } from '@/store/Auth/authStore';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface LoginFormValues {
  phoneNumber: number;
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
  const [loadingButton, setSLoadingButton] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const onSubmit = (data: LoginFormValues) => {
    setSLoadingButton(true);
    axios
      .post(`${API_LOGIN}`, {
        phoneNumber: data.phoneNumber,
        password: data.password,
      })
      .then((resp) => {
        setAuth(resp.data.token, resp.data.user);
        setSLoadingButton(false);
        router.push('/panel/reports/settlement');
      })
      .catch((err) => {
        setSLoadingButton(false);
        toast.error(t('login:invalid_data'));
      });
  };

  return (
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

      <div className='mb-4'>
        <input
          type='text'
          inputMode='numeric'
          placeholder={t('login:phone_number')}
          {...register('phoneNumber', {
            required: {
              value: true,
              message: t('login:phone_number_required') as string,
            },
            pattern: {
              value: /^[0-9]+$/,
              message: t('login:phone_number_numbers_only') as string,
            },
            minLength: {
              value: 11,
              message: t('login:phone_number_invalid') as string,
            },
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
            errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, '');
          }}
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

      <Button type='submit' disabled={!isValid} className='w-full'>
        {loadingButton == true ? <SpinnerDiv /> : t('login:login_panel')}
      </Button>
    </form>
  );
}
