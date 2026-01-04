import {
  IAcceptorData,
  IMerchantData,
} from '@/app/panel/transactionsList/types';

import { DateObject } from 'react-multi-date-picker';

export interface ISelectOption {
  label: string;
  value: string;
}

export interface IFilteredProps {
  acceptorName: ISelectOption[];
  setAcceptorName: (value: ISelectOption[]) => void;
  fromDate: DateObject | null;
  setFromDate: (value: DateObject | null) => void;
  toDate: DateObject | null;
  setToDate: (value: DateObject | null) => void;
  handleFilter: () => void;
  placeholderText: string;
  acceptorData: IAcceptorData[];
  merchantData: IMerchantData[];
  merchantName: ISelectOption[];
  setMerchantName: (value: ISelectOption[]) => void;
  handleRemoveFilter: () => void;
  transactionTypes?: ISelectOption[];
  setTransactionTypes?: (value: ISelectOption[]) => void;
  transactionTypeOptions?: ISelectOption[];
  referenceNumber?: string;
  setReferenceNumber?: (value: string) => void;
  fromPaymentDate?: DateObject | null;
  setFromPaymentDate?: (value: DateObject | null) => void;
  toPaymentDate?: DateObject | null;
  setToPaymentDate?: (value: DateObject | null) => void;
  showPaymentDateFilters?: boolean;
  creditLineTypes?: ISelectOption[];
  planTypes?: ISelectOption[];
  setCreditLineTypes?: (value: ISelectOption[]) => void;
  setPlanTypes?: (value: ISelectOption[]) => void;
}

