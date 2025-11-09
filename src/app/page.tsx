'use client';
import AdminLogin from '@/features/Auth/AdminLogin/AdminLogin';

export default function Home() {
  return (
    <div className='h-[90vh] flex items-center justify-center  p-4'>
      <AdminLogin />
    </div>
  );
}
