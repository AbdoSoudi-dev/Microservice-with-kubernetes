import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
    state () {
        return {
            items: {},
        }
    },
    getters:{
        getCartItems(state){
            return state.items;
        },
    },
    actions:{
        addCartItem(context, product){
            context.commit('addItem', product);
        },
        removeCartItem(context, product){
            context.commit('removeItem', product);
        },
        emptyCart(context){
            context.commit('clearCart');
        }
    },
    mutations:{
        addItem(state, product){
            if(state.items[product._id] === undefined){
                state.items[product._id] = product;
                state.items[product._id].quantity = 1
            }else{
                state.items[product._id].quantity++;
            }
        },
        removeItem(state, product){
            if(state.items[product._id] === undefined){
                return;
            }else if(state.items[product._id].quantity === 1){
                delete state.items[product._id];
            }else{
                state.items[product._id].quantity--;
                if(state.items[product._id].quantity === 0){
                    delete state.items[product._id];
                }
            }
        },
        clearCart(state,){
            state.items = {};
        }
    },
    plugins: [createPersistedState()]
});

export default store;
