import React, { useState, Component } from 'react';
import classes from './filterPanel.module.css';
import CaretRight from 'react-icons/lib/fa/caret-right';
import Dash from '../../images/dash.png';
import DoubleSlider from '../../components/UI/Slider/slider';

class filterPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_type: 'Commercial', product_application: '', product_mountLoc: '', product_accessories: '',
            advSearch: "none",
            highAir: 10000, lowAir: 2000, highPower: 96.52, lowPower: 1, highSound: 80, lowSound: 20, highSweep: 96, lowSweep: 18, highHeight: 96, lowHeight: 5, highFirm: 10, lowFirm: 0, highGlobal: 1492, lowGlobal: 0,
            lowYear:1800,highYear:2019,
            brandOp:"",
        }
    }
    handleOptionChange (changeEvent) {
        this.setState({[changeEvent.target.name]: changeEvent.target.value}, ()=>this.props.getFilters(this.state));
        // this.props.getFilters(this.state);
    }
    handleOption(e){
        this.setState({[e.target.name]: e.target.value});
        this.props.getFilters(this.state);
    }
    handleInput(e){this.setState({[e.target.name]: e.target.value}, ()=>this.props.getFilters(this.state))}
    handleChangeAir(val) { this.setState({ lowAir: val[0], highAir: val[1] }, ()=>this.props.getFilters(this.state))}
    handleChangePower(val) { this.setState({ lowPower: val[0], highPower: val[1] }, ()=>this.props.getFilters(this.state))}
    handleChangeSound(val) { this.setState({ lowSound: val[0], highSound: val[1] }, ()=>this.props.getFilters(this.state))}
    handleChangeSweep(val) { this.setState({ lowSweep: val[0], highSweep: val[1] }, ()=>this.props.getFilters(this.state))}
    handleChangeHeight(val) { this.setState({ lowHeight: val[0], highHeight: val[1] }, ()=>this.props.getFilters(this.state))}
    handleChangeFirm(val) { this.setState({ lowFirm: val[0], highFirm: val[1] }, ()=>this.props.getFilters(this.state))}
    handleChangeGlobal(val) { this.setState({ lowGlobal: val[0], highGlobal: val[1] }, ()=>this.props.getFilters(this.state))}

    show_filter(id,icon) {
        let t = document.getElementById(id).style.display;
        if (t === "none") {
            document.getElementById(id).style.display = "block";
            document.getElementById(icon).style.transform = "rotate(90deg)";
        }
        else {
            document.getElementById(id).style.display = "none";
            document.getElementById(icon).style.transform = "rotate(0deg)";
        }
    }

    advancedSearch(){
        if(this.state.advSearch === "none"){
            this.setState({advSearch: "block"});
            this.props.getData("block");
        }
        else{
            this.setState({advSearch: "none"});
            this.props.getData("none");
        }
    }

    render() {
        return (
            <div>
                <div className={classes.search}>
                    <span className={classes.search_span}>Search: </span>
                    <button className={classes.buttons} onClick={(e)=>this.advancedSearch(e)}>Save</button>
                    <button className={classes.buttons}>Clear</button>
                </div>
                <div className={classes.header}>
                    <span className={classes.header_spanProduct}>Product</span>
                    <span className={classes.header_spanProject}>Project</span>
                </div>
                <div className={classes.showFilter} >
                    <div className={classes.product_type} onClick={() => this.show_filter("prod_type","prod_typeIcon")}>
                        <span >Product Type <i id="prod_typeIcon" className={classes.CaretRight_techSpec}><CaretRight /></i></span>
                    </div>
                    <div id="prod_type" className={classes.product_type_radioMain}>
                        <div className={classes.product_type_radio}>
                            <p className={classes.filter_title}>Use type</p>
                            <p className={classes.filter_button}><input type="radio" name="product_type" value="Commercial" onChange={(e)=>this.handleOptionChange(e)}/> Commercial</p>
                            <p className={classes.filter_button}><input type="radio" name="product_type" value="Industrial" onChange={(e)=>this.handleOptionChange(e)}/> Industrial</p>
                            <p className={classes.filter_button}><input type="radio" name="product_type" value="Residential" onChange={(e)=>this.handleOptionChange(e)}/> Residential</p>
                        </div>
                        <div className={classes.product_type_radio}>
                            <p className={classes.filter_title}>Application</p>
                            <p className={classes.filter_button}><input type="radio" name="product_application" value="Indoor" onChange={(e)=>this.handleOptionChange(e)}/> Indoor</p>
                            <p className={classes.filter_button}><input type="radio" name="product_application" value="Outdoor" onChange={(e)=>this.handleOptionChange(e)}/> Outdoor</p>
                        </div>
                        <div className={classes.product_type_radio}>
                            <p className={classes.filter_title}>Mounting Location</p>
                            <p className={classes.filter_button}><input type="radio" name="product_mountLoc" value="Roof" onChange={(e)=>this.handleOptionChange(e)}/> Roof</p>
                            <p className={classes.filter_button}><input type="radio" name="product_mountLoc" value="Wall" onChange={(e)=>this.handleOptionChange(e)}/> Wall</p>
                            <p className={classes.filter_button}><input type="radio" name="product_mountLoc" value="Free_stand" onChange={(e)=>this.handleOptionChange(e)}/> Free standing</p>
                        </div>
                        <div className={classes.product_type_radio}>
                            <p className={classes.filter_title}>Accessories</p>
                            <p className={classes.filter_button}><input type="radio" name="product_accessories" value="With light" onChange={(e)=>this.handleOptionChange(e)}/> With light</p>
                            <p className={classes.filter_button}><input type="radio" name="product_accessories" value="Without light" onChange={(e)=>this.handleOptionChange(e)}/> Without light</p>
                        </div></div>
                </div>
                <div>
                    <p className={classes.model_year}>Model year:
                <span className={classes.model_year_wrap}>
                            <input type="number" className={classes.model_year_input} name="lowYear" value={this.state.lowYear} onChange={(e)=>this.handleInput(e)}></input>
                            <img src={Dash} className={classes.dash} />
                            <input type="number" className={classes.model_year_input} name="highYear" value={this.state.highYear} onChange={(e)=>this.handleInput(e)}></input>
                        </span></p>
                </div>
                <div className={classes.showFilter}>
                    <div className={classes.product_type} onClick={() => this.show_filter("tech_spec","tech_specIcon")} >
                        <span>Technical Specifications <i id="tech_specIcon" className={classes.CaretRight_techSpec}><CaretRight /></i></span>
                    </div>
                    <div id="tech_spec" className={classes.product_type_radioMain}>
                        <div className={classes.product_type_radio}>
                            <span className={classes.slider_title}>Airflow (CFM)</span>
                            <div className={classes.slider_input1}>
                                <input type="number" className={classes.tech_spec_input} value={this.state.lowAir}></input>
                                <DoubleSlider limits={[2000, 10000]} values={[this.state.lowAir, this.state.highAir]} formatFunc={(v) => { return Math.round(v); }} onChange={(values) => { this.handleChangeAir(values) }} />
                                <input type="number" className={classes.tech_spec_input} value={this.state.highAir}></input>
                            </div></div>
                        <div className={classes.product_type_radio}>
                            <span className={classes.slider_title}>Max power (W)</span>
                            <div id="test" className={classes.slider_input1}>
                                <input type="number" className={classes.tech_spec_input} value={this.state.lowPower}></input>
                                <DoubleSlider limits={[1, 96.52]} values={[this.state.lowPower, this.state.highPower]} onChange={(values) => { this.handleChangePower(values) }} />
                                <input type="number" className={classes.tech_spec_input} value={this.state.highPower}></input>
                            </div></div>
                        <div className={classes.product_type_radio}>
                            <span className={classes.slider_title}>Sound at max speed (dBA)</span>
                            <div className={classes.slider_input1}>
                                <input type="number" className={classes.tech_spec_input} value={this.state.lowSound}></input>
                                <DoubleSlider limits={[20, 80]} values={[this.state.lowSound, this.state.highSound]} formatFunc={(v) => { return Math.round(v); }} onChange={(values) => { this.handleChangeSound(values) }} />
                                <input type="number" className={classes.tech_spec_input} value={this.state.highSound}></input>
                            </div></div>
                        <div className={classes.product_type_radio}>
                            <span className={classes.slider_title}>Fan sweep diameter (in)</span>
                            <div className={classes.slider_input1}>
                                <input type="number" className={classes.tech_spec_input} value={this.state.lowSweep}></input>
                                <DoubleSlider limits={[18, 96]} values={[this.state.lowSweep, this.state.highSweep]} formatFunc={(v) => { return Math.round(v); }} onChange={(values) => { this.handleChangeSweep(values) }} />
                                <input type="number" className={classes.tech_spec_input} value={this.state.highSweep}></input>
                            </div></div>
                        <div className={classes.product_type_radio}>
                            <span className={classes.slider_title}>Height (in)</span>
                            <div className={classes.slider_input1}>
                                <input type="number" className={classes.tech_spec_input} value={this.state.lowHeight}></input>
                                <DoubleSlider limits={[5, 96]} values={[this.state.lowHeight, this.state.highHeight]} formatFunc={(v) => { return Math.round(v); }} onChange={(values) => { this.handleChangeHeight(values) }} />
                                <input type="number" className={classes.tech_spec_input} value={this.state.highHeight}></input>
                            </div></div>
                        </div></div>
                <div className={classes.showFilter}>
                    <div className={classes.product_type} onClick={() => this.show_filter("brand","brandIcon")}>
                        <span>Brand<i id="brandIcon"  className={classes.CaretRight_techSpec}><CaretRight /></i></span>
                    </div>
                        <div id="brand" className={classes.product_type_radioMain}>
                            <span className={classes.slider_title}>Brand(s)</span>
                            <select name="brandOp" className={classes.slider_input} type='itemId' placeholder='itemId' onChange={(e)=>this.handleOption(e)}>
                                <option label=""></option>
                                <option label="Big Ass">Big Ass</option>
                                <option label="Emerson">Emerson</option>
                                <option label="Westinghouse">Westinghouse</option>
                                <option label="Minka">Minka</option>
                            </select>  </div></div>
                <div className={classes.showFilter}>
                    <div className={classes.product_type} onClick={() => this.show_filter("past_sel","past_selIcon")}>
                        <span>Past Selections<i id="past_selIcon" className={classes.CaretRight_techSpec}><CaretRight /></i></span>
                    </div>
                    <div id="past_sel" className={classes.product_type_radioMain}>
                        <div className={classes.product_type_radio}>
                            <span className={classes.slider_title}>Firm</span>
                            <div className={classes.slider_input1}>
                                <input type="number" className={classes.tech_spec_input} value={this.state.lowFirm}></input>
                                <DoubleSlider limits={[0, 10]} values={[this.state.lowFirm, this.state.highFirm]} formatFunc={(v) => { return Math.round(v); }} onChange={(values) => { this.handleChangeFirm(values) }} />                               
                                <input type="number" className={classes.tech_spec_input} value={this.state.highFirm}></input>
                        </div></div>
                        <div className={classes.product_type_radio}>
                            <span className={classes.slider_title}>Glocal</span>
                            <div className={classes.slider_input1}>
                                <input type="number" className={classes.tech_spec_input} value={this.state.lowGlobal}></input>
                                <DoubleSlider limits={[0, 1492]} values={[this.state.lowGlobal, this.state.highGlobal]} formatFunc={(v) => { return Math.round(v); }} onChange={(values) => { this.handleChangeGlobal(values) }} />
                                <input type="number" className={classes.tech_spec_input} value={this.state.highGlobal}></input>
                        </div></div>
                    </div>
                    
                </div>
                <div className={classes.showFilter}>
                    <div className={classes.product_type} onClick={() => this.show_filter("cert","certIcon")}>
                        <span>Certificates <i id="certIcon" className={classes.CaretRight_techSpec}><CaretRight /></i></span>
                    </div>
                    <div id="cert" className={classes.product_type_radioMain}>
                    <div className={classes.product_type_radio}>
                        <span className={classes.slider_title}>Certificates</span>
                        <select className={classes.slider_input} type='itemId' placeholder='itemId'>
                            <option label="Big Ass">Big Ass</option>
                            <option label="Emerson">Emerson</option>
                            <option label="Westinghouse">Westinghouse</option>
                            <option label="Minka">Minka</option>
                        </select></div></div></div>
            </div>
        )
    }
}

export default filterPanel;