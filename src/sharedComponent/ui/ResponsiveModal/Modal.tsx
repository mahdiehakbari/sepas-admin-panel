'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IResponsiveModalProps } from './types';
import Image from 'next/image';

export default function ResponsiveModal({
  isOpen,
  onClose,
  title,
  children,
  animationDuration = 0.25,
}: IResponsiveModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='fixed inset-0 bg-black/40 z-40'
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
          />

          <motion.div
            className={`hidden sm:flex fixed inset-0 z-50 justify-center items-center p-4`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: animationDuration }}
          >
            <div
              className={`bg-white rounded-2xl shadow-lg  relative overflow-hidden`}
            >
              {title && (
                <div className='p-4 border-b border-neutral-200 flex justify-between items-center'>
                  <h2 className='text-lg font-semibold'>{title}</h2>
                  <Image
                    src='/assets/icons/close-button.svg'
                    alt='close-button'
                    width={24}
                    height={24}
                    className='cursor-pointer hover:opacity-80'
                    onClick={onClose}
                  />
                </div>
              )}
              <div className={` overflow-y-auto max-h-[60vh]`}>{children}</div>
            </div>
          </motion.div>

          <motion.div
            className={`sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-lg max-h-[90vh] overflow-y-auto`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {title && (
              <div className='p-4 border-b border-neutral-200 flex justify-between items-center'>
                <h2 className='text-lg font-semibold'>{title}</h2>
                <Image
                  src='/assets/icons/close-button.svg'
                  alt='close-button'
                  width={24}
                  height={24}
                  className='cursor-pointer hover:opacity-80'
                  onClick={onClose}
                />
              </div>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
