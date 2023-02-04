import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
// import { CartService } from "./services";
// import Meeting from './pages/home/components/videoCall/Meeting';

import { Header, Footer, Appbar, HeaderMessage } from "./shared";
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


  function App(props) {
    const location = useLocation()
    const quantity = null;

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
      <div className={`App ${props.theme ? 'dark' : 'light' }`}>
        <Fragment>
          <div className="mainHeader">
            <HeaderMessage type="warning" icon={warningIcon} message="This Is A Demo Store For Testing Purposes — No Orders Shall Be Fulfilled."/>
            <Appbar quantity={quantity} />
            {location.pathname === '/' || location.pathname === '/new-arrivals' ?
              <Header quantity={quantity} />
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
            <Route path="/cart" element={<Cart/>}/>
            </>:null}
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

export default connect(mapStateToProps)(App);
