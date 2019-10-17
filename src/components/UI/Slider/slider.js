import React, {PropTypes} from "react";
import PropTypes1 from 'prop-types';
import styles from "./slider.module.css";

export default class ReactDualRangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  }
  getStateFromProps(props) {
    let limits = props.limits.slice().sort(this.sortValues);
    let values = props.values.slice().sort(this.sortValues);
    let size = Math.abs(limits[1]-limits[0]);
    values[0] = values[0]<limits[0] ? limits[0] : values[0]>limits[1] ? limits[1] : values[0];
    values[1] = values[1]>limits[1] ? limits[1] : values[1]<limits[0] ? limits[0] : values[1];
    return {
      limits: limits,
      size: size,
      values:values,
      lock: props.lock,
      reverse: props.reverse,
      isSelDown: false,
      indexSelDown: 0,
      moveStartValue: 0,
      moveCurrentValue: 0,
      moveStartX: 0,
      moveCurrentX: 0,
      boxWidth:0, 
      formatFunc: props.formatFunc, 
      onChange: props.onChange,
      rangeColor: props.rangeColor
    }
  }
  startToMove(event, index) {
    const clientX = event.touches && event.touches.length>0 ? event.touches[0].clientX : event.clientX;
    this.setState({
      isSelDown:true,
      indexSelDown: index,
      moveStartValue: this.state.values[index],
      moveCurrentValue: this.state.values[index],
      moveStartX: clientX,
      moveCurrentX: clientX,
      boxWidth:event.currentTarget.parentElement.offsetWidth
    });
    event.stopPropagation();
  }
  onMouseDown0(event) {
    this.startToMove(event, 0);
  }
  onMouseDown1(event) {
    this.startToMove(event, 1);
  }
  onTouchStart0(event) {
    this.startToMove(event, 0);
  }
  onTouchStart1(event) {
    this.startToMove(event, 1);
  }
  onTouchMove(event) {    
    this.move(event);
  }
  onTouchEnd(event) {    
    this.stopToMove(event);
  }
  onMouseMove(event) {    
    this.move(event);
  }

  move(event) {    
    if(this.state.isSelDown) {
      const clientX = event.touches && event.touches.length>0 ? event.touches[0].clientX : event.clientX;
      this.setState({
        moveCurrentX: clientX,
        moveCurrentValue: this.getMoveCurrentValue (clientX)
      });
    }
  }
  getMoveCurrentValue (moveCurrentX) {
    let moveBoxProportion = (moveCurrentX-this.state.moveStartX)/this.state.boxWidth;
    if(this.state.reverse) {
      moveBoxProportion = moveBoxProportion*-1;
    }
    const moveIntoLimit = this.state.size * moveBoxProportion;
    let moveCurrentValue = this.state.moveStartValue+moveIntoLimit;
    moveCurrentValue = moveCurrentValue<this.state.limits[0]?this.state.limits[0]:moveCurrentValue;
    moveCurrentValue = moveCurrentValue>this.state.limits[1]?this.state.limits[1]:moveCurrentValue;

    return moveCurrentValue;
  }
  formatOutput () {
    const values = this.getValues();
    return [this.state.formatFunc(values[0]), this.state.formatFunc(values[1])];
  }
  stopToMove(event) {
    if(this.state.isSelDown) {
      let values = this.getValues();
      this.setState({
        values: values,
        isSelDown: false
      });
      this.onChange();
    }
    event.stopPropagation();
  }
  onMouseLeave(event) {
    this.stopToMove(event);
  }
  onMouseUp(event) {
    this.stopToMove(event);
  }
  getLimits() {
    return this.state.limits.slice();
  }
  getDisplayLimits() {
    let limits = this.getLimits();
    if(this.state.reverse) {
      limits.reverse();
    }
    return [this.state.formatFunc(limits[0]), this.state.formatFunc(limits[1])];
  }
  getValues() {
    let values = this.state.values.slice();
    if(this.state.isSelDown) {
      values[this.state.indexSelDown] = this.state.moveCurrentValue;
    }
    return values;
  }
  getDisplayValues() {
    let values = this.formatOutput().sort(this.sortValues);
    values = this.state.reverse ? values.reverse(): values;
    return values;
  }
  getLeftPositions() {
    const values = this.getValues();
    const limits = this.getLimits();
    const size = this.state.size;
    const left = [values[0]-limits[0], values[1]-limits[0]];
    const leftPos = [left[0]/size*100, left[1]/size*100];
    if(this.state.reverse) {
      return [100-leftPos[0], 100-leftPos[1]];
    }
    return leftPos;
  }
  sortValues(a, b) { return a-b; }
  onChange() {
    this.state.onChange(this.formatOutput().sort(this.sortValues));
  }
  render() {

    const displayValues = this.getDisplayValues();

    const displayLimits = this.getDisplayLimits();

    const leftPos = this.getLeftPositions();

    let crossLinePos = leftPos.slice();
    crossLinePos.sort(this.sortValues);
    crossLinePos[1] = 100-crossLinePos[1];

    const styleCrossline = {
      left:crossLinePos[0]+'%',
      right:crossLinePos[1]+'%',
      backgroundColor:this.props.rangeColor
    };


    const styleSelector0 = {
      left:leftPos[0]+'%',
      display: this.props.lock[0] === false ? 'block' : 'none'
    };

    const styleSelector1 = {
      left:leftPos[1]+'%',
      display: this.props.lock[1] === false ? 'block' : 'none'
    };

    const styleValueRange = {
      backgroundColor:this.props.rangeColor
    };

    return (
      <div className={styles.component} 
        onMouseMove={this.onMouseMove.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}

        onTouchMove={this.onTouchMove.bind(this)}
        onTouchEnd={this.onTouchEnd.bind(this)}
        data-name='component'>

        <div className={styles.sliders}>
          <div className={styles.line}><div className={styles.crossLine} style={styleCrossline}></div></div>
          <div 
            className={[styles.selector, styles.selector0].join(' ')} 
            style={styleSelector0}
            onMouseDown={this.onMouseDown0.bind(this)}
            onTouchStart={this.onTouchStart0.bind(this)}
            >
            <div></div>
          </div>
          <div
            className={[styles.selector, styles.selector1].join(' ')} 
            style={styleSelector1}
            onMouseDown={this.onMouseDown1.bind(this)}
            onTouchStart={this.onTouchStart1.bind(this)}
            >
            <div></div>
          </div>
        </div>
        
        <div className={styles.values}>
          {/* <div className={styles.limit}>{displayLimits[0]}</div> */}
          {/* <div className={styles.value}>{displayValues[0]}</div> */}
          <div className={styles.valueRange} style={styleValueRange}></div>
          {/* <div className={styles.value}>{displayValues[1]}</div> */}
          {/* <div className={styles.limit}>{displayLimits[1]}</div> */}
        </div>

      </div>
    );
  }
}

ReactDualRangeSlider.displayName = "ReactDualRangeSlider";

ReactDualRangeSlider.propTypes = {
  limits: PropTypes1.arrayOf(PropTypes1.number),
  values: PropTypes1.arrayOf(PropTypes1.number),
  lock: PropTypes1.arrayOf(PropTypes1.bool),
  reverse: PropTypes1.bool,
  formatFunc : PropTypes1.func,
  onChange: PropTypes1.func,
  rangeColor: PropTypes1.string
};

ReactDualRangeSlider.defaultProps = {
  limits: [0, 100],
  values: [0, 100],
  lock: [false, false],
  reverse: false,
  formatFunc: function(value) {
    return value;
  },
  onChange: function() {},
  rangeColor:'rgb(134, 134, 134)'
};