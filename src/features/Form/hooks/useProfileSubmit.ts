import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { formatBirthDate } from '../utils/formatBirthDate';
import { API_AUTHENTICATE_ME } from '@/config/api_address.config';
import { IProfileFormValues } from '../types';
import { ProfileSubmitProps } from './types';
import { updateProfile } from '../api/profile.api';
import { useProfileStore } from '@/store/Profile/useProfileStore';

export const useProfileSubmit = ({
  name,
  setIsEditing,
  setShowProfileModal,
  setShowCreditNoteModal,
  setUser,
}: ProfileSubmitProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { setProfile } = useProfileStore();

  const onSubmit = async (data: IProfileFormValues) => {
    console.log(data, 'dataaaaa');
    const token = Cookies.get('token');
    if (!token) return toast.error(t('profile:token_missing'));

    setIsLoading(true);

    const formattedData: Partial<IProfileFormValues> = {
      ...data,
      gender: data.gender !== '' ? Number(data.gender) : 0,
      birthDate: formatBirthDate(data.birthDate),
      FullName: `${data.firstName} ${data.lastName}`,
    };

    if (!formattedData.email) {
      delete formattedData.email;
    }

    try {
      const res = await updateProfile(token, formattedData);
      setProfile(res.data.profile);
      Cookies.set('userProfile', JSON.stringify(data));

      if (name === 'userAccount') {
        const res = await axios.get(API_AUTHENTICATE_ME, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData =
          typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        setUser?.(userData);
        setIsEditing?.(false);
      }

      Cookies.set('isLoggedIn', 'true');
      toast.success(t('profile:success_toast'));

      if (name === 'profile') router.push('/panel/userAccount');

      setShowProfileModal?.(false);
      setShowCreditNoteModal?.(true);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || t('profile:update_error'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
