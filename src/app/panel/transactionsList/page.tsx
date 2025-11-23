'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IAcceptorData, IMerchantData, ITransactionsData } from './types';
import Cookies from 'js-cookie';
import {
  ResponsiveTransactionTable,
  TransactionListTable,
} from '@/features/TransactionList';
import { Button, Paginate } from '@/sharedComponent/ui';
import { DateObject } from 'react-multi-date-picker';
import { FilteredTable } from '@/features/FIlteredTable/FilteredTable';
import { useFilter } from '@/features/FIlteredTable/hooks/useFilter';
import { ContentStateWrapper } from '@/features/layout/components';
import { ISelectOption } from '@/features/FIlteredTable/types';
import axios from 'axios';
import {
  API_CUSTOMER_QUERY_SIMPLE,
  API_MERCHANT_QUERY_SIMPLE,
} from '@/config/api_address.config';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';

import Image from 'next/image';

const TransactionsList = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [requestsData, setRequestData] = useState<ITransactionsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [acceptorName, setAcceptorName] = useState<ISelectOption[]>([]);
  const [merchantName, setMerchantName] = useState<ISelectOption[]>([]);
  const [acceptorData, setAcceptorData] = useState<IAcceptorData[]>([]);
  const [merchantData, setMerchantData] = useState<IMerchantData[]>([]);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const token = Cookies.get('token');
  const pageSize = 10;

  const { filterData } = useFilter<ITransactionsData>(token, setRequestData);

  const fetchData = async (pageNumber = 1) => {
    const customerIds = acceptorName.map((c) => c.value);
    const merchantIds = merchantName.map((c) => c.value);
    setPageLoading(true);

    await filterData(
      fromDate,
      toDate,
      customerIds,
      merchantIds,
      pageNumber,
      pageSize,
    );

    setPageLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(page);
  }, [page]);

  const handleFilter = () => {
    setPage(1);
    fetchData(1);
    setIsOpenModal(false);
  };

  useEffect(() => {
    axios
      .get(API_CUSTOMER_QUERY_SIMPLE)
      .then((res) => setAcceptorData(res.data))
      .catch();
    axios
      .get(API_MERCHANT_QUERY_SIMPLE)
      .then((res) => {
        setMerchantData(res.data);
      })
      .catch();
  }, []);

  const handleClose = () => {
    setPage(1);
    fetchData(1);
    setAcceptorName([]);
    setMerchantName([]);
    setIsOpenModal(false);
    setFromDate(null);
    setToDate(null);
  };

  const handleRemoveFilter = () => {
    setPage(1);
    setAcceptorName([]);
    setMerchantName([]);
    setFromDate(null);
    setToDate(null);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      isEmpty={!requestsData || requestsData.items.length === 0}
      loadingText={t('panel:page_loading')}
      emptyText={t('panel:empty')}
    >
      <div className='mx-auto mt-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-black font-bold text-lg mb-4'>
            {t('transaction:transaction_list')}
          </h1>

          <Button onClick={handleOpenModal} className='w-[75px] '>
            <Image
              src='/assets/icons/filter.svg'
              alt='filter'
              width={16}
              height={16}
            />
            {t('panel:filter')}
          </Button>
        </div>

        <div className='hidden md:block'>
          <TransactionListTable
            requests={requestsData?.items || []}
            currentPage={requestsData?.pageNumber || 1}
            pageSize={pageSize}
          />
        </div>

        <div className='block md:hidden'>
          <ResponsiveTransactionTable
            requests={requestsData?.items || []}
            currentPage={requestsData?.pageNumber || 1}
            pageSize={pageSize}
          />
        </div>

        <Paginate
          hasPreviousPage={requestsData?.hasPreviousPage || false}
          setPage={setPage}
          currentPage={requestsData?.pageNumber || 1}
          totalPages={requestsData?.totalPages || 1}
          hasNextPage={requestsData?.hasNextPage || false}
        />
      </div>
      <ResponsiveModal
        isOpen={isOpenModal}
        title={t('panel:filter')}
        onClose={handleClose}
      >
        <FilteredTable
          acceptorName={acceptorName}
          setAcceptorName={setAcceptorName}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleFilter={handleFilter}
          placeholderText={t('panel:search_customer')}
          acceptorData={acceptorData || []}
          merchantData={merchantData || []}
          setMerchantName={setMerchantName}
          merchantName={merchantName}
          handleRemoveFilter={handleRemoveFilter}
        />
      </ResponsiveModal>
    </ContentStateWrapper>
  );
};

export default TransactionsList;
