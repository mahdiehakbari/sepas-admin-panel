import { IProfileFormValues } from '../../types';

export interface ProfileSubmitProps {
  name: string;
  setIsEditing?: (v: boolean) => void;
  setShowProfileModal?: ((v: boolean) => void) | null;
  setShowCreditNoteModal?: (v: boolean) => void;
  setUser?: (value: IProfileFormValues) => void;
}
