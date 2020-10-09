export const USER_LOGIN_STARTED = 'USER_LOGIN_STARTED';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

export const USER_LOGOUT_STARTED = 'USER_LOGOUT_STARTED';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

export const USER_DETAILS_STARTED = 'USER_DETAILS_STARTED';
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS';

export const USER_SIGNUP_STARTED = 'USER_SIGNUP_STARTED';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';

export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_RESET = 'AUTH_RESET';

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

interface IUserLogoutSuccess {
    readonly type: typeof USER_LOGOUT_SUCCESS;
}

interface IUserDetailsStarted {
    readonly type: typeof USER_DETAILS_STARTED;
}

interface IUserDetailsSuccess {
    readonly type: typeof USER_DETAILS_SUCCESS;
    payload: User;
}

interface IUserSignupStarted {
    readonly type: typeof USER_SIGNUP_STARTED;
}

interface IUserSignupFailure {
    readonly type: typeof USER_SIGNUP_FAILURE;
    payload: string[];
}

interface IUserSignupSuccess {
    readonly type: typeof USER_SIGNUP_SUCCESS;
    payload: string;
}

interface IAuthFailure {
    readonly type: typeof AUTH_FAILURE;
    payload: string[];
}

interface IAuthReset {
    readonly type: typeof AUTH_RESET;
}

export type AuthActionTypes =
| IUserLoginStarted
| IUserLoginFailure
| IUserLoginSuccess
| IUserLogoutStarted
| IUserLogoutSuccess
| IUserDetailsStarted
| IUserDetailsSuccess
| IUserSignupStarted
| IUserSignupFailure
| IUserSignupSuccess
| IAuthFailure
| IAuthReset
;

export interface AuthState {
    loading: boolean;
    isLoggedIn: boolean;
    token: string;
    errors: string[];
    user: User;
}

export interface User {
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    project_id: number|null;
}
