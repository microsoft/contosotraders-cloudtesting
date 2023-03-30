import React from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb/breadcrumb';
function Wishlist(props) {
    const location = useLocation();
    const currentCategory = location.pathname.split("/").pop().replaceAll('-',' ');

    return (
        <div className="CartSection">
            <Breadcrumb currentPath={currentCategory} />
            <div className="CartTopHeadPart">
                <h5 className="MyCartHeading">My Wishlist</h5>
            </div>
            <hr />
        </div>
    );
}

export default Wishlist;