'use client';

import { getThItems } from './constants';
import { ISettlementListTableProps } from './types';
import { toPersianNumber } from './utils/toPersianNumber';

export const BorrowersInstallmentsTable = ({
  requests,
  currentPage,
  pageSize,
}: ISettlementListTableProps) => {

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
          {requests.map((document, index) => (
            <tr
              key={`${document.account_no}-${document.order}-${index}`}
              className='odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition'
            >
              <td colSpan={7} className='p-0'>
                <div className='grid grid-cols-7 items-center bg-white border border-border-color rounded-lg px-3 py-3 text-right'>
                  <div>{index + 1 + (currentPage - 1) * pageSize}</div>
                  <div>
                    {document.first_name} {document.last_name}
                  </div>
                  <div>
                    {toPersianNumber(document.nation_code.toString())}
                  </div>
                  <div className='text-right'>
                    {toPersianNumber(document.account_no.toString())}
                  </div>
                  <div>
                    {document.due_date
                      ? toPersianNumber(document.due_date)
                      : '-'}
                  </div>
                  <div>{document.amount.toLocaleString('fa-IR')}</div>
                  <div>
                    {toPersianNumber(document.order.toString())}
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
