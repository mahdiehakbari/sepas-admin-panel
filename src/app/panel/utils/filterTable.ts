import DateObject from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';

interface FilterParams<T> {
  data: T[];
  planName?: string;
  fromDate?: DateObject | null;
  toDate?: DateObject | null;
  dateKey?: keyof T;
  nameKey?: keyof T;
}

export const filterTable = <T>({
  data,
  planName,
  fromDate,
  toDate,
  dateKey = 'createdAt' as keyof T,
  nameKey = 'merchantName' as keyof T,
}: FilterParams<T>): T[] => {
  if (!data) return [];

  const fromDateConverted = fromDate
    ? fromDate.convert(gregorian).toDate()
    : null;
  const toDateConverted = toDate ? toDate.convert(gregorian).toDate() : null;

  let fromFilter: Date;
  let toFilter: Date;

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (fromDateConverted && toDateConverted) {
    fromFilter = new Date(fromDateConverted.setHours(0, 0, 0, 0));
    toFilter = new Date(toDateConverted.setHours(23, 59, 59, 999));
  } else if (fromDateConverted && !toDateConverted) {
    fromFilter = new Date(fromDateConverted.setHours(0, 0, 0, 0));
    toFilter = today;
  } else if (!fromDateConverted && toDateConverted) {
    fromFilter = new Date('1970-01-01T00:00:00');
    toFilter = new Date(toDateConverted.setHours(23, 59, 59, 999));
  } else {
    fromFilter = new Date('1970-01-01T00:00:00');
    toFilter = today;
  }

  return data.filter((item) => {
    const itemDate = new Date(String(item[dateKey]));
    const nameValue = String(item[nameKey] ?? '');
    const matchesName = !planName || nameValue.includes(planName.trim());
    const matchesDate = itemDate >= fromFilter && itemDate <= toFilter;
    return matchesName && matchesDate;
  });
};
