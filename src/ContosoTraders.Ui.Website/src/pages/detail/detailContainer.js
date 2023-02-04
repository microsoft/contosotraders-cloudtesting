import React, { Fragment } from "react";
import { connect } from 'react-redux';

// import { animateScroll as scroll } from "react-scroll";
import { LoadingSpinner } from "../../shared";
// import Alert from "react-s-alert";

// import Detail from "./detail";
import { CartService, ProductService } from '../../services';
import ProductDetails from "./productdetails";
import Breadcrump from "../../components/breadcrumb";
import { useParams } from "react-router-dom";
// import Slider from "../home/components/slider/slider";

    
    function DetailContainer(props) {
        const { productId } = useParams();
        const [detailProduct,setDetailProduct] = React.useState({})
        const [loadingRelated,setLoadingRelated] = React.useState(null)
        const [loading,setLoading] = React.useState(true)
        const relatedDetailProducts = []
        // useEffect(() => {
        //     await getDetailPageData(productId);
        // }, []);

        React.useEffect(() => {
            getDetailPageData(productId);
        }, [productId]);
    
        const getDetailPageData = async(productId) => {
            let detailProducts = await ProductService.getDetailProductData(productId);
            setDetailProduct(detailProducts)
            setLoading(false)
        }
    
        const addProductToCart = async() => {
    
            // const profile = await UserService.getProfileData(this.props.userInfo.token);
            // const { profile: { email } } = profile;
            const email = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')).userName : null

            setDetailProduct({ ...detailProduct,email: email})
    
            const productToCart = await CartService.addProduct(props.userInfo.token, detailProduct)
    
            if (productToCart.errMessage) {
                return showErrorMessage(productToCart)
            } else {
                showSuccesMessage(productToCart)
            }
    
            setLoadingRelated(true)
    
            // setTimeout(async () => {
            //     let relatedDetailProducts = await CartService
            //         .getRelatedDetailProducts(this.props.userInfo.token, this.state.detailProduct.type.id);
    
            //     if (relatedDetailProducts) {
            //         relatedDetailProducts = relatedDetailProducts.recommendations.slice(0, 3);
            //     }
    
            //     this.setState({ relatedDetailProducts, loadingRelated: false });
            // }, 2000);
    
            props.sumProductInState();
        }
    
        const showSuccesMessage = (data) => {
            // Alert.success(data.message, {
            //     position: "top",
            //     effect: "scale",
            //     beep: true,
            //     timeout: 1500,
            // });
        }
    
        const showErrorMessage = (data) => {
            // Alert.error(data.errMessage, {
            //     position: "top",
            //     effect: "scale",
            //     beep: true,
            //     timeout: 3000,
            // });
        }
        const { loggedIn } = props.userInfo
        return (
            <Fragment>
                <div className="ProductContainerSection">
                    {/* <Alert stack={{ limit: 1 }} /> */}
                    <Breadcrump parentPath='Products' parentUrl="/list/all-products" currentPath={detailProduct.name} />
                    {loading ? <LoadingSpinner /> :
                        <ProductDetails
                        loggedIn={loggedIn}
                        detailProductData={detailProduct}
                        addProductToCart={addProductToCart}
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
// }

const mapStateToProps = state => state.login;

export default connect(mapStateToProps)(DetailContainer);