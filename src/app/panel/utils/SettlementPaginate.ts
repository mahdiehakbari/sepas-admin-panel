// utils/Paginate.ts
export interface IPaginationResult<T> {
  displayItems: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export function SettlementPaginate<T>(
  items: T[], // داده‌های فعلی (document_list)
  page: number, // شماره صفحه فعلی
  pageSize: number, // تعداد آیتم در هر صفحه
  totalCount?: number, // تعداد کل آیتم‌ها از API (document_total_count)
): IPaginationResult<T> {
  const count = totalCount ?? items.length;
  const totalPages = Math.ceil(count / pageSize);
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  return {
    displayItems: items, // فقط همان آیتم‌های فعلی را نمایش بده
    totalCount: count,
    totalPages,
    currentPage,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
}
