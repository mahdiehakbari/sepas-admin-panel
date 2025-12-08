import React, { useState, useEffect } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { IDateInputProps } from './types';

export const DateInput = <T extends FieldValues>({
  control,
  name,
  label,
  errors,
  rules,
  textError,
  defaultValue,
}: IDateInputProps<T> & { defaultValue?: string }) => {
  const hasError = !!errors[name];

  const [pickerValue, setPickerValue] = useState<DateObject | undefined>();

  useEffect(() => {
    // فقط اگر defaultValue رشته معتبر بود، DateObject بساز
    if (defaultValue && !isNaN(Date.parse(defaultValue))) {
      setPickerValue(new DateObject(defaultValue));
    }
  }, [defaultValue]);

  return (
    <div className='flex flex-col'>
      {/* <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue ?? undefined}
        render={({ field }) => (
          <DatePicker
            value={pickerValue}
            onChange={(date) => {
              if (date instanceof DateObject) {
                setPickerValue(date);
                field.onChange(date.format('YYYY-MM-DD'));
              } else {
                setPickerValue(undefined);
                field.onChange(undefined);
              }
            }}
            calendar={persian}
            locale={persian_fa}
            inputClass={`w-full bg-white border rounded-lg px-3 py-2 text-right placeholder-gray-400 
              focus:outline-none focus:ring-2 ${
                hasError
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            placeholder={`${label} *`}
            calendarPosition='bottom-right'
          />
        )}
      /> */}

      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={
          defaultValue && !isNaN(Date.parse(defaultValue))
            ? defaultValue
            : undefined
        }
        render={({ field }) => (
          <DatePicker
            value={pickerValue}
            onChange={(date) => {
              if (date instanceof DateObject) {
                setPickerValue(date);
                field.onChange(date.format('YYYY-MM-DD')); // رشته به فرم می‌رود
              } else {
                setPickerValue(undefined);
                field.onChange(undefined);
              }
            }}
            calendar={persian}
            locale={persian_fa}
            inputClass={`w-full bg-white border rounded-lg px-3 py-2 text-right placeholder-gray-400 
        focus:outline-none focus:ring-2 ${
          hasError
            ? 'border-red-500 focus:ring-red-400'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
            placeholder={`${label} *`}
            calendarPosition='bottom-right'
          />
        )}
      />

      {hasError && (
        <span className='text-red-500 text-sm mt-1'>
          {errors[name]?.message?.toString() || textError}
        </span>
      )}
    </div>
  );
};
