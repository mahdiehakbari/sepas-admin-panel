import { useTranslation } from 'react-i18next';
import { useStatusInfo } from './utils/useStatusInfo';
import { ICustomerTableProps } from './types';

export const ResponsiveCustomerTable = ({
  requests,
  currentPage,
  pageSize,
}: ICustomerTableProps) => {
  const { t } = useTranslation();
  const { getStatusInfo } = useStatusInfo();
  return (
    <div className='max-w-md mx-auto mt-10'>
      {requests.map((customer, index) => {
        const { label, className } = getStatusInfo(customer.status);
        return (
          <div key={index}>
            <div className='border-2 border-border-color rounded-lg mb-4'>
              <div className=' p-4 '>
                <div className='flex gap-2 items-center mb-2 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:customer_name')}
                  </h2>
                  <h2 className='font-semibold text-gray-800'>
                    {customer.customerName}
                  </h2>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:phone_number')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {customer.customerPhone}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:transaction_date')}
                  </h2>
                  <div className='text-center flex items-center gap-1.5'>
                    {new Date(customer.createdAt).toLocaleTimeString('fa-IR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {'   '}
                    {new Date(customer.createdAt).toLocaleDateString('fa-IR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </div>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:transaction_amount')}
                  </h2>

                  <span className='font-medium text-black text-[14px]'>
                    {customer.amount.toLocaleString('fa-IR')}
                  </span>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:transaction_status')}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
                  >
                    {label}
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
