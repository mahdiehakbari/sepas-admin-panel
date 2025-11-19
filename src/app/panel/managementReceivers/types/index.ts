export interface IReceiversItem {
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
  customerNationalId: string;
}

export interface ICustomersData {
  items: IReceiversItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
