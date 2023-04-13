import axios from "axios";
import { ConfigService } from "./"
const qs = require('qs');
require('../helpers/errorsHandler');


const ProductService = { 

    async getHomePageData() {
        await ConfigService.loadSettings();
        const response = await axios.get(`${ConfigService._apiUrl}/products/landing`, ConfigService.HeadersConfig(), { errorHandle: false })
        return response;
    },

    async getCouponsPageData(token) {
        await ConfigService.loadSettings();
        const response = await axios.get(`${ConfigService._apiUrl}/coupons`, ConfigService.HeadersConfig(token), { errorHandle: false });
        return response;
    },

    async getFilteredProducts(filters = {}) {
        await ConfigService.loadSettings();
        
        filters.type = filters.type.type === undefined ? filters.type : filters.type.type;

        const params = {
            'params': filters,
            'paramsSerializer': qs.stringify(filters, { arrayFormat: 'repeat' })
        }
        const response = await axios.get(`${ConfigService._apiUrl}/products/?`+params.paramsSerializer, ConfigService.HeadersConfig(), { errorHandle: false });
        return response;
    },

    async getDetailProductData(productId) {
        await ConfigService.loadSettings();
        const response = await axios.get(`${ConfigService._apiUrl}/products/${productId}`, ConfigService.HeadersConfig(), { errorHandle: false });
        return response && response.data ? response.data : null;
    },

    async getRelatedProducts(formData, token) {
        await ConfigService.loadSettings();
        const response = await axios.post(`${ConfigService._apiUrl}/products/imageclassifier`, formData, ConfigService.HeadersConfig(token));
        return response.data;
    },

    async getSearchResults(term) {
        await ConfigService.loadSettings();
        const response = await axios.get(`${ConfigService._apiUrl}/Products/search/${term}`, ConfigService.HeadersConfig(), { errorHandle: false });
        return response.data;
    },
}

export default ProductService;