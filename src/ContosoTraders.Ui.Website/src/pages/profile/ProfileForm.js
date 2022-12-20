import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Grid,
  Avatar,
} from "@material-ui/core";
import NavigateNext from "@material-ui/icons/NavigateNext";
import PersonalInformation from "./PersonalInformation";
import MyWishlist from "./MyWishlist";
import MyOrders from "./MyOrders";
import MyAddressBook from "./MyAddressBook";
import logout_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/logout_icon.svg";
import personal_information_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/personal_information_icon.svg";
import my_wishlist_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/my_wishlist_icon.svg";
import my_address_book_icons from "../../assets/images/original/Contoso_Assets/profile_page_assets/my_address_book_icons.svg";
import my_orders_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/my_orders_icon.svg";
import Breadcrump from "../../components/breadcrumb";

const FormProfile = () => {
 
  const { page } = useParams()
  const [activeState, setActiveState] = React.useState(page);

  return (
    <div className="ProfileSection">
      <Breadcrump currentPath="My Profile"/>
      <div className="topHeaderSection">
        <h2 className="myprofileHeader"> My Profile</h2>
        <Button
          className="logout-btn"
          variant="outlined"
          color="primary"
          startIcon={<Avatar src={logout_icon} className="deleteIconsvg"/>}
        >
          Logout
        </Button>
      </div>
      <div>
        <Grid container>
          <Grid item xs={3}>
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

              <div
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
              </div>

              <div
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
              </div>

              <div
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
              </div>
            </div>
          </Grid>
          <Grid item xs={9} container>
            {activeState === "personal" ?  <PersonalInformation/> : null}
            {activeState === "orders" ?  <MyOrders/> : null}
            {activeState === "wishlist" ?  <MyWishlist/> : null}
            {activeState === "address" ?  <MyAddressBook/> : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default FormProfile;