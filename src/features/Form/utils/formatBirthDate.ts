import { DateObject } from 'react-multi-date-picker';
import { Calendar, Locale } from 'react-date-object';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';

export const formatBirthDate = (
  date: string | undefined,
): string | undefined => {
  if (!date) return undefined;

  try {
    const dateObj = new DateObject({
      date,
      calendar: persian as Calendar,
      locale: persian_fa as Locale,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    return dateObj.convert('gregorian').toDate().toISOString();
  } catch (error) {
    console.error('Error converting birth date:', error);
    return undefined;
  }
};
