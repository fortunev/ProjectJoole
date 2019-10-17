import React, { Component } from 'react';
import classes from './advancedSearch.module.css';
import Dash from '../../images/dash.png';

// function closeSearch(props){
//     document.getElementById("adv_search").style.display = "none";
//     props.getData("none");
// }
class AdvancedSearch extends Component{
constructor(props) {
    super(props);
    this.state = {
        product_type: '', product_application: '', product_mountLoc: '', product_accessories: '',
        highAir: 10000, lowAir: 2000, highPower: 96.52, lowPower: 1, highSound: 80, lowSound: 20, highSweep: 96, lowSweep: 18, highHeight: 96, lowHeight: 5, highFirm: 10, lowFirm: 0, highGlobal: 1492, lowGlobal: 0,
        lowYear:1800,highYear:2019,
        // lowAir:null,highAir:null,lowPower:null,highPower:null,lowSound:null,highSound:null,lowSweep:null,highSweep:null,lowHeight:null, highHeight:null,
        brandOp:"",wordsOp:"",
    }
}    
closeSearch(props){
    document.getElementById("adv_search").style.display = "none";
    props.getData("none");
}
handleOptionChange (changeEvent) {this.setState({[changeEvent.target.name]: changeEvent.target.value});}
handleInput(e){this.setState({[e.target.name]: e.target.value});}
handleOption(e){this.setState({[e.target.name]: e.target.value});}
handleSearch(e){
    this.props.getFilters(this.state);
    document.getElementById("adv_search").style.display = "none";
    this.props.getData("none");
}

render(){
if( document.getElementById("adv_search") ){
    // document.getElementById("adv_search").style.display = "block";
    document.getElementById("adv_search").style.display = this.props.showAdvSearch;
}
return (
    <div id="adv_search" className={classes.show_advancedSearch}>
        <div className={classes.title}>Find fans <span className={classes.exit} onClick={(e)=>this.closeSearch(this.props)}>X</span></div>
        <div className={classes.type}>Type</div>
            <div className={classes.filter_title}><p className={classes.use_type}>Use type</p>
                <span className={classes.filter_button}><input type="radio" name="product_type" value="Commercial" onChange={(e)=>this.handleOptionChange(e)}/> Commercial</span>
                <span className={classes.filter_button}><input type="radio" name="product_type" value="Industrial" onChange={(e)=>this.handleOptionChange(e)}/> Industrial</span>
                <span className={classes.filter_button}><input type="radio" name="product_type" value="Residential" onChange={(e)=>this.handleOptionChange(e)}/> Residential</span>
            </div>
            <div className={classes.filter_title}><span className={classes.use_type}>Application</span>
                <span className={classes.filter_button}><input type="radio" name="product_application" value="Indoor" onChange={(e)=>this.handleOptionChange(e)}/> Indoor</span>
                <span className={classes.filter_button}><input type="radio" name="product_application" value="Outdoor" onChange={(e)=>this.handleOptionChange(e)}/> Outdoor</span>
            </div>
            <div className={classes.filter_title}><span className={classes.use_type}>Mounting location</span>
                <span className={classes.filter_button}><input type="radio" name="product_mountLoc" value="Roof" onChange={(e)=>this.handleOptionChange(e)}/> Roof</span>
                <span className={classes.filter_button}><input type="radio" name="product_mountLoc" value="Wall" onChange={(e)=>this.handleOptionChange(e)}/> Wall</span>
                <span className={classes.filter_button}><input type="radio" name="product_mountLoc" value="Free stand" onChange={(e)=>this.handleOptionChange(e)}/> Free standing</span>
            </div>
            <div className={classes.filter_title}><span className={classes.use_type}>Accessories</span>
                <span className={classes.filter_button}><input type="radio" name="product_accessories" value="With light" onChange={(e)=>this.handleOptionChange(e)}/> With light</span>
                <span className={classes.filter_button}><input type="radio" name="product_accessories" value="Without light" onChange={(e)=>this.handleOptionChange(e)}/> Without light</span>
            </div>
            <div className={classes.filter_title}><span className={classes.inputTitle}>Model year:</span>
                <input type="number" className={classes.model_year_input} name="lowYear" value={this.state.lowYear} onChange={(e)=>this.handleInput(e)}></input>
                <img src={Dash} className={classes.dash} alt="dash" />
                <input type="number" className={classes.model_year_input} name="highYear" value={this.state.highYear} onChange={(e)=>this.handleInput(e)}></input>
            </div>
        <div className={classes.type}>Technical Details</div>
            <div className={classes.filter_title}><span className={classes.inputTitle}>Airflow (CFM)</span>
                <input type="number" className={classes.model_year_input} name="lowAir" value={this.state.lowAir} onChange={(e)=>this.handleInput(e)}></input>
                <img src={Dash} className={classes.dash} alt="dash"/>
                <input type="number" className={classes.model_year_input} name="highAir" min="1" max="9999" value={this.state.highAir} onChange={(e)=>this.handleInput(e)}></input>
            </div>
            <div className={classes.filter_title}><span className={classes.inputTitle}>Max power (W)</span>
                <input type="number" className={classes.model_year_input} name="lowPower" value={this.state.lowPower} onChange={(e)=>this.handleInput(e)}></input>
                <img src={Dash} className={classes.dash}  alt="dash"/>
                <input type="number" className={classes.model_year_input} name="highPower" value={this.state.highPower} onChange={(e)=>this.handleInput(e)}></input>
            </div>
            <div className={classes.filter_title}><span className={classes.inputTitle}>Sound at max speed (dBA)</span>
                <input type="number" className={classes.model_year_input} name="lowSound" value={this.state.lowSound} onChange={(e)=>this.handleInput(e)}></input>
                <img src={Dash} className={classes.dash}  alt="dash"/>
                <input type="number" className={classes.model_year_input} name="highSound" value={this.state.highSound} onChange={(e)=>this.handleInput(e)}></input>
            </div>
            <div className={classes.filter_title}><span className={classes.inputTitle}>Fan sweep diameter (in)</span>
                <input type="number" className={classes.model_year_input} name="lowSweep" value={this.state.lowSweep} onChange={(e)=>this.handleInput(e)}></input>
                <img src={Dash} className={classes.dash}  alt="dash"/>
                <input type="number" className={classes.model_year_input} name="highSweep" value={this.state.highSweep} onChange={(e)=>this.handleInput(e)}></input>
            </div>
            <div className={classes.filter_title}><span className={classes.inputTitle}>Height (in)</span>
                <input type="number" className={classes.model_year_input} name="lowHeight" value={this.state.lowHeight} onChange={(e)=>this.handleInput(e)}></input>
                <img src={Dash} className={classes.dash}  alt="dash"/>
                <input type="number" className={classes.model_year_input} name="highHeight" value={this.state.highHeight} onChange={(e)=>this.handleInput(e)}></input>
            </div>
        <div className={classes.type}>Brand</div>
            <div className={classes.filter_title}><span className={classes.inputTitle}>Select Brand(s)</span>
                <select name="brandOp" className={classes.select} type='itemId' onChange={(e)=>this.handleOption(e)}>
                    <option label=""></option>
                    <option label="Big Ass">Big Ass</option>
                    <option label="Emerson">Emerson</option>
                    <option label="Westinghouse">Westinghouse</option>
                    <option label="Minka">Minka</option>
                </select> 
            </div>
        <div className={classes.type}>Other</div>
            <div className={classes.filter_title}><span className={classes.inputTitle}>With the words</span>
                <select name="wordsOp" className={classes.select} type='itemId' onChange={(e)=>this.handleOption(e)}>
                    <option label=""></option>
                    <option label="Big Ass">Big Ass</option>
                    <option label="Emerson">Emerson</option>
                    <option label="Westinghouse">Westinghouse</option>
                    <option label="Minka">Minka</option>
                </select> 
                <button className={classes.searchButton} onClick={(e)=>this.handleSearch(e)}>Search</button>
            </div>
    </div>
)}
}

export default AdvancedSearch;