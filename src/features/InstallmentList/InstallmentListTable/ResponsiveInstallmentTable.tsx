import { useTranslation } from 'react-i18next';
import { useStatusInfo } from './utils/useStatusInfo';
import { IInstallmentListTableProps } from './types';
import { toPersianNumber } from '@/features/SettlementList/SettlementListTable/utils/toPersianNumber';

export const ResponsiveInstallmentTable = ({
  requests,
  currentPage,
  pageSize,
}: IInstallmentListTableProps) => {
  const { t } = useTranslation();

  return (
    <div className='md:max-w-md mx-auto mt-10 px-6'>
      {requests.map((installment, index) => {
        return (
          <div key={index}>
            <div className='border-2 border-border-color rounded-lg mb-4'>
              <div className=' p-4 '>
                <div className='flex justify-between gap-2 items-center mb-2 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('installment:customer_name')}
                  </h2>
                  <h2 className='font-semibold text-gray-800'>
                    {installment.last_name}
                  </h2>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('installment:due_date')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {installment.due_date &&
                      toPersianNumber(installment.due_date)}
                  </p>
                </div>

                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('installment:amount')}
                  </h2>

                  <span className='font-medium text-black text-[14px]'>
                    {installment.amount.toLocaleString('fa-IR')}
                  </span>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('installment:transaction_status')}
                  </h2>

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
            </div>
          </div>
        );
      })}
    </div>
  );
};
