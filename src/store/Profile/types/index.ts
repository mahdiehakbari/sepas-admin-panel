export interface IProfile {
  firstName: string;
  lastName: string;
  mobile: string;
  nationalId: string;
  gender: number;
  birthDate: string;
  email: string;
  iban: string;
  province: string;
  cityId: string;
  postalCode: string;
  addressDetails: string;
}

export interface IProfileStore {
  profile: IProfile;
  setProfile: (data: IProfile) => void;
}
