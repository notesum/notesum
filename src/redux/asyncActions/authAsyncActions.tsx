import { Dispatch } from 'react';

import { AuthActionTypes } from '../types/authTypes';
import { REDIRECT } from '../types/redirectTypes';

import * as a from '../actions/authActions';
import { updateFileList } from '../actions/filesActions';
import { updateProjectsList } from '../actions/projectActions';

import { BASE_URL } from './ServerSettings';

export function login(email:string, password:string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_name: 'NoteSum Password Grant Client',
            password,
            email})
    };
    return (dispatch: Dispatch<AuthActionTypes>) => {

        dispatch(a.userLoginStarted());

        // TODO: Fix error handling

        const url = BASE_URL + '/login';

        fetch(url,requestOptions)
            .then(async response => {
                if(!response.ok) throw new Error(response.statusText);
                else return await response.json();
            })
            .then((data)=> {
                const statusCode = data[0];
                if (statusCode) throw new Error(data.errors);
                else {
                    dispatch(a.userLoginSuccess(data.access_token));
                }
            })
            .catch((err)=> {
                console.log('I got an error',err);
                dispatch(a.userLoginFailure(err));
            });
    };

}

export function logout() {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch(a.userLogoutStarted());
        dispatch(a.userLogoutSuccess());
        dispatch(updateFileList({}));
        dispatch(updateProjectsList({}));
        dispatch(a.setUserLoginId(''));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' , 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({ client_name: 'NoteSum Password Grant Client'})
        };
        const url = BASE_URL + '/logout';
        fetch(url,requestOptions)
            .then(async response => {
                if(!response.ok) throw new Error(response.statusText);
                else return await response.json();
            })
            .then((data)=> {
                if (data[0]) throw new Error(data.errors);
                else {
                    dispatch(a.userLogoutSuccess());
                    dispatch(updateFileList({}));
                    dispatch(updateProjectsList({}));
                    dispatch(a.setUserLoginId(''));
                    dispatch({
                        type: REDIRECT,
                        payload: `/`
                    });
                }
            })
            .catch((err)=> {
                console.log('I got an error',err);
                dispatch(a.authFailure(err));
            });
    };
}

export function getUserInfo() {
    return (dispatch: Dispatch<AuthActionTypes>, getState) => {
        const token = getState().auth.token;
        dispatch(a.userDetailsStarted());
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' , 'Authorization': `Bearer ${token}`},
        };
        const url = BASE_URL + '/user';
            fetch(url,requestOptions)
            .then(async response => {
                if(!response.ok) throw new Error(response.statusText);
                else return await response.json();
            })
            .then((data)=> {
                if (data[0]) throw new Error(data.errors);
                else dispatch(a.userDetailsSuccess(data.data));
            })
            .catch((err)=> {
                console.log('I got an error',err);
                dispatch(a.authFailure(err));
            });
    };
}

export function register(name:string,email:string,password:string) {
    return (dispatch: Dispatch<AuthActionTypes>) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                password,
                email})
        };
        dispatch(a.userSignupStarted());

        // TODO: Fix error handling

        const url = BASE_URL + '/register';

        fetch(url,requestOptions)
            .then(async response => {
                if(!response.ok) throw new Error(response.statusText);
                else return await response.json();
            })
            .then((data)=> {
                const statusCode = data[0];
                if (statusCode) throw new Error(data.errors);
                else {
                    dispatch(a.userSignupSuccess(data.access_token));
                    dispatch(a.setUserLoginId(data.user_id));
                }
            })
            .catch((err)=> {
                console.log('I got an error',err);
                dispatch(a.userSignupFailure(err));
            });
    };
}