import React, { Component } from 'react';

export default class QuantityPicker extends Component {

  constructor(props) {
    super(props);

    this.state = {value: this.props.min, disableDec: true, disableInc: false}
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    const plusState = this.state.value + 1;
    if (this.state.value < this.props.max){
      this.setState({value: plusState});
      this.setState({disable: false});
    }
    if (this.state.value === (this.props.max - 1)) {
      this.setState({disableInc: true});
    }
    if (this.state.value === this.props.min) {
      this.setState({disableDec: false});
    }
  }

  decrement() {
    const minusState = this.state.value - 1;
    if (this.state.value > this.props.min) {
      this.setState({value: minusState });
      if (this.state.value === this.props.min + 1) {
        this.setState({disableDec: true});
      }
    } else {
      this.setState({value: this.props.min});
    }
    if (this.state.value === this.props.max) {
      this.setState({disableInc: false});
    }
  }

  render() {
    const { disableDec, disableInc } = this.state;

    return (
        <span>
      <span className="quantity-picker">
        <button className={`${disableDec ? 'mod-disable ' : ''}quantity-modifier modifier-left`} onClick={this.decrement}>-</button>
        <input className="quantity-display" type="text" value={this.state.value} readOnly />
        <button className={`${disableInc ? 'mod-disable ' : ''}quantity-modifier modifier-right`} onClick={this.increment}>+</button>
      </span>
      </span>
    );
  }
}