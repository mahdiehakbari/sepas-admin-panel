export interface IDentist {
  id: string;
  userId: string;
  phoneNumber: string;
  nationalId: string;
  businessName: string;
  fullName: string;
  cityId: string;
  cityName: string;
  address: string;
  email: string;
  medicalCertificateNumber: string;
  professionalTitle: string | null;
  educationLevel: number;
  workPlacePhoneNumber: string;
  iban: string;
  isVerified: boolean;
  createdAt: string;
  availableBalance: number;
}
export interface IDentistListResponse {
  items: IDentist[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
