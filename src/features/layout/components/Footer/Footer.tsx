'use client';
import Image from 'next/image';
import { Fragment } from 'react';
import { SiteRights } from './SiteRights';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <footer className='w-full bg-secondary'>
        <div className='py-6 block md:flex max-w-4xl mx-auto gap-x-12 px-6 xl:px-0'>
          <div className='w-3/3 md:w-2/3 mb-6 md:mb-0'>
            <Image
              src='/assets/icons/logo.png'
              alt='logo'
              width={78}
              height={42}
              className='cursor-pointer hover:opacity-80 mb-6'
            />
            <p className='text-text-black text-[14px] font-[400]'>
              {t('home:credit_bnpl')}
            </p>
          </div>
          <div className='flex flex-col w-3/3  md:w-2/3 '>
            <p className='text-text-black text-[18px] font-[700]  mb-6'>
              {t('home:communication')}
            </p>
            <div className='flex items-center gap-2 mb-4'>
              <Image
                src='assets/icons/phone.svg'
                alt='logo'
                width={20}
                height={20}
              />
              <span className='text-text-black text-[14px] font-[400]'>
                {t('home:contact_phone')}
              </span>
            </div>
            <div className='flex items-center gap-2 mb-4'>
              <Image
                src='assets/icons/address.svg'
                alt='logo'
                width={20}
                height={20}
              />
              <span className='text-text-black text-[14px] font-[400]'>
                {t('home:address')}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Image
                src='assets/icons/mail.svg'
                alt='logo'
                width={20}
                height={20}
              />
              <span className='text-text-black text-[14px] font-[400]'>
                {t('home:email')}
              </span>
            </div>
          </div>
        </div>
      </footer>
      <SiteRights />
    </Fragment>
  );
};
