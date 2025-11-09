'use client';

import Link from 'next/link';

import { getNavItems } from './constants';
import { IMobileMenuProps } from './types';

export const MobileMenu = ({ isOpen, setIsOpen }: IMobileMenuProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/30 z-40'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-0 right-0 w-1/2 h-screen bg-background shadow-lg flex flex-col items-start p-6 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className='flex flex-col gap-6 text-lg w-full'>
          {getNavItems().map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className='font-medium hover:text-primary transition-all duration-300 text-right w-full'
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};
