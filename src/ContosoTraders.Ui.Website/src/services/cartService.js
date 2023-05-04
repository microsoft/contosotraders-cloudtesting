import axios from "axios";
import { ConfigService } from "./"
require('../helpers/errorsHandler');

const CartService = {
    async getShoppingCart(token) {
        await ConfigService.loadSettings();
        if (ConfigService._byPassShoppingCartApi) {
            const items = await ConfigService._shoppingCartDao.find(token);
            return items;
        }

        try {
            const response = await axios.get(`${ConfigService._apiUrlShoppingCart}/shoppingcart`, ConfigService.HeadersConfig(token));
            return response.data;
        } catch(e) {
            return null;
        }
    },

    async postProductToCart(token, detailProduct) {
        const products = await this.getShoppingCart(token);

        const product = products.find(product => product.id === detailProduct.id);
        if (product) {
            return this.updateQuantity(product._cdbid, product.qty + 1, token)
                .then(() => ({message: "Product added on shopping cart"}))
                .catch(() => ({ errMessage: "The product could not be added to the cart" }))
        }

        return this.addProduct(token, detailProduct);
    },

    async addProduct(token, detailProduct) {
        await ConfigService.loadSettings();

        const productInfo = {
            id: detailProduct.id,
            name: detailProduct.name,
            price: detailProduct.price,
            imageUrl: detailProduct.imageUrl,
            email: detailProduct.email,
            typeid: detailProduct.type.id
        };

        const cartItems = {
            "cartItemId": Math.floor(Math.random() * 1000).toString(),
            "email": detailProduct.email.toLowerCase(),
            "productId": detailProduct.id,
            "name": detailProduct.name,
            "price": detailProduct.price,
            "imageUrl": detailProduct.imageUrl,
            "quantity": detailProduct.quantity,
        };

        const dataToPost = { detailProduct: productInfo, qty: detailProduct.quantity };

        if (ConfigService._byPassShoppingCartApi) {
            await ConfigService._shoppingCartDao.addItem(dataToPost);
            return { message: "Product added on shopping cart" };
        }

        const addProduct = axios.post(`${ConfigService._apiUrlShoppingCart}/shoppingcart`, cartItems, ConfigService.HeadersConfig(token))
            .then((response) => {
                return response.data;
            })
            .catch(() => {
                return { errMessage: "The product could not be added to the cart" }
            })

        return addProduct;
    },

    async getRelatedDetailProducts(token, typeid = {}) {
        await ConfigService.loadSettings();
        const response = await axios.get(`${ConfigService._apiUrlShoppingCart}/shoppingcart/relatedproducts/?type=${typeid}`, ConfigService.HeadersConfig(token));
        return response.data[0];
    },

    async updateQuantity(detailProduct, qty, token) {
        await ConfigService.loadSettings();

        const product = {
            "cartItemId": detailProduct.cartItemId,
            "email": detailProduct.email,
            "productId": detailProduct.productId,
            "name": detailProduct.name,
            "price": detailProduct.price,
            "imageUrl": detailProduct.imageUrl,
            "quantity": qty,
        };

        const response = await axios.put(`${ConfigService._apiUrlShoppingCart}/shoppingcart/product`, product, ConfigService.HeadersConfig(token));
        return response;
    },

    async deleteProduct(detailProduct, token) {
        await ConfigService.loadSettings();

        let config = ConfigService.HeadersConfig(token);
        config.data = {
            // id: id,
            "cartItemId": detailProduct.cartItemId,
            "email": detailProduct.email,
            "productId": detailProduct.productId,
            "name": detailProduct.name,
            "price": detailProduct.price,
            "imageUrl": detailProduct.imageUrl,
            "quantity": detailProduct.qty,
        }
        // const product = {
        // };
        const response = await axios.delete(`${ConfigService._apiUrlShoppingCart}/shoppingcart/product`, config);
        return response;
    }
}


export default CartService;