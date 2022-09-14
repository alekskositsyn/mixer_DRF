import Vue from 'vue'
import Vuex from 'vuex'
import jwt_decode from "jwt-decode";
import showPopUpMessage from './showPopUpMessage'
import axios from 'axios'
import basket from "@/store/modules/basket";
import products from "@/store/modules/products";
import auth from "@/store/modules/auth"


Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        showPopUpMessage,
        products,
        auth
    }
})