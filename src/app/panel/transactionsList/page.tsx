'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IAcceptorData, IMerchantData, ITransactionsData } from './types';
import Cookies from 'js-cookie';
import {
  ResponsiveTransactionTable,
  TransactionListTable,
} from '@/features/TransactionList';
import { Paginate } from '@/sharedComponent/ui';
import { DateObject } from 'react-multi-date-picker';
import { FilteredTable } from '@/features/FIlteredTable/FilteredTable';
import { useFilter } from '@/features/FIlteredTable/hooks/useFilter';
import { ContentStateWrapper } from '@/features/layout/components';
import { ISelectOption } from '@/features/FIlteredTable/types';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { PageHeader } from '@/features/PageHeader';
import { useFetchAcceptor, useFetchMerchant } from '@/features/hooks';

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
  const [remove, setRemove] = useState(false);
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

  useFetchAcceptor(setAcceptorData);
  useFetchMerchant(setMerchantData);

  const handleClose = () => {
    setAcceptorName([]);
    setMerchantName([]);
    setIsOpenModal(false);
    setFromDate(null);
    setToDate(null);
    setRemove(false);
  };

  useEffect(() => {
    const hasFilter =
      merchantName.length > 0 ||
      fromDate !== null ||
      toDate !== null ||
      acceptorName.length > 0;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemove(hasFilter);
  }, [fromDate, toDate, merchantName, acceptorName]);

  const handleRemoveFilter = async () => {
    setPage(1);
    setAcceptorName([]);
    setMerchantName([]);
    setFromDate(null);
    setToDate(null);
    setRemove(false);
    setPageLoading(true);

    await filterData(null, null, [], [], 1, pageSize);

    setPageLoading(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('panel:page_loading')}
    >
      <div className='mx-auto mt-6 px-6 md:px-0'>
        <PageHeader
          titleKey='transaction:transaction_list'
          onFilterClick={handleOpenModal}
          handleRemoveFilter={handleRemoveFilter}
          remove={remove}
        />
        {!requestsData || requestsData.items.length === 0 ? (
          <div className='text-center mt-10 text-gray-500'>
            {t('panel:empty')}
          </div>
        ) : (
          <>
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
          </>
        )}
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
