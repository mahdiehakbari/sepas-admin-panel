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
import { FiEye, FiEdit2 } from 'react-icons/fi';

const PAGE_SIZE = 12;

const gridClass =
  'md:grid md:grid-cols-[60px_90px_1.5fr_1.5fr_1.2fr_1fr_2fr_1fr] md:items-center';

const ListOfDentist = () => {
  const [dentistList, setDentistList] = useState<IDentist[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const canEdit = false;

  const { t } = useTranslation();
  const router = useRouter();

  const fetchDentists = (pageNumber: number) => {
    setPageLoading(true);

    axios
      .post<IDentistListResponse>(API_DENTIST_LIST, {
        pageNumber,
        pageSize: PAGE_SIZE,
      })
      .then((resp) => {
        setDentistList(resp.data.items);
        setTotalPages(resp.data.totalPages);
      })
      .catch(console.error)
      .finally(() => setPageLoading(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDentists(page);
  }, [page]);

  const handleRoute = (id: string) => {
    router.push(`/panel/listOfDentists/${id}`);
  };

  const headers = [
    'ردیف',
    'تصویر',
    'نام و نام خانوادگی',
    'نام مطب',
    'شماره مطب',
    'کد نظام پزشکی',
    'آدرس',
    'عملیات',
  ];

  return (
    <ContentStateWrapper loading={pageLoading} loadingText='در حال بارگذاری'>
      <div className='max-w-7xl mx-6 md:mx-auto mt-8'>
        <div
          className={`${gridClass} hidden md:grid bg-gray-100 rounded-lg px-3 py-3 font-semibold text-gray-700 text-sm mb-3`}
        >
          {headers.map((label, index) => (
            <div key={index} className='px-2 text-right'>
              {label}
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-3'>
          {dentistList
            .filter((d) => d.isVerified)
            .map((d, index) => (
              <div
                key={d.id}
                className={`cursor-pointer bg-white border border-gray-200 rounded-lg px-3 py-3
                  flex flex-col gap-2
                  md:gap-0 md:flex-none ${gridClass}`}
              >
                <div className='hidden md:block text-center'>
                  {index + 1 + (page - 1) * PAGE_SIZE}
                </div>

                <div className='flex items-center justify-between md:justify-center'>
                  <span className='md:hidden text-gray-500 font-semibold'>
                    تصویر:
                  </span>
                  <img
                    src={
                      d.bannerImageFilePath
                        ? `https://dentalitfiles.sepasholding.com/images/bannerimages/${d.bannerImageFilePath}`
                        : '/assets/icons/images.jpg'
                    }
                    alt='banner'
                    className='w-10 h-10 object-cover rounded-lg'
                  />
                </div>

                <div className='flex justify-between md:block'>
                  <span className='md:hidden text-gray-500 font-semibold'>
                    نام و نام خانوادگی:
                  </span>
                  <span>{d.fullName}</span>
                </div>

                <div className='flex justify-between md:block'>
                  <span className='md:hidden text-gray-500 font-semibold'>
                    نام مطب:
                  </span>
                  <span>{d.businessName || '-'}</span>
                </div>

                <div className='flex justify-between md:block'>
                  <span className='md:hidden text-gray-500 font-semibold'>
                    شماره مطب:
                  </span>
                  <span>{d.workPlacePhoneNumber}</span>
                </div>

                <div className='flex justify-between md:block'>
                  <span className='md:hidden text-gray-500 font-semibold'>
                    کد نظام پزشکی:
                  </span>
                  <span>{d.medicalCertificateNumber}</span>
                </div>
                <div className='flex justify-between md:flex items-center gap-2 truncate'>
                  <span className='md:hidden text-gray-500 font-semibold'>
                    آدرس:
                  </span>
                  <div className='flex items-center gap-2 truncate'>
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
                <div className='flex justify-between md:justify-center items-center gap-3 text-center'>
                  <span className='md:hidden text-gray-500 font-semibold'>
                    عملیات:
                  </span>

                  <div className='flex gap-2'>
                    <button
                      type='button'
                      onClick={() => handleRoute(d.id)}
                      className='p-2 cursor-pointer rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 transition'
                      title='مشاهده'
                    >
                      <FiEye size={18} />
                    </button>

                    <button
                      type='button'
                      disabled={!canEdit}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!canEdit) return;
                        router.push(`/panel/listOfDentists/${d.id}/edit`);
                      }}
                      className={`
                          p-2 rounded-lg border
                          transition
                          ${
                            canEdit
                              ? 'border-gray-200 text-amber-600 hover:bg-amber-50'
                              : 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed'
                          }
                        `}
                      title='ویرایش'
                    >
                      <FiEdit2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <Paginate
          hasPreviousPage={page > 1}
          hasNextPage={page < totalPages}
          currentPage={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </ContentStateWrapper>
  );
};

export default ListOfDentist;
