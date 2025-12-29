import { useTranslation } from 'react-i18next';
import { useStatusInfo } from './utils/useStatusInfo';
import { ITransactionListTableProps } from './types';
import { toPersianNumber } from '@/features/SettlementList/SettlementListTable/utils/toPersianNumber';
import { getTransactionTypeLabelKey } from './constants/transactionTypes';

export const ResponsiveTransactionTable = ({
  requests,
  currentPage,
  pageSize,
}: ITransactionListTableProps) => {
  const { t } = useTranslation();

  return (
    <div className='max-w-md mx-auto mt-10'>
      {requests.map((transaction, index) => {
        return (
          <div key={index}>
            <div className='border-2 border-border-color rounded-lg mb-4'>
              <div className=' p-4 '>
                <div className='flex justify-between gap-2 items-center mb-2 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:acceptor_name')}
                  </h2>
                  <h2 className='font-semibold text-gray-800'>
                    {transaction.merchantName}
                  </h2>
                </div>
                <div className='flex justify-between gap-2 items-center mb-2 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:customer_name')}
                  </h2>
                  <h2 className='font-semibold text-gray-800'>
                    {transaction.customerName}
                  </h2>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:transaction_number')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {transaction.customerCreditRequestReferenceNumber
                      ? toPersianNumber(
                          transaction.customerCreditRequestReferenceNumber.toString(),
                        )
                      : '-'}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:transaction_date')}
                  </h2>
                  <div className='text-center flex items-center gap-1.5'>
                    {new Date(transaction.date).toLocaleTimeString('fa-IR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {'   '}
                    {new Date(transaction.date).toLocaleDateString('fa-IR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </div>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:amount')}
                  </h2>

                  <span className='font-medium text-black text-[14px]'>
                    {transaction.amount.toLocaleString('fa-IR')}
                  </span>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('financial:transaction_type')}
                  </h2>

                  <p className='font-medium text-black text-[14px]'>
                    {transaction.financialTransactionType !== undefined
                      ? t(
                          getTransactionTypeLabelKey(
                            transaction.financialTransactionType,
                          ),
                        )
                      : '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
