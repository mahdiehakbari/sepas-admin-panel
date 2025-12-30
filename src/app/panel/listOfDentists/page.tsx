'use client';
import { API_DENTIST_LIST } from '@/config/api_address.config';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Paginate } from '@/sharedComponent/ui';
import { IDentist, IDentistListResponse } from './types';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { ContentStateWrapper } from '@/features/layout/components';
import { useRouter } from 'next/navigation';

const ListOfDentist = () => {
  const [dentistList, setDentistList] = useState<IDentist[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t } = useTranslation();
  const router = useRouter();

  const fetchDentists = (pageNumber: number) => {
    axios
      .post<IDentistListResponse>(API_DENTIST_LIST, {
        pageNumber: pageNumber,
        pageSize: 12,
      })
      .then((resp) => {
        setDentistList(resp.data.items);
        setTotalPages(resp.data.totalPages);
        setPageLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPageLoading(false);
      });
  };

  useEffect(() => {
    fetchDentists(page);
  }, [page]);

  const handleRoute = (id: string) => {
    router.push(`/panel/listOfDentists/${id}`);
  };

  const headers = [
    { id: 'number', label: 'ردیف' },
    { id: 'image', label: 'تصویر' },
    { id: 'name', label: 'نام و نام خانوادگی' },
    { id: 'business', label: 'نام مطب' },
    { id: 'phone', label: 'شماره مطب' },
    { id: 'certificate', label: 'کد نظام پزشکی' },
    { id: 'location', label: 'آدرس' },
  ];

  return (
    <ContentStateWrapper loading={pageLoading} loadingText='در حال بارگذاری'>
      <div className='max-w-[340px] md:max-w-7xl mx-6 md:mx-auto mt-8'>
        <div className='hidden md:flex bg-gray-100 rounded-lg px-3 py-3 font-semibold text-gray-700 text-sm mb-2'>
          {headers.map((item) => (
            <div key={item.id} className='w-1/7 text-right px-2'>
              {item.label}
            </div>
          ))}
        </div>

        <div className='flex flex-col gap-3'>
          {dentistList.map((d, index) => (
            <div key={d.id}>
              {d.isVerified == true && (
                <div
                  className='flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-3 cursor-pointer'
                  onClick={() => handleRoute(d.id)}
                >
                  <div className='hidden md:block w-full md:w-[10%] text-center md:text-right mb-2 md:mb-0 px-2'>
                    {index + 1 + (page - 1) * 12}
                  </div>

                  <div className='flex items-center justify-between w-full md:w-[12%] text-center mb-2 md:mb-0 px-2'>
                    <span className='md:hidden text-gray-500 font-semibold ml-2'>
                      تصویر:
                    </span>
                    <img
                      src={
                        d.bannerImageFilePath
                          ? `https://dentalitfiles.sepasholding.com/images/bannerimages/${d.bannerImageFilePath}`
                          : '/assets/icons/images.jpg'
                      }
                      alt='banner'
                      className='w-10 h-10 object-cover rounded-lg md:mx-auto'
                    />
                  </div>

                  <div className='w-full md:w-[15%] text-center md:text-right mb-2 md:mb-0 px-2'>
                    <span className='md:hidden text-gray-500 font-semibold ml-2'>
                      نام و نام خانوادگی:
                    </span>
                    {d.fullName}
                  </div>

                  <div className='w-full md:w-[15%] text-center md:text-right mb-2 md:mb-0 px-2'>
                    <span className='md:hidden text-gray-500 font-semibold ml-2'>
                      نام مطب:
                    </span>
                    {d.businessName || '-'}
                  </div>

                  <div className='w-full md:w-[15%] text-center md:text-right mb-2 md:mb-0 px-2'>
                    <span className='md:hidden text-gray-500 font-semibold ml-2'>
                      شماره مطب:
                    </span>
                    {d.workPlacePhoneNumber}
                  </div>

                  <div className='w-full md:w-[10%] text-center md:text-right mb-2 md:mb-0 px-2'>
                    <span className='md:hidden text-gray-500 font-semibold ml-2'>
                      کد نظام پزشکی:
                    </span>
                    {d.medicalCertificateNumber}
                  </div>

                  <div className='w-full md:w-[15%] text-center md:text-right px-2'>
                    <span className='md:hidden text-gray-500 font-semibold ml-2'>
                      آدرس:
                    </span>
                    <div className='flex items-center gap-2 justify-center md:justify-start'>
                      <Image
                        src='/assets/icons/location.svg'
                        alt='map'
                        width={16}
                        height={16}
                      />
                      <span className='text-sm truncate'>
                        {d.cityName} - {d.address}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Paginate
        hasPreviousPage={page > 1}
        setPage={setPage}
        currentPage={page}
        totalPages={totalPages}
        hasNextPage={page < totalPages}
      />
    </ContentStateWrapper>
  );
};

export default ListOfDentist;