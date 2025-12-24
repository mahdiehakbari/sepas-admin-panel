'use client';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function logout(router: ReturnType<typeof useRouter>) {
  Cookies.remove('token');
  Cookies.remove('tokenExpiresAt');
  Cookies.remove('user');
  Cookies.remove('phoneNumber');
  router.replace('/');
}

export function useAuthTimeout() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const expiresAt = Cookies.get('tokenExpiresAt');

    if (!token || !expiresAt) {
      logout(router);
      return;
    }

    const expiresAtTime = new Date(expiresAt).getTime();

    if (isNaN(expiresAtTime)) {
      logout(router);
      return;
    }

    const timeout = expiresAtTime - Date.now();

    if (timeout <= 0) {
      logout(router);
      return;
    }

    const timer = setTimeout(() => {
      logout(router);
    }, timeout);

    return () => clearTimeout(timer);
  }, [router]);
}
