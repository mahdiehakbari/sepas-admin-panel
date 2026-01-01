import { useState } from 'react';
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { ISelectOption } from '@/features/FIlteredTable/types';
import { API_INSTALLMENTS_DOCUMENTS } from '@/config/api_address.config';
import { IInstallmentsData } from '../../types';

interface useFetchInstallmentProps {
  pageSize?: number;
}

export const useFetchInstallment = ({
  pageSize = 10,
}: useFetchInstallmentProps = {}) => {
  const token = Cookies.get('token');

  const [requestsData, setRequestData] = useState<IInstallmentsData | null>(
    null,
  );
  const [pageLoading, setPageLoading] = useState(false);

  const fetchData = async (
    pageNumber = 1,
    customerName: ISelectOption[] = [],
  ) => {
    if (!token) return;

    setPageLoading(true);

    const customerIds = customerName.map((m) => m.value);

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        pageNo: pageNumber,
        count: pageSize,
        ...(customerIds.length > 0 ? { customerIds } : {}),
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    try {
      const res = await axios.get<IInstallmentsData>(
        API_INSTALLMENTS_DOCUMENTS,
        config,
      );
      setRequestData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  return { fetchData, requestsData, pageLoading };
};
