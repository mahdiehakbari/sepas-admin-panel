import { useEffect } from 'react';
import axios from 'axios';
import { API_MERCHANT_QUERY_SIMPLE } from '@/config/api_address.config';
import { TMerchant } from './types';

export const useFetchMerchant = (
  setMerchantData: (data: TMerchant[]) => void,
) => {
  useEffect(() => {
    axios
      .get<TMerchant[]>(API_MERCHANT_QUERY_SIMPLE)
      .then((res) => setMerchantData(res.data))
      .catch(() => {});
  }, [setMerchantData]);
};
