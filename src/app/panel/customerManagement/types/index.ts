export interface ICustomerItem {
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
  items: ICustomerItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
