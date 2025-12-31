import { useState } from 'react';
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { IFinancialTransactionsData } from '@/features/Financial/TransactionListTable/types';
import { ISelectOption } from '@/features/FIlteredTable/types';
import { API_FINANCIAL_TRANSACTIONS } from '@/config/api_address.config';
import { DateObject } from 'react-multi-date-picker';
import gregorian from 'react-date-object/calendars/gregorian';

interface UseFetchFinancialTransactionsProps {
  pageSize?: number;
}

export const useFetchFinancialTransactions = ({
  pageSize = 10,
}: UseFetchFinancialTransactionsProps = {}) => {
  const token = Cookies.get('token');

  const [requestsData, setRequestData] =
    useState<IFinancialTransactionsData | null>(null);
  const [pageLoading, setPageLoading] = useState(false);

  const startOfDay = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const endOfDay = (date: Date) => {
    date.setHours(23, 59, 59, 999);
    return date;
  };

  const convertPersianToEnglish = (str: string): string => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/[۰-۹]/g, (digit) => persianDigits.indexOf(digit).toString());
  };

  const fetchData = async (
    pageNumber = 1,
    acceptorName: ISelectOption[] = [],
    merchantName: ISelectOption[] = [],
    fromDate: DateObject | null = null,
    toDate: DateObject | null = null,
    transactionTypes: ISelectOption[] = [],
    referenceNumber: string = '',
    creditLineTypes: ISelectOption[] = [],
    planTypes: ISelectOption[] = [],
  ) => {
    if (!token) return;

    setPageLoading(true);

    const customerIds = acceptorName.map((c) => c.value);
    const merchantIds = merchantName.map((m) => m.value);
    const transactionTypeIds = transactionTypes.map((t) => parseInt(t.value));
    const creditLineTypeIds = creditLineTypes.map((c) => parseInt(c.value));
    const planTypeIds = planTypes.map((p) => parseInt(p.value));

    const createdFrom = fromDate
      ? startOfDay(fromDate.convert(gregorian).toDate()).toISOString()
      : undefined;

    const createdTo = toDate
      ? endOfDay(toDate.convert(gregorian).toDate()).toISOString()
      : undefined;

    // Convert Persian digits to English
    const englishReferenceNumber = referenceNumber
      ? convertPersianToEnglish(referenceNumber)
      : '';

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        ...(createdFrom ? { fromDate: createdFrom } : {}),
        ...(createdTo ? { toDate: createdTo } : {}),
        ...(customerIds.length > 0 ? { customerIds } : {}),
        ...(merchantIds.length > 0 ? { merchantIds } : {}),
        ...(transactionTypeIds.length > 0
          ? { transactionTypes: transactionTypeIds }
          : {}),
        ...(englishReferenceNumber
          ? { customerCreditRequestReferenceNumber: englishReferenceNumber }
          : {}),
        ...(creditLineTypeIds.length > 0
          ? { creditLineTypes: creditLineTypeIds }
          : {}),
        ...(planTypeIds.length > 0 ? { planTypes: planTypeIds } : {}),
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    try {
      const res = await axios.get<IFinancialTransactionsData>(
        API_FINANCIAL_TRANSACTIONS,
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
