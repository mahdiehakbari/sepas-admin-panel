'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentStateWrapper } from '@/features/layout/components';
import { PageHeader } from '@/features/PageHeader';
import { Paginate } from '@/sharedComponent/ui';
import {
  SettlementListTable,
  ResponsiveSettlementTable,
} from '@/features/SettlementList';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { SettlementFilter } from './SettlementFilter/SettlementFilter';
import { ISelectOption } from '@/features/FIlteredTable/types';
import { useFetchMerchant } from '@/features/hooks';
import { IMerchantData } from '@/app/panel/transactionsList/types';
import { useFetchSettlement } from './hooks/useFetchSettlement/useFetchSettlement';

export const SettlementList = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [merchantName, setMerchantName] = useState<ISelectOption[]>([]);
  const [merchantData, setMerchantData] = useState<IMerchantData[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [remove, setRemove] = useState(false);

  const { fetchData, requestsData, pageLoading } = useFetchSettlement({
    pageSize: 10,
  });

  useEffect(() => {
    fetchData(page, merchantName);
  }, [page]);

  useEffect(() => {
    const hasFilter = merchantName.length > 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemove(hasFilter);
  }, [merchantName]);

  useFetchMerchant(setMerchantData);

  const handleFilter = () => {
    setPage(1);
    fetchData(1, merchantName);
    setIsOpenModal(false);
  };

  const handleRemoveFilter = () => {
    setMerchantName([]);
    setPage(1);
    fetchData(1, []);
    setRemove(false);
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setRemove(false);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('panel:page_loading')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <PageHeader
          titleKey='panel:acceptor_settlement_list'
          onFilterClick={() => setIsOpenModal(true)}
          remove={remove}
          handleRemoveFilter={handleRemoveFilter}
        />
        {!requestsData || requestsData.data?.document_list.length === 0 ? (
          <div className='text-center mt-10 text-gray-500'>
            {t('panel:empty')}
          </div>
        ) : (
          <>
            <div className='hidden md:block'>
              <SettlementListTable
                requests={requestsData?.data?.document_list || []}
                currentPage={requestsData?.pageNumber || page}
                pageSize={10}
              />
            </div>
            <div className='block md:hidden'>
              <ResponsiveSettlementTable
                requests={requestsData?.data?.document_list || []}
                currentPage={requestsData?.pageNumber || page}
                pageSize={10}
              />
            </div>
            <Paginate
              hasPreviousPage={requestsData?.hasPreviousPage || false}
              setPage={setPage}
              currentPage={requestsData?.pageNumber || page}
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
        <SettlementFilter
          isOpen={isOpenModal}
          merchantName={merchantName}
          setMerchantName={setMerchantName}
          handleFilter={handleFilter}
          handleRemoveFilter={handleRemoveFilter}
          merchantData={merchantData}
        />
      </ResponsiveModal>
    </ContentStateWrapper>
  );
};

export default SettlementList;
