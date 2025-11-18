import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DateObject from 'react-date-object';
import { Button } from '@/sharedComponent/ui/Button/Button';

export interface IFilteredProps {
  planName: string;
  setPlanName: (value: string) => void;
  fromDate: DateObject | null;
  setFromDate: (value: DateObject | null) => void;
  toDate: DateObject | null;
  setToDate: (value: DateObject | null) => void;
  handleFilter: () => void;
  isFilterButtonDisabled: boolean;
  placeholderText: string;
}

export const FilteredTable = ({
  planName,
  setPlanName,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  handleFilter,
  isFilterButtonDisabled,
  placeholderText,
}: IFilteredProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
      <div className='w-full'>
        <input
          type='text'
          placeholder={placeholderText}
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className='border border-border-color rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
        />
      </div>

      <div className='w-full'>
        <DatePicker
          value={fromDate}
          onChange={setFromDate}
          calendar={persian}
          locale={persian_fa}
          inputClass='border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
          placeholder='از تاریخ'
        />
      </div>

      <div className='w-full'>
        <DatePicker
          value={toDate}
          onChange={setToDate}
          calendar={persian}
          locale={persian_fa}
          inputClass='border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
          placeholder='تا تاریخ'
        />
      </div>

      <div className='w-full flex items-end'>
        <Button
          onClick={handleFilter}
          disabled={isFilterButtonDisabled}
          className={`w-full ${
            isFilterButtonDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          فیلتر
        </Button>
      </div>
    </div>
  );
};
