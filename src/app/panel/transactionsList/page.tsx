'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITransactionsData } from './types';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_AUTHENTICATE_ME, API_MERCHANT } from '@/config/api_address.config';
import { filterTable } from '../utils/filterTable';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { paginate } from '../utils/Paginate';
import { Filteredtabel } from '@/features/Filteredtabel';
import { TransactionListTable } from '@/features/TransactionList';
import { ResponsiveTransactionTable } from '@/features/TransactionList/TransactionListTable/ResponsiveTransactionTable';
import { Paginate } from '@/sharedComponent/ui';
import { DateObject } from 'react-multi-date-picker';

const TransactionsList = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');
  const [requestsData, setRequestData] = useState<ITransactionsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [planName, setPlanName] = useState('');
  const [filterData, setFilterData] = useState(null);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const token = Cookies.get('token');

  const pageSize = 10;

  useEffect(() => {
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPageLoading(false);
      return;
    }

    axios
      .get(API_AUTHENTICATE_ME, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCustomerId(res.data.merchantId);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    if (!customerId) return;

    axios
      .get(`${API_MERCHANT}/${customerId}/paged?page=1&pageSize=1000`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequestData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [customerId, token]);

  const handleFilter = () => {
    if (!requestsData) return;
    const result = filterTable({
      data: requestsData.items,
      planName,
      fromDate,
      toDate,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    setFilterData(result);
  };

  if (pageLoading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <SpinnerDiv size='lg' />
        <p className='px-2'>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!requestsData || requestsData.items.length === 0) {
    return (
      <div className='text-center mt-10 text-gray-500'>
        هیچ داده‌ای یافت نشد.
      </div>
    );
  }

  const {
    displayItems,
    totalPages,
    currentPage,
    hasPreviousPage,
    hasNextPage,
  } = paginate(filterData ?? requestsData?.items ?? [], page, pageSize);
  const isFilterButtonDisabled = !planName && !fromDate && !toDate;

  return (
    <div className='max-w-6xl mx-auto mt-6'>
      <h1 className='text-black font-bold text-lg mb-4'>
        {t('transaction:transaction_list')}
      </h1>
      <Filteredtabel
        planName={planName}
        setPlanName={setPlanName}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        handleFilter={handleFilter}
        isFilterButtonDisabled={isFilterButtonDisabled}
        placeholderText={t('home:search_plane')}
      />
      <div className='hidden md:block'>
        <TransactionListTable
          requests={displayItems}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
      <div className='block md:hidden'>
        <ResponsiveTransactionTable
          requests={displayItems}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>

      <Paginate
        hasPreviousPage={hasPreviousPage}
        setPage={setPage}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default TransactionsList;
