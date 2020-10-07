export const USER_LOGIN_STARTED = 'USER_LOGIN_STARTED';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

interface IUserLoginStarted {
    readonly type: typeof USER_LOGIN_STARTED;
}

interface IUserLoginFailure {
    readonly type: typeof USER_LOGIN_FAILURE;
    payload: string[];
}

interface IUserLoginSuccess {
    readonly type: typeof USER_LOGIN_SUCCESS;
    payload: string;
}

export type AuthActionTypes =
| IUserLoginStarted
| IUserLoginFailure
| IUserLoginSuccess
;

export interface AuthState {
    loading: boolean;
    isLoggedIn: boolean;
    token: string;
    errors?: string[];
}

