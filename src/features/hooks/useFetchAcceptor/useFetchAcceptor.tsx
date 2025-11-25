import { useEffect } from 'react';
import axios from 'axios';
import { API_CUSTOMER_QUERY_SIMPLE } from '@/config/api_address.config';
import { TAcceptor } from './types';

export const useFetchAcceptor = (
  setAcceptorData: (data: TAcceptor[]) => void,
) => {
  useEffect(() => {
    axios
      .get<TAcceptor[]>(API_CUSTOMER_QUERY_SIMPLE)
      .then((res) => setAcceptorData(res.data))
      .catch(() => {});
  }, [setAcceptorData]);
};
