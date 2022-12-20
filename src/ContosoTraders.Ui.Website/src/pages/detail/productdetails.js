import React from "react";
import { Grid, Button,TextField,InputAdornment } from "@material-ui/core";
import CustomizedAccordions from "./accordion";
// import ImageSlider from "./imageslider";
import QuantityPicker from "./productcounter";
import add_to_bag_icon from "../../assets/images/original/Contoso_Assets/product_page_assets/add_to_bag_icon.svg";
import add_to_wishlist_icon from "../../assets/images/original/Contoso_Assets/product_page_assets/add_to_wishlist_icon.svg";

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
  return (
    <div className="ProductDetailsSection">
      <Grid container>
        <Grid item xs={6} className="ProductImagesSection">
          <Grid container>
            {/* <Grid item xs={2}>
             <ImageSlider setSliderImg={setSliderImg} sliderImg={sliderImg} imageUrl={imageUrl}/>
            </Grid> */}
            <Grid item xs={10} className="productdetailsimagediv">
              <img src={imageUrl} className="productdetailsimage" alt=""/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <div  className="detailsection">
          <div className="productdetailName">
            {name ? name : 'Xbox Series S Fortnite & Rocket League Bundle 512 GB (White)'}
          </div>
          <div >
            <span className="newprice">{'$'+price.toFixed(2)}</span>
            <span className="oldprice">{'$'+price.toFixed(2)}</span>
            <span className="newoffer">50%Off</span>
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
              startIcon={<img src={add_to_bag_icon} alt=""/>}
              className="CartButton"
              onClick={()=>addToCart()}
            >
              Add To Bag
            </Button>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<img src={add_to_wishlist_icon} alt=""/>}
              className="WishListButton"
            >
              Add to WishList
            </Button>
          </div>
          <div>
            <div>
              <CustomizedAccordions features={features} />
            </div>
          </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDetails;