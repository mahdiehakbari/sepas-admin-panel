'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/sharedComponent/ui';
import { ISelectOption } from '@/features/FIlteredTable/types';
import { Dispatch, SetStateAction } from 'react';
import { IAcceptorData } from '../types';
import Select, { components, MultiValue, OptionProps } from 'react-select';

interface IBorrowersInstallmentsFilterProps {
  customerName: ISelectOption[];
  setCustomerName: Dispatch<SetStateAction<ISelectOption[]>>;
  acceptorData: IAcceptorData[];
  handleFilter: () => void;
  handleRemoveFilter: () => Promise<void>;
}

const CheckboxOption = (props: OptionProps<ISelectOption, true>) => (
  <components.Option {...props}>
    <input type='checkbox' checked={props.isSelected} readOnly /> {props.label}
  </components.Option>
);

export const BorrowersInstallmentsFilter = ({
  customerName,
  setCustomerName,
  acceptorData,
  handleFilter,
  handleRemoveFilter,
}: IBorrowersInstallmentsFilterProps) => {
  const { t } = useTranslation();

  const uniqueCustomers: ISelectOption[] = acceptorData.map((item) => ({
    label: `${item.firstName} ${item.lastName} - ${item.nationalId}`,
    value: item.id,
  }));

  return (
    <div className='p-6 md:w-[465px]'>
      <div className='w-full mb-5'>
        <Select
          options={uniqueCustomers}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
          onChange={(val: MultiValue<ISelectOption>) =>
            setCustomerName([...val])
          }
          value={customerName}
          placeholder={t('panel:customer_name')}
          styles={{
            valueContainer: (base) => ({
              ...base,
              display: 'flex',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              maxHeight: '38px',
            }),
            multiValue: (base) => ({
              ...base,
              whiteSpace: 'nowrap',
            }),
          }}
        />
      </div>

      <div className='flex justify-between gap-4'>
        <Button
          variant='outline'
          onClick={handleRemoveFilter}
          className='w-[199px]'
        >
          {t('panel:remove_filter')}
        </Button>
        <Button onClick={handleFilter} className='w-[199px]'>
          {t('panel:get_report')}
        </Button>
      </div>
    </div>
  );
};
