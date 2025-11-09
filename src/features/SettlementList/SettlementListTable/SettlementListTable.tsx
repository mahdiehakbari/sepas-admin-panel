'use client';

import { useTranslation } from 'react-i18next';
import { getThItems } from './constants';
import { useStatusInfo } from './utils/useStatusInfo';
import { ISettlementListTableProps } from './types';
import { toPersianNumber } from './utils/toPersianNumber';
import dayjs from 'dayjs';
import 'dayjs/locale/fa';

export const SettlementListTable = ({
  requests,
  currentPage,
  pageSize,
}: ISettlementListTableProps) => {
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
                  <div key={item.id} className='w-1/1 text-right'>
                    {item.label} {item.id == 4 && '(ریال)'}
                  </div>
                ))}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((settlement, index) => {
            const { label, className } = getStatusInfo(settlement.status);

            return (
              <tr key={settlement.uuid}>
                <td colSpan={5} className='p-0'>
                  <div className='flex items-center justify-between bg-white border border-border-color rounded-lg px-3 py-3'>
                    <div className='w-[10%] text-right'>
                      {index + 1 + (currentPage - 1) * pageSize}
                    </div>
                    <div className='w-[20%] text-center'>
                      {settlement.create_date
                        ? toPersianNumber(
                            `${dayjs(settlement.create_date).format(
                              'HH:mm:ss',
                            )} - ${dayjs(settlement.create_date).format(
                              'YYYY/MM/DD',
                            )}`,
                          )
                        : '-'}
                    </div>
                    <div className='w-[10%] text-center flex items-center gap-1.5'>
                      {settlement.payment_date &&
                        toPersianNumber(settlement.payment_date)}
                    </div>

                    <div className='w-[20%] text-center'>
                      {settlement.amount.toLocaleString('fa-IR')}
                    </div>
                    <div className='w-[20%] text-center'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          //@ts-expect-error
                          settlement.status === 29
                            ? 'bg-red-100 text-red-700'
                            : settlement.status === null
                            ? 'bg-blue-100 text-blue-700'
                            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-expect-error
                            settlement.status === 12
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {settlement.status === null
                          ? 'اقدام نشده'
                          : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          //@ts-expect-error
                          settlement.status == 12
                          ? 'تسویه شده'
                          : 'لغو شده '}
                      </span>
                    </div>
                    {/* <div className='w-[25%] text-center'>
                      <p className='text-primary text-[12px] font-medium'>
                        {t('settlement_status:more')}
                      </p>
                    </div> */}
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
