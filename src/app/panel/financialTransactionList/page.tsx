'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentStateWrapper } from '@/features/layout/components';
import {
  TransactionListTable,
  ResponsiveTransactionTable,
} from '@/features/Financial';
import { Paginate } from '@/sharedComponent/ui';
import { DateObject } from 'react-multi-date-picker';
import { FilteredTable } from '@/features/FIlteredTable/FilteredTable';
import { ISelectOption } from '@/features/FIlteredTable/types';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { PageHeader } from '@/features/PageHeader';
import {
  useFetchAcceptor,
  useFetchMerchant,
  useFetchFinancialTransactions,
} from '@/features/hooks';
import { IAcceptorData, IMerchantData } from '../transactionsList/types';
import { transactionTypeOptions } from '@/features/Financial/TransactionListTable/constants/transactionTypes';

const FinancialTransactionList = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [acceptorName, setAcceptorName] = useState<ISelectOption[]>([]);
  const [merchantName, setMerchantName] = useState<ISelectOption[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<ISelectOption[]>([]);
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [acceptorData, setAcceptorData] = useState<IAcceptorData[]>([]);
  const [merchantData, setMerchantData] = useState<IMerchantData[]>([]);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const [remove, setRemove] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [creditLineTypes, setCreditLineTypes] = useState<ISelectOption[]>([]);
  const [planTypes, setPlanTypes] = useState<ISelectOption[]>([]);

  const appliedFiltersRef = useRef({
    acceptorName: [] as ISelectOption[],
    merchantName: [] as ISelectOption[],
    fromDate: null as DateObject | null,
    toDate: null as DateObject | null,
    transactionTypes: [] as ISelectOption[],
    referenceNumber: '',
    creditLineTypes: [] as ISelectOption[],
    planTypes: [] as ISelectOption[],
  });

  const transactionTypeSelectOptions = transactionTypeOptions.map((opt) => ({
    label: t(opt.labelKey),
    value: opt.value.toString(),
  }));

  const { fetchData, requestsData, pageLoading } =
    useFetchFinancialTransactions({
      pageSize: 10,
    });

  useEffect(() => {
    fetchData(
      page,
      appliedFiltersRef.current.acceptorName,
      appliedFiltersRef.current.merchantName,
      appliedFiltersRef.current.fromDate,
      appliedFiltersRef.current.toDate,
      appliedFiltersRef.current.transactionTypes,
      appliedFiltersRef.current.referenceNumber,
      appliedFiltersRef.current.creditLineTypes,
      appliedFiltersRef.current.planTypes,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleFilter = () => {
    appliedFiltersRef.current = {
      acceptorName,
      merchantName,
      fromDate,
      toDate,
      transactionTypes,
      referenceNumber,
      creditLineTypes,
      planTypes,
    };

    fetchData(
      1,
      acceptorName,
      merchantName,
      fromDate,
      toDate,
      transactionTypes,
      referenceNumber,
      creditLineTypes,
      planTypes,
    );

    setIsOpenModal(false);
    setPage(1);
  };

  useFetchAcceptor(setAcceptorData);
  useFetchMerchant(setMerchantData);

  const handleClose = () => {
    setAcceptorName([]);
    setMerchantName([]);
    setTransactionTypes([]);
    setReferenceNumber('');
    setIsOpenModal(false);
    setFromDate(null);
    setToDate(null);
    setRemove(false);
    setCreditLineTypes([]);
    setPlanTypes([]);
  };

  useEffect(() => {
    const hasFilter =
      merchantName.length > 0 ||
      fromDate !== null ||
      toDate !== null ||
      acceptorName.length > 0 ||
      transactionTypes.length > 0 ||
      referenceNumber !== '' ||
      creditLineTypes.length > 0 ||
      planTypes.length > 0;
    setRemove(hasFilter);
  }, [
    fromDate,
    toDate,
    merchantName,
    acceptorName,
    transactionTypes,
    referenceNumber,
    creditLineTypes,
    planTypes,
  ]);

  const handleRemoveFilterModal = async () => {
    setAcceptorName([]);
    setMerchantName([]);
    setTransactionTypes([]);
    setReferenceNumber('');
    setFromDate(null);
    setToDate(null);
    setRemove(false);
    setCreditLineTypes([]);
    setPlanTypes([]);
  };

  const handleRemoveFilter = async () => {
    setAcceptorName([]);
    setMerchantName([]);
    setTransactionTypes([]);
    setReferenceNumber('');
    setFromDate(null);
    setToDate(null);
    setRemove(false);
    setCreditLineTypes([]);
    setPlanTypes([]);
    setPage(1);
    setRemove(false);
    fetchData(1, [], [], null, null, [], '', [], []);
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
          titleKey='panel:transaction_list'
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
                pageSize={10}
              />
            </div>
            <div className='block md:hidden'>
              <ResponsiveTransactionTable
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
          acceptorData={acceptorData || []}
          merchantData={merchantData || []}
          transactionTypes={transactionTypes}
          setTransactionTypes={setTransactionTypes}
          transactionTypeOptions={transactionTypeSelectOptions}
          referenceNumber={referenceNumber}
          setReferenceNumber={setReferenceNumber}
          setMerchantName={setMerchantName}
          merchantName={merchantName}
          handleRemoveFilter={handleRemoveFilterModal}
          setCreditLineTypes={setCreditLineTypes}
          creditLineTypes={creditLineTypes}
          planTypes={planTypes}
          setPlanTypes={setPlanTypes}
        />
      </ResponsiveModal>
    </ContentStateWrapper>
  );
};

export default FinancialTransactionList;
