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