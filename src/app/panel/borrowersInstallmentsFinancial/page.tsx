'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IBorrowersInstallmentsData,
  IAcceptorData,
} from './types';
import Cookies from 'js-cookie';
import {
  BorrowersInstallmentsTable,
  ResponsiveBorrowersInstallmentsTable,
} from '@/features/BorrowersInstallments';
import { Paginate } from '@/sharedComponent/ui';
import { FilteredTable } from '@/features/FIlteredTable/FilteredTable';
import { ContentStateWrapper } from '@/features/layout/components';
import { ISelectOption } from '@/features/FIlteredTable/types';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { PageHeader } from '@/features/PageHeader';
import { useFetchAcceptor } from '@/features/hooks';
import { useFilterBorrowersInstallments } from './hooks/useFilterBorrowersInstallments';

const BorrowersInstallmentsFinancial = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [requestsData, setRequestData] =
    useState<IBorrowersInstallmentsData | null>(null);
  const [page, setPage] = useState(1);
  const [customerName, setCustomerName] = useState<ISelectOption[]>([]);
  const [acceptorData, setAcceptorData] = useState<IAcceptorData[]>([]);
  const [remove, setRemove] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const token = Cookies.get('token');
  const pageSize = 10;

  const { filterData } = useFilterBorrowersInstallments();

  const fetchData = async (pageNumber = 1) => {
    const customerIds = customerName.map((c) => c.value);
    setPageLoading(true);

    await filterData(
      customerIds,
      pageNumber,
      pageSize,
      token,
      setRequestData,
    );

    setPageLoading(false);
  };

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleFilter = () => {
    setPage(1);
    fetchData(1);
    setIsOpenModal(false);
  };

  useFetchAcceptor(setAcceptorData);

  const handleClose = () => {
    setCustomerName([]);
    setIsOpenModal(false);
    setRemove(false);
  };

  useEffect(() => {
    const hasFilter = customerName.length > 0;

    setRemove(hasFilter);
  }, [customerName]);

  const handleRemoveFilter = async () => {
    setPage(1);
    setCustomerName([]);
    setRemove(false);
    setPageLoading(true);

    await filterData([], 1, pageSize, token, setRequestData);

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
          titleKey='installment:borrowers_installments_documents'
          onFilterClick={handleOpenModal}
          handleRemoveFilter={handleRemoveFilter}
          remove={remove}
        />
        {!requestsData || !requestsData.data?.document_list || requestsData.data.document_list.length === 0 ? (
          <div className='text-center mt-10 text-gray-500'>
            {t('panel:empty')}
          </div>
        ) : (
          <>
            <div className='hidden md:block'>
              <BorrowersInstallmentsTable
                requests={requestsData?.data?.document_list || []}
                currentPage={requestsData?.pageNumber || 1}
                pageSize={pageSize}
              />
            </div>
            <div className='block md:hidden'>
              <ResponsiveBorrowersInstallmentsTable
                requests={requestsData?.data?.document_list || []}
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
          acceptorName={customerName}
          setAcceptorName={setCustomerName}
          fromDate={null}
          setFromDate={() => {}}
          toDate={null}
          setToDate={() => {}}
          handleFilter={handleFilter}
          placeholderText={t('panel:search_customer')}
          acceptorData={acceptorData || []}
          merchantData={[]}
          merchantName={[]}
          setMerchantName={() => {}}
          handleRemoveFilter={handleRemoveFilter}
        />
      </ResponsiveModal>
    </ContentStateWrapper>
  );
};

export default BorrowersInstallmentsFinancial;