export interface User {
  _id?: number | string;
  userName?: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  provider?: string;
}

export type State = {
  users: User[];
};

export type Action = { type: "GET_USER"; payload: User[] };
