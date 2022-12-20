import React, { Component, Fragment } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { CartService } from "./services";
import Meeting from './pages/home/components/videoCall/Meeting';

import { Header, Footer, Appbar, HeaderMessage } from "./shared";
import {
  Home,
  List,
  MyCoupons,
  Detail,
  SuggestedProductsList,
  Profile,
  ShoppingCart,
  Arrivals,
  RefundPolicy,
  TermsOfService,
  AboutUs,
  ErrorPage,
  Cart,
} from "./pages";

import "./i18n";
import "./main.scss";
import warningIcon from './assets/images/original/Contoso_Assets/Icons/information_icon.svg'

class App extends Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
      quantity: null,
    };
  }

  async componentDidMount() {
    if (this.props.userInfo.token) {
      const shoppingCart = await CartService.getShoppingCart(
        this.props.userInfo.token
      );
      if (shoppingCart) {
        this.setState({ shoppingCart });
      }
    }

    if (this.state.shoppingCart != null) {
      const quantity = this.state.shoppingCart.reduce(
        (oldQty, { qty }) => oldQty + qty,
        0
      );
      this.setState({ quantity });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.location.pathname !== prevProps.location.pathname){
      window.scrollTo(0, 0);
    }
  }

  ShoppingCart = (quantity) => {
    this.setState({ quantity });
  };

  sumProductInState = () => {
    this.setState((prevState) => {
      return { quantity: prevState.quantity + 1 };
    });
  };

  render() {
    const { quantity } = this.state;

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.userInfo.loggedIn === true ? (
            <Component {...props} {...rest} />
          ) : (
            this.props.history.push('/')
          )
        }
      />
    );

    return (
      <div className="App">
        <Fragment>
          <div className="mainHeader">
            <HeaderMessage type="warning" icon={warningIcon} message="This Is A Demo Store For Testing Purposes — No Orders Shall Be Fulfilled."/>
            <Appbar quantity={quantity} />
            {this.props.history.location.pathname === '/' || this.props.history.location.pathname === '/new-arrivals' ?
              <Header quantity={quantity} />
              :
              <div id="box"></div>}
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new-arrivals" component={Arrivals} />
            <Route exact path="/meeting" component={Meeting} />
            <Route exact path="/list" component={List} />
            <Route exact path="/list/:code" component={List} />
            <Route
              path="/suggested-products-list"
              component={SuggestedProductsList}
            />
            <Route
              path="/product/detail/:productId"
              render={(props) => (
                <Detail sumProductInState={this.sumProductInState} {...props} />
              )}
            />
            <Route path="/refund-policy" component={RefundPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/about-us" component={AboutUs} />
            <PrivateRoute path="/coupons" component={MyCoupons} />
            <PrivateRoute path="/profile/:page" component={Profile} />
            <PrivateRoute path="/cart" component={Cart}/>
            <PrivateRoute
              path="/shopping-cart"
              component={ShoppingCart}
              ShoppingCart={this.ShoppingCart}
              quantity={this.state.quantity}
            />
            <Route path="*" component={ErrorPage} />
          </Switch>
          <Footer />
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.login;

export default withRouter(connect(mapStateToProps)(App));
