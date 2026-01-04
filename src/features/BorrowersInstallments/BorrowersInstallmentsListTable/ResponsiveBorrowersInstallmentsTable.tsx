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
                    {t('panel:customer_name')}
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
                    {t('panel:account_no')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {toPersianNumber(document.account_no.toString())}
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

                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('panel:amount')}
                  </h2>

                  <span className='font-medium text-black text-[14px]'>
                    {document.amount.toLocaleString('fa-IR')} ریال
                  </span>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('panel:order')}
                  </h2>

                  <span className='font-medium text-black text-[14px]'>
                    {toPersianNumber(document.order.toString())}
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
