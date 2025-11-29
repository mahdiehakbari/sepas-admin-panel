'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_MERCHANTS_QUERY } from '@/config/api_address.config';
import { paginate } from '../utils/Paginate';

import { Paginate } from '@/sharedComponent/ui';
import { DateObject } from 'react-multi-date-picker';
import { FilteredTable } from '@/features/FIlteredTable/FilteredTable';
import { useFilter } from '@/features/FIlteredTable/hooks/useFilter';
import { ContentStateWrapper } from '@/features/layout/components';
import { IReceiversData } from './types';
import {
  ReceiversListTable,
  ResponsiveReceiversTable,
} from '@/features/ReceiversList';

const ManagementReceivers = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);

  const [requestsData, setRequestData] = useState<IReceiversData | null>(null);
  const [page, setPage] = useState(1);
  const [planName, setPlanName] = useState('');
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const token = Cookies.get('token');
  const { filterData } = useFilter(token, setRequestData);
  const pageSize = 10;

  useEffect(() => {
    axios
      .get(`${API_MERCHANTS_QUERY}/paged?pageNumber=1&pageSize=100`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequestData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [token]);

  const handleFilter = () => {
    // filterData(fromDate, toDate, planName);
  };

  const {
    displayItems,
    totalPages,
    currentPage,
    hasPreviousPage,
    hasNextPage,
  } = paginate(requestsData ? requestsData?.items : [], page, pageSize);

  const isFilterButtonDisabled = !planName && !fromDate && !toDate;

  console.log(requestsData?.items, displayItems, 'displayItems');

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('panel:page_loading')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <h1 className='text-black font-bold text-lg mb-4 mx-6 md:mx-0'>
          {t('transaction:transaction_list')}
        </h1>
        {!requestsData || requestsData.items.length === 0 ? (
          <div className='text-center mt-10 text-gray-500'>
            {t('panel:empty')}
          </div>
        ) : (
          <>
            <div className='hidden md:block'>
              <ReceiversListTable
                requests={displayItems}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            </div>
            <div className='block md:hidden'>
              <ResponsiveReceiversTable
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
          </>
        )}
      </div>
    </ContentStateWrapper>
  );
};

export default ManagementReceivers;
