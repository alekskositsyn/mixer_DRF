import Vue from 'vue'
import Vuex from 'vuex'
import showPopUpMessage from './showPopUpMessage'
import products from "@/store/modules/products";
import auth from "@/store/modules/auth"
import basket from "@/store/modules/basket"
import pagination from "@/store/modules/pagination";


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        showPopUpMessage,
        products,
        auth,
        basket,
        pagination
    }
})

export default store