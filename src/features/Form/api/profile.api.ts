import axios from 'axios';

import { API_UPDATE_PROFILE } from '@/config/api_address.config';
import { IProfileFormValues } from '../types';

export const updateProfile = async (
  token: string,
  data: Partial<IProfileFormValues>,
) => {

  const requestBody = {
    merchants: [{
      phoneNumber: data.mobile,
      nationalId: data.nationalId,
      businessName: data.professionalTitle,
      address: data.addressDetails,
      cityId: data.cityId,
      postalCode: data.postalCode,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      iban: data.iban,
      professionalTitle: data.professionalTitle,
      workPlacePhoneNumber: data.workPlacePhoneNumber,
      medicalCertificateNumber: data.medicalCertificateNumber,
      educationLevel: 0,
      gender: data.gender,
      birthDate: data.birthDate
    }]
  };
  
  return axios.post(API_UPDATE_PROFILE, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
