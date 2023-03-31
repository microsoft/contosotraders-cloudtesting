import React from "react";
import { connect } from 'react-redux';

// import { animateScroll as scroll } from "react-scroll";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
// import Alert from "react-s-alert";

// import Detail from "./detail";
import { CartService, ProductService } from '../../services';
import ProductDetails from "./productDetails";
import Breadcrump from "../../components/breadcrumb/breadcrumb";
import { useParams } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { getCartQuantity } from "../../actions/actions";
// import Slider from "../home/components/slider/slider";


function DetailContainer(props) {
    const { productId } = useParams();
    const [detailProduct, setDetailProduct] = React.useState({})
    const [loadingRelated, setLoadingRelated] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [alert, setAlert] = React.useState({ open: false, type: 'error', message: '' })
    const relatedDetailProducts = []
    const [qty, setQty] = React.useState(1);

    // useEffect(() => {
    //     await getDetailPageData(productId);
    // }, []);

    React.useEffect(() => {
        getDetailPageData(productId);
    }, [productId]);

    const getDetailPageData = async (productId) => {
        let detailProducts = await ProductService.getDetailProductData(productId);
        setDetailProduct(detailProducts)
        setLoading(false)
    }

    const getQuantity = async () => {
        if (props.userInfo.token) {
            const shoppingcart = await CartService.getShoppingCart(
                props.userInfo.token
            );
            if (shoppingcart) {
                let quantity = shoppingcart.length;
                props.getCartQuantity(quantity)
            }
        }
    }


    const addProductToCart = async () => {

        // const profile = await UserService.getProfileData(this.props.userInfo.token);
        // const { profile: { email } } = profile;
        const email = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')).userName : null

        var tempProps = JSON.parse(JSON.stringify(detailProduct));
        tempProps.email = email;
        tempProps.quantity = qty;
        Object.preventExtensions(tempProps);

        setDetailProduct(tempProps)
        // setDetailProduct({ ...detailProduct,email: email})

        const productToCart = await CartService.addProduct(props.userInfo.token, tempProps)

        if (productToCart.errMessage) {
            return showErrorMessage(productToCart)
        } else {
            showSuccesMessage(productToCart)
            getQuantity()
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

        // props.sumProductInState();
    }

    const showSuccesMessage = (data) => {
        setAlert({ open: true, type: 'success', message: data })
        // Alert.success(data.message, {
        //     position: "top",
        //     effect: "scale",
        //     beep: true,
        //     timeout: 1500,
        // });
    }

    const showErrorMessage = (data) => {
        setAlert({ open: true, type: 'error', message: data.errMessage })
        // Alert.error(data.errMessage, {
        //     position: "top",
        //     effect: "scale",
        //     beep: true,
        //     timeout: 3000,
        // });
    }
    const handleClose = () => {
        setAlert({ open: false, type: 'error', message: '' })
    }
    const { loggedIn } = props.userInfo
    return (
        <div className="ProductContainerSectionMain">
            <Breadcrump parentPath='Products' parentUrl="/list/all-products" currentPath={detailProduct.name} />
            <div className="ProductContainerSection">
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
                {loading ? <LoadingSpinner /> :
                    <ProductDetails
                        loggedIn={loggedIn}
                        detailProductData={detailProduct}
                        addProductToCart={addProductToCart}
                        loadingRelated={loadingRelated}
                        relatedDetailProducts={relatedDetailProducts}
                        setQty={setQty}
                    />
                }
            </div>
            <hr className="mb-3" />
            {/* <Slider firstHeading="Explore Awesome Products" secondHeading="RECOMMENDED FOR YOU"/> */}
            {/* <hr className="m-0" /> */}
        </div>
    );
}
// }

const mapStateToProps = state => state.login;

const mapDispatchToProps = (dispatch) => ({
    getCartQuantity: (value) => dispatch(getCartQuantity(value)),
})

export default connect(mapStateToProps,mapDispatchToProps)(DetailContainer);