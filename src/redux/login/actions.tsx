import { Dispatch } from 'redux';
import * as t from './actionTypes';
const LoginUrl = "http://localhost:8080/api/login";

const setLoginState = (loginData) => {
    console.log("Called setLoginState");
    
    return {
        type: t.SET_LOGIN_STATE,
        payload: loginData,
    };
};

export const login = (loginInput) => {
    // const { email, password } = loginInput;
    console.log("Called login");
    
    return (dispatch: Dispatch) => {
        console.log("Hello dispatch");
        
        return fetch(LoginUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInput),
        })
         .then((response) => response.json())
         .then((json) => {
             console.log("Response: " ,json);
             
            if (json.msg === 'success') { // response success checking logic could differ
              dispatch(setLoginState({json})); // our action is called here
            } else {
             console.log('Login Failed', 'Username or Password is incorrect');
            }
          })
          .catch((err) => {
            console.log('Login Failed', 'Some error occured, please retry');
            console.log(err);
          });    
    }
}