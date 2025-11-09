export interface PaginateProps {
  hasPreviousPage: boolean;
  setPage: (value: number) => void;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}
export interface ISettlementItem {
  uuid: string;
  amount: number;
  cash_out_method: number;
  account_no: number;
  status: string | null;
  acceptor?: string;
  acceptor_tag?: number;
  city?: string;
  province?: string;
  create_date?: string | undefined;
  payment_date?: string;
  iban?: string;
  person_address?: number;
}

export interface ISettlementsData {
  data: {
    document_list: ISettlementItem[];
    document_total_count: number;
  };
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
