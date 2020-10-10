import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { authReset } from '../redux/actions/authActions';
import { AppState } from '../redux/reducers';

// Can only be accessed when you are logged in
function PrivateRoute(props: RouteProps) {
    const { isLoggedIn } = useSelector((state:AppState)=>state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) dispatch(authReset());
    }, [isLoggedIn]);

    if (isLoggedIn) {
        return (
            <Route {...props} />
        );
    } else {
        return (
            <Route
                {...props} children={null}
                render={(routeProps) => <Redirect to={{ pathname: '/', state: { from: routeProps.location } }} />}
            />
        );
    }
}

export default PrivateRoute;