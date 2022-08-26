import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        backendUrl: "http://127.0.0.1:8000/api/v1",
        token: "",
        isAuthenticated: false,
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('token')) {
                state.token = localStorage.getItem('token')
                state.isAuthenticated = true
            } else {
                state.token = ""
                state.isAuthenticated = false
            }
        },
        setToken(state, token) {
            state.token = token
            state.isAuthenticated = true
        },
        removeToken(state, token) {
            state.token = ""
            state.isAuthenticated = false
        }
    },
    actions: {},
    modules: {},
    getters: {
        getServerUrl: state => {
            return state.backendUrl
        }
    }
});

export default store

