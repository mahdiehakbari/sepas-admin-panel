'use client';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { getSideBarItems } from './constants';
import { useAuthStore } from '@/store/Auth/authStore';

export const SideMenu = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

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
          {t('panel:admin_panel')}
        </h2>
      </div>

      <div className='bg-white h-[65vh] flex flex-col justify-between py-6'>
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
            <ul className='bg-white rounded-xl shadow-md p-2'>
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
          <div
            className={`flex items-center gap-1  transition-all duration-100  ${
              openMenu ? 'mt-0' : 'mt-6'
            }`}
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
        </div>

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
