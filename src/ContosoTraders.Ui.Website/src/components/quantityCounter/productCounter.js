import React, { Component } from 'react';
import { CartService } from '../../services';
import './productCounter.scss'

export default class QuantityPicker extends Component {

  constructor(props) {
    super(props);

    this.state = { value: this.props.qty || this.props.min, disableDec: true, disableInc: false }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  //cartItemId

  componentDidMount() {
    if(this.state.value > this.props.min){
      this.setState({ disableDec: false });
    }
    if(this.state.value >= this.props.max){
      this.setState({ disableInc: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value && this.props?.page === 'cart') {
      this.updateProductQty()
    }
    if (this.props.setQty) {
      this.props.setQty(this.state.value)
    }
  }

  async updateProductQty() {
    if(this.props.loggedIn){
      let response = await CartService.updateQuantity(this.props.detailProduct, this.state.value, this.props.token)
      if (response) {
        this.props.getCartItems()
      }
    }else{
      let cart_items = JSON.parse(localStorage.getItem('cart_items'));
      let objIndex = cart_items.findIndex((obj => obj.productId === this.props.detailProduct.productId));
      cart_items[objIndex].quantity = this.state.value
      localStorage.setItem('cart_items',JSON.stringify(cart_items))
      this.props.getCartItems()
    }
  }

  increment() {
    const plusState = this.state.value + 1;
    if (this.state.value < this.props.max) {
      this.setState({ value: plusState });
      this.setState({ disable: false });
    }
    if (this.state.value === (this.props.max - 1)) {
      this.setState({ disableInc: true });
    }
    if (this.state.value === this.props.min) {
      this.setState({ disableDec: false });
    }
  }

  decrement() {
    const minusState = this.state.value - 1;
    if (this.state.value > this.props.min) {
      this.setState({ value: minusState });
      if (this.state.value === this.props.min + 1) {
        this.setState({ disableDec: true });
      }
    } else {
      this.setState({ value: this.props.min });
    }
    if (this.state.value === this.props.max) {
      this.setState({ disableInc: false });
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