export interface User {
  _id?: string;
  userName?: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  provider?: string;
}

export interface AuthToken {
  _id?: string;
  userName?: string;
  phone?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  provider?: string;
  exp?: number;
  iat?: number;
}

export interface JWTDecode {
  id: string;
  role: string;
  userName: string;
  email: string;
  iat: number;
  exp: number;
}

export type State = {
  token: string | null;
  users: AuthToken | null;
};

export type Action =
  | { type: "SET_AUTH"; payload: { token: string; users: AuthToken } }
  | { type: "LOG_OUT" }
  | { type: "CHECK_TOKEN" }
  | { type: "GET_AUTH"; payload: User };
