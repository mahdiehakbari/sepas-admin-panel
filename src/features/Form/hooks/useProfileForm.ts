import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { IProfileFormValues } from '../types';
import { useLocationData } from '../hooks/useLocationData';

export const useProfileForm = (userData?: IProfileFormValues | null) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<IProfileFormValues>({ defaultValues: userData || undefined });

  const { provinces, cities, handleProvinceChange } = useLocationData(setValue);
  const savedPhone = Cookies.get('phoneNumber');

  useEffect(() => {
    if (userData) reset(userData);
  }, [userData, reset]);

  return {
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    provinces,
    cities,
    handleProvinceChange,
    savedPhone,
  };
};
