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

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-separate [border-spacing:0_16px] direction-rtl'>
        <thead>
          <tr>
            <th colSpan={7} className='p-0'>
              <div className='grid grid-cols-7 bg-(--block-color) border border-(--block-color) rounded-lg px-3 py-3 font-semibold text-gray-700 text-sm text-right'>
                {getThItems().map((item) => (
                  <div key={item.id} className='text-right'>
                    {item.label} {item.id === 6 && '(ریال)'}
                  </div>
                ))}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((settlement, index) => (
            <tr
              key={settlement.uuid}
              className='odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition'
            >
              <td colSpan={7} className='p-0'>
                <div className='grid grid-cols-7 items-center bg-white border border-border-color rounded-lg px-3 py-3 text-right'>
                  <div>{index + 1 + (currentPage - 1) * pageSize}</div>
                  <div>
                    {settlement.purchaseRequest?.customer?.fullName ?? '-'}
                  </div>
                  <div>
                    {settlement.purchaseRequest?.customer?.phoneNumber ?? '-'}
                  </div>
                  <div className='text-right'>{settlement.acceptor ?? '-'}</div>
                  <div>
                    {settlement.payment_date
                      ? toPersianNumber(settlement.payment_date)
                      : '-'}
                  </div>
                  <div>{settlement.amount.toLocaleString('fa-IR')}</div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                        : settlement.status == 12
                        ? 'تسویه شده'
                        : settlement.status == 29
                        ? 'لغو شده'
                        : 'ناشناخته'}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
