import React from 'react';

import NavigationItem from './navigationItem/navigationItem';

const navigation = ( props ) => (
    <ul>
        <li><NavigationItem link="/" exact>Home</NavigationItem></li>
        <li><NavigationItem link="/auth" exact>Auth</NavigationItem></li>
        <li><NavigationItem link="/cart" exact>Cart</NavigationItem></li>

        {/* {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>} */}
    </ul>
);

export default navigation;