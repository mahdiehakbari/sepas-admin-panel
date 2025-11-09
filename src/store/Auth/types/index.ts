export interface IUser {
  id: string;
  phoneNumber: string;
  fullName?: string | null;
  isVerified: boolean;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isLoggedIn: boolean;
  setAuth: (token: string, user: IUser) => void;
  logout: () => void;
}
