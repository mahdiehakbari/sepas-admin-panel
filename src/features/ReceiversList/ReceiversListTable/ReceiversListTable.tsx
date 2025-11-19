'use client';

import { useTranslation } from 'react-i18next';
import { IReceiversTableProps } from './types';

import { getThItems } from './constants';
import { useStatusInfo } from './utils/useStatusInfo';

export const ReceiversListTable = ({
  requests,
  currentPage,
  pageSize,
}: IReceiversTableProps) => {
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
                  <div key={item.id} className='w-1/5 text-right'>
                    {item.label}
                  </div>
                ))}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((receiver, index) => {
            return (
              <tr key={receiver.id}>
                <td colSpan={5} className='p-0'>
                  <div className='flex items-center justify-between bg-white border border-border-color rounded-lg px-3 py-3'>
                    <div className='w-[10%] text-right'>
                      {index + 1 + (currentPage - 1) * pageSize}
                    </div>
                    <div className='w-[20%] text-center'>
                      {receiver.businessName}
                    </div>
                    <div className='w-[20%] text-center'>
                      {receiver.nationalId}
                    </div>
                    <div className='w-[20%] text-center'>
                      {receiver.phoneNumber}
                    </div>
                    <div className='w-[20%] text-center'>حقیقی</div>
                    <div className='w-[20%] text-center'></div>
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
