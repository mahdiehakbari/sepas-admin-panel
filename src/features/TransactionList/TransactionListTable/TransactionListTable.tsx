'use client';

import { useTranslation } from 'react-i18next';
import { ITransactionListTableProps } from './types';

import { getThItems } from './constants';
import { useStatusInfo } from './utils/useStatusInfo';

export const TransactionListTable = ({
  requests,
  currentPage,
  pageSize,
}: ITransactionListTableProps) => {
  const { t } = useTranslation();
  const { getStatusInfo } = useStatusInfo();

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-separate [border-spacing:0_16px]'>
        <thead>
          <tr>
            <th colSpan={5} className='p-0'>
              <div className='flex bg-(--block-color) border border-(--block-color) rounded-lg px-3 py-3 font-semibold text-gray-700 text-sm'>
                {getThItems().map((item) => (
                  <div key={item.id} className='w-1/5 text-right'>
                    {item.label}
                  </div>
                ))}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((transaction, index) => {
            const { label, className } = getStatusInfo(transaction.status);

            return (
              <tr key={transaction.id}>
                <td colSpan={5} className='p-0'>
                  <div className='flex items-center justify-between bg-white border border-border-color rounded-lg px-3 py-3'>
                    <div className='w-[10%] text-right'>
                      {index + 1 + (currentPage - 1) * pageSize}
                    </div>
                    <div className='w-[20%] text-center'>
                      {transaction.merchantName}
                    </div>
                    <div className='w-[20%] text-center'>
                      {transaction.customerName}
                    </div>
                    <div className='w-[20%] text-center'>
                      {transaction.customerPhone}
                    </div>
                    <div className='w-[20%] text-center flex items-center gap-1.5'>
                      {new Date(transaction.createdAt).toLocaleTimeString(
                        'fa-IR',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                        },
                      )}
                      {'   '}
                      {new Date(transaction.createdAt).toLocaleDateString(
                        'fa-IR',
                        {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        },
                      )}
                    </div>
                    <div className='w-[20%] text-center'>
                      {transaction.amount.toLocaleString('fa-IR')}
                    </div>
                    <div className='w-[20%] text-center'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
