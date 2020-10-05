import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    // const getUserInfo = localStorage.getItem('user');
    // const userInfo = JSON.parse(getUserInfo)

    return (
        <>
            <Route
                {...rest}
                render={({ location }) =>
                   loggedInUser && loggedInUser.email ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
                }
            />

        </>
    );
};

export default PrivateRoute;