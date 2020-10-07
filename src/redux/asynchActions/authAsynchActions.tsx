import { Dispatch } from 'react';

import { AuthActionTypes } from '../types/authTypes';
import { userLoginFailure, userLoginStarted, userLoginSuccess } from '../actions/authActions';

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

        fetch('http://localhost:8080/api/login',requestOptions)
            .then(async response => {
                if(!response.ok) throw new Error(response.statusText);
                else return await response.json();
            })
            .then((data)=> {
                const statusCode = data[0];
                if (statusCode) throw new Error(data.errors);
                else dispatch(userLoginSuccess(data.access_token));
            })
            .catch((err)=> {
                console.log('I got an error',err);
                dispatch(userLoginFailure(err));
            });
    };

}