import React from "react";
import { Grid, Button } from "@mui/material";
import CustomizedAccordions from "../../components/accordion/accordion";
import QuantityPicker from "../../components/quantityCounter/productCounter";
import add_to_bag_icon from "../../assets/images/original/Contoso_Assets/product_page_assets/add_to_bag_icon.svg";
import { Link } from "react-router-dom";
import discount_icon from "../../assets/images/original/Contoso_Assets/product_page_assets/discount.png";

function ProductDetails(props) {
  const { name, price, imageUrl, loggedIn } = props.detailProductData;
  const { features } = props.detailProductData;

  const [loading, setLoading] = React.useState(false)
  const addToCart = async () => {
    setLoading(true);
    await props.addProductToCart();
    setLoading(false);
  };

  const discountOffer = (price) => {
    let dicsount = price - ((price / 100) * 15)
    return (
      <span className="newprice">
        ${parseInt(dicsount).toFixed(2)}
      </span>
    )
  }

  const accordionItems = [
    {
      name: 'panel1',
      title: 'Description',
      body:
        <Grid container spacing={2}>
          {features && features.map((feature, index) => {
            return (
              <>
                <Grid item xs={4} className="descpAttributes">
                  {feature.title}
                </Grid>
                <Grid item xs={8} className="descpDetails">
                  {feature.description}
                </Grid>
              </>
            )
          })}
        </Grid>
    },
    {
      name : 'panel2',
      title : 'Offers',
      body :
      <div className="OffersSection">
      <div className="Offerslist">
        <span><img src={discount_icon} className="discount_icon" alt=""/></span>
        <span>
          10% off on SBI Credit Card, up to ₹1,750, on orders of ₹5000 and
          above <Link to="/" className="TClink">T&C</Link>
        </span>
      </div>
      <div className="Offerslist">
      <span><img src={discount_icon} className="discount_icon" alt=""/></span>
        <span>
          10% off on SBI Credit Card EMI Transactions, up to ₹2,250, on
          orders of ₹5000 and above <Link to="/" className="TClink">T&C</Link>
        </span>
      </div>
      <div className="Offerslist">
      <span><img src={discount_icon} className="discount_icon" alt=""/></span>
        <span>
          Additional ₹750 discount on SBI Credit Card and EMI txns on net
          cart value of INR 29,999 and above <Link to="/" className="TClink">T&C</Link>
        </span>
      </div>
      <div className="Offerslist">
      <span><img src={discount_icon} className="discount_icon" alt=""/></span>
        <span>
          No cost EMI ₹8,815/month. Standard EMI also available <Link to="/" className="TClink">View plans</Link>
        </span>
      </div>
      </div>
    }
  ]


  return (
    <div className="ProductDetailsSection">
      <Grid container>
        <Grid item lg={6} md={5} xs={12} className="ProductImagesSection">
          <Grid container>
            <Grid item xs={10} className="productdetailsimagediv" style={{backgroundImage:`url(${imageUrl})`}}>
              <img src={imageUrl} className="productdetailsimage" alt="" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={7} xs={12}>
          <div className="detailsection">
            <div className="productdetailName">
              {name ? name : 'Xbox Series S Fortnite & Rocket League Bundle 512 GB (White)'}
            </div>
            <div >
              {discountOffer(price)}
              <span className="oldprice">{'$' + price.toFixed(2)}</span>
              <span className="newoffer">15%Off</span>
            </div>
            <div>
              <span className="prodattributes">Quantity</span>
              <span>
                <QuantityPicker min={1} max={10} setQty={props.setQty} loggedIn={loggedIn}/>
              </span>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<img src={add_to_bag_icon} alt="" />}
                className="CartButton"
                onClick={() => addToCart()}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add To Bag'}
              </Button>
            </div>
            <div>
              <div>
                <CustomizedAccordions accordionItems={accordionItems} />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDetails;