'use client';

import { Paginate } from '@/sharedComponent/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  InstallmentListTable,
  ResponsiveInstallmentTable,
} from '@/features/InstallmentList';
import { ContentStateWrapper } from '@/features/layout/components';
import { useFetchAcceptor } from '@/features/hooks';
import { useFetchInstallment } from './hooks/useFetchSettlement/useFetchInstallment';
import { ISelectOption } from '@/features/FIlteredTable/types';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { InstallmentFilter } from './InstallmentFilter/InstallmentFilter';
import { PageHeader } from '@/features/PageHeader';
import { IAcceptorData } from '../../transactionsList/types';

const Installment = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [acceptorName, setAcceptorName] = useState<ISelectOption[]>([]);
  const [acceptorData, setAcceptorData] = useState<IAcceptorData[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { fetchData, requestsData, pageLoading } = useFetchInstallment({
    pageSize: 10,
  });

  useEffect(() => {
    fetchData(page, acceptorName);
  }, [page]);

  useFetchAcceptor(setAcceptorData);

  const handleFilter = () => {
    setPage(1);
    fetchData(1, acceptorName);
    setIsOpenModal(false);
  };

  const handleRemoveFilter = () => {
    setAcceptorName([]);
    setPage(1);
    fetchData(1, []);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      isEmpty={!requestsData || requestsData?.data?.document_list.length === 0}
      loadingText={t('panel:page_loading')}
      emptyText={t('panel:empty')}
    >
      <div className='max-w-6xl mx-auto mt-6 px-6 md:px-0'>
        <PageHeader
          titleKey='panel:borrowers_installments'
          onFilterClick={() => setIsOpenModal(true)}
        />

        <div className='hidden md:block'>
          <InstallmentListTable
            requests={requestsData?.data?.document_list ?? []}
            currentPage={page}
            pageSize={10}
          />
        </div>

        <div className='block md:hidden'>
          <ResponsiveInstallmentTable
            requests={requestsData?.data?.document_list ?? []}
            currentPage={page}
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
      </div>

      <ResponsiveModal
        isOpen={isOpenModal}
        title={t('panel:filter')}
        onClose={() => setIsOpenModal(false)}
      >
        <InstallmentFilter
          isOpen={isOpenModal}
          acceptorName={acceptorName}
          setAcceptorName={setAcceptorName}
          handleFilter={handleFilter}
          handleRemoveFilter={handleRemoveFilter}
          acceptorData={acceptorData}
        />
      </ResponsiveModal>
    </ContentStateWrapper>
  );
};

export default Installment;
