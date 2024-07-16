export interface FormValues {
  _id?: number | string;
  userName?: string;
  phone?: number;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  userName: string;
  email: string;
}
