'use client';

import { useRef, useState } from 'react';
import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import GroupOfDentistTable from '@/features/groupOfDentist/groupOfDentistTable';
import { toast } from 'react-toastify';
import { API_BULK_CREATE, API_CITY_NAME } from '@/config/api_address.config';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type ExcelCell = string | number | null | undefined;
type ExcelRow = ExcelCell[];

const PAGE_SIZE = 10;

const isValidNationalCode = (code: string) => {
  if (!/^\d{10}$/.test(code)) return false;
  const check = +code[9];
  const sum =
    code
      .split('')
      .slice(0, 9)
      .reduce((acc, digit, i) => acc + +digit * (10 - i), 0) % 11;
  return sum < 2 ? check === sum : check === 11 - sum;
};

const isValidMobile = (mobile: string) => /^09\d{9}$/.test(mobile);
const isOnlyNumber = (value: string) => /^\d+$/.test(value);

const isValidSheba = (sheba: string) => {
  if (!sheba) return false;
  const value = sheba.replace(/-/g, '').trim();
  return value.length === 24;
};

const GroupOfDentist = () => {
  const { t } = useTranslation();

  const [headers, setHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<ExcelRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const token = Cookies.get('token');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const fetchCityIdByName = async (
    cityName: string,
  ): Promise<string | null> => {
    try {
      const response = await fetch(
        `${API_CITY_NAME}?name=${encodeURIComponent(cityName)}`,
      );
      if (!response.ok) return null;
      const data = await response.json();
      return data.cityId || null;
    } catch {
      return null;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    const reader = new FileReader();

    reader.onload = async (evt) => {
      const result = evt.target?.result;
      if (!result) return;

      const workbook = XLSX.read(result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, {
        header: 1,
        raw: true,
      });

      if (rows.length === 0) return;

      const [headerRow, ...dataRows] = rows;

      const validRows: ExcelRow[] = [];
      const seenNationalCodes = new Set<string>();
      const seenMobiles = new Set<string>();

      for (let index = 0; index < dataRows.length; index++) {
        const row = dataRows[index];
        const rowNumber = index + 2;

        if (
          row.some((cell) => cell === null || cell === undefined || cell === '')
        ) {
          toast.error(`ردیف ${rowNumber}: برخی فیلدها خالی هستند`);
          continue;
        }

        const nationalCode = String(row[2]).trim();
        const mobile = String(row[3]).trim();
        const medicalSystemNumber = String(row[4]).trim();
        const sheba = String(row[11]).replace(/-/g, '').trim();
        const cityName = String(row[8]).trim();

        if (seenNationalCodes.has(nationalCode)) {
          toast.error(`ردیف ${rowNumber}: کد ملی تکراری است`);
          continue;
        }

        if (seenMobiles.has(mobile)) {
          toast.error(`ردیف ${rowNumber}: شماره موبایل تکراری است`);
          continue;
        }

        if (!isValidNationalCode(nationalCode)) {
          toast.error(`ردیف ${rowNumber}: کد ملی نامعتبر است`);
          continue;
        }

        if (!isValidMobile(mobile)) {
          toast.error(`ردیف ${rowNumber}: شماره موبایل نامعتبر است`);
          continue;
        }

        if (!medicalSystemNumber || !isOnlyNumber(medicalSystemNumber)) {
          toast.error(`ردیف ${rowNumber}: شماره نظام پزشکی نامعتبر است`);
          continue;
        }

        if (!isValidSheba(sheba)) {
          toast.error(`ردیف ${rowNumber}: شماره شبا نامعتبر است`);
          continue;
        }

        const cityId = await fetchCityIdByName(cityName);

        if (!cityId) {
          toast.error(`ردیف ${rowNumber}: شهر "${cityName}" یافت نشد`);
          continue;
        }

        row[7] = cityId;

        seenNationalCodes.add(nationalCode);
        seenMobiles.add(mobile);

        validRows.push(row);
      }

      setHeaders(headerRow.map((cell) => String(cell ?? '')));
      setTableData(validRows);
      setCurrentPage(1);
      setSuccessMessage(`(${validRows.length} رکورد با موفقیت ثبت شد.)`);
    };

    reader.readAsBinaryString(file);
    e.target.value = '';
  };

  const headersForView = headers.slice(0, -1);
  const tableDataForView = tableData.map((row) => row.slice(0, -1));

  const totalPages = Math.ceil(tableDataForView.length / PAGE_SIZE);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const paginatedDataForView = tableDataForView.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  /* ===============================
     ارسال به API (داده کامل)
  ================================ */
  const merchants = tableData.map((item) => ({
    phoneNumber: item[3],
    nationalId: item[2],
    address: item[9],
    cityId: item[7],
    firstName: item[0],
    lastName: item[1],
    iban: item[11],
    workPlacePhoneNumber: item[10],
    imageUrl: item[13], // ستون آخر
    gender: item[5] === 'woman' ? 0 : 1,
  }));

  const handleSubmit = () => {
    setButtonLoading(true);
    axios
      .post(
        API_BULK_CREATE,
        { merchants },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        setButtonLoading(false);
        router.push('/panel/dentalSociety');
        toast.success('اطلاعات با موفقیت ثبت شد.');
      })
      .catch((error) => {
        setButtonLoading(false);
        console.error(error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className='w-full p-6 bg-[#fbfbfb] rounded-2xl mb-6'>
      {tableData.length === 0 && (
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-[16px] text-black font-normal'>
            {t('dental-society:using_excel')}
          </h3>
          <a
            href='/assets/file/doctors_info_template.xlsx'
            download
            className='flex items-center gap-2'
          >
            <Image
              src='/assets/icons/excel.svg'
              alt='excel'
              width={24}
              height={24}
            />
            <span className='text-[16px] font-medium text-primary'>
              {t('dental-society:sample_excel')}
            </span>
          </a>
        </div>
      )}

      <div
        className={`${
          tableData.length === 0
            ? 'bg-white border border-border-color'
            : 'bg-[#f8f8f8]'
        } rounded-2xl`}
      >
        {tableData.length === 0 && (
          <div className='flex flex-col items-center justify-center py-14 mb-6'>
            <p className='text-black font-normal text-[16px] mb-3'>
              {t('dental-society:select_upload')}
            </p>

            <input
              ref={fileInputRef}
              type='file'
              accept='.xls,.xlsx'
              className='hidden'
              onChange={handleFileUpload}
            />

            <Button onClick={openFileDialog}>
              {t('dental-society:upload_file')}
            </Button>
          </div>
        )}

        <div className='mx-6'>
          {tableData.length > 0 && (
            <div className='mb-6'>
              <div className='md:flex items-center justify-between py-6'>
                <p className='text-[16px]'>{successMessage}</p>

                <div className='md:flex items-center gap-4'>
                  <p>{uploadedFileName}</p>
                  <Button
                    className='bg-transparent hover:bg-transparent text-primary'
                    onClick={openFileDialog}
                  >
                    {t('dental-society:redownload')}
                  </Button>
                </div>
              </div>

              <GroupOfDentistTable
                hasPreviousPage={hasPreviousPage}
                hasNextPage={hasNextPage}
                headers={headersForView}
                paginatedData={paginatedDataForView}
                tableData={tableDataForView}
                PAGE_SIZE={PAGE_SIZE}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-end mt-6'>
        <Button disabled={tableData.length === 0} onClick={handleSubmit}>
          {buttonLoading ? (
            <SpinnerDiv />
          ) : (
            t('dental-society:confirm_continue')
          )}
        </Button>
      </div>
    </div>
  );
};

export default GroupOfDentist;
