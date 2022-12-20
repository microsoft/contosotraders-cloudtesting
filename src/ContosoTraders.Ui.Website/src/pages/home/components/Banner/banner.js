import React from "react";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
function Banner(props) {
  const history = useHistory()
  const startShopping = () => {
    history.push('/list/controllers')
  }
  return (
    <section>
      <Grid className="BannerSection" container>
        <Grid item xs={6}>
          <div className="BannerHeading">
            {props.firstHeading}
          </div>
          <div className="BannerContent">
            {props.secondHeading}
          </div>
          <div className="BannerButtondiv">
            <button className="BannerButton" onClick={() => startShopping()} >Start Shopping</button>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default Banner;