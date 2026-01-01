import { useTranslation } from 'react-i18next';
import { useStatusInfo } from './utils/useStatusInfo';
import { IReceiversTableProps } from './types';

export const ResponsiveReceiversTable = ({
  requests,
  currentPage,
  pageSize,
}: IReceiversTableProps) => {
  const { t } = useTranslation();

  return (
    <div className='max-w-md mx-6 md:mx-auto mt-10'>
      {requests.map((receiver, index) => {
        return (
          <div key={index}>
            <div className='border-2 border-border-color rounded-lg mb-4'>
              <div className=' p-4 '>
                <div className='flex gap-2 items-center mb-2 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('customer-management:customer_name')}:
                  </h2>
                  <h2 className='font-semibold text-gray-800'>
                    {receiver.businessName}
                  </h2>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('customer-management:national_id')}:
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {receiver.nationalId}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('customer-management:customer_mobile')}:
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {receiver.phoneNumber}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('customer-management:customer_type')}:
                  </h2>
                  <p className='font-medium text-black text-[14px]'>حقیقی</p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('customer-management:city')}:
                  </h2>
                  <p className='font-medium text-black text-[14px]'>-</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
