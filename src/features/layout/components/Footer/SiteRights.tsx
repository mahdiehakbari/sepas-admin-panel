'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { socialIcons } from './constants/socialIcons';

export const SiteRights = () => {
  const { t } = useTranslation();
  return (
    <div className='bg-primary'>
      <div className='mx-auto max-w-4xl flex  flex-col md:flex-row items-center py-4 justify-between  px-6 xl:px-0'>
        <p className='text-[14px] font-[500] text-white pb-4 md:pb-0'>
          {t('login:all_rights')}
        </p>

        <div className='flex items-center gap-[11px] mt-3'>
          {socialIcons.map((icon) => (
            <a
              key={icon.alt}
              href={icon.href}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={20}
                height={20}
                className='cursor-pointer hover:opacity-80'
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
