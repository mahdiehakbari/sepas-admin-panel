'use client';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function parseJwt(token: string) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload;
  } catch {
    return null;
  }
}

export function useAuthTimeout() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    // اگر اصلاً توکن وجود ندارد → مستقیم redirect
    if (!token) {
      Cookies.remove('isLoggedIn');
      Cookies.remove('phoneNumber');
      Cookies.remove('user');
      router.push('/');
      return;
    }

    // اگر توکن وجود دارد → فقط یک interval برای expiry بساز
    const interval = setInterval(() => {
      const payload = parseJwt(token);
      if (payload?.exp && Date.now() >= payload.exp * 1000) {
        Cookies.remove('token');
        router.push('/');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);
}
