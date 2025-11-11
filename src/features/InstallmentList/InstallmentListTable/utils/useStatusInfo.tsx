import { useTranslation } from 'react-i18next';

export const useStatusInfo = () => {
  const { t } = useTranslation();

  const getStatusInfo = (status: string) => {
    let className = 'bg-gray-100 text-gray-700';
    if (status == 'Completed') className = 'bg-green-100 text-green-700';
    else if (status == 'ConfirmedByCustomer')
      className = 'bg-blue-100 text-blue-700';
    else if (status == 'failed' || status == 'canceled')
      className = 'bg-red-100 text-red-700';
    else if (status == 'Pending' || status == 'OtpSent')
      className = 'bg-yellow-100 text-yellow-700';

    return {
      label: t(`status:${status}`),
      className,
    };
  };

  return { getStatusInfo };
};
