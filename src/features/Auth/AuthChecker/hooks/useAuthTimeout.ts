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
    if (!token) return;

    const payload = parseJwt(token);
    if (!payload?.exp) return;

    const expiry = payload.exp * 1000;
    const now = Date.now();

    if (now >= expiry) {
      Cookies.remove('token');
      router.push('/');
    }
  }, [router]);
}
