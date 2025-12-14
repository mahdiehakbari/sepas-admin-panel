'use client';
import { API_DENTIST_LIST } from '@/config/api_address.config';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Paginate } from '@/sharedComponent/ui';
import { IDentist, IDentistListResponse } from './types';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const ListOfDentist = () => {
  const [dentistList, setDentistList] = useState<IDentist[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t } = useTranslation();

  const fetchDentists = (pageNumber: number) => {
    axios
      .post<IDentistListResponse>(API_DENTIST_LIST, {
        pageNumber: pageNumber,
        pageSize: 20,
      })
      .then((resp) => {
        setDentistList(resp.data.items);
        setTotalPages(resp.data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchDentists(page);
  }, [page]);

  return (
    <div>
      <div className='max-w-6xl mx-6 md:mx-auto mt-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          {dentistList.map((d) => (
            <div
              key={d.id}
              className='border border-border-color p-4 rounded-md shadow-sm'
            >
              <div className='border-b border-border-color mb-4 pb-4'>
                <h3 className='text-lg font-semibold mb-3'>{d.fullName}</h3>
                <p className='text-sm text-[#919191] mb-3'>{d.businessName}</p>
                <p className='text-sm text-[#919191] mb-3'>
                  {'شماره مطب'}: {d.workPlacePhoneNumber}
                </p>
                <p className='text-sm text-[#919191] '>
                  {'کد نظام پزشکی'}: {d.medicalCertificateNumber}
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Image
                  src='/assets/icons/location.svg'
                  alt='map'
                  width={16}
                  height={16}
                />
                <p className='text-sm text-[#757575] truncate w-full'>
                  {d.cityName} - {d.address}
                </p>
              </div>
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
    </div>
  );
};

export default ListOfDentist;
