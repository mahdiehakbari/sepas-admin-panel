import { IPaginationResult } from './types';

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number,
): IPaginationResult<T> {
  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const displayItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return {
    displayItems,
    totalCount,
    totalPages,
    currentPage,
    hasPreviousPage,
    hasNextPage,
  };
}
