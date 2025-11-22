export interface IReceiversItem {
  id: string;
  businessName: string;
  nationalId: string;
  phoneNumber: string;
}

export interface IReceiversData {
  items: IReceiversItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
