import React from "react";
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import NavigateNext from "@mui/icons-material/NavigateNext";
import PersonalInformation from "./personalInformation";
// import MyWishlist from "./MyWishlist";
// import MyOrders from "./MyOrders";
// import MyAddressBook from "./MyAddressBook";
import logout_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/logout_icon.svg";
import personal_information_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/personal_information_icon.svg";
// import my_wishlist_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/my_wishlist_icon.svg";
// import my_address_book_icons from "../../assets/images/original/Contoso_Assets/profile_page_assets/my_address_book_icons.svg";
// import my_orders_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/my_orders_icon.svg";
import Breadcrump from "../../components/breadcrumb/breadcrumb";
import AuthB2CService from "../../services/authB2CService";
import './profile.scss'

const FormProfile = (props) => {
  const authService = new AuthB2CService();
  const { page } = useParams()
  const [activeState, setActiveState] = React.useState(page);
  const onClickLogout = () => {
    localStorage.clear();

    if (props.userInfo.isB2c) {
      authService.logout();
    }
    props.clickAction();
    props.history.push('/');
  }
  return (
    <div className="profileMain">
    <Breadcrump currentPath="My Profile"/>
    <div className="ProfileSection">
      <div className="topHeaderSection">
        <h2 className="myprofileHeader"> My Profile</h2>
        <Button
          className="logout-btn"
          variant="outlined"
          color="primary"
          onClick={onClickLogout}
          startIcon={<Avatar src={logout_icon} className="deleteIconsvg"/>}
        >
          Logout
        </Button>
      </div>
      <div>
        <Grid container>
          <Grid item lg={3} md={4} xs={12}>
            <div className="sidebar-container">
              <div
                className={`${
                  activeState === "personal"
                    ? "sidebar-item active"
                    : "sidebar-item"
                }`}
                onClick={() => {
                  setActiveState("personal");
                }}
              >
                <div className="item-start"></div>
                <div className="item-logo">
                <Avatar src={personal_information_icon} className="sidebarIcons" />
                </div>
                <div className="item-content">Personal Information</div>
                <div className="item-arrow">
                  <NavigateNext className="sidebarnavIcons" />
                </div>
              </div>

              {/* <div
                className={`${
                  activeState === "orders"
                    ? "sidebar-item active"
                    : "sidebar-item"
                }`}
                onClick={() => {
                  setActiveState("orders");
                }}
              >
                <div className="item-logo">
                <Avatar src={my_orders_icon} className="sidebarIcons" />
                </div>
                <div className="item-content">My Orders</div>
                <div className="item-arrow">
                  <NavigateNext className="sidebarnavIcons" />
                </div>
              </div> */}

              {/* <div
                className={`${
                  activeState === "wishlist"
                    ? "sidebar-item active"
                    : "sidebar-item"
                }`}
                onClick={() => {
                  setActiveState("wishlist");
                }}
              >
                <div className="item-logo">
                <Avatar src={my_wishlist_icon} className="sidebarIcons" />
                </div>
                <div className="item-content">My Wishlist</div>
                <div className="item-arrow">
                  <NavigateNext className="sidebarnavIcons" />
                </div>
              </div> */}

              {/* <div
                className={`${
                  activeState === "address"
                    ? "sidebar-item active"
                    : "sidebar-item"
                }`}
                onClick={() => {
                  setActiveState("address");
                }}
              >
                <div className="item-logo">
                <Avatar src={my_address_book_icons} className="sidebarIcons" />
                </div>
                <div className="item-content">My Address Book</div>
                <div className="item-arrow">
                  <NavigateNext className="sidebarnavIcons" />
                </div>
              </div> */}
            </div>
          </Grid>
          <Grid item lg={9} md={8} xs={12} container>
            {activeState === "personal" ?  <PersonalInformation/> : null}
            {/* {activeState === "orders" ?  <MyOrders/> : null}
            {activeState === "wishlist" ?  <MyWishlist/> : null}
            {activeState === "address" ?  <MyAddressBook/> : null} */}
          </Grid>
        </Grid>
      </div>
    </div>
    </div>
  );
};
const mapStateToProps = (state) => { 
  return { 
    userInfo : state.login.userInfo,
    theme :  state.login.theme
  }
};
export default connect(mapStateToProps, null)(FormProfile);