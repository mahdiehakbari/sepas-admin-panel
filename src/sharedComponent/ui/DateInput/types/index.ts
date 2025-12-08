import {
  FieldErrors,
  FieldValues,
  Control,
  RegisterOptions,
  Path,
  PathValue,
} from 'react-hook-form';

export interface IDateInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errors: FieldErrors<T>;
  rules?: RegisterOptions<T>;
  textError?: string;
  defaultValue?: PathValue<T, Path<T>>;
}
