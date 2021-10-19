import * as t from './../types/authTypes';

const guest: t.User = {
    name: 'Guest',
    email: '',
    created_at: '',
    updated_at: '',
    project_id: null,
};

const initialState: t.AuthState = {
    loading: false,
    isLoggedIn: false,
    token: null,
    errors: [],
    user: guest,
    id:'',
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
            case t.USER_LOGIN_ID:
                return {
                    ...state,
                    id:action.payload,
                };
            
        case t.USER_LOGOUT_STARTED:
            return {
                ...state,
                loading: true,
                errors: [],
            };
        case t.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                token: null,
                isLoggedIn: false,
                user: guest,
            };
        case t.USER_DETAILS_STARTED:
            return {
                ...state,
                loading: true,
            };
        case t.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case t.USER_SIGNUP_STARTED:
            return {
                ...state,
                loading: true,
                token: null,
                errors: [],
                isLoggedIn: false,
            };
        case t.USER_SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                errors: ['signup error'],
            };
        case t.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                token: action.payload,
            };
        case t.AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                token: null,
                isLoggedIn: false,
                errors: ['auth error'],
            };
        case t.AUTH_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default authReducer;