import type { Metadata } from 'next';
import './globals.css';
import I18nProvider from '@/providers/I18nProvider';
import { SiteRights } from '@/features/layout/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthChecker } from '@/features/Auth';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'پنل مدیریت دنتالیت',
    template: '%s | admin panel',
  },
  description: 'Admin panel with modular structure and global sidebar.',
  applicationName: 'پنل مدیریت دنتالیت',
  generator: 'Next.js',
  keywords: [
    'real estate',
    'پنل مدیریت دنتالیت',
    'dashboard',
    'nextjs',
    'tailwind',
  ],
  authors: [{ name: 'test' }],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'پنل مدیریت دنتالیت',
    description: 'Admin panel with modular structure and global sidebar.',
    siteName: 'پنل مدیریت دنتالیت',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'پنل مدیریت دنتالیت',
    description: 'Admin panel with modular structure and global sidebar.',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl' className='font-fa'>
      <body>
        <I18nProvider>
          <AuthChecker />
          <div className='min-h-screen flex flex-col'>
            <main className='flex-1'>{children}</main>
            <SiteRights />
          </div>
          <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </I18nProvider>
      </body>
    </html>
  );
}
