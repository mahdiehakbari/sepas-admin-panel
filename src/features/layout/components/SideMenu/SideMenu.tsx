'use client';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  getDentistrySideBarItems,
  getFinancialSideBarItems,
  getSideBarItems,
} from './constants';
import { useAuthStore } from '@/store/Auth/authStore';
import Link from 'next/link';

export const SideMenu = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const userType = localStorage.getItem('userType');

  const [openMenu, setOpenMenu] = useState(true);

  const handleLogout = () => {
    logout();
    Cookies.remove('userProfile');
    Cookies.remove('isLoggedIn');
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <aside className='w-64 bg-[#F8F9FA] shadow-md p-6'>
      <div className='flex items-center justify-center mb-8'>
        <h2 className='font-medium text-[#515151] text-[12px]'>
          {userType == 'DentistryAdmin'
            ? t('dental-society:dental_society')
            : userType == 'Admin'
            ? t('panel:admin_panel')
            : t('financial:financial_panel')}
        </h2>
      </div>

      <div className='bg-white h-[65vh] flex flex-col justify-between py-6'>
        {userType == 'Admin' ? (
          <div className='px-4'>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className='w-full flex justify-between items-center bg-primary text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-primary/90'
            >
              <div className='flex gap-1 items-center'>
                <Image
                  src='/assets/icons/coin.svg'
                  alt='logo'
                  width={20}
                  height={20}
                />
                {t('panel:financial_reports')}
              </div>
              <ChevronDownIcon
                className={`h-5 w-5 transform transition-all ${
                  openMenu ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openMenu ? 'max-h-96 mt-2' : 'max-h-0'
              }`}
            >
              <ul className='bg-white rounded-xl  p-2'>
                {getSideBarItems().map((item) => (
                  <li
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer
                    ${
                      isActive(item.path)
                        ? 'bg-(--second-light-primary) text-primary font-normal text-[16px]'
                        : 'hover:bg-gray-100 text-black font-normal text-[16px]'
                    }
                  `}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                    />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href='/panel/transactionsList'>
              <div
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer
                    ${
                      isActive('/panel/transactionsList')
                        ? 'bg-(--second-light-primary) text-primary font-normal text-[16px] mt-4'
                        : 'hover:bg-gray-100 text-black font-normal text-[16px] mt-3'
                    }
                  `}
              >
                <Image
                  src='/assets/icons/installments.svg'
                  alt='installments'
                  width={20}
                  height={20}
                />
                <p className=' font-normal text-[16px]'>
                  {t('panel:transaction_list')}
                </p>
              </div>
            </Link>

            <Link href='/panel/customerManagement'>
              <div
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer
                    ${
                      isActive('/panel/customerManagement')
                        ? 'bg-(--second-light-primary) text-primary font-normal text-[16px] mt-2'
                        : 'hover:bg-gray-100 text-black font-normal text-[16px] mt-2'
                    }
                  `}
              >
                <Image
                  src='/assets/icons/people.svg'
                  alt='people'
                  width={20}
                  height={20}
                />
                <p className=' font-normal text-[16px]'>
                  {t('panel:customer_management')}
                </p>
              </div>
            </Link>

            <Link href='/panel/managementReceivers'>
              <div
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer
                    ${
                      isActive('/panel/managementReceivers')
                        ? 'bg-(--second-light-primary) text-primary font-normal text-[16px] mt-2'
                        : 'hover:bg-gray-100 text-black font-normal text-[16px] mt-2'
                    }
                  `}
              >
                <Image
                  src='/assets/icons/profile-tick.svg'
                  alt='people'
                  width={20}
                  height={20}
                />
                <p className=' font-normal text-[16px]'>
                  {t('panel:Management_receivers')}
                </p>
              </div>
            </Link>
          </div>
        ) : userType == 'DentistryAdmin' ? (
          <div>
            <ul className='text-[16px]'>
              {getDentistrySideBarItems().map((item, index) => (
                <li
                  key={index}
                  onClick={() => router.push(item.path)}
                  className={`
                  px-4 py-2 cursor-pointer flex items-center mb-2 mx-2
                  ${
                    isActive(item.path)
                      ? 'text-white bg-primary font-semibold rounded-2xl'
                      : ''
                  }
                  hover:text-primary
                `}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  <span
                    className={`pr-1 ${
                      isActive(item.path) ? 'text-white' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <ul className='text-[16px]'>
              {getFinancialSideBarItems().map((item, index) => (
                <li
                  key={index}
                  onClick={() => router.push(item.path)}
                  className={`
                  px-4 py-2 cursor-pointer flex items-center mb-2 mx-2
                  ${
                    isActive(item.path)
                      ? 'text-white bg-primary font-semibold rounded-2xl'
                      : ''
                  }
                  hover:text-primary
                `}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  <span
                    className={`pr-1 ${
                      isActive(item.path) ? 'text-white' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className='px-6'>
          <div
            className='flex items-center gap-1 pb-1 cursor-pointer'
            onClick={handleLogout}
          >
            <Image
              src='/assets/icons/logout.svg'
              alt=''
              width={20}
              height={20}
            />
            <p className='text-[#FF4B4B] text-[16px]'>{t('panel:log_out')}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
