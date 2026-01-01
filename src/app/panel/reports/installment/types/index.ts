export interface PaginateProps {
  hasPreviousPage: boolean;
  setPage: (value: number) => void;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}
export interface IInstallmentItem {
  id: string;
  last_name: string;
  due_date: string;
  amount: number;
  employment_status: number;
}

export interface IInstallmentsData {
  data: {
    document_list: IInstallmentItem[];
    document_total_count: number;
  };
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
