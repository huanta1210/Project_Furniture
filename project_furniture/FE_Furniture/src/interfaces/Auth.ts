export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}
export type AuthAction = {
  type: string;
};
