export interface IPaginationResult<T> {
  displayItems: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
