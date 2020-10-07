import * as t from './../types/authTypes';

const initialState: t.AuthState = {
    loading: false,
    isLoggedIn: false,
    token: null,
    errors: [],
};

const authReducer = ( state = initialState, action: t.AuthActionTypes) => {
    switch(action.type) {
        case t.USER_LOGIN_STARTED:
            return {
                ...state,
                loading: true,
                token: null,
                errors: [],
                isLoggedIn: false,
            };
        case t.USER_LOGIN_FAILURE:
            // const temp = [...action.payload];
            // console.log('Reducer:',temp, typeof temp);
            return {
                ...state,
                loading: false,
                errors: ['login error'],
            };
        case t.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                token: action.payload,
            };
        case t.USER_LOGOUT_STARTED:
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case t.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                token: null,
                isLoggedIn: false,
            };
        case t.USER_LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                token: null,
                isLoggedIn: false,
                errors: ['logout error'],
            };
        default:
            return state;
    }
};

export default authReducer;