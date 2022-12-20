import React from "react";
import {
  Card,
  CardContent,
  Grid,
  CardActionArea,
} from "@material-ui/core";
import laptopgirl from "../../../../assets/images/original/Contoso_Assets/Grid_Products_Collection/banner_1.jpg";
import laptoppic from "../../../../assets/images/original/Contoso_Assets/Grid_Products_Collection/product_image.png";
import { useHistory } from "react-router-dom";
function Gridsection() {
  const history = useHistory()
  const startShopping = () => {
    history.push('/list/laptops')
  }
  return (
    <div className="LaptopSection">
      <div className="LapHeadSection">
        <div className="LapHead">MICROSOFT LAPTOPS</div>
        <div className="LapHeadmain">LAPTOPS DESIGNED BY MICROSOFT</div>
      </div>
      <div className="ProductSection">
        <div className="productgrid">
          <Grid container spacing={4}>
            <Grid item xs={5}>
              <img
                src={laptopgirl}
                className="lapsecimage"
                alt="girl with laptop"
              />
            </Grid>
            <Grid item xs={7}>
              <Grid container spacing={4}>
                <Grid container item xs={12} spacing={4}>
                  <Grid item xs={6}>
                    <Card className="cardlap">
                      <CardActionArea>
                        <img
                          src={laptoppic}
                          className="laptopimage"
                          alt="girl with laptop"
                        />
                      </CardActionArea>
                      <CardContent className="proddetails">
                        <div className="productdetails">
                          <div className="Productname">Surface Pro 8</div>
                          <div className="price">$279</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card className="cardlap">
                      <CardActionArea>
                        <img
                          src={laptoppic}
                          className="laptopimage"
                          alt="girl with laptop"
                        />
                      </CardActionArea>
                      <CardContent className="proddetails">
                      <div className="productdetails">
                          <div className="Productname">Surface Pro X</div>
                          <div className="price">$499</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={4}>
                  <Grid item xs={6}>
                    <Card className="cardlap">
                      <CardActionArea>
                        <img
                          src={laptoppic}
                          className="laptopimage"
                          alt="girl with laptop"
                        />
                      </CardActionArea>
                      <CardContent className="proddetails">
                      <div className="productdetails">
                          <div className="Productname">Surface Go 3</div>
                          <div className="price">$399</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card className="cardlap">
                      <CardActionArea>
                        <img
                          src={laptoppic}
                          className="laptopimage"
                          alt="girl with laptop"
                        />
                      </CardActionArea>
                      <CardContent className="proddetails">
                      <div className="productdetails">
                          <div className="Productname">Surface Pro 8</div>
                          <div className="price">$599</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="LaptopButtondiv">
        <button className="LaptopButton" onClick={() => startShopping()} >Explore Other Products</button>
      </div>
    </div>
  );
}

export default Gridsection;