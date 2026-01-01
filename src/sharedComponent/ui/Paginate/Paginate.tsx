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
  const getMobilePages = () => {
    const pages = [];
    if (currentPage > 2) pages.push(1);
    if (currentPage > 3) pages.push('dots-start');
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('dots-end');
    if (currentPage < totalPages - 1) pages.push(totalPages);
    return pages;
  };

  const mobilePages = getMobilePages();

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
          alt='prev'
          width={20}
          height={20}
          className='rotate-180'
        />
      </Button>

      <div className='hidden md:flex gap-1'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-[34px] h-[34px] px-3 py-1 rounded-md text-sm ${
              currentPage === i + 1
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className='flex md:hidden gap-1'>
        {mobilePages.map((p, i) =>
          p === 'dots-start' || p === 'dots-end' ? (
            <span key={i} className='px-2 text-gray-500'>
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => setPage(Number(p))}
              className={`w-[30px] h-[30px] text-sm rounded-md ${
                currentPage === p
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <Button
        disabled={!hasNextPage}
        onClick={() => setPage(currentPage + 1)}
        className={`w-[34px] h-[34px] px-3 py-2 text-sm rounded-md ${
          !hasNextPage
            ? 'opacity-50 cursor-not-allowed bg-gray-200'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        <Image
          src='/assets/icons/arrow.svg'
          alt='next'
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
};
