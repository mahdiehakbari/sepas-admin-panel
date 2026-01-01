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
  transactionTypes,
  setTransactionTypes,
  transactionTypeOptions,
  referenceNumber,
  setReferenceNumber,
  fromPaymentDate,
  setFromPaymentDate,
  toPaymentDate,
  setToPaymentDate,
  showPaymentDateFilters = false,
  setCreditLineTypes,
  creditLineTypes,
  planTypes,
  setPlanTypes,
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
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const creditLineTypeOptions: ISelectOption[] = [
    { label: 'باجت', value: '0' },
  ];

  const planTypeOptions: ISelectOption[] = [
    { label: 'دنتالیت ', value: '0' },
    { label: 'یدک', value: '1' },
  ];

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

      {transactionTypeOptions && setTransactionTypes && transactionTypes && (
        <div className='w-full mb-5'>
          <Select
            options={transactionTypeOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            onChange={(val: MultiValue<{ label: string; value: string }>) =>
              setTransactionTypes([...val])
            }
            value={transactionTypes}
            placeholder={t('financial:transaction_type')}
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
      )}

      {referenceNumber !== undefined && setReferenceNumber && (
        <div className='w-full mb-5'>
          <input
            type='text'
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder={t('transaction:transaction_number')}
            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      )}

      <div className='w-full mb-5'>
        <Select
          options={creditLineTypeOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
          onChange={(val: MultiValue<ISelectOption>) =>
            setCreditLineTypes([...val])
          }
          value={creditLineTypes}
          placeholder={'خط اعتباری'}
          styles={{
            valueContainer: (base) => ({
              ...base,
              display: 'flex',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              maxHeight: '38px',
            }),
            multiValue: (base) => ({ ...base, whiteSpace: 'nowrap' }),
          }}
        />
      </div>

      <div className='w-full mb-5'>
        <Select
          options={planTypeOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
          onChange={(val: MultiValue<ISelectOption>) => setPlanTypes([...val])}
          value={planTypes}
          placeholder={'طرح'}
          styles={{
            valueContainer: (base) => ({
              ...base,
              display: 'flex',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              maxHeight: '38px',
            }),
            multiValue: (base) => ({ ...base, whiteSpace: 'nowrap' }),
          }}
        />
      </div>

      <div className='w-full  mb-5'>
        <DatePicker
          value={fromDate}
          onChange={(date) => setFromDate(date ?? null)}
          calendar={persian}
          locale={persian_fa}
          portal
          className='w-full'
          containerClassName='w-full'
          maxDate={today}
          placeholder='از تاریخ تراکنش'
          onOpenPickNewDate={false}
          render={(value, openCalendar) => (
            <div
              className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
              onClick={openCalendar}
            >
              <span className='truncate'>{value || 'از تاریخ تراکنش'}</span>

              <div className='flex items-center gap-2'>
                {value && (
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      setFromDate(null);
                    }}
                    className='text-gray-400 hover:text-red-500 text-lg leading-none'
                  >
                    ×
                  </button>
                )}

                <Image
                  src='/assets/icons/calendar.svg'
                  alt='calendar'
                  width={20}
                  height={20}
                />
              </div>
            </div>
          )}
        />
      </div>

      <div className='w-full  mb-5'>
        <DatePicker
          value={toDate}
          onChange={(date) => setToDate(date ?? null)}
          calendar={persian}
          locale={persian_fa}
          portal
          maxDate={today}
          className='w-full'
          containerClassName='w-full'
          placeholder='تا تاریخ تراکنش'
          onOpenPickNewDate={false}
          render={(value, openCalendar) => (
            <div
              className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
              onClick={openCalendar}
            >
              <span className='truncate'>{value || 'تا تاریخ تراکنش'}</span>

              <div className='flex items-center gap-2'>
                {value && (
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      setToDate(null);
                    }}
                    className='text-gray-400 hover:text-red-500 text-lg leading-none'
                  >
                    ×
                  </button>
                )}

                <Image
                  src='/assets/icons/calendar.svg'
                  alt='calendar'
                  width={20}
                  height={20}
                />
              </div>
            </div>
          )}
        />
      </div>

      {showPaymentDateFilters &&
        fromPaymentDate !== undefined &&
        setFromPaymentDate && (
          <div className='w-full mb-5'>
            <DatePicker
              value={fromPaymentDate}
              onChange={(date) => setFromPaymentDate(date ?? null)}
              calendar={persian}
              locale={persian_fa}
              portal
              className='w-full'
              containerClassName='w-full'
              maxDate={today}
              placeholder={t('panel:from_payment_date')}
              onOpenPickNewDate={false}
              render={(value, openCalendar) => (
                <div
                  className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
                  onClick={openCalendar}
                >
                  <span className='truncate'>
                    {value || t('panel:from_payment_date')}
                  </span>

                  <div className='flex items-center gap-2'>
                    {value && (
                      <button
                        type='button'
                        onClick={(e) => {
                          e.stopPropagation();
                          setFromPaymentDate(null);
                        }}
                        className='text-gray-400 hover:text-red-500 text-lg leading-none'
                      >
                        ×
                      </button>
                    )}

                    <Image
                      src='/assets/icons/calendar.svg'
                      alt='calendar'
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              )}
            />
          </div>
        )}

      {showPaymentDateFilters &&
        toPaymentDate !== undefined &&
        setToPaymentDate && (
          <div className='w-full mb-5'>
            <DatePicker
              value={toPaymentDate}
              onChange={(date) => setToPaymentDate(date ?? null)}
              calendar={persian}
              locale={persian_fa}
              portal
              maxDate={today}
              className='w-full'
              containerClassName='w-full'
              placeholder={t('panel:to_payment_date')}
              onOpenPickNewDate={false}
              render={(value, openCalendar) => (
                <div
                  className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
                  onClick={openCalendar}
                >
                  <span className='truncate'>
                    {value || t('panel:to_payment_date')}
                  </span>

                  <div className='flex items-center gap-2'>
                    {value && (
                      <button
                        type='button'
                        onClick={(e) => {
                          e.stopPropagation();
                          setToPaymentDate(null);
                        }}
                        className='text-gray-400 hover:text-red-500 text-lg leading-none'
                      >
                        ×
                      </button>
                    )}

                    <Image
                      src='/assets/icons/calendar.svg'
                      alt='calendar'
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              )}
            />
          </div>
        )}

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
