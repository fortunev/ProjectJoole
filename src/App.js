import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Router } from '@reach/router';
import { connect } from 'react-redux';
import './index.css';

import HomePage from './pages/homepage';
// import CartPage from './pages/cartpage';
import SearchPage from './pages/searchpage';
import SignUpPage from './pages/signup';
import Logout from './pages/logout';
import ProductDetail from './features/product_detail/product_detail';
import ProductPageWrapper from './components/prodPageWrapper/prodPageWrapper';
// import Navigation from './components/navigation/navigation'
import UserPage from './pages/userpage';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    console.log(this.props);
    this.props.onTryAutoSignup();
    // this.props.checkSearch();
  }
  render (){
    let routes = (
      <Switch>
        <Route exact path='/auth' component={UserPage} />
        <Route exact path ='/signup' component ={SignUpPage} />

        {/* remove if auth active  */}
        {/* <Route exact path ='/home' component ={HomePage} />  */}
        <Redirect to="/auth" />
      </Switch>
    );
    console.log("Auth status - "+this.props.isAuthenticated);
    
    if ( this.props.isAuthenticated ) {
      routes = (
         <Switch>
           <Route exact path ='/search' component ={SearchPage} /> */}
           {/* <Router>
             <ProductDetail path="/fans/:productId" />
           </Router> */}
           <Route exact path ='/search/:productId' component={ProductPageWrapper}/>
           <Route exact path ='/home' component ={HomePage} />
           <Route exact path='/logout' component={Logout} />
           <Redirect to='/search' />
         </Switch>
        
      );
    }
    return (
      <div className="page_container">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    products: null,
    // doSearch: state.search.doSearch !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() ),
    // checkSearch: () => dispatch( actions.searchCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
// export default App;
