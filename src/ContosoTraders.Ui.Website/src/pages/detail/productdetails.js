import React from "react";
import { Grid, Button, TextField, InputAdornment, Typography } from "@mui/material";
import CustomizedAccordions from "../../components/accordion/accordion";
// import ImageSlider from "../../components/imageSlider/imageslider";
import QuantityPicker from "../../components/qtyCounter/productcounter";
import add_to_bag_icon from "../../assets/images/original/Contoso_Assets/product_page_assets/add_to_bag_icon.svg";
import { Link } from "react-router-dom";
// import add_to_wishlist_icon from "../../assets/images/original/Contoso_Assets/product_page_assets/add_to_wishlist_icon.svg";
import discount_icon from "../../assets/images/original/Contoso_Assets/product_page_assets/discount.png";

function ProductDetails(props) {
  const { name, price, imageUrl } = props.detailProductData;
  // const type = Object.assign({}, props.detailProductData.type);
  const { features } = props.detailProductData;

  // const relatedDetailProducts = props.relatedDetailProducts;
  // const hasRelatedDetailProducts = relatedDetailProducts && relatedDetailProducts.length;
  // const [sliderImg, setSliderImg] = React.useState(imageUrl)
  const addToCart = () => {
    props.addProductToCart();
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
          <Grid item xs={4} className="descpAttributes">
            Model Number
          </Grid>
          <Grid item xs={8} className="descpDetails">
            Xbox Series X
          </Grid>
          <Grid item xs={4} className="descpAttributes">
            Sales Package
          </Grid>
          <Grid item xs={8} className="descpDetails">
            1 Series X Console, 1 Controller, 1 Ultra High Speed HDMI Cable
            and 1 Power Cord.
          </Grid>
          <Grid item xs={4} className="descpAttributes">
            Additional Content
          </Grid>
          <Grid item xs={8} className="descpDetails">
            Series X console, One Wireless Controller, A high-speed HDMI Cable
            and Power Cable
          </Grid>
          <Grid item xs={4} className="descpAttributes">
            Console Type
          </Grid>
          <Grid item xs={8} className="descpDetails">
            Console
          </Grid>
          <Grid item xs={4} className="descpAttributes">
            Sound
          </Grid>
          <Grid item xs={8} className="descpDetails">
            L-PCM, up to 7.1, Dolby Digital 5.1, DTS 5.1, Dolby TrueHD with
            Atmos
          </Grid>
          <Grid item xs={4} className="descpAttributes">
            Motion Controller Included
          </Grid>
          <Grid item xs={8} className="descpDetails">
            Yes
          </Grid>
          <Grid item xs={4} className="descpAttributes">
            RAM
          </Grid>
          <Grid item xs={8} className="descpDetails">
            16GB GDDR6 w/320 bit-wide bus
          </Grid>
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
    },
    {
      name : 'panel3',
      title : 'Questions and Answers',
      body :
      <ul>
      {features && features.map((feature, index) => (
        <li className="detail_feature" key={index}>
          <Typography className="detail_feature-title">{`${feature.title}:`}</Typography>
          <Typography className="detail_feature-description">
            {feature.description}
          </Typography>
        </li>
      ))}
    </ul>
    }
  ]

  return (
    <div className="ProductDetailsSection">
      <Grid container>
        <Grid item xs={6} className="ProductImagesSection">
          <Grid container>
            {/* <Grid item xs={2}>
             <ImageSlider setSliderImg={setSliderImg} sliderImg={sliderImg} imageUrl={imageUrl}/>
            </Grid> */}
            <Grid item xs={10} className="productdetailsimagediv">
              <img src={imageUrl} className="productdetailsimage" alt="" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <div className="detailsection">
            <div className="productdetailName">
              {name ? name : 'Xbox Series S Fortnite & Rocket League Bundle 512 GB (White)'}
            </div>
            <div >
              {discountOffer(price)}
              <span className="oldprice">{'$' + price.toFixed(2)}</span>
              <span className="newoffer">15%Off</span>
            </div>
            <div className="pincodebar">
              <span className="prodattributes">Delivery</span>
              <span>
                <TextField
                  className="pincodesearchbar"
                  placeholder="Enter valid pincode"
                  // label="Enter valid pincode"
                  variant="outlined"
                  InputProps={{
                    style: { maxHeight: 49 },
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Button className="pinsearchbtn">CHECK</Button>
                      </InputAdornment>
                    )
                  }}
                />
              </span>
            </div>
            <div>
              <span className="prodattributes">Quantity</span>
              <span>
                <QuantityPicker min={1} max={10} />
              </span>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<img src={add_to_bag_icon} alt="" />}
                className="CartButton"
                onClick={() => addToCart()}
              >
                Add To Bag
              </Button>

              {/* <Button
              variant="outlined"
              color="primary"
              startIcon={<img src={add_to_wishlist_icon} alt=""/>}
              className="WishListButton"
            >
              Add to WishList
            </Button> */}
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