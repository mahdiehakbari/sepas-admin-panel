'use client';

import { useTranslation } from 'react-i18next';
import { ITransactionListTableProps } from './types';
import { getThItems } from './constants';
import { toPersianNumber } from '@/features/SettlementList/SettlementListTable/utils/toPersianNumber';
import { getTransactionTypeLabelKey } from './constants/transactionTypes';

export const TransactionListTable = ({
  requests,
  currentPage,
  pageSize,
}: ITransactionListTableProps) => {
  const { t } = useTranslation();

  const gridCols = 'grid-cols-[8%_18%_15%_20%_15%_12%_12%]';

  return (
    <div className='w-full space-y-4'>
      {/* Header */}
      <div
        className={`grid ${gridCols} bg-(--block-color)
        border border-(--block-color) rounded-lg
        px-4 py-3 text-sm font-semibold text-gray-700`}
      >
        {getThItems().map((item) => (
          <div key={item.id} className='text-center'>
            {item.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {requests.map((transaction, index) => (
        <div
          key={transaction.id}
          className={`grid ${gridCols} items-center
          bg-white border border-border-color rounded-lg
          px-4 py-4 text-sm
          hover:shadow-sm transition`}
        >
          {/* index */}
          <div className='text-center'>
            {index + 1 + (currentPage - 1) * pageSize}
          </div>

          {/* reference number */}
          <div className='text-center'>
            {transaction.customerCreditRequestReferenceNumber
              ? toPersianNumber(
                  transaction.customerCreditRequestReferenceNumber.toString(),
                )
              : '-'}
          </div>

          {/* transaction type */}
          <div className='text-center'>
            {transaction.financialTransactionType !== undefined
              ? t(
                  getTransactionTypeLabelKey(
                    transaction.financialTransactionType,
                  ),
                )
              : '-'}
          </div>

          {/* date */}
          <div className='text-center flex justify-center gap-2 whitespace-nowrap'>
            <span>
              {new Date(transaction.date).toLocaleTimeString('fa-IR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <span>
              {new Date(transaction.date).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </span>
          </div>

          {/* amount */}
          <div className='text-center font-medium'>
            {transaction.amount.toLocaleString('fa-IR')}
          </div>

          {/* merchant */}
          <div className='text-center truncate'>{transaction.merchantName}</div>

          {/* customer */}
          <div className='text-center truncate'>{transaction.customerName}</div>
        </div>
      ))}
    </div>
  );
};
