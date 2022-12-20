import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import { animateScroll as scroll } from "react-scroll";
import { LoadingSpinner } from "../../shared";
import Alert from "react-s-alert";

// import Detail from "./detail";
import { CartService, ProductService } from '../../services';
import ProductDetails from "./productdetails";
import Breadcrump from "../../components/breadcrumb";
// import Slider from "../home/components/slider/slider";

class DetailContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popularProducts: [],
            detailProduct: {},
            loading: true,
            loadingRelated: null,
            relatedDetailProducts: [],
        };
        this.addProductToCart = this.addProductToCart.bind(this);
    }

    async componentDidMount() {
        scroll.scrollToTop();
        await this.getDetailPageData(this.props.match.params.productId);
    }

    async componentDidUpdate(prevProps) {
        const oldProductId = prevProps.match.params.productId;
        const newProductId = this.props.match.params.productId;
        if (newProductId !== oldProductId) {
            await this.getDetailPageData(newProductId);
            scroll.scrollToTop();
        }
    }

    async getDetailPageData(productId) {
        const detailProduct = await ProductService.getDetailProductData(productId);
        this.setState({ detailProduct, loading: false });
    }

    async addProductToCart() {

        // const profile = await UserService.getProfileData(this.props.userInfo.token);
        // const { profile: { email } } = profile;
        const email = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')).userName : null
        this.state.detailProduct.email = email;

        const productToCart = await CartService.addProduct(this.props.userInfo.token, this.state.detailProduct)

        if (productToCart.errMessage) {
            return this.showErrorMessage(productToCart)
        } else {
            this.showSuccesMessage(productToCart)
        }

        this.setState({ loadingRelated: true });

        // setTimeout(async () => {
        //     let relatedDetailProducts = await CartService
        //         .getRelatedDetailProducts(this.props.userInfo.token, this.state.detailProduct.type.id);

        //     if (relatedDetailProducts) {
        //         relatedDetailProducts = relatedDetailProducts.recommendations.slice(0, 3);
        //     }

        //     this.setState({ relatedDetailProducts, loadingRelated: false });
        // }, 2000);

        this.props.sumProductInState();
    }

    showSuccesMessage(data) {
        Alert.success(data.message, {
            position: "top",
            effect: "scale",
            beep: true,
            timeout: 1500,
        });
    }

    showErrorMessage(data) {
        Alert.error(data.errMessage, {
            position: "top",
            effect: "scale",
            beep: true,
            timeout: 3000,
        });
    }

    render() {
        const { loading, detailProduct, loadingRelated,relatedDetailProducts } = this.state;
        const { loggedIn } = this.props.userInfo
        return (
            <Fragment>
                <div className="ProductContainerSection">
                    <Alert stack={{ limit: 1 }} />
                    <Breadcrump parentPath='Products' parentUrl="/list/all-products" currentPath={detailProduct.name} />
                    {loading ? <LoadingSpinner /> :
                        <ProductDetails
                        loggedIn={loggedIn}
                        detailProductData={detailProduct}
                        addProductToCart={this.addProductToCart}
                        loadingRelated={loadingRelated}
                        relatedDetailProducts={relatedDetailProducts}
                        />
                    }
                </div>
                <hr className="mb-3"/>
                {/* <Slider firstHeading="Explore Awesome Products" secondHeading="RECOMMENDED FOR YOU"/> */}
                {/* <hr className="m-0" /> */}
            </Fragment>
        );
    }
}

const mapStateToProps = state => state.login;

export default connect(mapStateToProps)(DetailContainer);