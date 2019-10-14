import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import NavigationItem from '../../components/navigation/navigationItem/navigationItem';
import logo from '../../images/logo.png';
import doc from '../../images/doc.png';
import pdf from '../../images/pdf.png';
import eis from '../../images/eis.png';
import rfa from '../../images/rfa.png';
import dwg from '../../images/dwg.png';

import FaSearch from 'react-icons/lib/fa/search';
import pClasses from './product_detail.module.css';
import classes from '../../pages/userpage.module.css';
import pListClasses from '../product-listing/product-listing.module.css'; 
import inputClasses from '../../components/UI/Input/Input.module.css';
import searchClasses from '../../pages/search.module.css';
import headerClasses from '../../features/header/header.module.css';
import filterClasses from '../filterPanel/filterPanel.module.css';
import { object } from 'prop-types';
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
  let arr = product.series_info.split("||");
  return (<div >
    <div className={classes.form_center}>    
        {header}
        {logoTitle}
        {searchInput}                
    </div>
    <div className={pClasses.content}>
      <div className={pClasses.header}>
      <p className={pClasses.dir}>Mechanical > HVAC Fans > <span className={pClasses.dir_}>{product.model}</span></p>
      <p className={pClasses.dir_1}><img className={pClasses.prod_img} title={ product.name } src={require('../../images/'+product.image)} alt="fan"/>
      <span className={pClasses.dir_1_det}>{product.manufacturer} / {product.series} / {product.model}</span>
      <span className={pClasses.dir_1_spec}> Past specifications: {product.past_spec}</span>
      <div className={pClasses.addTo}>
      <select className={pListClasses.addTo} >   
          <option label="" disabled selected>Add to</option>
          <option label="Cart">Cart</option>
          <option label="Favorites">Favorites</option>
          <option label="Comparison">Comparison</option>
      </select></div></p>
      <div className={pClasses.tabs_content}>
        <span className={pClasses.tabs}><a href="#ProdSum">Product Summary</a></span>
        <span className={pClasses.tabs}><a href="#ProdDet">Product Detail</a></span>
        <span className={pClasses.tabs}><a href="#ProdDoc">Product Documentation</a></span>
        <span className={pClasses.tabs}><a href="#ProdCon">Contact</a></span>
      </div></div>     
      <div className={pClasses.details} >
        <p className={pClasses.section} id="ProdSum">Product Summary</p> 
          <table className={pClasses.table}>
            <caption className={pClasses.theader}>DESCRIPTION</caption>
            <tr>
              <td className={pClasses.tdata}>Manufacturer </td>
              <td className={pClasses.tdata2}>{product.manufacturer}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Series </td>
              <td className={pClasses.tdata2}>{product.series}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Model </td>
              <td className={pClasses.tdata2}>{product.model}</td>
            </tr>
          </table>
          <table className={pClasses.table}>
            <caption className={pClasses.theader}>TYPE</caption>
            <tr>
              <td className={pClasses.tdata}>Use Type </td>
              <td className={pClasses.tdata2}>{product.use_type}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Application </td>
              <td className={pClasses.tdata2}>{product.application}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Mounting Location </td>
              <td className={pClasses.tdata2}>{product.mounting_location}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Accessories </td>
              <td className={pClasses.tdata2}>{product.accessories}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Model Year </td>
              <td className={pClasses.tdata2}>{product.model_year}</td>
            </tr>
          </table>         
          <table className={pClasses.table}>
            <caption className={pClasses.theader}>TECHNICAL SPECIFICATIONS</caption>
            <tr>
              <td className={pClasses.tdata}>Airflow (CFM) </td>
              <td className={pClasses.tdata2}>{product.airflow}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Power (W) </td>
              <td className={pClasses.tdata2}>{product.power}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Operating voltage (VAC)</td>
              <td className={pClasses.tdata2}>{product.op_voltage}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Fan speed (RPM) </td>
              <td className={pClasses.tdata2}>{product.fan_speed}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Number of fan speeds </td>
              <td className={pClasses.tdata2}>{product.num_fan_speeds}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Fan sweep diameter (in) </td>
              <td className={pClasses.tdata2}>{product.fan_sweep_diameter}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Height (in) </td>
              <td className={pClasses.tdata2}>{product.height}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Weight (in) </td>
              <td className={pClasses.tdata2}>{product.weight}</td>
            </tr>
          </table> 

        <p className={pClasses.section} id="ProdDet">Product Details</p> 
          <table className={pClasses.series_info}>
          <caption className={[pClasses.theader].join(" ")}>SERIES INFORMATION</caption><tbody>
          {Object.keys(arr).map((info) => {
            return(
              <tr><td className={pClasses.series_info_data}>{arr[info]}</td></tr>
            )
          })}
          </tbody></table>
          
        <p className={pClasses.section} id="ProdDoc">Product Documentation</p> 
        <table>
          <tr>
            <td><p><img className={pClasses.img} src={doc} alt="doc"/><span className={pClasses.file}>{product.three_part_spec}</span> (DOC)</p></td>
            <td><p><img className={pClasses.img1} src={rfa} alt="pdf"/><span className={pClasses.file}>{product.bim}</span> (RVT)</p></td>
          </tr>
          <tr>
            <td><p><img className={pClasses.img} src={pdf} alt="pdf"/><span className={pClasses.file}>{product.submittal}</span> (PDF)</p></td>
            <td><p><img className={pClasses.img1} src={dwg} alt="pdf"/><span className={pClasses.file}>{product.plan_views}</span> (DWG)</p></td>
          </tr>
          <tr>
            <td><p><img className={pClasses.img} src={pdf} alt="pdf"/><span className={pClasses.file}>{product.control_options}</span> (PDF)</p></td>
            <td><p><img className={pClasses.img1} src={dwg} alt="pdf"/><span className={pClasses.file}>{product.elevetion_view}</span> (DWG)</p></td>
          </tr>
          <tr>
            <td><p><img className={pClasses.img} src={pdf} alt="pdf"/><span className={pClasses.file}>{product.photometric_data}</span> (PDF)</p></td>
          </tr>
        </table>
        
        <p className={pClasses.section} id="ProdCon">Contact</p> 
          <table className={pClasses.table}>
            <caption className={pClasses.theader}>SALES REPRESENTATIVE</caption>
            <tr>
              <td className={pClasses.tdata}>Name </td>
              <td className={pClasses.tdata2}>{product.rep_name}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Phone </td>
              <td className={pClasses.tdata2}>{product.rep_phone}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Email </td>
              <td className={pClasses.tdata2}>{product.rep_email}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Web </td>
              <td className={pClasses.tdata2}>{product.rep_web}</td>
            </tr>
          </table>
          <table className={pClasses.table}>
            <caption className={pClasses.theader}>MANUFACTURER</caption>
            <tr>
              <td className={pClasses.tdata}>Department </td>
              <td className={pClasses.tdata2}>{product.department}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Phone </td>
              <td className={pClasses.tdata2}>{product.dep_phone}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Email </td>
              <td className={pClasses.tdata2}>{product.dep_email}</td>
            </tr>
            <tr>
              <td className={pClasses.tdata}>Web </td>
              <td className={pClasses.tdata2}>{product.dep_web}</td>
            </tr>
          </table>
         
      </div>
      </div></div>
  )
};

export default ProductDetails;
