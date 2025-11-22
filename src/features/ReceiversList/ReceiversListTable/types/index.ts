export interface IReceiversItem {
  id: string;
  businessName: string;
  nationalId: string;
  phoneNumber: string;
}

export interface IReceiversTableProps {
  requests: IReceiversItem[];
  currentPage: number;
  pageSize: number;
}
