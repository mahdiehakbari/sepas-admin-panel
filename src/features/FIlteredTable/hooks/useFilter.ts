import axios from 'axios';
import gregorian from 'react-date-object/calendars/gregorian';
import { DateObject } from 'react-multi-date-picker';
import { API_PURCHASE_REQUEST } from '@/config/api_address.config';

export function useFilter<T>(
  token: string | undefined,
  setRequestData: (data: T) => void,
) {
  const startOfDay = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const endOfDay = (date: Date) => {
    date.setHours(23, 59, 59, 999);
    return date;
  };

  const filterData = async (
    fromDate: DateObject | null,
    toDate: DateObject | null,
    planName: string,
  ) => {
    const createdFrom = fromDate
      ? startOfDay(fromDate.convert(gregorian).toDate()).toISOString()
      : '';

    const createdTo = toDate
      ? endOfDay(toDate.convert(gregorian).toDate()).toISOString()
      : endOfDay(new Date()).toISOString();

    try {
      const res = await axios.get<T>(`${API_PURCHASE_REQUEST}/paged`, {
        params: {
          pageNumber: 1,
          pageSize: 100,
          createdFrom,
          createdTo,
          planName,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequestData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return { filterData };
}
