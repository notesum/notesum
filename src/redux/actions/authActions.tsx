import * as t from './../types/authTypes';

export function userLoginStarted(): t.AuthActionTypes {
    return {
        type: t.USER_LOGIN_STARTED,
    };
}

export function userLoginFailure(errors:string[]): t.AuthActionTypes {
    return {
        type: t.USER_LOGIN_FAILURE,
        payload: errors,
    };
}

export function userLoginSuccess(token:string): t.AuthActionTypes {
    return {
        type: t.USER_LOGIN_SUCCESS,
        payload: token,
    };
}

export function userLogoutStarted(): t.AuthActionTypes {
    return {
        type: t.USER_LOGOUT_STARTED,
    };
}

export function userLogoutSuccess(): t.AuthActionTypes {
    return {
        type: t.USER_LOGOUT_SUCCESS,
    };
}

export function userLogoutFailure(errors:string[]): t.AuthActionTypes {
    return {
        type: t.USER_LOGOUT_FAILURE,
        payload:errors,
    };
}