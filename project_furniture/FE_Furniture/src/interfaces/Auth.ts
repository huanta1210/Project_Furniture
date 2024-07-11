export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

enum AuthActionType {
  LOGIN = "login",
  LOGOUT = "logout",
}

export interface LoginAction {
  type: AuthActionType.LOGIN;
  payload: string | null;
}

export interface LogoutAction {
  type: AuthActionType.LOGOUT;
}

export type AuthAction = LoginAction | LogoutAction;
