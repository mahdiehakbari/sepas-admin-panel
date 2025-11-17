'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITransactionItem, ITransactionsData } from './types';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_PURCHASE_REQUEST } from '@/config/api_address.config';
import gregorian from 'react-date-object/calendars/gregorian';
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

  const [requestsData, setRequestData] = useState<ITransactionsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [planName, setPlanName] = useState('');
  const [filterData, setFilterData] = useState<ITransactionItem[]>([]);

  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const token = Cookies.get('token');
  const pageSize = 10;

  useEffect(() => {
    axios
      .get(`${API_PURCHASE_REQUEST}/paged?pageNumber=1&pageSize=100`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequestData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [token]);

  const handleFilter = async () => {
    const createdFrom = fromDate
      ? fromDate
          .convert(gregorian)
          .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
          .toDate()
          .toISOString()
      : '';

    const createdTo = toDate
      ? toDate
          .convert(gregorian)
          .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
          .toDate()
          .toISOString()
      : '';

    try {
      const res = await axios.get(`${API_PURCHASE_REQUEST}/paged`, {
        params: {
          pageNumber: 1,
          pageSize: 100,
          createdFrom,
          createdTo,
          planName,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequestData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (pageLoading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <SpinnerDiv size='lg' />
        <p className='px-2'>{t('panel:page_loading')}</p>
      </div>
    );
  }

  if (!requestsData || requestsData.items.length === 0) {
    return (
      <div className='text-center mt-10 text-gray-500'>{t('panel:empty')}</div>
    );
  }

  const {
    displayItems,
    totalPages,
    currentPage,
    hasPreviousPage,
    hasNextPage,
  } = paginate(requestsData?.items, page, pageSize);
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
        placeholderText={t('panel:search_customer')}
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
