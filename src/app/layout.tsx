import type { Metadata } from 'next';
import './globals.css';
import I18nProvider from '@/providers/I18nProvider';
import { SiteRights } from '@/features/layout/components';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'test Panel',
    template: '%s | test Panel',
  },
  description: 'Admin panel with modular structure and global sidebar.',
  applicationName: 'test Panel',
  generator: 'Next.js',
  keywords: ['real estate', 'admin panel', 'dashboard', 'nextjs', 'tailwind'],
  authors: [{ name: 'test' }],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'test Panel',
    description: 'Admin panel with modular structure and global sidebar.',
    siteName: 'test Panel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'test Panel',
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
          <div className='min-h-screen flex flex-col'>
            <main className='flex-1'>{children}</main>
            <SiteRights />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
