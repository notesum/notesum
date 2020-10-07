import { Dispatch } from 'react';

import { AuthActionTypes } from '../types/authTypes';
import { userLoginFailure, userLoginStarted, userLoginSuccess, userLogoutStarted, userLogoutSuccess, authFailure, userDetailsStarted, userDetailsSuccess } from '../actions/authActions';

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

        dispatch(userLoginStarted());

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
                    dispatch(userLoginSuccess(data.access_token));
                }
            })
            .catch((err)=> {
                console.log('I got an error',err);
                dispatch(userLoginFailure(err));
            });
    };

}

export function logout() {
    return (dispatch: Dispatch<AuthActionTypes>, getState) => {
        const token = getState().auth.token;
        dispatch(userLogoutStarted());
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
                else dispatch(userLogoutSuccess());
            })
            .catch((err)=> {
                console.log('I got an error',err);
                dispatch(authFailure(err));
            });
    };
}

export function getUserInfo() {
    return (dispatch: Dispatch<AuthActionTypes>, getState) => {
        const token = getState().auth.token;
        dispatch(userDetailsStarted());
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
                else dispatch(userDetailsSuccess(data.data));
            })
            .catch((err)=> {
                console.log('I got an error',err);
                dispatch(authFailure(err));
            });
    };
}