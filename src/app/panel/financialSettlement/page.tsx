'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentStateWrapper } from '@/features/layout/components';

import { Paginate } from '@/sharedComponent/ui';
import { DateObject } from 'react-multi-date-picker';
import { FilteredTable } from '@/features/FIlteredTable/FilteredTable';
import { ISelectOption } from '@/features/FIlteredTable/types';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { PageHeader } from '@/features/PageHeader';
import {
  useFetchMerchant,
  useFetchSettlement,
  useFetchAcceptor,
} from '@/features/hooks';
import { IMerchantData } from '../transactionsList/types';

import {
  ResponsiveSettlementTable,
  SettlementListTable,
} from '@/features/Financial';
import { TAcceptor } from '@/features/hooks/useFetchAcceptor/types';

const FinancialSettlement = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [merchantName, setMerchantName] = useState<ISelectOption[]>([]);
  const [merchantData, setMerchantData] = useState<IMerchantData[]>([]);
  const [acceptorName, setAcceptorName] = useState<ISelectOption[]>([]);
  const [acceptorData, setAcceptorData] = useState<TAcceptor[]>([]);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const [fromPaymentDate, setFromPaymentDate] = useState<DateObject | null>(
    null,
  );
  const [toPaymentDate, setToPaymentDate] = useState<DateObject | null>(null);
  const [remove, setRemove] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Store applied filters for pagination
  const appliedFiltersRef = useRef({
    merchantName: [] as ISelectOption[],
    acceptorName: [] as ISelectOption[],
    fromDate: null as DateObject | null,
    toDate: null as DateObject | null,
    fromPaymentDate: null as DateObject | null,
    toPaymentDate: null as DateObject | null,
  });

  const { fetchData, requestsData, pageLoading } = useFetchSettlement({
    pageSize: 10,
  });

  useEffect(() => {
    fetchData(
      page,
      appliedFiltersRef.current.merchantName,
      appliedFiltersRef.current.acceptorName,
      appliedFiltersRef.current.fromDate,
      appliedFiltersRef.current.toDate,
      appliedFiltersRef.current.fromPaymentDate,
      appliedFiltersRef.current.toPaymentDate,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleFilter = () => {
    // Save current filters
    appliedFiltersRef.current = {
      merchantName,
      acceptorName,
      fromDate,
      toDate,
      fromPaymentDate,
      toPaymentDate,
    };

    // Only set page, let useEffect handle the fetch
    setPage(1);
    setIsOpenModal(false);
  };

  useFetchMerchant(setMerchantData);
  useFetchAcceptor(setAcceptorData);

  const handleClose = () => {
    setMerchantName([]);
    setAcceptorName([]);
    setIsOpenModal(false);
    setFromDate(null);
    setToDate(null);
    setFromPaymentDate(null);
    setToPaymentDate(null);
    setRemove(false);
  };

  useEffect(() => {
    const hasFilter =
      merchantName.length > 0 ||
      acceptorName.length > 0 ||
      fromDate !== null ||
      toDate !== null ||
      fromPaymentDate !== null ||
      toPaymentDate !== null;
    setRemove(hasFilter);
  }, [
    fromDate,
    toDate,
    merchantName,
    acceptorName,
    fromPaymentDate,
    toPaymentDate,
  ]);

  const handleRemoveFilter = async () => {
    // Clear applied filters
    appliedFiltersRef.current = {
      merchantName: [],
      acceptorName: [],
      fromDate: null,
      toDate: null,
      fromPaymentDate: null,
      toPaymentDate: null,
    };

    setPage(1);
    setMerchantName([]);
    setAcceptorName([]);
    setFromDate(null);
    setToDate(null);
    setFromPaymentDate(null);
    setToPaymentDate(null);
    setRemove(false);
    fetchData(1, [], [], null, null, null, null);
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
          titleKey='financial:recipient_settlement'
          onFilterClick={handleOpenModal}
          handleRemoveFilter={handleRemoveFilter}
          remove={remove}
        />
        {!requestsData ||
        !requestsData.items ||
        requestsData.items.length === 0 ? (
          <div className='text-center mt-10 text-gray-500'>
            {t('panel:empty')}
          </div>
        ) : (
          <>
            <div className='hidden md:block'>
              <SettlementListTable
                requests={requestsData?.items || []}
                currentPage={requestsData?.pageNumber || 1}
                pageSize={10}
              />
            </div>
            <div className='block md:hidden'>
              <ResponsiveSettlementTable
                requests={requestsData?.items || []}
                currentPage={requestsData?.pageNumber || 1}
                pageSize={10}
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
          acceptorData={acceptorData}
          merchantData={merchantData || []}
          setMerchantName={setMerchantName}
          merchantName={merchantName}
          handleRemoveFilter={handleRemoveFilter}
          fromPaymentDate={fromPaymentDate}
          setFromPaymentDate={setFromPaymentDate}
          toPaymentDate={toPaymentDate}
          setToPaymentDate={setToPaymentDate}
          showPaymentDateFilters={true}
        />
      </ResponsiveModal>
    </ContentStateWrapper>
  );
};

export default FinancialSettlement;