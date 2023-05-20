import { Route, RouteProps } from 'react-router-dom';

// Can only be accessed when you are logged in
export default function PrivateRoute(props: RouteProps) {
    //const { isLoggedIn } = useSelector((state:AppState)=>state.auth);
    //const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!isLoggedIn) dispatch(authReset());
    // }, [isLoggedIn]);
    return (
        <Route {...props} />
    );

    // if (isLoggedIn) {
    //     return (
    //         <Route {...props} />
    //     );
    // } else {
    //     return (
    //         <Route
    //             {...props} children={null}
    //             render={(routeProps) => <Redirect to={{ pathname: '/', state: { from: routeProps.location } }} />}
    //         />
    //     );
    // }
}
