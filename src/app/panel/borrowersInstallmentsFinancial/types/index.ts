export interface IBorrowersInstallmentsItem {
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

export interface IBorrowersInstallmentsApiData {
  response_code: number;
  document_total_count: number;
  document_list: IBorrowersInstallmentsItem[];
}

export interface IBorrowersInstallmentsData {
  data: IBorrowersInstallmentsApiData;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IAcceptorData {
  firstName: string;
  id: string;
  lastName: string;
  nationalId: string;
}
