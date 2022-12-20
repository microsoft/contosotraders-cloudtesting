import { Grid } from "@material-ui/core";
import React from "react";
import Product from "../../../home/components/product/product";
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
                    return <Grid key={index} item xs={4}><Product {...productsListInfo} key={index} /></Grid>;
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
