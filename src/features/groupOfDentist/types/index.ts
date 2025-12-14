type TExcelCell = string | number | null | undefined;
type TExcelRow = TExcelCell[];

export interface ITableProps {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  headers: string[];
  paginatedData: TExcelRow[];
  tableData: TExcelRow[];
  PAGE_SIZE: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (value: number) => void;
}
