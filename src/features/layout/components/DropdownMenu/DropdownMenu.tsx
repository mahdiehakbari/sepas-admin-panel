'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { IDropdownMenuProps } from './types';
import Image from 'next/image';

export const DropdownMenu = ({
  isOpen,
  onClose,
  items,
  position = 'center',
}: IDropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const positionClass =
    position === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : position === 'left'
      ? 'left-0'
      : 'right-0';

  return (
    <div
      ref={menuRef}
      className={`absolute ${positionClass} mt-2 w-52 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden z-50`}
      dir='rtl'
    >
      <div className='flex flex-col'>
        {items.map((item, index) =>
          item.href ? (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-3 hover:bg-neutral-100 transition-colors ${
                item.danger ? 'text-red-600 hover:bg-red-50 ' : ''
              }`}
              onClick={onClose}
            >
              <Image src={item.image} alt='logo' width={20} height={20} />
              <span>{item.label}</span>
            </Link>
          ) : (
            <button
              key={index}
              onClick={() => {
                item.onClick?.();
                onClose();
              }}
              className={`flex items-center gap-2 px-4 py-3 text-start hover:bg-neutral-100 transition-colors ${
                item.danger ? 'text-red-600 hover:bg-red-50 ' : ''
              }`}
            >
              <Image
                src='/assets/icons/logout.svg'
                alt='logo'
                width={20}
                height={20}
              />
              <span>{item.label}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
};
