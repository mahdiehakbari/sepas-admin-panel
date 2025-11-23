import { Header, SideMenu } from '@/features/layout/components';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className='flex'>
        <div className='hidden md:block'>
          <SideMenu />
        </div>

        <main className='flex-1 md:px-8'>{children}</main>
      </div>
    </>
  );
}
