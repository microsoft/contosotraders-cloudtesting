import React ,{ useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {AppBar, InputAdornment, TextField, Button } from '@mui/material';
//#region Uncomment below lines to run dark mode tests
// import {FormGroup, FormControlLabel, Switch } from '@mui/material';
//#endregion
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from '../../assets/images/logo-horizontal.svg';
import SearchIconNew from '../../assets/images/original/Contoso_Assets/Icons/image_search_icon.svg'
import ProfileIcon from '../../assets/images/original/Contoso_Assets/Icons/profile_icon.svg'
import BagIcon from '../../assets/images/original/Contoso_Assets/Icons/cart_icon.svg'
import UploadFile from './components/uploadFile/uploadFile';
import { clickAction, submitAction, handleThemeChange } from '../../actions/actions';
import AuthB2CService from '../../services/authB2CService';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Alert from "react-s-alert";
import personal_information_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/personal_information_icon.svg";
import logout_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/logout_icon.svg";
// import delete_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/delete_icon.svg";
import { ProductService } from '../../services';


const StyledMenu = ((props) => (
  <Menu
    elevation={0}
    getcontentanchorel={null}
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

const StyledMenuItem = (MenuItem);
function TopAppBar(props) {
  const history = useNavigate();
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

  // React.useEffect(() => {
  //   setSearchUpload(false)
  // }, [history.location.pathname]);

  const redirectUrl = (url) => {
    history(url);
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

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const { loggedIn } = props.userInfo;

  const onClickLogIn = async() => {
    let user = await authService.login();
    if(user)
    {
      user['loggedIn'] = true;
      user['isB2c'] = true;
      user['token'] = sessionStorage.getItem('msal.idtoken');
      localStorage.setItem('state',JSON.stringify(user))
      props.submitAction(user);
      window.location.reload()
    }
  }
  const onClickLogout = () => {
    localStorage.clear();

    if (props.userInfo.isB2c) {
      authService.logout();
    }
    props.clickAction();
    history('/');
  }
  const setTextSearch = () => {
    if(searchRef.current.value.length > 0){
      let searchData = searchRef.current.value;
      ProductService.getSearchResults(searchData)
      .then((relatedProducts) => {
        searchRef.current.value = '';
        if (relatedProducts.length > 1) {
          history("/suggested-products-list",{
            state: { relatedProducts },
          });
        } else if(relatedProducts.length === 1){
          history(`/product/detail/${relatedProducts[0].id}`);
        }else{
          props.history.push("/suggested-products-list",{
            state: { relatedProducts },
          });
        }
      })
      .catch(() => {
          searchRef.current.value = '';
          // Alert.error("There was an error, please try again", {
          //     position: "top",
          //     effect: "scale",
          //     beep: true,
          //     timeout: 6000,
          // });
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
      {/* <StyledMenuItem onClick={() => redirectUrl('/profile/orders')}>
        <ListItemIcon>
          <img src={my_orders_icon} alt=""/>
        </ListItemIcon>
        <ListItemText primary="My Orders" />
        <ListItemIcon className='justify-content-end'>
        </ListItemIcon>
      </StyledMenuItem> */}
      {/* <StyledMenuItem onClick={() => redirectUrl('/profile/wishlist')}>
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
      </StyledMenuItem> */}
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
    <div style={{flexGrow:1}}>
      <AppBar color='inherit' className='appbar box-shadow-0' position="static">
        <Toolbar className='p-0'>
          <div className='headerLogo'>
            <Link to="/">
                <img src={Logo} alt=""/>
            </Link>
          </div>
          <div className={`searchBar`} id="searchbox">
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
          <div style={{flexGrow:1}} />
          {loggedIn && loggedIn ? <div className={`sectionDesktop`}>
            {/* <IconButton className='iconButton' aria-label="show 4 new mails" color="inherit" onClick={()=>redirectUrl('/wishlist')}>
              <Badge badgeContent={0} color="secondary" overlap="rectangular">
                <img src={WishlistIcon} alt="iconimage" />
              </Badge>
            </IconButton> */}
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
            <IconButton className='iconButton' aria-label="cart" color="inherit" onClick={()=>redirectUrl('/cart')} >
              <Badge badgeContent={1} color="secondary" overlap="rectangular">
                <img src={BagIcon} alt="iconimage" />
              </Badge>
            </IconButton>
          </div> :
          // null
            process.env.REACT_APP_B2CCLIENTID && <Button className='iconButton' aria-label="show 4 new mails" color="inherit" onClick={() => onClickLogIn()} >
              Login
            </Button>
          }
          {/* #region Uncomment below lines to run dark mode tests */}
          {/* <FormGroup className='theme-class'>
            <FormControlLabel labelPlacement="start" control={<Switch aria-label='theme change' id="theme" color="primary" onChange={(e) => props.handleThemeChange(e.target.checked)}/>} label="Dark Mode" />
          </FormGroup> */}
          {/* #endregion */}
          {/* <div className={`sectionMobile`}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
const mapStateToProps = (state) => { 
  return { 
    userInfo : state.login.userInfo,
    theme :  state.login.theme
  }
};
const mapDispatchToProps = (dispatch) => ({
  handleThemeChange: (value) => dispatch(handleThemeChange(value)),
  submitAction: (user) => dispatch(submitAction(user)),
  clickAction: () => dispatch(clickAction()), 
})
export default (connect(mapStateToProps, mapDispatchToProps)(TopAppBar));