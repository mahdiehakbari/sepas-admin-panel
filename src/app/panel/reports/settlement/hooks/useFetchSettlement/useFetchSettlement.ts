import { useState } from 'react';
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { ISettlementsData } from '@/app/panel/reports/settlement/types';
import { ISelectOption } from '@/features/FIlteredTable/types';
import { API_MERCHANT_DOCUMENTS } from '@/config/api_address.config';

interface UseFetchSettlementProps {
  pageSize?: number;
}

export const useFetchSettlement = ({
  pageSize = 10,
}: UseFetchSettlementProps = {}) => {
  const token = Cookies.get('token');

  const [requestsData, setRequestData] = useState<ISettlementsData | null>(
    null,
  );
  const [pageLoading, setPageLoading] = useState(false);

  const fetchData = async (
    pageNumber = 1,
    merchantName: ISelectOption[] = [],
  ) => {
    if (!token) return;

    setPageLoading(true);

    const merchantIds = merchantName.map((m) => m.value);

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        pageNo: pageNumber,
        count: pageSize,
        ...(merchantIds.length > 0 ? { merchantIds } : {}),
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    try {
      const res = await axios.get<ISettlementsData>(
        API_MERCHANT_DOCUMENTS,
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
