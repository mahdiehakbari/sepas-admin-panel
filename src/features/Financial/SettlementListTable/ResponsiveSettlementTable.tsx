import { useTranslation } from 'react-i18next';
import { useStatusInfo } from './utils/useStatusInfo';
import { ISettlementListTableProps } from './types';
import dayjs from 'dayjs';
import 'dayjs/locale/fa';
import { toPersianNumber } from './utils/toPersianNumber';

export const ResponsiveSettlementTable = ({
  requests,
  currentPage,
  pageSize,
}: ISettlementListTableProps) => {
  const { t } = useTranslation();

  return (
    <div className='max-w-md mx-auto mt-10 px-6'>
      {requests.map((settlement, index) => {
        return (
          <div key={index}>
            <div className='border-2 border-border-color rounded-lg mb-4'>
              <div className=' p-4 '>
                {/* <div className='flex gap-2 items-center mb-2 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('settlement_status:transaction_number')}:
                  </h2>
                  <h2 className='font-semibold text-gray-800'></h2>
                </div> */}
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('panel:settlement_date')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {settlement.payment_date &&
                      toPersianNumber(settlement.payment_date)}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('panel:customer_name')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {settlement.purchaseRequest?.customer?.fullName ?? '-'}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('panel:phone_number')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {settlement.purchaseRequest?.customer?.phoneNumber ?? '-'}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('panel:settlement_name')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {settlement.acceptor}
                  </p>
                </div>

                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('panel:settlement_amount')}
                  </h2>

                  <span className='font-medium text-black text-[14px]'>
                    {settlement.amount.toLocaleString('fa-IR')}ریال
                  </span>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('panel:settlement_status')}
                  </h2>

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
                      : 'لغو شده '}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
