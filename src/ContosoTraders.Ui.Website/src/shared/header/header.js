import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { NamespacesConsumer } from 'react-i18next';

import { ConfigService } from '../../services';
import AuthB2CService from '../../services/authB2CService';
import { withRouter } from "react-router-dom";

// import LoginContainer from './components/loginContainer';
// import LoginComponent from './components/loginComponent';
// import UserPortrait from './components/userPortrait';

import { ReactComponent as Close } from '../../assets/images/icon-close.svg';
// import { ReactComponent as Hamburger } from '../../assets/images/icon-menu.svg';
// import { ReactComponent as Cart } from '../../assets/images/icon-cart.svg';

import { clickAction, submitAction } from "../../actions/actions";
import { Categories } from '..';

// const Login = LoginContainer(LoginComponent);

class Header extends Component {
    constructor() {
        super();
        this.authService = new AuthB2CService();
        this.state = {
            isopened: false,
            ismodalopened: false,
            profile: {},
            UseB2C: null
        };
        this.loginModalRef = React.createRef();
    }

    async componentDidMount() {
        this.loadSettings();

        if (this.props.userInfo.token) {
            // const profileData = await UserService.getProfileData(this.props.userInfo.token);
            // this.setState({ ...profileData });
        }

        const setComponentVisibility = this.setComponentVisibility.bind(this);
        setComponentVisibility(document.documentElement.clientWidth);
        window.addEventListener('resize', function () {
            setComponentVisibility(document.documentElement.clientWidth);
        });
    }

    loadSettings = async () => {
        await ConfigService.loadSettings();
        const UseB2C = ConfigService._UseB2C;
        this.setState({ UseB2C })
    }

    setComponentVisibility(width) {
        if (width > 1280) {
            this.setState({ isopened: false });
        }
    }

    toggleClass = () => {
        this.setState(prevState => ({
            isopened: !prevState.isopened,
        }));
    };

    toggleModalClass = () => {
        if (!document.body.classList.contains("is-blocked")) {
            document.body.classList.add("is-blocked");
        } else {
            document.body.classList.remove("is-blocked");
        }

        this.setState(prevState => ({
            ismodalopened: !prevState.ismodalopened
        }));
    };

    onClickClose = () => {
        this.toggleModalClass();
    }

    onClickLogout = () => {
        localStorage.clear();

        if (this.props.userInfo.isB2c) {
            this.authService.logout();
        }

        this.props.clickAction();
        this.props.history.push('/');
    }

    onClickLogIn = async() => {
        let user = await this.authService.login();
        if(user)
        {
            user['loggedIn'] = true;
            user['isB2c'] = true;
            user['token'] = sessionStorage.getItem('msal.idtoken');
            localStorage.setItem('state',JSON.stringify(user))
            this.props.submitAction(user);
        }
    }

    render() {
        // const { profile } = this.state;
        // const { loggedIn } = this.props.userInfo;
        return (
            <NamespacesConsumer>
                {t => (
                    <header className="header">
                        <Categories />
                        <nav className={this.state.isopened ? 'main-nav is-opened' : 'main-nav'}>
                            <Link className={window.location.pathname === '/list/all-products' ? "main-nav__item_active" : "main-nav__item"} to="/list/all-products">
                                All Products
                            </Link>
                            {/* <Link className={window.location.pathname === '/new-arrivals' ? "main-nav__item_active" : "main-nav__item"} to="/new-arrivals" >
                                {t('shared.header.newArrivals')}
                            </Link> */}
                            <Link className={window.location.pathname === '/list/laptops' ? "main-nav__item_active" : "main-nav__item"} to="/list/laptops">
                                Laptops
                            </Link>
                            <Link className={window.location.pathname === '/list/controllers' ? "main-nav__item_active" : "main-nav__item"} to="/list/controllers">
                                Controllers
                            </Link>
                            <Link className={window.location.pathname === '/list/desktops' ? "main-nav__item_active" : "main-nav__item"} to="/list/desktops">
                                Desktops
                            </Link>
                            <Link className={window.location.pathname === '/list/mobiles' ? "main-nav__item_active" : "main-nav__item"} to="/list/mobiles">
                                Mobiles
                            </Link>
                            <Link className={window.location.pathname === '/list/monitors' ? "main-nav__item_active" : "main-nav__item"} to="/list/monitors">
                                Monitors
                            </Link>
                            <div className="main-nav__actions">
                                <Link className="main-nav__item" to="/profile">
                                    {t('shared.header.profile')}
                                </Link>
                                <button className="u-empty main-nav__item">
                                    {t('shared.header.logout')}
                                </button>
                            </div>
                            <button className="u-empty btn-close" onClick={this.toggleClass}>
                                <Close />
                            </button>
                        </nav>
                        <nav className="secondary-nav">
                            {/* {loggedIn && <Link to="/profile"><UserPortrait {...profile} /></Link>} */}
                            {/* {loggedIn ? <div className="secondary-nav__login" onClick={this.onClickLogout}>{t('shared.header.logout')}</div>
                                : <div className="secondary-nav__login" onClick={this.onClickLogIn}>{t('shared.header.login')}</div>} */}
                            {/* {loggedIn && <Link className="secondary-nav__cart" to="/shopping-cart">
                                <Cart />
                                <div className="secondary-nav__cart-number">
                                    {this.props.quantity}
                                </div>
                            </Link>} */}
                            {/* <button className="u-empty" onClick={this.toggleClass}>
                                <Hamburger />
                            </button> */}
                        </nav>
                        {/* {this.state.ismodalopened ?
                            <Login UseB2C={this.state.UseB2C} toggleModalClass={this.state.ismodalopened} onClickClose={this.onClickClose} />
                            : null} */}
                    </header>
                )}
            </NamespacesConsumer>
        );
    }
}

const mapStateToProps = state => state.login;

export default withRouter(connect(mapStateToProps, { clickAction, submitAction })(Header));
