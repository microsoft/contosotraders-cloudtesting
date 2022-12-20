import { Grid } from "@material-ui/core";
import React from "react";
import { OfferBanner, ListGrid, ListAside } from "./components";
import Breadcrump  from "../../components/breadcrumb";
import { withRouter, useHistory } from "react-router-dom";

const List = ({ typesList, brandsList, onFilterChecked, productsList, loggedIn }) => {
    const history = useHistory();
    const currentCategory = history.location.pathname.split("/").pop().replaceAll('-',' ');

    return (
        <div className="list">
            {currentCategory === 'all products'?
            <Breadcrump currentPath='Product Collection' />
            :
            <Breadcrump parentPath='Product Collection' parentUrl="/list/all-products" currentPath={currentCategory} />}
            <OfferBanner />
            <div className="list__content">
                <h6 className="mainHeading">{currentCategory}</h6>
                <Grid container>
                    <Grid item xs={3}>
                        <ListAside
                            onFilterChecked={onFilterChecked}
                            typesList={typesList}
                            brandsList={brandsList}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <ListGrid productsList={productsList} />
                    </Grid>
                </Grid>
            </div>
            <hr className="m-0"/>
        </div>
    );
};

export default withRouter(List);
