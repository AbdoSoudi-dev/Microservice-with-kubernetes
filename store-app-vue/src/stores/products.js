import Vuex from "vuex";
import api from "../axios.js";

const store = new Vuex.Store({
    state () {
        return {
            products: [],
        }
    },
    getters:{
        getProducts(state){
            return state.products;
        },
    },
    actions:{
        async getProducts(context){
            try {
                const {data} = await api.get('products');
                context.commit('setProducts', data.products);
            } catch (error) {
                throw error
            }
        },
        async createProduct(context, product){
            try {
                const {data} = await api.post('products', product);
                return {
                    success: true
                }
            } catch (error) {
                return {
                    success: false,
                    errors: error.response.data.errors
                };
            }
        },
        async deleteProducts(context,ids){
            try {
                const {data} = await api.post(`products/delete`,{ids:ids});
                context.commit('setProducts', data.data);
            } catch (error) {
                throw error
            }
        },
    },
    mutations:{
        setProducts(state,data){
            state.products = data;
        },
    }
});

export default store;
