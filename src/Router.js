import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage';
import CartPage from './pages/cartpage';
import UserPage from './pages/userpage';
import SignUpPage from './pages/signup';
import SearchPage from './pages/searchpage';

const Router = () => (
    <Switch>
        <Route exact path ='/home' component ={HomePage} />
        <Route exact path ='/auth' component ={UserPage} />
        <Route exact path ='/signup' component ={SignUpPage} />
        <Route exact path ='/search' component ={SearchPage} />
        <Route exact path ='/cart' component ={CartPage} />
    </Switch>
)

export default Router;