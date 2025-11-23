export interface ISelectOption {
  label: string;
  value: string;
}
export interface IFilterParams {
  pageNumber: number;
  pageSize: number;
  createdFrom?: string;
  createdTo?: string;
  customerIds?: string[];
  merchantIds?: string[];
}
