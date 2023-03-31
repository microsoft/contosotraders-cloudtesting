import { Grid } from "@mui/material";
import React from "react";
import Breadcrump from "../../components/breadcrumb/breadcrumb";
import { ListGrid } from "../list/sections";
import { useLocation } from "react-router-dom";
const SuggestedProductsList = (props) => {
    const [suggestedProductsList, setSuggestedProductsList] = React.useState(null);
    const location = useLocation();
    const currentCategory = location.pathname.split("/").pop().replaceAll('-',' ');
    React.useEffect(() => {
        const suggestedProducts = location.state;
        setSuggestedProductsList(suggestedProducts.relatedProducts);
    }, [location.state]);
    return (
        <div className="list">
            <Breadcrump currentPath={currentCategory}/>
            <div className="list__content">
                <h6 className="mainHeading">{currentCategory}</h6>
                <Grid container>
                    {/* <Grid item xs={3}>
                        <ListAside/>
                    </Grid> */}
                    <Grid item xs={12}>
                        <ListGrid productsList={suggestedProductsList} />
                    </Grid>
                </Grid>
            </div>
            <hr className="m-0"/>
        </div>
    );
};

export default SuggestedProductsList;