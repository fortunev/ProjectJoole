import React from 'react';
import { Link } from 'react-router-dom';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import ProdudctListItem from './product-list-item';
import { connect } from 'react-redux';
import classes from './product-listing.module.css';

function ProductListing(props){
    console.log(props);
    return (
        <div>
            <p className={classes.prods_item_type}>{props.item_type} > <span className={classes.prods_itemId}>{props.itemId}</span></p>
        <div className = {classes.product_listing}>
        {props.products.map((product, index) => {
            return (
            <div key={index} className={classes.product_list_item}>
                <p className={classes.prod_verified}>Verified {product.verified}</p>
                <Link className={classes.Link} to={{pathname: `/search/${index+1}`}} title={`Product details`}>
                <img className={classes.prod_img} title={ product.name } src={require('../../images/'+product.image)} alt="fan"/></Link>
                <Link className={classes.Link} to={{pathname: `/search/${index+1}`}} title={`Product details`}>
                <div className={classes.prod_header_back}>
                    <p className={classes.prod_header}>{product.manufacturer}</p>
                    <p className={classes.prod_header}>{product.series}</p>
                    <p className={classes.prod_header}>{product.model}</p>
                </div></Link>
                <Link className={classes.Link} to={{pathname: `/search/${index+1}`}} title={`Product details`}>
                <div className={classes.prod_spec_back}>
                    <p className={classes.prod_spec} >{product.airflow} CFM</p>
                    <p className={classes.prod_spec}>{product.power.split("Max").pop()} W at max speed</p>
                    <p className={classes.prod_spec}>{product.sound_at_max_speed} at max speed</p>
                    <p className={classes.prod_spec}>{product.fan_sweep_diameter}'' fan sweep diameter</p>
                </div></Link>
                <div className={classes.prod_past_spec_back}>
                    <p className={classes.prod_past_spec}>Past specifications: </p>
                    <p className={classes.prod_past_spec}>{product.past_spec}</p>
                </div>
                <div className={classes.checkbox_container}><input type="checkbox"/>
                    <span className={classes.checkbox_compare}> Compare</span>
                    <select className={classes.addTo} >   
                        <option label="" disabled selected>Add to</option>
                        <option label="Cart">Cart</option>
                        <option label="Favorites">Favorites</option>
                        <option label="Comparison">Comparison</option>
                    </select>
                </div>
                {/* <div><select>   
                    <option label="Mechanical">Mechanical</option>
                    <option label="Electric">Electric</option>
                </select> </div> */}
                {/* <h3><Link to={{pathname: `/search/${index+1}`}} title={`${product.id} details`}> { product.manufacturer }</Link></h3>
                <ProdudctListItem 
                    key={product.id}
                    product = {product} 
                    addToCart = {props.addToCart}
                    cartItem={props.cart.filter(cartItem => cartItem.id === product.id)[0]}
                />
                {product.manufacturer && <p>{`Description: ${product.manufacturer}`}</p>}             */}
            </div>
            )
        })}
    </div></div>
    )
}

function mapStateToProps(state){
    return {
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch){
    return {
        addToCart: (item) => {
            dispatch({type: 'ADD', payload: item})
        },
        removeFromCart: (item) => {
            dispatch ({type: 'REMOVE', payload: item})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);