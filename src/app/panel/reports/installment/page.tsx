'use client';

import { ResponsiveSettlementTable } from '@/features/SettlementList';
import Cookies from 'js-cookie';
import { Paginate } from '@/sharedComponent/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_INSTALLMENTS_DOCUMENTS } from '@/config/api_address.config';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { IInstallmentsData } from './types';
import {
  InstallmentListTable,
  ResponsiveInstallmentTable,
} from '@/features/InstallmentList';

const Installment = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [requestsData, setRequestData] = useState<IInstallmentsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      const disableLoading = async () => {
        setPageLoading(false);
      };
      disableLoading();
    }
  }, [token]);

  useEffect(() => {
    axios
      .get(`${API_INSTALLMENTS_DOCUMENTS}?pageNo=${page}&count=10`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequestData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [page]);

  if (pageLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <SpinnerDiv size='lg' />
        <p className='px-2'>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!requestsData || requestsData?.data?.document_list.length === 0) {
    return (
      <div className='text-center mt-10 text-gray-500'>
        هیچ داده‌ای یافت نشد.
      </div>
    );
  }

  const items = requestsData?.data?.document_list;
  const pageSize = requestsData.pageSize || 10;
  const totalCount = requestsData.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className='max-w-6xl mx-auto mt-6'>
      <h1 className='text-black font-bold text-lg mb-4 px-6 md:px-0'>
        {t('panel:acceptor_settlement_list')}
      </h1>

      <div className='hidden md:block'>
        <InstallmentListTable
          requests={items}
          currentPage={page}
          pageSize={pageSize}
        />
      </div>

      <div className='block md:hidden'>
        <ResponsiveInstallmentTable
          requests={items}
          currentPage={page}
          pageSize={pageSize}
        />
      </div>

      <Paginate
        hasPreviousPage={hasPreviousPage}
        setPage={setPage}
        currentPage={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default Installment;
