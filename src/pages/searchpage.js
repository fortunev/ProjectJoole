import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect , Link } from 'react-router-dom';
import Select from 'react-select';

import classes from './userpage.module.css';
import inputClasses from '../components/UI/Input/Input.module.css';
import searchClasses from './search.module.css';
import headerClasses from '../features/header/header.module.css';
import NavigationItem from '../components/navigation/navigationItem/navigationItem';
import logo from '../images/logo.png';
import FaSearch from 'react-icons/lib/fa/search';
// import Header from  '../features/header/header';
import ProductListing from '../features/product-listing';
import FilterPanel from '../features/filterPanel/filterPanel';
import ProductDetail from '../features/product_detail/product_detail';
import * as actions from '../store/actions/index';
import axios from 'axios';
import InputRange from 'react-input-range';
import data from '../data/products.json';

const fanOptions = [
    {label: 'HVAC Fans', value: 1},
    {label: 'Boiler', value: 2},
];
const filterOptions = [
    {label: 'fan', value: 1},{label: 'emerson', value: 2},{label: 'house', value: 3},{label: 'luray', value: 4},{label: 'commercial', value: 5},{label: 'roof', value: 6},{label: 'big ass', value: 7},{label: 'aviation', value: 8},{label: 'westinghouse', value: 9},{label: 'indoor', value: 10},{label: 'outdoor', value: 11},{label: 'with light', value: 12},{label: 'without light', value: 13},
]

const API = 'http://localhost:8080/api/';//'https://hn.algolia.com/api/v1/search?query=';//'http://localhost:8080/api/fans/';
let defaultQuery = 'fans/fans';//'fans', 'boiler';
let show_prods = false;
class searchpage extends Component {  
    constructor(props){
        super(props);
        console.log(props); 
        console.log(this.state);
    }
    
    state = {
        value5: {
            min: 3,
            max: 7,
          },
        hits: [],
        isLoading: false,
        error: null,
        display: false,        
        controls: {
            itemId: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                    placeholder: 'select'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            item_type: {
                elementType: 'select1',
                elementConfig: {
                    type: 'select1',
                    placeholder: 'select1'
                },
                value: 'Mechanical',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            filterItem: {
                value: null,
            }
        }
    }      
    componentDidMount(){
        if(show_prods){
            axios.get(API + defaultQuery)
            .then(result => {
                console.log(result);
                this.setState({
                hits: result.data,
                isLoading: false
            })
        console.log("DISPLAY - "+this.state.display+" show_prods - "+show_prods);
        this.props.onSearch(this.state.controls.itemId.value, this.state.controls.item_type.value, this.state.hits);
        })
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
        }
    }
    inputChangedHandler = ( event, controlName ) => {
        let updatedControls = null;
        updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event,
                touched: true
            }
        };
        console.log(updatedControls);
        console.log(this.state);
        this.setState( { controls: updatedControls } );

    }
    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.inputChangedHandler(event, "itemId");
            this.selectHandler(event);
        }
    }
    onKeyDownFilter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.inputChangedHandler(event, "filterItem");
            this.selectHandler(event);
        }
    }
    selectHandler = ( event ) => {
        if (event.key === 'Enter' || event.type === 'click') {
        event.preventDefault();
        this.setState({ display: true });
        show_prods = true;
        this.setState({ isLoading: true });       
        if(this.state.controls.itemId.value == "HVAC Fans"){
            defaultQuery = 'fans/fans';
        }
        else if(this.state.controls.itemId.value == "Boiler"){
            defaultQuery = 'boilers/boilers';
        }
        else{
            defaultQuery = 'fans/fans';
        }
        console.log("DEFAULT - "+defaultQuery);
        // defaultQuery = 'fans/fans';
        axios.get(API + defaultQuery)
        .then(result => {
            console.log(result);
            this.setState({
            hits: result.data,
            isLoading: false
        })
        console.log("DISPLAY - "+this.state.display+" show_prods - "+show_prods);
        this.props.onSearch(this.state.controls.itemId.value, this.state.controls.item_type.value, this.state.hits);
        })
        .catch(error => this.setState({
            error,
            isLoading: false
        }));
        }
        console.log(this.state.controls.itemId.value+"|||"+this.state.controls.item_type.value+"|||"+this.state.hits);
        console.log(this.props);
    }
    getData = (child) => {
        console.log(child);
    };
    render(){
        let form = null, logoTitle = null, searchInput = null, header = null, header_back = null, productsList = null, filter = null;  
        const { hits, isLoading, error } = this.state;
        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <p>Loading ...</p>;
        }
        const inClassesName = [inputClasses.InputElement, inputClasses.search_inputElement];        
        // if(this.state.display){
        if(show_prods){
            form = (
                <div>
                    <div className={inputClasses.search_input}>                    
                        <select className={inClassesName.join(' ')} type='itemId' placeholder='itemId' onChange={(event) => this.inputChangedHandler(event.target.value, "itemId")}>   
                            <option label="">Item Types</option>
                            <option label="HVAC Fans">HVAC Fans</option>
                            <option label="Boiler">Boiler</option>
                        </select>      
                    <Select options={filterOptions} className={inputClasses.select_search} placeholder="search..." onChange={(event) => this.inputChangedHandler(event.label, "filterItem")} onKeyUp={(e)=>this.onKeyDownFilter (e)}/>
                        <i className={[inputClasses.icon, inputClasses.select_search_icon].join(" ")}><FaSearch/></i> 
                    </div>          
                </div>
            );
            header_back = (
                <div className={searchClasses.header_back}>                    
                </div>
            );
            header = (
                <div>
                {header_back}
                <ul className={headerClasses.NavigationItems}>  
                <img src={logo} alt="logo" className={searchClasses.img} />   
                    <div className={headerClasses.projects}>            
                        <NavigationItem link="/projects" exact>Projects</NavigationItem>   

                        {/* <Link className={searchClasses.logout} to={{pathname: '/logout'}}>LOGOUT</Link> */}
                        {/* <div className={searchClasses.logout}>
                        <Link to={{pathname: '/logout'}}></Link>
                        <NavigationItem link="/logout" exact >Log out</NavigationItem> </div> */}

                        <div className={searchClasses.imgHover}>
                            <img src={require('../images/'+localStorage.getItem('image'))} alt="logo" className={headerClasses.profile_img}/>
                            <div className={searchClasses.logout}>
                                <Link className={searchClasses.logout} to={{pathname: '/logout'}}>LOGOUT</Link>
                            </div>
                        </div>
                          
                    </div>  
                </ul></div>
            );
            logoTitle = (
                <div className={searchClasses.hide_logoTitle}>
                <img src={logo} alt="logo" className={classes.img} />
                <p className={classes.p}>Building Product Selection Platform</p></div>
            );
            searchInput = (
                <div>
                <form onSubmit={(e)=>this.selectHandler(e)} onKeyDown={(e)=>this.selectHandler (e)}  className={searchClasses.move_search_bar}>
                    <div>
                        {form}
                        <button onClick={(e)=>this.selectHandler (e)} className={inputClasses.search_button}></button>
                    </div>
                </form> </div>
            );            
            console.log(this.state);
            console.log(this.props);    
            productsList = (
            <div className = {searchClasses.show_products}>
                <ProductListing products={hits} getData={this.getData} item_type={this.state.controls.item_type.value} itemId={this.state.controls.itemId.value}/>
                {/* <ProductDetail/> */}
            </div>
            );    
            filter = (
                <div className={searchClasses.filter}>
                    <FilterPanel />
                </div>
            );      
        }
        else{
            form = (
                <div>
                    <div className={inputClasses.search_input}>                    
                        <select className={inClassesName.join(' ')} type='item_type' placeholder='item_type' onChange={(event) => this.inputChangedHandler(event.target.value, "item_type")}>   
                            <option label="Mechanical">Mechanical</option>
                            <option label="Electric">Electric</option>
                        </select>      
                    <Select options={fanOptions} className={inputClasses.select_search} placeholder="search..." onChange={(event) => this.inputChangedHandler(event.label, "itemId")} onKeyUp={(e)=>this.onKeyDown (e)}/>
                        <i className={[inputClasses.icon, inputClasses.select_search_icon].join(" ")}><FaSearch/></i> 
                    </div>          
                </div>
            );
            header = (
                <ul className={headerClasses.NavigationItems}>        
                    <div className={headerClasses.projects}>            
                        <NavigationItem link="/projects" exact>Projects</NavigationItem>            
                        <img src={require('../images/'+localStorage.getItem('image'))} alt="logo" className={headerClasses.profile_img}/>
                    </div>  
                </ul>
            );
            logoTitle = (
            <div>
                <img src={logo} alt="logo" className={classes.img} />
                <p className={classes.p}>Building Product Selection Platform</p></div>
            );
            searchInput = (
                <form onSubmit={(e)=>this.selectHandler(e)}  onKeyDown={(e)=>this.selectHandler (e)}  className={classes.search_form}>
                    <div>
                        {form}
                        <button onClick={(e)=>this.selectHandler (e)} className={inputClasses.search_button}></button>
                    </div>
                </form> 
            ); 
        }
        return (  
            <div className={classes.form_center}>    
                {header}
                {logoTitle}
                {searchInput}
                {productsList}
                {filter}                
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("DISPLAY - "+state.display+" show_prods - "+show_prods);
    return {
        products_: state.hits,
        // show_products_page: state.display,
        show_products_page: show_prods
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: ( itemId, item_type, hits ) => dispatch( actions.search( itemId, item_type, hits ) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(searchpage);