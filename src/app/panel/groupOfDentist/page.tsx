'use client';

import { useRef, useState } from 'react';
import { Button } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import GroupOfDentistTable from '@/features/groupOfDentist/groupOfDentistTable';

type ExcelCell = string | number | null | undefined;
type ExcelRow = ExcelCell[];

const PAGE_SIZE = 10;

const GroupOfDentist = () => {
  const { t } = useTranslation();

  const [headers, setHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<ExcelRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (!validTypes.includes(file.type)) {
      alert('فقط فایل اکسل مجاز است');
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
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

      setHeaders(headerRow.map((cell) => String(cell ?? '')));
      setTableData(dataRows);
      setCurrentPage(1);
      setSuccessMessage(`(${dataRows.length} رکورد با موفقیت ثبت شد.)`);
    };

    reader.readAsBinaryString(file);
    e.target.value = '';
  };

  const totalPages = Math.ceil(tableData.length / PAGE_SIZE);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const paginatedData = tableData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className='w-full p-6 bg-[#fbfbfb] rounded-2xl mb-6'>
      {tableData.length == 0 && (
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
          tableData.length == 0
            ? 'bg-white  border border-border-color'
            : 'bg-[#f8f8f8]'
        }  rounded-2xl`}
      >
        {tableData.length == 0 && (
          <div className='  flex flex-col items-center justify-center py-14 mb-6'>
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
              <div className='flex items-center justify-between py-6'>
                <p className='text-[16px]'>{successMessage}</p>

                <div className='flex items-center gap-4'>
                  <p>{uploadedFileName}</p>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='.xls,.xlsx'
                    className='hidden'
                    onChange={handleFileUpload}
                  />
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
                headers={headers}
                paginatedData={paginatedData}
                tableData={tableData}
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
        <Button disabled={tableData.length === 0}>
          {t('dental-society:confirm_continue')}
        </Button>
      </div>
    </div>
  );
};

export default GroupOfDentist;
