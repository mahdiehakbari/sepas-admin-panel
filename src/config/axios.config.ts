import axios from 'axios';
import Cookies from 'js-cookie';

// تنظیم interceptor برای axios
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // اگر خطای 401 یا 403 دریافت کردیم، یعنی token منقضی شده
    if (error.response?.status === 401 || error.response?.status === 403) {
      // پاک کردن کوکی‌ها
      Cookies.remove('token');
      Cookies.remove('tokenExpiresAt');
      Cookies.remove('user');
      Cookies.remove('phoneNumber');
      
      // redirect به صفحه login
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
