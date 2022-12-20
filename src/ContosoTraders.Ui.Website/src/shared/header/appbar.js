import React ,{ useRef } from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {AppBar, InputAdornment, TextField} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Logo from '../../assets/images/logo-horizontal.svg';
import SearchIconNew from '../../assets/images/original/Contoso_Assets/Icons/image_search_icon.svg'
import WishlistIcon from '../../assets/images/original/Contoso_Assets/Icons/wishlist_icon.svg'
import ProfileIcon from '../../assets/images/original/Contoso_Assets/Icons/profile_icon.svg'
import BagIcon from '../../assets/images/original/Contoso_Assets/Icons/cart_icon.svg'
import UploadFile from '../uploadFile/uploadFile';
import { clickAction, submitAction } from '../../actions/actions';
import AuthB2CService from '../../services/authB2CService';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from "react-s-alert";

import logout_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/logout_icon.svg";
// import delete_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/delete_icon.svg";
import personal_information_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/personal_information_icon.svg";
import my_wishlist_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/my_wishlist_icon.svg";
import my_address_book_icons from "../../assets/images/original/Contoso_Assets/profile_page_assets/my_address_book_icons.svg";
import my_orders_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/my_orders_icon.svg";
import { ProductService } from '../../services';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appbar : {
    backgroundColor:'red'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 50,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 50,
      width: '50%',
      maxWidth: '650px',
      maxHeight: '48px'
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#fff',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#000',
      },
    },
    '&:hover' : {
      backgroundColor: '#f8f8f8'
    }
  },
}))(MenuItem);
function TopAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const searchRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchUpload, setSearchUpload] = React.useState(false)
  const authService = new AuthB2CService();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => {
    if(searchUpload === true){
      window.addEventListener('click', function(e){   
        if (!document.getElementById('searchbox').contains(e.target)){
          setSearchUpload(false)
        }
      });
    }
  }, [searchUpload]);

  React.useEffect(() => {
    setSearchUpload(false)
  }, [history.location.pathname]);

  const redirectUrl = (url) => {
    history.push(url);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const { loggedIn } = props.userInfo;

  // const onClickLogIn = async() => {
  //   let user = await authService.login();
  //   if(user)
  //   {
  //       user['loggedIn'] = true;
  //       user['isB2c'] = true;
  //       user['token'] = sessionStorage.getItem('msal.idtoken');
  //       localStorage.setItem('state',JSON.stringify(user))
  //       props.submitAction(user);
  //   }
  // }
  const onClickLogout = () => {
    localStorage.clear();

    if (props.userInfo.isB2c) {
      authService.logout();
    }
    props.clickAction();
    props.history.push('/');
  }
  const setTextSearch = () => {
    if(searchRef.current.value.length > 0){
      let searchData = searchRef.current.value;
      ProductService.getSearchResults(searchData)
      .then((relatedProducts) => {
        searchRef.current.value = '';
        if (relatedProducts.length > 1) {
          props.history.push({
            pathname: "/suggested-products-list",
            state: { relatedProducts },
          });
        } else if(relatedProducts.length === 1){
          props.history.push({
            pathname: `/product/detail/${relatedProducts[0].id}`,
          });
        }else{
          props.history.push({
            pathname: "/suggested-products-list",
            state: { relatedProducts },
          });
        }
      })
      .catch(() => {
          searchRef.current.value = '';
          Alert.error("There was an error, please try again", {
              position: "top",
              effect: "scale",
              beep: true,
              timeout: 6000,
          });
      });//search function
    }
  }
  React.useEffect(() => {
    const listener = event => {
      if (searchRef.current.value.length > 0 && (event.code === "Enter" || event.code === "NumpadEnter")) {
        event.preventDefault();
        setTextSearch();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <StyledMenu
      id="profile-dropdown"
      anchorEl={anchorEl}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <StyledMenuItem onClick={() => redirectUrl('/profile/personal')}>
        <ListItemIcon>
          <img src={personal_information_icon} alt=""/>
        </ListItemIcon>
        <ListItemText primary="Personal Information" />
        <ListItemIcon className='justify-content-end'></ListItemIcon>
      </StyledMenuItem>
      <StyledMenuItem onClick={() => redirectUrl('/profile/orders')}>
        <ListItemIcon>
          <img src={my_orders_icon} alt=""/>
        </ListItemIcon>
        <ListItemText primary="My Orders" />
        <ListItemIcon className='justify-content-end'>
        </ListItemIcon>
      </StyledMenuItem>
      <StyledMenuItem onClick={() => redirectUrl('/profile/wishlist')}>
        <ListItemIcon>
          <img src={my_wishlist_icon} alt=""/>
        </ListItemIcon>
        <ListItemText primary="My Wishlist" />
        <ListItemIcon className='justify-content-end'>
        </ListItemIcon>
      </StyledMenuItem>
      <StyledMenuItem onClick={() => redirectUrl('/profile/address')}>
        <ListItemIcon>
          <img src={my_address_book_icons} alt=""/>
        </ListItemIcon>
        <ListItemText primary="My Address Book" />
        <ListItemIcon className='justify-content-end'>
        </ListItemIcon>
      </StyledMenuItem>
      <StyledMenuItem onClick={onClickLogout}>
        <ListItemIcon>
          <img src={logout_icon} alt=""/>
        </ListItemIcon>
        <ListItemText primary="Logout" />
        <ListItemIcon className='justify-content-end'>
        </ListItemIcon>
      </StyledMenuItem>
    </StyledMenu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary" overlap="rectangular">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary" overlap="rectangular">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar color='inherit' className='appbar box-shadow-0' position="static">
        <Toolbar className='p-0'>
          <div className='headerLogo'>
            <Link to="/">
                <img src={Logo} alt=""/>
            </Link>
          </div>
          <div className={`${classes.search} searchBar`} id="searchbox">
            <TextField
                // label="Search by product name or search by image"
                placeholder='Search by product name or search by image'
                variant="outlined"
                fullWidth
                onBlur={()=>setTextSearch()}
                onChange={()=>setSearchUpload(false)}
                onFocus={()=>setSearchUpload(true)}
                inputRef={searchRef}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={()=>searchRef.current.value.length === 0 ? setSearchUpload(!searchUpload) : null} className="searchBtn">
                          <img src={SearchIconNew} alt="iconimage"/>
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />
            {searchUpload?
            <div className='searchbar-upload'>
              Search by an image
              <UploadFile
                  title=""
                  subtitle="Drag an image or upload a file"
              />
            </div>
            :null}
          </div>
          <div className={classes.grow} />
          {loggedIn && loggedIn ? <div className={classes.sectionDesktop}>
            <IconButton className='iconButton' aria-label="show 4 new mails" color="inherit" onClick={()=>redirectUrl('/profile/wishlist')}>
              <Badge badgeContent={0} color="secondary" overlap="rectangular">
                <img src={WishlistIcon} alt="iconimage" />
              </Badge>
            </IconButton>
            <IconButton
              className='iconButton'
              // edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <img src={ProfileIcon} alt="iconimage" />
            </IconButton>
            <IconButton className='iconButton' aria-label="show 17 new notifications" color="inherit" onClick={()=>redirectUrl('/cart')} >
              <Badge badgeContent={1} color="secondary" overlap="rectangular">
                <img src={BagIcon} alt="iconimage" />
              </Badge>
            </IconButton>
          </div> :
          null
            // <Button className='iconButton' aria-label="show 4 new mails" color="inherit" onClick={() => onClickLogIn()} >
            //   Login
            // </Button>
          }
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
const mapStateToProps = state => state.login;

export default withRouter(connect(mapStateToProps, { clickAction, submitAction })(TopAppBar));