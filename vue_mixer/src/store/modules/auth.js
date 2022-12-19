import jwt_decode from "jwt-decode";
import axios from 'axios'

// initial state

const state = () => ({
    access: "",
    refresh: "",
    shopUserId: "",
    shopUserName: "",
    isAuthenticated: false
})

// getters

const getters = {}

const mutations = {
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
    }
    ,
    setRefresh_mutation(state, refresh) {
        state.refresh = refresh
    }
    ,
    setShopUserId_mutation(state, user_id) {
        state.shopUserId = user_id
    }
    ,
    setShopUserName_mutation(state, username) {
        state.shopUserName = username
        localStorage.username = username
    }
    ,
    logout_mutation(state) {
        state.access = ''
        state.refresh = ''
        state.shopUserId = ''
        state.shopUserName = ''
        state.isAuthenticated = false
        localStorage.clear()
    }
}
const actions = {
    async createToken({commit}, payload) {
        try {
            const {
                data
            } = await axios.post("/auth/token/", payload);
            // console.log(data)

            if (data.access) {
                const jwtDecoded = jwt_decode(data.access);
                commit("setAccess_mutation", data.access);
                commit('setRefresh_mutation', data.refresh);

                commit("setShopUserId_mutation", jwtDecoded.user_id);
                commit('setShopUserName_mutation', payload.username);

                localStorage.setItem("access", data.access)
                localStorage.setItem("refresh", data.refresh)
                // sessionStorage.setItem("username", payload.username)
            }
        } catch (e) {
            console.log(e)
            return {
                error: true,
                errorMessage: e.response.data.detail,
            };
        }
        return {
            error: false,
            isAuthenticated: true,
        };
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
