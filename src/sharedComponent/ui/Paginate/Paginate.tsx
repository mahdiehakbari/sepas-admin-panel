import Image from 'next/image';
import { Button } from '../Button/Button';
import { PaginateProps } from './types';

export const Paginate = ({
  hasPreviousPage,
  setPage,
  currentPage,
  totalPages,
  hasNextPage,
}: PaginateProps) => {
  return (
    <div className='flex justify-center items-center gap-2 my-6'>
      <Button
        disabled={!hasPreviousPage}
        onClick={() => setPage(currentPage - 1)}
        className={`w-[34px] h-[34px] px-3 py-2 text-sm rounded-md ${
          !hasPreviousPage
            ? 'opacity-50 cursor-not-allowed bg-gray-200'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        <Image
          src='/assets/icons/arrow.svg'
          alt='dental-plane'
          width={64}
          height={64}
          className='rotate-180'
        />
      </Button>

      <div className='flex gap-1'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-[34px] h-[34px] px-3 py-1 rounded-md text-sm ${
              currentPage === i + 1
                ? 'bg-primary text-white'
                : ' text-gray-700 hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Button
        disabled={!hasNextPage}
        onClick={() => setPage(currentPage + 1)}
        className={`w-[34px] h-[34px]  px-3 py-2 text-sm rounded-md ${
          !hasNextPage
            ? 'opacity-50 cursor-not-allowed bg-gray-200'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        <Image
          src='/assets/icons/arrow.svg'
          alt='dental-plane'
          width={64}
          height={64}
        />
      </Button>
    </div>
  );
};
