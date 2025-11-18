export interface ITransactionItem {
  id: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  merchantId: string;
  merchantName: string;
}

export interface ITransactionsData {
  items: ITransactionItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
