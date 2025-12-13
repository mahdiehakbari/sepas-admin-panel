// 'use client';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import {
//   API_PROVINCES_QUERY,
//   API_CITIES_QUERY,
// } from '@/config/api_address.config';
// import { UseFormSetValue } from 'react-hook-form';
// import { IProfileFormValues } from '../types';

// export const useLocationData = (
//   setValue: UseFormSetValue<IProfileFormValues>,
// ) => {
//   const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
//     [],
//   );
//   const [cities, setCities] = useState<{ id: string; name: string }[]>([]);

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (!token) {
//       console.error('توکن احراز هویت وجود ندارد');
//       return;
//     }
//     axios
//       .get(API_PROVINCES_QUERY, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: 'application/json',
//         },
//       })
//       .then((res) => {
//         setProvinces(res.data.provinces);
//         localStorage.setItem('provinces', JSON.stringify(res.data.provinces));
//       })
//       .catch((err) => console.error(err.response));
//   }, []);

//   const handleProvinceChange = (provinceId: string | number) => {
//     const token = Cookies.get('token');
//     axios
//       .get(`${API_CITIES_QUERY}/${provinceId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setCities(res.data.cities);

//         localStorage.setItem('cities', JSON.stringify(res.data.cities));
//       })
//       .catch((err) => console.error(err.response));
//   };

//   return { provinces, cities, handleProvinceChange };
// };

'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import {
  API_PROVINCES_QUERY,
  API_CITIES_QUERY,
} from '@/config/api_address.config';
import { UseFormSetValue } from 'react-hook-form';
import { IProfileFormValues } from '../types';

interface ILocationItem {
  id: string;
  name: string;
}

export const useLocationData = (
  setValue: UseFormSetValue<IProfileFormValues>,
) => {
  const [provinces, setProvinces] = useState<ILocationItem[]>([]);
  const [cities, setCities] = useState<ILocationItem[]>([]);

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      console.error('توکن احراز هویت وجود ندارد');
      return;
    }

    axios
      .get(API_PROVINCES_QUERY, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const provincesData = res.data?.provinces ?? [];
        setProvinces(provincesData);
        localStorage.setItem('provinces', JSON.stringify(provincesData));
      })
      .catch((error: AxiosError) => {
        handleAxiosError(error, 'دریافت استان‌ها');
      });
  }, []);

  const handleProvinceChange = (provinceId: string | null) => {
    if (!provinceId) {
      setCities([]);
      return;
    }

    const token = Cookies.get('token');
    if (!token) {
      console.error('توکن وجود ندارد');
      return;
    }

    console.log('Fetching cities for province:', provinceId);

    axios
      .get(`${API_CITIES_QUERY}/${provinceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        setCities(res.data?.cities ?? []);
      })
      .catch((error) => {
        handleAxiosError(error, 'دریافت شهرها');
      });
  };

  return {
    provinces,
    cities,
    handleProvinceChange,
  };
};

const handleAxiosError = (error: AxiosError, context: string) => {
  if (error.response) {
    console.error(`خطا در ${context}`);
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    console.error(`عدم دریافت پاسخ در ${context}`);
    console.error('Request:', error.request);
  } else {
    console.error(`خطای غیرمنتظره در ${context}`);
    console.error('Message:', error.message);
  }
};
