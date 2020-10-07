export const USER_LOGIN_STARTED = 'USER_LOGIN_STARTED';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGOUT_STARTED = 'USER_LOGOUT_STARTED';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';


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

interface IUserLogoutStarted {
    readonly type: typeof USER_LOGOUT_STARTED;
}

interface IUserLogoutFailure {
    readonly type: typeof USER_LOGOUT_FAILURE;
    payload: string[];
}

interface IUserLogoutSuccess {
    readonly type: typeof USER_LOGOUT_SUCCESS;
}

export type AuthActionTypes =
| IUserLoginStarted
| IUserLoginFailure
| IUserLoginSuccess
| IUserLogoutStarted
| IUserLogoutFailure
| IUserLogoutSuccess
;

export interface AuthState {
    loading: boolean;
    isLoggedIn: boolean;
    token: string;
    errors?: string[];
}

