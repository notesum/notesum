import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { authReset } from '../redux/actions/authActions';
import { AppState } from '../redux/reducers';

// Can only be accessed when you are logged in
function PrivateRoute({component: Component, ...rest}) {
    const { isLoggedIn } = useSelector((state:AppState)=>state.auth);
    if (isLoggedIn){
        return (
            <Route
                {...rest}
                render={(props)=> <Component {...props} />}
            />
        );
    } else {
        const dispatch = useDispatch();
        dispatch(authReset());
        return (
            <Route
                {...rest}
                render={(props)=> <Redirect to={{pathname: '/', state: {from: props.location} }} />}
            />
        );
    }
}

export default PrivateRoute;