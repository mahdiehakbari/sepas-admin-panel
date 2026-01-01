'use client';

import { Paginate } from '@/sharedComponent/ui';
import { ITableProps } from './types';

const GroupOfDentistTable = ({
  hasPreviousPage,
  headers,
  paginatedData,
  tableData,
  PAGE_SIZE,
  hasNextPage,
  currentPage,
  totalPages,
  setCurrentPage,
}: ITableProps) => {
  return (
    <div className='w-full'>
      <div
        className='hidden md:grid bg-gray-100 rounded-lg px-3 py-3 font-semibold text-gray-700 text-sm mb-2 gap-2'
        style={{
          gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
        }}
      >
        {headers.map((header, index) => (
          <div key={index} className='text-center'>
            {header}
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-3 '>
        {paginatedData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className='bg-white border border-gray-200 rounded-lg px-3 py-3'
          >
            <div
              className='hidden md:grid gap-2'
              style={{
                gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
              }}
            >
              {headers.map((_, colIndex) => (
                <div
                  key={colIndex}
                  className='text-sm text-center break-all whitespace-normal'
                >
                  {row[colIndex] ?? '-'}
                </div>
              ))}
            </div>

            <div className='flex flex-col gap-2 mx md:hidden'>
              {headers.map((header, colIndex) => (
                <div
                  key={colIndex}
                  className='flex justify-between  pb-1 text-sm'
                >
                  <span className='text-gray-500'>{header}</span>
                  <span className='font-medium break-all'>
                    {row[colIndex] ?? '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {tableData.length > PAGE_SIZE && (
        <div className='mt-6 flex justify-center'>
          <Paginate
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
            setPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default GroupOfDentistTable;
