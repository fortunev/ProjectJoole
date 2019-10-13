import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import NavigationItem from '../../components/navigation/navigationItem/navigationItem';
import logo from '../../images/logo.png';
import FaSearch from 'react-icons/lib/fa/search';
import pClasses from './product_detail.module.css';
import classes from '../../pages/userpage.module.css';
import pListClasses from '../product-listing/product-listing.module.css'; 
import inputClasses from '../../components/UI/Input/Input.module.css';
import searchClasses from '../../pages/search.module.css';
import headerClasses from '../../features/header/header.module.css';
import filterClasses from '../filterPanel/filterPanel.module.css';
// import {products} from './products';


const filterOptions = [
  {label: 'fan', value: 1},{label: 'emerson', value: 2},{label: 'house', value: 3},{label: 'luray', value: 4},{label: 'commercial', value: 5},{label: 'roof', value: 6},{label: 'big ass', value: 7},{label: 'aviation', value: 8},{label: 'westinghouse', value: 9},{label: 'indoor', value: 10},{label: 'outdoor', value: 11},{label: 'with light', value: 12},{label: 'without light', value: 13},
]
const inClassesName = [inputClasses.InputElement, inputClasses.search_inputElement]; 
let form = (
  <div>
      <div className={inputClasses.search_input}>   
      {/* onChange={(event) => this.inputChangedHandler(event.target.value, "itemId")}*/}
          <select className={inClassesName.join(' ')} type='itemId' placeholder='itemId' >   
              <option label="">Item Types</option>
              <option label="HVAC Fans">HVAC Fans</option>
              <option label="Boiler">Boiler</option>
          </select>      
          {/* onChange={(event) => this.inputChangedHandler(event.label, "filterItem")} onKeyUp={(e)=>this.onKeyDownFilter (e)} */}
      <Select options={filterOptions} className={inputClasses.select_search} placeholder="search..." />
          <i className={[inputClasses.icon, inputClasses.select_search_icon].join(" ")}><FaSearch/></i> 
      </div>          
  </div>
);
let header_back = (<div className={searchClasses.header_back}></div>);
let header = (
  <div>
  {header_back}
  <ul className={headerClasses.NavigationItems}>  
  <img src={logo} alt="logo" className={searchClasses.img} />   
      <div className={headerClasses.projects}>            
          <NavigationItem link="/projects" exact>Projects</NavigationItem>   
          <div className={searchClasses.imgHover}>
              <img src={require('../../images/'+localStorage.getItem('image'))} alt="logo" className={headerClasses.profile_img}/>
              <div className={searchClasses.logout}>
                  <Link className={searchClasses.logout} to={{pathname: '/logout'}}>LOGOUT</Link>
              </div>
          </div>
            
      </div>  
  </ul></div>
);
let logoTitle = (
  <div className={searchClasses.hide_logoTitle}>
  <img src={logo} alt="logo" className={classes.img} />
  <p className={classes.p}>Building Product Selection Platform</p></div>
);
let searchInput = (
  <div>
    {/* onSubmit={(e)=>this.selectHandler(e)} onKeyDown={(e)=>this.selectHandler (e)} */}
  <form className={searchClasses.move_search_bar}>
      <div>
          {form}
          {/* onClick={(e)=>this.selectHandler (e)}  */}
          <button className={inputClasses.search_button}></button>
      </div>
  </form> </div>
);            

const ProductDetails = ({ product }) => {
//   const product = products[productId];

  return (<div >
    <div className={classes.form_center}>    
        {header}
        {logoTitle}
        {searchInput}                
    </div>
    <div className={pClasses.content}>
      <p>Mechanical > HVAC Fans > <span>{product.model}</span></p>
      <img className={classes.prod_img} title={ product.name } src={require('../../images/'+product.image)} alt="fan"/>
      <span>{product.manufacturer} / {product.series} / {product.model}</span>
      <span> Past specifications: {product.past_spec}</span>
      <div className={pClasses.addTo}>
      <select className={pListClasses.addTo} >   
          <option label="" disabled selected>Add to</option>
          <option label="Cart">Cart</option>
          <option label="Favorites">Favorites</option>
          <option label="Comparison">Comparison</option>
      </select></div>        
      <div>
        <span className={pClasses.tabs}>Product Summary</span>
        <span className={pClasses.tabs}>Product Detail</span>
        <span className={pClasses.tabs}>Product Documentation</span>
        <span className={pClasses.tabs}>Contact</span>
      </div>
      <div className={pClasses.details} >
        <p className={pClasses.section}>Product Summary</p> 
          <span className={pClasses.section_title}>DESCRIPTION</span>
          <p><span className={pClasses.section_title_detailM}>Manufacturer </span><span className={pClasses.prod_det}>{product.manufacturer}</span></p>
          <p><span className={pClasses.section_title_detail}>Series </span><span className={pClasses.prod_det}>{product.series}</span></p>
          <p><span className={pClasses.section_title_detailM1}>Model </span><span className={pClasses.prod_det}>{product.model}</span></p>

          <span className={pClasses.section_title}>TYPE</span>
          <p><span className={pClasses.section_title_detail}>User Type </span><span className={pClasses.prod_det}>{product.use_type}</span></p>
          <p><span className={pClasses.section_title_detail}>Application </span><span className={pClasses.prod_det}>{product.application}</span></p>
          <p><span className={pClasses.section_title_detail}>Mounting Location </span><span className={pClasses.prod_det}>{product.mounting_location}</span></p>
          <p><span className={pClasses.section_title_detail}>Accessories </span><span className={pClasses.prod_det}>{product.accessories}</span></p>
          <p><span className={pClasses.section_title_detail}>Model Year </span><span className={pClasses.prod_det}>{product.model_year}</span></p>
          
          <span className={pClasses.section_title}>TECHNICAL SPECIFICATIONS</span>
          <p><span className={pClasses.section_title_detail}>Airflow (CFM) </span><span className={pClasses.prod_det}>{product.airflow}</span></p>
          <p><span className={pClasses.section_title_detail}>Power (W) </span><span className={pClasses.prod_det}>{product.power}</span></p>
          <p><span className={pClasses.section_title_detail}>Operating voltage (VAC) </span><span className={pClasses.prod_det}>{product.op_voltage}</span></p>
          <p><span className={pClasses.section_title_detail}>Fan speed (RPM) </span><span className={pClasses.prod_det}>{product.fan_speed}</span></p>
          <p><span className={pClasses.section_title_detail}>Number of fan speeds </span><span className={pClasses.prod_det}>{product.num_fan_speeds}</span></p>
          <p><span className={pClasses.section_title_detail}>Sound at max speed (dBA) </span><span className={pClasses.prod_det}>{product.sound_at_max_speed}</span></p>
          <p><span className={pClasses.section_title_detail}>Fan sweep diameter (in) </span><span className={pClasses.prod_det}>{product.fan_sweep_diameter}</span></p>
          <p><span className={pClasses.section_title_detail}>Height (in) </span><span className={pClasses.prod_det}>{product.height}</span></p>
          <p><span className={pClasses.section_title_detail}>Weight (lbs) </span><span className={pClasses.prod_det}>{product.weight}</span></p>        
        <p className={pClasses.section}>Product Details</p> 
          <span className={pClasses.section_title}>SERIES INFORMATION</span>
          <p>{product.series_info}</p>
          
        <p className={pClasses.section}>Product Documentation</p> 
          <p>{product.three_part_spec}</p>
          <p>{product.submittal}</p>
          <p>{product.control_options}</p>
          <p>{product.photometric_data}</p>
          <p>{product.bim}</p>
          <p>{product.plan_views}</p>
          <p>{product.elevetion_view}</p>

        <p className={pClasses.section}>Contact</p> 
        <span className={pClasses.section_title}>SALES REPRESENTATIVE</span>
          <p><span className={pClasses.section_title_detailM}>Name </span><span className={pClasses.prod_det}>{product.rep_name}</span></p>
          <p><span className={pClasses.section_title_detail}>Phone </span><span className={pClasses.prod_det}>{product.rep_phone}</span></p>
          <p><span className={pClasses.section_title_detailM1}>Email </span><span className={pClasses.prod_det}>{product.rep_email}</span></p>
          <p><span className={pClasses.section_title_detailM1}>Web </span><span className={pClasses.prod_det}>{product.rep_web}</span></p>

        <span className={pClasses.section_title}>MANUFACTURER</span>
          <p><span className={pClasses.section_title_detailM}>Department </span><span className={pClasses.prod_det}>{product.department}</span></p>
          <p><span className={pClasses.section_title_detail}>Phone </span><span className={pClasses.prod_det}>{product.dep_phone}</span></p>
          <p><span className={pClasses.section_title_detailM1}>Email </span><span className={pClasses.prod_det}>{product.dep_email}</span></p>
          <p><span className={pClasses.section_title_detailM1}>Web </span><span className={pClasses.prod_det}>{product.dep_web}</span></p>

      </div>
      </div></div>
  )
};

export default ProductDetails;