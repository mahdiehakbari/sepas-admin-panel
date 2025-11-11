'use client';

import { useTranslation } from 'react-i18next';
import { IInstallmentListTableProps } from './types';

import { getThItems } from './constants';
import { useStatusInfo } from './utils/useStatusInfo';
import { toPersianNumber } from '@/features/SettlementList/SettlementListTable/utils/toPersianNumber';

export const InstallmentListTable = ({
  requests,
  currentPage,
  pageSize,
}: IInstallmentListTableProps) => {
  const { t } = useTranslation();

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
          {requests.map((installment, index) => {
            return (
              <tr key={index}>
                <td colSpan={5} className='p-0'>
                  <div className='flex items-center justify-between bg-white border border-border-color rounded-lg px-3 py-3'>
                    <div className='w-[10%] text-right'>
                      {index + 1 + (currentPage - 1) * pageSize}
                    </div>
                    <div className='w-[20%] text-center'>
                      {installment.last_name}
                    </div>
                    <div className='w-[20%] text-center'>
                      {installment.due_date &&
                        toPersianNumber(installment.due_date)}
                    </div>

                    <div className='w-[20%] text-center'>
                      {installment.amount.toLocaleString('fa-IR')}
                    </div>
                    <div className='w-[20%] text-center'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          installment.employment_status === 0
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {installment.employment_status === 0
                          ? 'پرداخت نشده '
                          : 'پرداخت شده '}
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
