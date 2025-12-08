'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  API_PROVINCES_QUERY,
  API_CITIES_QUERY,
} from '@/config/api_address.config';
import { UseFormSetValue } from 'react-hook-form';
import { IProfileFormValues } from '../types';

export const useLocationData = (
  setValue: UseFormSetValue<IProfileFormValues>,
) => {
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const token = Cookies.get('token');
    axios
      .get(API_PROVINCES_QUERY, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        setProvinces(res.data.provinces);
        localStorage.setItem('provinces', JSON.stringify(res.data.provinces));
      })
      .catch((err) => console.error(err.response));
  }, []);

  const handleProvinceChange = (provinceId: string | number) => {
    const token = Cookies.get('token');
    axios
      .get(`${API_CITIES_QUERY}/${provinceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCities(res.data.cities);

        localStorage.setItem('cities', JSON.stringify(res.data.cities));
      })
      .catch((err) => console.error(err.response));
  };

  return { provinces, cities, handleProvinceChange };
};
