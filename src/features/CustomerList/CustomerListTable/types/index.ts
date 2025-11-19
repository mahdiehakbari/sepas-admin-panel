export interface ICustomerItem {
  id: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
  customerId: string;
  customerName: string;
  merchantName: string;
  customerPhone: string;
  merchantId: string;
  customerNationalId: string;
}

export interface ICustomerTableProps {
  requests: ICustomerItem[];
  currentPage: number;
  pageSize: number;
}
