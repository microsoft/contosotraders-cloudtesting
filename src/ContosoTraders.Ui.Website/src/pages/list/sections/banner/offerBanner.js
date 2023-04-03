import React from "react";
// import { withNamespaces } from "react-i18next";
import offerImg from '../../../../assets/images/original/Contoso_Assets/product_page_assets/collection_page_banner.jpg';

const OfferBanner = ({ t, loggedIn }) => {
    return (
        <div className="offer_banner">
            <img src={offerImg} width="100%" alt=""/>
        </div>
    );
};

export default (OfferBanner);
