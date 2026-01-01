import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

interface IAddress {
  id: string;
  cityId: string;
  cityName: string;
  provinceId: string;
  provinceName: string;
  details: string;
  postalCode: string;
  medicalCertificateNumber: string;
  workPlacePhoneNumber: string;
}

export interface IProfileFormValues {
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  mobile: string;
  nationalId: string;
  birthDate: string;
  gender: number | string;
  email?: string;
  iban?: string;
  province: string;
  cityId: string;
  postalCode: string;
  addressDetails: string;
  FullName?: string;
  address?: IAddress;
  medicalSystemNumber: string;
  educationLevel: string | number;
  contractType: string | number;
  medicalCertificateNumber: string;
  workPlacePhoneNumber: string;
  professionalTitle: string;
}

export interface IProfileFormProps {
  userData?: IProfileFormValues | null;
  setUser?: (value: IProfileFormValues) => void;
  name: string;
  handleBack: () => void;
  onSuccess?: (updatedUser: IProfileFormValues) => void;
  setShowProfileModal?: ((value: boolean) => void) | null;
  setShowCreditNoteModal?: (value: boolean) => void;
  setIsEditing?: (value: boolean) => void;
}

export interface IPersonalInfoSectionProps {
  userData?: IProfileFormValues | null;
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
  control: Control<IProfileFormValues>;
  phoneNumber: string;
  base64Image: string | null;
  setBase64Image: (value: string | null) => void;
}

export interface IBankInfoSectionProps {
  userData?: IProfileFormValues | null;
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
}

interface ILocationItem {
  id: string;
  name: string;
}

export interface IAddressInfoSectionProps {
  userData?: IProfileFormValues | null;
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
  provinces: ILocationItem[];
  cities: ILocationItem[];
  handleProvinceChange: (provinceId: string) => void;
}
