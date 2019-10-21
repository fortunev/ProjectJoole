import React from 'react';
import classes from './comparison.module.css';

function comparsion(props){
    return (
    <div className={classes.container}>
        <p className={classes.dir}>Mechanical > HVAC Fans > <span className={classes.dir_}> Compare</span></p>
        <div className={classes.column}>
            <div className={classes.title}>DESCRIPTION</div>
            <div className={classes.property}>
                <div className={classes.property_}>Manufacturer</div>
                <div className={classes.property_}>Series</div>
                <div className={classes.property_}>Model</div></div>
            <div className={classes.title}>TYPE</div>
            <div className={classes.property}>
                <div className={classes.property_}>Use Type</div>
                <div className={classes.property_}>Application</div>
                <div className={classes.property_}>Mounting Location</div>
                <div className={classes.property_}>Accessories</div>
                <div className={classes.property_}>Model year</div></div>
            <div className={classes.title}>TECHINCAL SPECIFICATIONS</div>
            <div className={classes.property}>
                <div className={classes.property_}>Arflow (CFM)</div>
                <div className={classes.property_}>Power (W)</div>
                <div className={classes.property_}>Operating voltage (VAC)</div>
                <div className={classes.property_}>Fan speed (RPM)</div>
                <div className={classes.property_}>Number of fan speeds</div>
                <div className={classes.property_}>Sound at max speed (dBA)</div>
                <div className={classes.property_}>Fan sweep diameter(in)</div>
                <div className={classes.property_}>Height (in)</div>
                <div className={classes.property_}>Weight (lbs)</div></div> 
            {/* <div className={classes.title}>SERIES INFORMATION</div>
            <div className={classes.title}>PRODUCT DOCUMENTATION</div> */}
            <div className={classes.title}>SALES REPRESENTATIVE</div>
            <div className={classes.property}>
                <div className={classes.property_}>Name</div>
                <div className={classes.property_}>Phone</div>
                <div className={classes.property_}>Email</div>
                <div className={classes.property_}>Web</div></div>
            <div className={classes.title}>MANUFACTURER</div>
            <div className={classes.property}>
                <div className={classes.property_}>Department</div>
                <div className={classes.property_}>Phone</div>
                <div className={classes.property_}>Email</div>
                <div className={classes.property_}>Web</div></div>
        </div>
        <div className={classes.products}>
            {/* <table></table> */}
            {props.products.map((product, index) => {
                if(props.selected != null && props.selected.has(product.model)){
                return (
                <div key={index} className={classes.product_list_item}>
                    <div className={classes.img_header}>
                        <select className={classes.addTo}>   
                            <option label="" disabled selected >Add to</option>
                            <option label="Cart">Cart</option>
                            <option label="Favorites">Favorites</option>
                            <option label="Comparison" >Comparison</option>
                        </select>
                        {/* <div className={classes.prod_verified}>Verified {product.verified}</div> */}
                        <img className={classes.img} title={ product.name } src={require('../../images/'+product.image)} alt="fan"/>
                    </div>
                    <div className={classes.prod_det}>
                        <div className={classes.prod_det_}>{product.manufacturer}</div>
                        <div className={classes.prod_det_}>{product.series}</div>
                        <div className={classes.prod_det_}>{product.model}</div>
                    </div>
                    <div className={classes.prod_det}>
                        <div className={classes.prod_det_}>{product.use_type}</div>
                        <div className={classes.prod_det_}>{product.application}</div>
                        <div className={classes.prod_det_}>{product.mounting_location}</div>
                        <div className={classes.prod_det_}>{product.accessories}</div>
                        <div className={classes.prod_det_}>{product.model_year}</div>
                    </div>
                    <div className={classes.prod_det}>
                        <div className={classes.prod_det_}>{product.airflow}</div>
                        <div className={classes.prod_det_}>{product.power}</div>
                        <div className={classes.prod_det_}>{product.op_voltage}</div>
                        <div className={classes.prod_det_}>{product.fan_speed}</div>
                        <div className={classes.prod_det_}>{product.num_fan_speeds}</div>
                        <div className={classes.prod_det_}>{product.sound_at_max_speed}</div>
                        <div className={classes.prod_det_}>{product.fan_sweep_diameter}</div>
                        <div className={classes.prod_det_}>{product.height}</div>
                        <div className={classes.prod_det_}>{product.weight}</div>
                    </div>
                    {/* <div className={classes.prod_det}>
                        <div className={classes.prod_det_}>{product.series_info}</div>
                    </div> */}
                    <div className={classes.prod_det}>
                        <div className={classes.prod_det_}>{product.rep_name}</div>
                        <div className={classes.prod_det_}>{product.rep_phone}</div>
                        <div className={classes.prod_det_}>{product.rep_email}</div>
                        <div className={classes.prod_det_}>{product.rep_web}</div>
                    </div>
                    <div className={classes.prod_det1}>
                        <div className={classes.prod_det_}>{product.department}</div>
                        <div className={classes.prod_det_}>{product.dep_phone}</div>
                        <div className={classes.prod_det_}>{product.dep_email}</div>
                        <div className={classes.prod_det_}>{product.dep_web}</div>
                    </div>
                </div>
                );
                }
            })}
        </div>
    </div>
    );
}

export default comparsion;