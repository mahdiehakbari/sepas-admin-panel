'use client';

import {
  ResponsiveSettlementTable,
  SettlementListTable,
} from '@/features/SettlementList';
import Cookies from 'js-cookie';
import { Paginate } from '@/sharedComponent/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_MERCHANT_DOCUMENTS } from '@/config/api_address.config';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';
import { ISettlementsData } from './types';
import { ContentStateWrapper } from '@/features/layout/components';

const Settlement = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [requestsData, setRequestData] = useState<ISettlementsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      const disableLoading = async () => {
        setPageLoading(false);
      };
      disableLoading();
    }
  }, [token]);

  useEffect(() => {
    axios
      .get(`${API_MERCHANT_DOCUMENTS}?pageNo=${page}&count=10`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequestData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [page]);

  const items = requestsData?.data?.document_list;
  const pageSize = requestsData?.pageSize || 10;
  const totalCount = requestsData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <ContentStateWrapper
      loading={pageLoading}
      isEmpty={!requestsData || requestsData?.data?.document_list.length === 0}
      loadingText={t('panel:page_loading')}
      emptyText={t('panel:empty')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <h1 className='text-black font-bold text-lg mb-4'>
          {t('panel:acceptor_settlement_list')}
        </h1>

        <div className='hidden md:block'>
          <SettlementListTable
            requests={items ?? []}
            currentPage={page}
            pageSize={pageSize}
          />
        </div>

        <div className='block md:hidden'>
          <ResponsiveSettlementTable
            requests={items ?? []}
            currentPage={page}
            pageSize={pageSize}
          />
        </div>

        <Paginate
          hasPreviousPage={hasPreviousPage}
          setPage={setPage}
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
        />
      </div>
    </ContentStateWrapper>
  );
};

export default Settlement;
