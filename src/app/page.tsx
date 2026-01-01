'use client';
import AdminLogin from '@/features/Auth/AdminLogin/AdminLogin';
import { Header } from '@/features/layout/components';

export default function Home() {
  return (
    <>
      <div className='h-[80vh] flex items-center justify-center  p-4'>
        <AdminLogin />
      </div>
    </>
  );
}
