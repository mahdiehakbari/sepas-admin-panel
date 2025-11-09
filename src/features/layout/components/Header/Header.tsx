'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useToggleLanguage } from './hooks';
import { getNavItems } from './constants';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MobileMenu } from './MobileMenu';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/Auth/authStore';
import { Button } from '@/sharedComponent/ui/Button/Button';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

export const Header = () => {
  const { t } = useTranslation();
  const { toggleLanguage, currentLanguage } = useToggleLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenOtpModal, setIsOpenOtpModal] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    Cookies.remove('userProfile');
    Cookies.remove('isLoggedIn');
    router.push('/');
    setIsOpenOtpModal(false);
  };
  const handleLogin = () => {
    setIsOpenLoginModal(true);
    setIsOpenModal(true);
  };

  const isLoggedIn = Cookies.get('isLoggedIn');

  const handleClick = () => {
    setOpenPopUp(true);
  };

  return (
    <header className='w-full sticky top-0 z-50 shadow-[0px_-3px_10px_-4px_#32323214,0px_4px_6px_-2px_#32323208] bg-white mb-14'>
      <div className='mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between'>
        <div className='flex items-center gap-[50px]'>
          <Image
            src='/assets/icons/logo.svg'
            alt='logo'
            width={78}
            height={42}
            className='cursor-pointer hover:opacity-80'
          />

          {/* <nav className='hidden md:flex items-center gap-6 text-sm'>
            {getNavItems().map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className='flex items-center duration-300 no-underline'
              >
                <p className='font-medium hover:text-primary transition-all duration-300'>
                  {item.label}
                </p>
              </Link>
            ))}
          </nav> */}
        </div>

        <div className='flex items-center gap-3'>
          <div className='relative' ref={menuRef}>
            <div onClick={handleClick} className='cursor-pointer'>
              <Image
                src='/assets/icons/user-profile-icon.jpg'
                alt='user-profile-icon'
                width={56}
                height={56}
                className='rounded-full'
              />
            </div>
            {openPopUp && (
              <DropdownMenu
                isOpen={openPopUp}
                onClose={() => setOpenPopUp(false)}
                items={[
                  {
                    label: t('panel:borrower_installments'),
                    href: '/panel/reports/installments',
                    image: '/assets/icons/installments.svg',
                  },
                  {
                    label: t('panel:acceptor_settlement'),
                    href: '/',
                    image: '/assets/icons/installments.svg',
                  },
                  {
                    label: t('panel:transaction_list'),
                    href: '/',
                    image: '/assets/icons/installments.svg',
                  },

                  {
                    label: t('panel:log_out'),
                    image: '/assets/icons/logout.svg',
                    danger: true,
                    onClick: handleLogout,
                  },
                ]}
              />
            )}
          </div>

          <button
            className='cursor-pointer bg-secondary h-[42px] px-3 py-1 rounded-[8px] flex items-center gap-2'
            onClick={toggleLanguage}
          >
            <Image
              src={
                currentLanguage === 'fa'
                  ? '/assets/icons/ir-logo.svg'
                  : '/assets/icons/us-logo.png'
              }
              alt={currentLanguage === 'fa' ? 'Iran flag' : 'US flag'}
              width={20}
              height={20}
            />
            <span className='text-sm font-medium'>
              {currentLanguage === 'fa' ? 'فا' : 'EN'}
            </span>
          </button>
          <button
            className='md:hidden flex flex-col justify-center items-center w-8 h-8 relative'
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`block h-0.5 w-6 bg-black my-1 transition-transform ${
                isOpen ? 'rotate-50 translate-y-3' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black my-1 transition-opacity ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black my-1 transition-transform ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
