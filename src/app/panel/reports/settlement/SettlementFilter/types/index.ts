import { IMerchantData } from '@/app/panel/transactionsList/types';
import { ISelectOption } from '@/features/FIlteredTable/types';

export interface ISettlementFilterProps {
  isOpen: boolean;
  merchantName: ISelectOption[];
  setMerchantName: (val: ISelectOption[]) => void;
  handleFilter: () => void;
  handleRemoveFilter: () => void;
  merchantData: IMerchantData[];
}
