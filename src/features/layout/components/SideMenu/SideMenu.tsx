'use client';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getSideBarItems } from './constants';
import { useAuthStore } from '@/store/Auth/authStore';

export const SideMenu = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    Cookies.remove('userProfile');
    Cookies.remove('isLoggedIn');
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <aside className='w-64 bg-[#F8F9FA] shadow-md p-6'>
      <div className='flex items-center space-x-3 mb-8 justify-center'>
        <h2 className='font-medium text-[#515151] text-[12px] font[700]'>
          {t('panel:admin_panel')}
        </h2>
      </div>
      <div className='bg-white h-[65vh] flex flex-col justify-between py-6'>
        <ul className='font[400] text-[16px]'>
          {getSideBarItems().map((item) => (
            <li
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`px-4 py-2 cursor-pointer flex items-center mb-2 mx-2
        ${
          isActive(item.path)
            ? 'text-white bg-primary font-semibold rounded-2xl'
            : ''
        }
        ${'hover:text-primary'}
      `}
            >
              <Image src={item.icon} alt={item.label} width={20} height={20} />
              <span
                className={`pr-1 ${isActive(item.path) ? 'text-white' : ''}`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <div className='px-6'>
          <div className='flex items-center gap-2 pb-4  cursor-pointer '>
            <Image
              src='/assets/icons/headphone.svg'
              alt=''
              width={20}
              height={20}
            />
            <p className='text-black font-[400] text-[16px] leading-6 hover:text-primary'>
              {t('profile:communication_experts')}
            </p>
          </div>
          <div
            className='flex items-center gap-1 pb-1 cursor-pointer '
            onClick={handleLogout}
          >
            <Image
              src='/assets/icons/logout.svg'
              alt=''
              width={20}
              height={20}
            />
            <p className='text-[#FF4B4B] font-[400] text-[16px] leading-6 '>
              {t('profile:log_out')}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
