import { useTranslation } from 'react-i18next';
import { ISettlementListTableProps } from './types';
import { toPersianNumber } from './utils/toPersianNumber';

export const ResponsiveBorrowersInstallmentsTable = ({
  requests,
  currentPage,
  pageSize,
}: ISettlementListTableProps) => {
  const { t } = useTranslation();

  return (
    <div className='max-w-md mx-auto mt-10 px-6'>
      {requests.map((document, index) => {
        return (
          <div key={`${document.account_no}-${document.order}-${index}`}>
            <div className='border-2 border-border-color rounded-lg mb-4'>
              <div className=' p-4 '>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('panel:row')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {toPersianNumber(
                      (index + 1 + (currentPage - 1) * pageSize).toString(),
                    )}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    نام و نام خانوادگی مشتری
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {document.first_name} {document.last_name}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('panel:national_code')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {toPersianNumber(document.nation_code.toString())}
                  </p>
                </div>

                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction:transaction_date')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {document.create_date
                      ? toPersianNumber(document.create_date)
                      : '-'}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('installment:due_date')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {document.due_date
                      ? toPersianNumber(document.due_date)
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
