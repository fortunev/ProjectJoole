import React, {userEffect, useEffect, Component} from 'react';
import { Link } from 'react-router-dom';
import AdvancedSearch from '../advancedSearch/advancedSearch';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import ProdudctListItem from './product-list-item';
import { connect } from 'react-redux';
import classes from './product-listing.module.css';


class ProductListing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // selected: new Set(),
        }
    }
    componentWillMount = () => {
        this.selected = new Set();
    }
    addToSelected(event){
        console.log(event.target.checked, event.target.name);
        if (this.selected.has(event.target.name)) {
            this.selected.delete(event.target.name);
        } else {
            this.selected.add(event.target.name);
        }
        this.props.getSelected(this.selected);
        console.log(this.selected);
    }
    compare(e){
        if(e.target.value == "Comparison"){
            console.log(e);
            if(this.selected.size != 0)
                this.props.toCompare(true);
        }
    }
    render() {       
    if(this.props.getFilters){
        console.log(this.props.getFilters);
    }
    return (
        <div>
            <p className={classes.prods_item_type}>{this.props.item_type} > <span className={classes.prods_itemId}>{this.props.itemId}</span></p>
        <div className = {classes.product_listing}>
        {this.props.products.map((product, index) => {           
        let powerSplit = (product.power.split("Min").pop()).split("Max");  
        let heightSplit = (product.height.split("Min").pop()).split("Max");  
        let pastSpsec = (product.past_spec.split("/"));  
        console.log(this.props);
        if(this.props.getFilters != null){
            if((product.use_type === this.props.getFilters.product_type || this.props.getFilters.product_type=="") &&
                (product.application === this.props.getFilters.product_application || this.props.getFilters.product_application=="") && 
                (product.mounting_location === this.props.getFilters.product_mountLoc || this.props.getFilters.product_mountLoc=="")&&
                (product.accessories === this.props.getFilters.product_accessories || this.props.getFilters.product_accessories=="") &&
                product.model_year >= this.props.getFilters.lowYear && product.model_year <= this.props.getFilters.highYear &&
                product.airflow >= this.props.getFilters.lowAir && product.airflow <= this.props.getFilters.highAir &&
                Number(powerSplit[0]) >= this.props.getFilters.lowPower && Number(powerSplit[1]) <= this.props.getFilters.highPower &&
                product.sound_at_max_speed >= this.props.getFilters.lowSound && product.sound_at_max_speed <= this.props.getFilters.highSound &&
                product.fan_sweep_diameter >= this.props.getFilters.lowSweep && product.fan_sweep_diameter <= this.props.getFilters.highSweep && 
                Number(heightSplit[0]) >= this.props.getFilters.lowHeight && Number(heightSplit[1]) <= this.props.getFilters.highHeight &&
                (product.manufacturer === this.props.getFilters.brandOp || this.props.getFilters.brandOp=="") &&
                Number(pastSpsec[0]) >= this.props.getFilters.lowFirm && Number(pastSpsec[0]) <= this.props.getFilters.highFirm && 
                Number(pastSpsec[1]) >= this.props.getFilters.lowGlobal && Number(pastSpsec[1]) <= this.props.getFilters.highGlobal
                ){
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
                <div className={classes.checkbox_container}><input type="checkbox" name={product} onChange={(e)=>this.addToSelected(e)}/>
                    <span className={classes.checkbox_compare}> Compare</span>
                    <select className={classes.addTo} >   
                        <option label="" disabled selected>Add to</option>
                        <option label="Cart">Cart</option>
                        <option label="Favorites">Favorites</option>
                        <option label="Comparison" onClick={(e)=>this.compare(e)}>Comparison</option>
                    </select>
                </div>
            </div>
            )
        }
        
        }else{
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
                    <div className={classes.checkbox_container}><input type="checkbox" name={product.model} onChange={(e)=>this.addToSelected(e)} defaultChecked={false} />
                        <span className={classes.checkbox_compare}> Compare</span>
                        <select className={classes.addTo} onChange={(e)=>this.compare(e)}>   
                            <option label="" disabled selected >Add to</option>
                            <option label="Cart">Cart</option>
                            <option label="Favorites">Favorites</option>
                            <option label="Comparison" >Comparison</option>
                        </select>
                    </div>
                </div>
                )
        }
        })}
    </div></div>
    )
    }
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