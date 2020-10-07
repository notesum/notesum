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

export function userDetailsStarted(): t.AuthActionTypes {
    return {
        type: t.USER_DETAILS_STARTED,
    };
}

export function userDetailsSuccess(user:t.User): t.AuthActionTypes {
    return {
        type: t.USER_DETAILS_SUCCESS,
        payload: user,
    };
}

export function authFailure(errors:string[]): t.AuthActionTypes {
    return {
        type: t.AUTH_FAILURE,
        payload:errors,
    };
}