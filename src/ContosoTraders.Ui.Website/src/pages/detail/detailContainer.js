import React, { useCallback } from "react";
import { connect } from 'react-redux';

// import { animateScroll as scroll } from "react-scroll";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
// import Alert from "react-s-alert";

// import Detail from "./detail";
// import CartService from "../../services";
import { ProductService, CartService } from '../../services';
import ProductDetails from "./productDetails";
import Breadcrump from "../../components/breadcrumb/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { getCartQuantity } from "../../actions/actions";
// import Slider from "../home/components/slider/slider";
import './detail.scss'

function DetailContainer(props) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [detailProduct, setDetailProduct] = React.useState({})
    const [loadingRelated, setLoadingRelated] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [alert, setAlert] = React.useState({ open: false, type: 'error', message: '' })
    const relatedDetailProducts = []
    const [qty, setQty] = React.useState(1);


    const getDetailPageData = useCallback( async (productId) => {
        let detailProducts = await ProductService.getDetailProductData(productId);
        if(detailProducts){
            setDetailProduct(detailProducts)
        }else{
            navigate('/product-not-found');
        }
        setLoading(false)
    },[navigate]);

    React.useEffect(() => {
        getDetailPageData(productId);
    }, [productId, getDetailPageData]);


    const getQuantity = async () => {
        if (props.userInfo.token) {
            const shoppingcart = await CartService.getShoppingCart(
                props.userInfo.token
            );
            if (shoppingcart) {
                let quantity = shoppingcart.length;
                props.getCartQuantity(quantity)
            }
        }else{
            let cartItem = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items')) : []
            let quantity = cartItem.length;
            props.getCartQuantity(quantity)
        }
    }


    const addProductToCart = async () => {
        var tempProps = JSON.parse(JSON.stringify(detailProduct));
        if(!loggedIn){
            let cartItem = {
                imageUrl: detailProduct.imageUrl,
                name: detailProduct.name,
                price: detailProduct.price,
                productId: detailProduct.id,
                quantity: qty,
                type: detailProduct.type
            }
            let arr = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items')) : []
            let objIndex = arr.findIndex((obj => obj.productId === detailProduct.id));
            if(objIndex === -1){
                arr.push(cartItem)
                localStorage.setItem('cart_items',JSON.stringify(arr))
                showSuccesMessage(`Added ${detailProduct.name} to Cart`)
            }else{
                showErrorMessage({errMessage : `Already Added to Cart`})
            }
            setLoadingRelated(true)
            getQuantity()
        }else{

            const email = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')).userName : null

            tempProps.email = email;
            tempProps.quantity = qty;
            Object.preventExtensions(tempProps);

            setDetailProduct(tempProps)


            const productToCart = await CartService.addProduct(props.userInfo.token, tempProps)

            if (productToCart.errMessage) {
                return showErrorMessage(productToCart)
            } else {
                showSuccesMessage(productToCart)
                getQuantity()
            }
        }

        // setLoadingRelated(true)

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
                <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={alert.open} autoHideDuration={6000} onClose={handleClose}>
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