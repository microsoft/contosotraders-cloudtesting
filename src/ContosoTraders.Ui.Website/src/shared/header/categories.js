import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import laptopsImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/laptop_icon.svg';
import controllersImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/controllers_icon.svg';
import desktopsImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/desktops_icon.svg';
import mobilesImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/mobiles_icon.svg';
import monitorImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/monitor_icon.svg';
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

export default function CustomizedMenus() {
  const history  = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectUrl = (url) => {
    history(url)
  }

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        className="categories-btn box-shadow-0 text-transform-capitalize fw-regular"
        startIcon={<MenuIcon />}
        endIcon={<ArrowDropDownIcon />}
        size="large"
      >
        All Categories
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => redirectUrl('/list/laptops')}>
          <ListItemIcon>
            <img src={laptopsImg} alt=""/>
          </ListItemIcon>
          <ListItemText primary="Laptops" />
          <ListItemIcon className='justify-content-end'></ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => redirectUrl('/list/controllers')}>
          <ListItemIcon>
            <img src={controllersImg} alt=""/>
          </ListItemIcon>
          <ListItemText primary="Controllers" />
          <ListItemIcon className='justify-content-end'>
            {/* <ArrowForwardIosIcon fontSize="small"/> */}
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => redirectUrl('/list/desktops')}>
          <ListItemIcon>
            <img src={desktopsImg} alt=""/>
          </ListItemIcon>
          <ListItemText primary="Desktops" />
          <ListItemIcon className='justify-content-end'>
            {/* <ArrowForwardIosIcon fontSize="small"/> */}
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => redirectUrl('/list/mobiles')}>
          <ListItemIcon>
            <img src={mobilesImg} alt=""/>
          </ListItemIcon>
          <ListItemText primary="Mobiles" />
          <ListItemIcon className='justify-content-end'>
            {/* <ArrowForwardIosIcon fontSize="small"/> */}
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => redirectUrl('/list/monitors')}>
          <ListItemIcon>
            <img src={monitorImg} alt=""/>
          </ListItemIcon>
          <ListItemText primary="Monitor" />
          <ListItemIcon className='justify-content-end'>
            {/* <ArrowForwardIosIcon fontSize="small"/> */}
          </ListItemIcon>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}