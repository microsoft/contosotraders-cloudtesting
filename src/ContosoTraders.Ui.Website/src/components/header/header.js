import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { NamespacesConsumer } from 'react-i18next';

import { ConfigService } from '../../services';
import AuthB2CService from '../../services/authB2CService';
// import { withRouter } from "react-router-dom";

// import LoginContainer from './components/loginContainer';
// import LoginComponent from './components/loginComponent';
// import UserPortrait from './components/userPortrait';

import { ReactComponent as Close } from '../../assets/images/icon-close.svg';
// import { ReactComponent as Hamburger } from '../../assets/images/icon-menu.svg';
// import { ReactComponent as Cart } from '../../assets/images/icon-cart.svg';

import { clickAction, submitAction } from "../../actions/actions";
import Categories from '../dropdowns/categories';

// const Login = LoginContainer(LoginComponent);
import laptopsImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/laptop_icon.svg';
import controllersImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/controllers_icon.svg';
import desktopsImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/desktops_icon.svg';
import mobilesImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/mobiles_icon.svg';
import monitorImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/monitor_icon.svg';
import ProfileIcon from '../../assets/images/original/Contoso_Assets/Icons/profile_icon.svg'
import BagIcon from '../../assets/images/original/Contoso_Assets/Icons/cart_icon.svg'
import logout_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/logout_icon.svg";
import { Badge, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';

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

    onClickLogIn = async () => {
        let user = await this.authService.login();
        if (user) {
            user['loggedIn'] = true;
            user['isB2c'] = true;
            user['token'] = sessionStorage.getItem('msal.idtoken');
            localStorage.setItem('state', JSON.stringify(user))
            this.props.submitAction(user);
        }
    }


    render() {
        const categories = {
            title: 'All Categories',
            categorylist: [
                {
                    name: 'Laptops',
                    url: '/list/laptops',
                    img: laptopsImg
                },
                {
                    name: 'Controllers',
                    url: '/list/controllers',
                    img: controllersImg
                },
                {
                    name: 'Desktops',
                    url: '/list/desktops',
                    img: desktopsImg
                },
                {
                    name: 'Mobiles',
                    url: '/list/mobiles',
                    img: mobilesImg
                },
                {
                    name: 'Monitors',
                    url: '/list/monitors',
                    img: monitorImg
                },
            ]
        }
        // const { profile } = this.state;
        const { loggedIn } = this.props.userInfo;
        return (
            <header className="header">
                <Categories categories={categories} />
                <nav className={this.state.isopened ? 'main-nav is-opened' : 'main-nav'}>
                    <Link className={window.location.pathname === '/list/all-products' ? "main-nav__item_active" : "main-nav__item"} to="/list/all-products">
                        All Products
                    </Link>
                    {categories.categorylist.map((item, key) => {
                        return (
                            <Link key={key} className={window.location.pathname === item.url ? "main-nav__item_active" : "main-nav__item"} to={item.url}>
                                {item.name}
                            </Link>
                        )
                    })}
                    <div className="main-nav__actions">
                        <Link className="main-nav__item" to="/profile/personal">
                            Profile
                        </Link>
                        <button className="u-empty main-nav__item" onClick={this.onClickLogout}>
                            Logout
                        </button>
                    </div>
                    <button className="u-empty btn-close" onClick={this.toggleClass}>
                        <Close />
                    </button>
                </nav>
                <nav className="secondary-nav">
                    {loggedIn && <Link to="/profile/personal">
                        <IconButton
                            className='iconButton'
                            // edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            //   onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <img src={ProfileIcon} alt="iconimage" />
                        </IconButton>
                    </Link>}
                    <Link className="secondary-nav__cart" to="/cart">
                        <IconButton className='iconButton' aria-label="cart" color="inherit" >
                            <Badge badgeContent={this.props.quantity} color="secondary" overlap="rectangular">
                                <img src={BagIcon} alt="iconimage" />
                            </Badge>
                        </IconButton>
                    </Link>
                    {loggedIn ? <div className="secondary-nav__login" onClick={this.onClickLogout}>
                        <IconButton className='iconButton' aria-label="cart" color="inherit" >
                            <img src={logout_icon} alt="iconimage" />
                        </IconButton>
                    </div>
                        : <div className="secondary-nav__login" onClick={this.onClickLogIn}>
                            <IconButton
                                aria-label="show more"
                                aria-haspopup="true"
                                // onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <LoginIcon />
                            </IconButton>
                        </div>}
                    <button className="u-empty" onClick={this.toggleClass}>
                        {/* <Hamburger /> */}
                        <IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                            // onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </button>
                </nav>
                {/* {this.state.ismodalopened ?
                            <Login UseB2C={this.state.UseB2C} toggleModalClass={this.state.ismodalopened} onClickClose={this.onClickClose} />
                            : null} */}
            </header>

        );
    }
}

const mapStateToProps = (state) => { 
    return { 
      userInfo : state.login.userInfo,
      theme :  state.login.theme,
      quantity : state.login.quantity
    }
  };

export default (connect(mapStateToProps, { clickAction, submitAction })(Header));
