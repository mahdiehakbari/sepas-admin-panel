import { Dispatch, SetStateAction } from 'react';
import { IBorrowersInstallmentsData } from '../types';
import { API_ENIAC_INSTALLMENTS_DOCUMENTS } from '@/config/api_address.config';

export const useFilterBorrowersInstallments = () => {
  const filterData = async (
    customerIds: string[],
    pageNo: number,
    count: number,
    token: string | undefined,
    setRequestData: Dispatch<SetStateAction<IBorrowersInstallmentsData | null>>,
  ) => {
    try {
      const queryParams = new URLSearchParams();

      if (customerIds && customerIds.length > 0) {
        customerIds.forEach((id) => {
          queryParams.append('customerIds', id);
        });
      }

      queryParams.append('pageNo', pageNo.toString());
      queryParams.append('count', count.toString());

      const url = `${API_ENIAC_INSTALLMENTS_DOCUMENTS}?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: IBorrowersInstallmentsData = await response.json();
      console.log('API Response:', data);
      setRequestData(data);
      return data;
    } catch (error) {
      console.error('Error fetching borrowers installments:', error);
      throw error;
    }
  };

  return { filterData };
};
