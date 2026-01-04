export interface ISettlementItem {
  account_no: number;
  personnel_code: string | null;
  person_id: number;
  employment_status: number;
  order: number;
  amount: number;
  first_name: string;
  last_name: string;
  nation_code: number;
  tag: number;
  organization: string;
  organization_code: string | null;
  paid_documents_amount: number;
  create_date: string;
  due_date: string;
}

export interface ISettlementListTableProps {
  requests: ISettlementItem[];
  currentPage: number;
  pageSize: number;
}
