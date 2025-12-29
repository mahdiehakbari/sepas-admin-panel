import { useState } from 'react';
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { ISelectOption } from '@/features/FIlteredTable/types';
import { API_MERCHANT_DOCUMENTS } from '@/config/api_address.config';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';

interface ISettlementItem {
  uuid: string;
  amount: number;
  cash_out_method: number;
  account_no: number;
  status: number;
  acceptor?: string;
  acceptor_tag?: number;
  city?: string;
  province?: string;
  create_date?: string;
  payment_date?: string;
  iban?: string;
  person_address?: number;
  purchaseRequest?: {
    customer?: {
      id: string;
      fullName: string;
      phoneNumber: string;
      nationalId: string;
      iban: string;
      address: string | null;
    };
  };
}

interface IApiResponse {
  data: {
    response_code: number;
    document_total_count: number;
    document_list: ISettlementItem[];
  };
}

interface ISettlementsData {
  items: ISettlementItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

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

  const formatDateToShamsi = (date: DateObject | null): string | undefined => {
    if (!date) return undefined;
    // If already in Persian calendar, just format it
    const persianDate = date.calendar.name === 'persian' 
      ? date 
      : date.convert(persian);
    return persianDate.format('YYYY-MM-DD');
  };

  const fetchData = async (
    pageNumber = 1,
    merchantName: ISelectOption[] = [],
    acceptorName: ISelectOption[] = [],
    fromDate: DateObject | null = null,
    toDate: DateObject | null = null,
    fromPaymentDate: DateObject | null = null,
    toPaymentDate: DateObject | null = null,
  ) => {
    if (!token) return;

    setPageLoading(true);

    const merchantIds = merchantName.map((m) => m.value);
    const acceptorIds = acceptorName.map((a) => a.value);

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        pageNo: pageNumber,
        count: pageSize,
        ...(merchantIds.length > 0 ? { merchantIds } : {}),
        ...(acceptorIds.length > 0 ? { acceptorIds } : {}),
        ...(fromDate ? { fromDate: formatDateToShamsi(fromDate) } : {}),
        ...(toDate ? { toDate: formatDateToShamsi(toDate) } : {}),
        ...(fromPaymentDate ? { fromPaymentDate: formatDateToShamsi(fromPaymentDate) } : {}),
        ...(toPaymentDate ? { toPaymentDate: formatDateToShamsi(toPaymentDate) } : {}),
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    try {
      const res = await axios.get<IApiResponse>(
        API_MERCHANT_DOCUMENTS,
        config,
      );
      
      // Transform API response to match expected structure
      const totalPages = Math.ceil(res.data.data.document_total_count / pageSize);
      const transformedData: ISettlementsData = {
        items: res.data.data.document_list || [],
        pageNumber: pageNumber,
        totalPages: totalPages,
        totalCount: res.data.data.document_total_count,
        hasPreviousPage: pageNumber > 1,
        hasNextPage: pageNumber < totalPages,
      };
      
      setRequestData(transformedData);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  return { fetchData, requestsData, pageLoading };
};
