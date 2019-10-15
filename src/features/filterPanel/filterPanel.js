import React, { useState,  Component } from 'react';
import classes from './filterPanel.module.css';
import CaretRight from 'react-icons/lib/fa/caret-right';
import Dash from '../../images/dash.png';
import { Slider1, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import InputRange from 'react-input-range';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

let inData;
let update = (data) => {
    inData = data;
}

function AirbnbThumbComponent(props) {
    console.log(props["aria-valuenow"]);
    // inData = props["aria-valuenow"];
    // handleChange();
    return (
        <span {...props}></span>
    );
}
const AirbnbSlider = withStyles({
    root: {
    color: 'rgb(166,166,166)',
    height: 3,
    //   padding: '1px 0',
    //   width: 60
    marginRight: 15
    },
    thumb: {
    height: 15,
    width: 15,
    backgroundColor: 'rgb(166,166,166)',
    border: '1px solid currentColor',
    marginTop: -6,
    marginLeft: 0,
    boxShadow: '#ebebeb 0px 2px 2px',
    '&:focus,&:hover,&$active': {
        boxShadow: '#ccc 0px 2px 3px 1px',
    },
    '& .bar': {
        // display: inline-block !important;
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
    },
    },
    active: {},
    valueLabel: {
    left: 'calc(-50% + 4px)',
    },
    track: {
    height: 3,
    },
    rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
    },
})(Slider);  
function ValueLabelComponent (props) {
    const { children, open, value } = props;
    const popperRef = React.useRef(null);
    // console.log(this.state);
    React.useEffect(() => {
      if (popperRef.current) {
        popperRef.current.update();
      }
    });
  
    return (
      <Tooltip PopperProps={{popperRef,}} open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
}

class filterPanel extends Component{
   constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.state = {
      highAir: 10000,lowAir: 2000,highPower:96.52,lowPower:9.84,highSound:20,lowSound:80,highSweep:18,lowSweep:96,highHeight:10,lowHeight:100,highFirm:10,lowFirm:0,highGlobal:1492,lowGlobal:0
    }
  }
//   handleChange({ high, low }) {
//     this.setState(
//         {high: high, low: low,}
//     )
//   }
    
    render(){
    // const { high, low } = this.state;
    // const { handleChange } = this;
    return (
        <div>
            <div className={classes.search}>
                <span className={classes.search_span}>Search: </span>
                <button className={classes.buttons}>Save</button>
                <button className={classes.buttons}>Clear</button>
            </div>
            <div className={classes.header}>
                <span className={classes.header_spanProduct}>Product</span>
                <span className={classes.header_spanProject}>Project</span>
            </div>
            <div className={classes.showFilter}>
                <div className={classes.product_type}>
                    <span>Product Type <i className={classes.CaretRight_techSpec}><CaretRight/></i></span>                
                </div>
                <div className={classes.product_type_radio}>
                    <p className={classes.filter_title}>Use type</p>
                    <p className={classes.filter_button}><input type="radio" name="product_type" value="commercial"/> Commercial</p>
                    <p className={classes.filter_button}><input type="radio" name="product_type" value="indeustrial"/> Industrial</p>
                    <p className={classes.filter_button}><input type="radio" name="product_type" value="residential"/> Residential</p>
                </div>
                <div className={classes.product_type_radio}>
                    <p className={classes.filter_title}>Application</p>
                    <p className={classes.filter_button}><input type="radio" name="product_application" value="indoor"/> Indoor</p>
                    <p className={classes.filter_button}><input type="radio" name="product_application" value="outdoor"/> Outdoor</p>
                </div>
                <div className={classes.product_type_radio}>
                    <p className={classes.filter_title}>Mounting Location</p>
                    <p className={classes.filter_button}><input type="radio" name="product_mountLoc" value="roof"/> Roof</p>
                    <p className={classes.filter_button}><input type="radio" name="product_mountLoc" value="wall"/> Wall</p>
                    <p className={classes.filter_button}><input type="radio" name="product_mountLoc" value="free_stand"/> Free standing</p>
                </div>
                <div className={classes.product_type_radio}>
                    <p className={classes.filter_title}>Accessories</p>
                    <p className={classes.filter_button}><input type="radio" name="product_accessories" value="withLight"/> With light</p>
                    <p className={classes.filter_button}><input type="radio" name="product_accessories" value="withoutLight"/> Without light</p>
                </div>
            </div>
            <div>
                <p className={classes.model_year}>Model year: 
                <span className={classes.model_year_wrap}>
                    <input type="number" className={classes.model_year_input}></input>
                    <img src={Dash} className={classes.dash}/>
                    <input type="number" className={classes.model_year_input}></input>
                </span></p>
            </div>
            <div className={classes.showFilter}>
                <div className={classes.product_type}>
                    <span>Technical Specifications <i className={classes.CaretRight_techSpec}><CaretRight/></i></span>                
                </div>
                <div className={classes.product_type_radio}>
                    <span className={classes.slider_title}>Airflow (CFM)</span>
                <p className={classes.slider_input}>
                    <input type="number" className={classes.tech_spec_input} value={this.state.lowAir}></input>
                    <AirbnbSlider ThumbComponent={AirbnbThumbComponent} ValueLabelComponent={ValueLabelComponent} min='0' max="10000" defaultValue={[0, 10000]}/>
                    <input type="number" className={classes.tech_spec_input} value={this.state.highAir}></input>
                </p></div>
                <div className={classes.product_type_radio}>
                    <span className={classes.slider_title}>Max power (W)</span>
                <p className={classes.slider_input}>
                    <input type="number" className={classes.tech_spec_input} value={this.state.lowPower}></input>
                    <AirbnbSlider ThumbComponent={AirbnbThumbComponent} ValueLabelComponent={ValueLabelComponent} min='0' max="96.52" defaultValue={[0, 96.52]}/>
                    <input type="number" className={classes.tech_spec_input} value={this.state.highPower}></input>
                </p></div>
                <div className={classes.product_type_radio}>
                    <span className={classes.slider_title}>Sound at max speed (dBA)</span>
                <p className={classes.slider_input}>
                    <input type="number" className={classes.tech_spec_input} value={this.state.lowSound}></input>
                    <AirbnbSlider ThumbComponent={AirbnbThumbComponent} ValueLabelComponent={ValueLabelComponent} min='0' max="80" defaultValue={[0, 80]}/>
                    <input type="number" className={classes.tech_spec_input} value={this.state.highSound}></input>
                </p></div>
                <div className={classes.product_type_radio}>
                    <span className={classes.slider_title}>Fan sweep diameter (in)</span>
                <p className={classes.slider_input}>
                    <input type="number" className={classes.tech_spec_input} value={this.state.lowSweep}></input>
                    <AirbnbSlider ThumbComponent={AirbnbThumbComponent} ValueLabelComponent={ValueLabelComponent} min='0' max="69" defaultValue={[0, 96]}/>
                    <input type="number" className={classes.tech_spec_input} value={this.state.highSweep}></input>
                </p></div>
                <div className={classes.product_type_radio}>
                    <span className={classes.slider_title}>Height (in)</span>
                <p className={classes.slider_input}>
                    <input type="number" className={classes.tech_spec_input} value={this.state.lowHeight}></input>
                    <AirbnbSlider ThumbComponent={AirbnbThumbComponent} ValueLabelComponent={ValueLabelComponent} min='0' max="100" defaultValue={[0, 100]}/>
                    <input type="number" className={classes.tech_spec_input} value={this.state.highHeight}></input>
                </p></div></div>
            <div className={classes.showFilter}>
                <div className={classes.product_type}>
                    <span>Brand<i className={classes.CaretRight_techSpec}><CaretRight/></i></span> 
                    <div className={classes.product_type_radio}>
                    <span className={classes.slider_title}>Brand(s)</span>
                    <select className={classes.slider_input} type='itemId' placeholder='itemId'>   
                        <option label="Big Ass">Big Ass</option>
                        <option label="Emerson">Emerson</option>
                        <option label="Westinghouse">Westinghouse</option>
                        <option label="Minka">Minka</option>
                    </select>  </div></div></div>
            <div className={classes.showFilter}>
                <div className={classes.product_type}>
                    <span>Past Selections<i className={classes.CaretRight_techSpec}><CaretRight/></i></span> 
                    <div className={classes.product_type_radio}>
                    <span className={classes.slider_title}>Firm</span>
                <p className={classes.slider_input}>
                    <input type="number" className={classes.tech_spec_input} value={this.state.lowFirm}></input>
                    <AirbnbSlider ThumbComponent={AirbnbThumbComponent} ValueLabelComponent={ValueLabelComponent} min='0' max="10" defaultValue={[0, 10]}/>
                    <input type="number" className={classes.tech_spec_input} value={this.state.highFirm}></input>
                </p></div>
                <div className={classes.product_type_radio}>
                    <span className={classes.slider_title}>Glocal</span>
                <p className={classes.slider_input}>
                    <input type="number" className={classes.tech_spec_input} value={this.state.lowGlobal}></input>
                    <AirbnbSlider ThumbComponent={AirbnbThumbComponent} ValueLabelComponent={ValueLabelComponent} min='0' max="1492" defaultValue={[0, 1492]}/>
                    <input type="number" className={classes.tech_spec_input} value={this.state.highGlobal}></input>
                </p></div></div></div>
            <div className={classes.showFilter}>
            <div className={classes.product_type}>
                <span>Certificates <i className={classes.CaretRight_techSpec}><CaretRight/></i></span>                
            </div>
            <div className={classes.product_type_radio}>
                <span className={classes.slider_title}>Certificates</span>
                <select className={classes.slider_input} type='itemId' placeholder='itemId'>   
                    <option label="Big Ass">Big Ass</option>
                    <option label="Emerson">Emerson</option>
                    <option label="Westinghouse">Westinghouse</option>
                    <option label="Minka">Minka</option>
                </select></div></div>
        </div>
    )
    }
}

export default filterPanel;