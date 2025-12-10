'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/Auth/authStore';
import axios from 'axios';
import { API_LOGIN } from '@/config/api_address.config';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ILoginFormValues } from '../types';

export function useLogin() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();

  const [loadingButton, setLoadingButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: ILoginFormValues) => {
    setLoadingButton(true);

    try {
      const resp = await axios.post(API_LOGIN, {
        phoneNumber: data.phoneNumber,
        password: data.password,
      });

      setAuth(resp.data.token, resp.data.user);
      if (resp.data.user.userType == 'Admin') {
        router.push('/panel/reports/settlement');
      } else {
        router.push('/panel/dentalSociety');
        localStorage.setItem('userType', 'DentistryAdmin');
      }
    } catch (err) {
      toast.error(t('login:invalid_data'));
    } finally {
      setLoadingButton(false);
    }
  };

  return {
    loadingButton,
    showPassword,
    toggleShowPassword,
    onSubmit,
  };
}
