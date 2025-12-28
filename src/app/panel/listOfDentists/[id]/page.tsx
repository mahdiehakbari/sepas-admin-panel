'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IDentist, IDentistListResponse } from '../types';
import { API_DENTIST_LIST } from '@/config/api_address.config';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { ContentStateWrapper } from '@/features/layout/components';

const ListOfDentistId = () => {
  const { t } = useTranslation();
  const [dentistList, setDentistList] = useState<IDentist[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  const router = useRouter();
  const token = Cookies.get('token');
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    axios
      .post<IDentistListResponse>(API_DENTIST_LIST, {
        pageNumber: 1,
        pageSize: 100,
      })
      .then((resp) => {
        const filteredData = resp.data.items.filter((item) => item.id === id);
        setDentistList(filteredData);
        setPageLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPageLoading(false);
      });
  }, [id, token]);

  const handleBack = () => {
    router.push('/listOfDentists');
  };
  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('panel:page_loading')}
    >
      <div className='max-w-9/12 mx-auto'>
        <div
          className='flex items-center gap-2 cursor-pointer mb-12'
          onClick={handleBack}
        >
          <Image
            src='/assets/icons/arrow-right.svg'
            alt='back'
            width={20}
            height={20}
          />
          <p className='text-primary text-[16px] font-medium'>بازگشت</p>
        </div>

        {dentistList.map((item) => (
          <div key={item.id} className='grid grid-cols-12 gap-6 items-start'>
            <div className='md:col-span-7 col-span-12' >
              <div className='flex-col md:flex-row text-center md:text-right flex items-center gap-4 mb-20'>
                <div className='w-48 h-48 rounded-full p-2 border border-border-color overflow-hidden relative'>
                  <Image
                    src={
                      item.bannerImageFilePath
                        ? `https://dentalitfiles.sepasholding.com/images/bannerimages/${item.bannerImageFilePath}`
                        : '/assets/icons/images.jpg'
                    }
                    alt='Merchant Banner'
                    fill
                    unoptimized
                    style={{ objectFit: 'cover' }}
                    className='rounded-full'
                  />
                </div>

                <div>
                  <h1 className='font-medium text-[#414141] text-2xl mb-6'>
                    {item.fullName}
                  </h1>
                  <h3 className='font-normal text-[#757575] text-[16px] mb-6'>
                    {item.professionalTitle}
                  </h3>
                  <h3 className='font-normal text-[#757575] text-[16px] mb-6'>
                    {item.cityName}
                  </h3>
                  <h3 className='font-medium text-[#414141] text-[22px] mb-6'>
                    کد نظام پزشکی : {item.medicalCertificateNumber}
                  </h3>
                </div>
              </div>

              <div>
                <h3 className='font-medium text-[#414141] text-[28px] mb-6'>
                  درباره پزشک
                </h3>
                <p className='font-normal text-[#757575] text-[16px] mb-10 text-justify'>
                  {item.bio}
                </p>
                <div className='flex flex-col md:flex-row items-center gap-2 mb-10'>
                  <Image
                    src='/assets/icons/health.svg'
                    alt='health'
                    width={32}
                    height={32}
                  />
                  <div className='flex items-center gap-1'>
                    <p className='font-normal text-[#757575] text-[16px]'>
                      تخصص پزشکی :
                    </p>
                    <p className='font-normal text-primary text-[16px]'>
                      {item.professionalTitle}
                    </p>
                  </div>
                </div>

                <div className='flex flex-col md:flex-row items-center gap-2'>
                  {item.skills &&
                    item.skills.length > 0 &&
                    item.skills.map((skill, index) => (
                      <div
                        className='flex items-center gap-2 mb-10'
                        key={index}
                      >
                        <p className='w-full text-[#757575] font-normal text-[14px] py-2 px-3 border border-border-color rounded-3xl'>
                          {skill.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className='md:col-span-5 col-span-12 mb-10 md:mb-0'>
              <h3 className='font-medium text-[#414141] text-[24px] mb-6'>
                آدرس :
              </h3>
              <p className='font-normal text-[#757575] text-[16px] mb-6'>
                {item.address}
              </p>
              <div className='flex items-center gap-4'>
                <p className='font-normal text-[#414141] text-[20px]'>تلفن :</p>
                <p className='font-normal text-[#757575] text-[16px]'>
                  {item.medicalCertificateNumber}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ContentStateWrapper>
  );
};

export default ListOfDentistId;
