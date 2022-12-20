import { Grid, TextField, InputAdornment, Button, Chip } from "@material-ui/core";
import React from "react";
import productdetailimg from "../../assets/images/original/Contoso_Assets/product_page_assets/product_image_main.jpg";
import QuantityPicker from "../detail/productcounter";
import Breadcrumb from "../../components/breadcrumb";
import { Link, useHistory } from 'react-router-dom';

function Cart() {
  const textInput = React.useRef(null);
  const [coupon, setCoupon] = React.useState('DISCOUNT10');

  const history = useHistory();
  const currentCategory = history.location.pathname.split("/").pop().replaceAll('-',' ');
  const checkDiscount = () => {
    setCoupon(textInput.current.value);
    textInput.current.value = ''
  }
  return (
    <div className="CartSection">
      <Breadcrumb currentPath={currentCategory}/>
      <div className="CartTopHeadPart">
        <h5 className="MyCartHeading">My Cart</h5>
        <h5 className="CartTopHeadTotal">Grand Total:</h5>
        <h5 className="CartTopGrandTotal">$107.00</h5>
        <Button variant="contained" className="PlaceOrderButton">Place Order</Button>
      </div>
      <hr />

      <div className="innerCart">
      <div>
        <Grid container>
          <Grid item xs={12} container className="CartHeadings">
            <Grid item xs={1}>
              <span style={{position:'absolute'}}>Product name</span>
            </Grid>
            <Grid item xs={11} container className="CartProducts">
              <Grid item xs={2}></Grid>
              <Grid item xs={2}>
                Price
              </Grid>
              <Grid item xs={2}>
                Qty
              </Grid>
              <Grid item xs={2}>
                Subtotal
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr />
      </div>

      <div>
        <Grid container className="allProductlist">
          <Grid item xs={1}>
            <img src={productdetailimg} className="imagesection" alt=""/>
          </Grid>
          <Grid item xs={11} className="CartProducts">
            <Grid item xs={12} className="Productname">
              Xbox Series S Fortnite & Rocket League Bundle 512 GB (White)
            </Grid>
            <Grid item xs={12} className="Producttype">
              Xbox
            </Grid>
            <Grid item xs={12} container className="align-items-center">
              <Grid item xs={2} className="Productqty">
                Qty&nbsp;&nbsp;
                <QuantityPicker max={10} min={1} />
              </Grid>
              <Grid item xs={2} className="Productprice">
                $54.69
              </Grid>
              <Grid item xs={2} className="Productprice">
                1
              </Grid>
              <Grid item xs={2} className="Productprice">
                $54.69
              </Grid>
              <Grid item xs={2} className="Productlinks">
                <Link to="#" className="wishlistlink">
                  Move to wishlist
                </Link>
              </Grid>
              <Grid item xs={2} className="Productlinks">
                <Link to="#" className="removelink">
                  Remove
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr />
      </div>
      <div>
        <Grid container className="allProductlist">
          <Grid item xs={1}>
            <img src={productdetailimg} className="imagesection" alt=""/>
          </Grid>
          <Grid item xs={11} className="CartProducts">
            <Grid item xs={12} className="Productname">
              Xbox Series S Fortnite & Rocket League Bundle 512 GB (White)
            </Grid>
            <Grid item xs={12} className="Producttype">
              Xbox
            </Grid>
            <Grid item xs={12} container className="align-items-center">
              <Grid item xs={2} className="Productqty">
                Qty&nbsp;&nbsp;
                <QuantityPicker max={10} min={1} />
              </Grid>
              <Grid item xs={2} className="Productprice">
                $54.69
              </Grid>
              <Grid item xs={2} className="Productprice">
                1
              </Grid>
              <Grid item xs={2} className="Productprice">
                $54.69
              </Grid>
              <Grid item xs={2} className="Productlinks">
                <Link to="#" className="wishlistlink">
                  Move to wishlist
                </Link>
              </Grid>
              <Grid item xs={2} className="Productlinks">
                <Link to="#" className="removelink">
                  Remove
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr/>
      </div>

      <div>
      <Grid container className="couponOrderSection">
        <Grid item xs={4}>
            <Grid container>
                <Grid item xs={12}>
                    <h2 className="CouponHeading "> Coupons </h2>
                </Grid>

                <Grid item xs={12} className="Couponbarsection">
                    <div className="pincodebar">
                        <span>
                            <TextField
                                className="pincodesearchbar"
                                // label="Enter coupon code"
                                placeholder="Enter coupon code"
                                variant="outlined"
                                inputRef={textInput}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Button className={`${coupon.length >= 1 ? "pinsearchbtn" : "pinsearchbtn"}`} onClick={()=>checkDiscount()}>CHECK</Button>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </span>
                    </div>
                </Grid>

                {coupon && <Grid item xs={12} >
                    <Chip label={coupon} onDelete={()=>setCoupon('')} className="CouponChip" />
                    <hr />
                </Grid>}
                <Grid item xs={12}>
                    <p className="nocouponheading m-0">No coupons are available</p>
                </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <Grid container>
                <Grid item xs={12} className="CouponHeading ">
                Order Summary <hr style={{margin:'8px 0 18px 0'}}/>
                </Grid>
                <Grid item xs={10} className="OrderSubHeading">
                Sub Total
                </Grid>
                <Grid item xs={2} className="OrderSubPrice">
                $119.69
                </Grid>
                <Grid item xs={10} className="OrderSubHeading">
                Discount
                </Grid>
                <Grid item xs={2} className="OrderSubPrice">
                -$12.69
                </Grid>
                <Grid item xs={10} className="OrderSubHeading">
                Delivery Fee
                </Grid>
                <Grid item xs={2} className="OrderSubPrice">
                -$0.00
                </Grid>
                <Grid item xs={10} className="OrdertotalHeading">
                Grand Total
                </Grid>
                <Grid item xs={2} className="OrderTotalPrice">
                $107.00
                </Grid>
                <Grid item xs={12}>
                <hr />
                </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className="OrderButtonsection">
            <Button variant="contained" className="PlaceOrderButton">
              Place Order
            </Button>
          </Grid>
        </Grid>
      </div>
      </div>
    </div>
  );
}

export default Cart;