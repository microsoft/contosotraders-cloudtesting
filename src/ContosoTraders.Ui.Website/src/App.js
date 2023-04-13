import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
// import { CartService } from "./services";
// import Meeting from './pages/home/components/videoCall/Meeting';

import Header from "./components/header/header";
import HeaderMessage from "./components/header/headerMessage";
import Appbar from "./components/header/appbar";
import Footer from "./components/footer/footer";
import {
  Home,
  List,
  // MyCoupons,
  Detail,
  SuggestedProductsList,
  Profile,
  // ShoppingCart,
  Arrivals,
  RefundPolicy,
  TermsOfService,
  AboutUs,
  ErrorPage,
  Cart,
} from "./pages";

// import "./i18n";
import "./main.scss";
import warningIcon from './assets/images/original/Contoso_Assets/Icons/information_icon.svg'
import { useLocation } from "react-router-dom";
import { CartService } from "./services";
import { getCartQuantity } from "./actions/actions";


  function App(props) {
    const location = useLocation()
    // const [shoppingCart, setShoppingCart] = useState([])
    const [quantity, setQuantity] = useState(0)

    const getQuantity = useCallback(async() => {
      let quantity = 0;
      //Show cart using API
      if (props.userInfo.token) {
        const shoppingcart = await CartService.getShoppingCart(
          props.userInfo.token
        );
        // if (shoppingcart) {
        //   setShoppingCart({ shoppingcart });
        // }
        quantity = shoppingcart.length;
      }else{
        let cart = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items')) : [];
        quantity = cart.length;
      }
      setQuantity(quantity);
    },[props])
    
    useEffect(() => {
      props.getCartQuantity(quantity)
    }, [quantity, props]);

    React.useEffect(() => {
      getQuantity()
    }, [getQuantity]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
      <div className={`App ${props.theme ? 'dark' : 'light' }`}>
        <Fragment>
          <div className="mainHeader">
            <HeaderMessage type="warning" icon={warningIcon} message="This Is A Demo Store For Testing Purposes — No Orders Shall Be Fulfilled."/>
            <Appbar />
            {location.pathname === '/' || location.pathname === '/new-arrivals' ?
              <Header/>
              :
              <div id="box"></div>}
          </div>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/new-arrivals" element={<Arrivals/>} />
            {/* <Route exact path="/meeting" element={Meeting} /> */}
            <Route exact path="/list" element={<List/>} />
            <Route exact path="/list/:code" element={<List/>} />
            <Route
              path="/suggested-products-list"
              element={<SuggestedProductsList/>}
            />
            <Route
              path="/product/detail/:productId"
              element={<Detail/>}
            />
            <Route path="/refund-policy" element={<RefundPolicy/>} />
            <Route path="/terms-of-service" element={<TermsOfService/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            {/* <PrivateRoute path="/coupons" element={MyCoupons} /> */}
            {props.userInfo.loggedIn === true ?
            <>
            <Route path="/profile/:page" element={<Profile/>} />
            </>:null}
            <Route path="/cart" element={<Cart/>}/>
            {/* <PrivateRoute
              path="/shopping-cart"
              element={ShoppingCart}
              ShoppingCart={this.ShoppingCart}
              quantity={this.state.quantity}
            /> */}
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
          <Footer />
        </Fragment>
      </div>
    );
  }
// }

const mapStateToProps = (state) => { 
  return { 
    userInfo : state.login.userInfo,
    theme :  state.login.theme
  }
};
const mapDispatchToProps = (dispatch) => ({
  getCartQuantity: (value) => dispatch(getCartQuantity(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
