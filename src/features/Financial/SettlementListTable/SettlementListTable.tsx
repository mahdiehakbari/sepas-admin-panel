'use client';

import { useTranslation } from 'react-i18next';
import { getThItems } from './constants';
import { ISettlementListTableProps } from './types';
import { toPersianNumber } from './utils/toPersianNumber';

export const SettlementListTable = ({
  requests,
  currentPage,
  pageSize,
}: ISettlementListTableProps) => {
  const { t } = useTranslation();

  const gridCols = 'grid-cols-[6%_16%_16%_16%_14%_16%_16%]';

  return (
    <div className='w-full space-y-4 direction-rtl'>
      <div
        className={`grid ${gridCols}
        bg-(--block-color) border border-(--block-color)
        rounded-lg px-4 py-3
        font-semibold text-gray-700 text-sm text-right`}
      >
        {getThItems().map((item) => (
          <div key={item.id} className='text-right'>
            {item.label}
            {item.id === 6 && ' (ریال)'}
          </div>
        ))}
      </div>

      {requests.map((settlement, index) => (
        <div
          key={settlement.uuid}
          className={`grid ${gridCols} items-center
          bg-white border border-border-color rounded-lg
          px-4 py-4 text-sm text-right
          hover:bg-gray-50 transition`}
        >
          <div>{index + 1 + (currentPage - 1) * pageSize}</div>

          <div className='truncate'>
            {settlement.purchaseRequest?.customer?.fullName ?? '-'}
          </div>

          <div className='truncate'>
            {settlement.purchaseRequest?.customer?.phoneNumber ?? '-'}
          </div>

          <div className='truncate'>{settlement.acceptor ?? '-'}</div>

          <div>
            {settlement.payment_date
              ? toPersianNumber(settlement.payment_date)
              : '-'}
          </div>

          <div className='font-medium'>
            {settlement.amount.toLocaleString('fa-IR')}
          </div>

          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                ${
                  settlement.status === 29
                    ? 'bg-red-100 text-red-700'
                    : settlement.status === null
                    ? 'bg-blue-100 text-blue-700'
                    : settlement.status === 12
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-800'
                }`}
            >
              {settlement.status === null
                ? 'اقدام نشده'
                : settlement.status === 12
                ? 'تسویه شده'
                : settlement.status === 29
                ? 'لغو شده'
                : 'ناشناخته'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
