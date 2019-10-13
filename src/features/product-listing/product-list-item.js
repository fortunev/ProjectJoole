import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import ProductDetail from '../product_detail/product_detail';
import fan1 from '../../images/fan1.jpg';
import classes from './product-listing.module.css';
// import * as actions from '../../store/actions/index';
// import axios from '../../axios';

export default function ProdudctListItem(props){
    return <div className={classes.product_list_item}>
        <p>{props.product.verified}</p>
        <h3>{ props.product.manufacturer }</h3>
        <img height={100} title={ props.product.name }src={require('../../images/'+props.product.image)} alt="fan"/>
        <div>{ props.product.description }</div>
        <div>{ props.product.prive }</div>
        {/* <div>
            <button
              onClick={() => props.addToCart(props.product)}
            >Add to Cart ({
                (props.cartItem && props.cartItem.quantity) || 0
            })</button>
        </div> */}
        {/* <Route path={`${match.path}/:id`} component={ProductDetail} /> */}
        {/* onClick()=props.getData() */}
    </div>
}

// const mapStateToProps = state => {
//     return {
//         items: state.cart_reducer.items,
//         price: state.cart_reducer.totalPrice,
//         error: state.cart_reducer.error,
//         // isAuthenticated: state.auth.token !== null
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }