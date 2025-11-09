export interface PaginateProps {
  hasPreviousPage: boolean;
  setPage: (value: number) => void;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}
