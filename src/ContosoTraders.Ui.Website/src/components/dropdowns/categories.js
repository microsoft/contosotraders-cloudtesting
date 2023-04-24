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
import './categories.scss' 

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

export default function Categories(props) {
  const { categories } = props
  const history = useNavigate();
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
        {categories.title}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {categories.categorylist.map((item, key) => {
          return (
            <StyledMenuItem onClick={() => redirectUrl(item.url)} key={key}>
              <ListItemIcon>
                <img src={item.img} alt="" />
              </ListItemIcon>
              <ListItemText primary={item.name} />
              <ListItemIcon className='justify-content-end'></ListItemIcon>
            </StyledMenuItem>
          )
        })}
      </StyledMenu>
    </div>
  );
}