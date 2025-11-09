import { SideMenu } from '@/features/layout/components/SideMenu/SideMenu';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex'>
      <div className='hidden md:block'>
        <SideMenu />
      </div>

      <main className='flex-1 px-8 md:max-w-[1000px]'>{children}</main>
    </div>
  );
}
