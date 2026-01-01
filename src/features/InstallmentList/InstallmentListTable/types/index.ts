export interface IInstallmentItem {
  id: string;
  last_name: string;
  due_date: string;
  amount: number;
  employment_status: number;
}

export interface IInstallmentListTableProps {
  requests: IInstallmentItem[];
  currentPage: number;
  pageSize: number;
}
