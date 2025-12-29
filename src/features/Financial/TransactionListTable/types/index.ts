export interface ITransactionItem {
  id: string;
  amount: number;
  description: string;
  status: string;
  date: string;
  customerId: string;
  customerName: string;
  merchantName: string;
  customerCreditRequestReferenceNumber?: number;
  merchantId: string;
  transactionType?: number;
  creditLineType?: number;
  purchaseRequestReferenceNumber?: string;
  financialTransactionType?: number;  
}

export interface ITransactionListTableProps {
  requests: ITransactionItem[];
  currentPage: number;
  pageSize: number;
}


export interface IFinancialTransaction {
  id: string;
  amount: number;
  description: string;
  status: string;
  date: string;
  customerId: string;
  customerName: string;
  merchantName: string;
  merchantId: string;
  transactionType: number;
  creditLineType: number;
  customerCreditRequestReferenceNumber?: number;
  purchaseRequestReferenceNumber?: string;
  financialTransactionType: number; 
}

export interface IFinancialTransactionsData {
  items: IFinancialTransaction[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IAcceptorData {
  id: string;
  name: string;
}

export interface IMerchantData {
  id: string;
  name: string;
}