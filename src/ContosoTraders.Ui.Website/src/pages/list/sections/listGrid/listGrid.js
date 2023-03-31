import { Grid } from "@mui/material";
import React from "react";
import Product from "../../../../components/productCard/product";
// import MinimalSelect from "../../../../components/minimalselect";
// import Pagination from '@material-ui/lab/Pagination';

const ListGrid = ({ productsList }) => {
    return (
        <div className="list-grid">
            <div className="filter-section">
                <div className="page">Showing 1 - {productsList ? productsList.length : 0} of {productsList ? productsList.length:0} items</div>
                {/* <div>Sort By</div>&nbsp;&nbsp;&nbsp;&nbsp;
                <MinimalSelect /> */}
            </div>
            {productsList && productsList.length > 0 ?
            <Grid container justifyContent="center" spacing={3}>             
                {productsList && productsList.map((productsListInfo, index) => {
                    return <Grid key={index} item lg={4} sm={6} xs={12}><Product {...productsListInfo} key={index} /></Grid>;
                })}
            </Grid>
            :
            <p className="text-left">No Products Found</p>}
            <Grid className="pagination">
                {/* <Pagination count={5} color="primary" defaultPage={1} shape="rounded" hidePrevButton hideNextButton/>
                <button className="nextBtn">Next</button> */}
            </Grid>
        </div> 
    );
};

export default ListGrid;
