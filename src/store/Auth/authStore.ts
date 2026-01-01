import { create } from 'zustand';
import Cookies from 'js-cookie';
import { IAuthState } from './types';

export const useAuthStore = create<IAuthState>((set) => ({
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null,

  token: Cookies.get('token') || null,

  expiresAt: Cookies.get('tokenExpiresAt') || null,

  isLoggedIn: !!Cookies.get('token'),

  setAuth: (token, user, expiresAt) => {
    const expiresAtString =
      typeof expiresAt === 'string'
        ? expiresAt
        : new Date(expiresAt).toISOString();

    const expiryDate = new Date(expiresAtString);
    Cookies.set('token', token);
    Cookies.set('user', JSON.stringify(user));
    Cookies.set('tokenExpiresAt', expiresAtString, {
      secure: true,
      sameSite: 'strict',
      expires: expiryDate,
    });

    set({
      token,
      user,
      expiresAt,
      isLoggedIn: true,
    });
  },

  logout: () => {
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('tokenExpiresAt');
    Cookies.remove('phoneNumber');

    set({
      token: null,
      user: null,
      expiresAt: null,
      isLoggedIn: false,
    });
  },
}));
