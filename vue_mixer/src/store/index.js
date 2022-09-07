import Vue from 'vue'
import Vuex from 'vuex'
import jwt_decode from "jwt-decode";
import showPopUpMessage from './showPopUpMessage'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        access: "",
        refresh: "",
        shopUserId: "",
        shopUserName: "",
        isAuthenticated: false
    },
    getters: {},
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('access')) {
                state.access = localStorage.getItem('access')
                state.refresh = localStorage.getItem('refresh')
                state.isAuthenticated = true
            } else {
                state.access = ''
                state.refresh = ''
            }
        },
        setAccess_mutation(state, access) {
            state.access = access
            state.isAuthenticated = true
        },
        setRefresh_mutation(state, refresh) {
            state.refresh = refresh
        },
        setShopUserId_mutation(state, user_id) {
            state.shopUserId = user_id
        },
        setShopUserName_mutation(state, username) {
            state.shopUserName = username
        },
        logout_mutation(state) {
            state.access = '',
                state.refresh = '',
                state.shopUserId = '',
                state.isAuthenticated = ''
        }
    },
    actions: {
        async createToken({
            commit
        }, payload) {
            try {
                const {
                    data
                } = await axios.post("/auth/jwt/create", payload);
                console.log(data)

                if (data.access) {
                    const jwtDecoded = jwt_decode(data.access);
                    commit("setAccess_mutation", data.access);
                    commit('setRefresh_mutation', data.refresh);

                    commit("setShopUserId_mutation", jwtDecoded.user_id);
                    commit('setShopUserName_mutation', payload.username);

                    localStorage.setItem("access", data.access)
                    localStorage.setItem("refresh", data.refresh)
                }
            } catch (e) {
                // console.log(e)
                // console.log(e.response.data)
                // errorMessage = e.response.data.detail
                return {
                    error: true,
                    errorMessage: e.response.data.detail,
                    // isAuthenticated: !(
                    //   e.response.data.non_field_errors[0] ===
                    //   "Unable to log in with provided credentials."
                    // ),
                };
            }
            return {
                error: false,
                isAuthenticated: true,
            };
        },
    },
    modules: {
        showPopUpMessage
    }
})