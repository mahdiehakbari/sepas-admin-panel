import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Button } from '@/sharedComponent/ui/Button/Button';
import { IFilteredProps, ISelectOption } from './types';
import Select, { components, MultiValue, OptionProps } from 'react-select';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const CheckboxOption = (props: OptionProps<ISelectOption, true>) => (
  <components.Option {...props}>
    <input type='checkbox' checked={props.isSelected} readOnly /> {props.label}
  </components.Option>
);
export const FilteredTable = ({
  acceptorName,
  setAcceptorName,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  handleFilter,
  acceptorData,
  merchantData,
  setMerchantName,
  merchantName,
  handleRemoveFilter,
}: IFilteredProps) => {
  const { t } = useTranslation();
  const uniqueCustomers: ISelectOption[] = acceptorData.map((item) => ({
    label: `${item.firstName} ${item.lastName} - ${item.nationalId}`,
    value: item.id,
  }));
  const uniqueMerchants: ISelectOption[] = merchantData.map((item) => ({
    label: `${item.businessName}  - ${item.nationalId}`,
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
          onChange={(val: MultiValue<{ label: string; value: string }>) =>
            setAcceptorName([...val])
          }
          value={acceptorName}
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
      <div className='w-full  mb-5'>
        <Select
          options={uniqueMerchants}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
          onChange={(val: MultiValue<{ label: string; value: string }>) =>
            setMerchantName([...val])
          }
          value={merchantName}
          placeholder={t('panel:merchant_name')}
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

      <div className='w-full  mb-5'>
        <DatePicker
          value={fromDate}
          onChange={setFromDate}
          calendar={persian}
          locale={persian_fa}
          portal
          className='w-full'
          containerClassName='w-full'
          inputClass='border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
          placeholder={t('panel:from_date')}
          render={(value, openCalendar) => (
            <div
              className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
              onClick={openCalendar}
            >
              <span>{value || t('panel:from_date')}</span>

              <Image
                src='/assets/icons/calendar.svg'
                alt='calender'
                width={20}
                height={20}
              />
            </div>
          )}
        />
      </div>

      <div className='w-full  mb-5'>
        <DatePicker
          value={toDate}
          onChange={setToDate}
          calendar={persian}
          locale={persian_fa}
          portal
          className='w-full'
          containerClassName='w-full'
          inputClass='border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
          placeholder={t('panel:to_date')}
          render={(value, openCalendar) => (
            <div
              className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
              onClick={openCalendar}
            >
              <span>{value || t('panel:to_date')}</span>

              <Image
                src='/assets/icons/calendar.svg'
                alt='calender'
                width={20}
                height={20}
              />
            </div>
          )}
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
