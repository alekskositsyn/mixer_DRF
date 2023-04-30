// initial state
import axios from "axios";

const state = () => ({
    listCategory: [],
    listProducts: [],
    listCatalogs: [],
    product: {},
    catalogActive: 1,
    totalPages: 0,
    total: 0
})

// getters
const getters = {}

// actions
const actions = {
    getAllProducts({state, commit}, page = 1) {
        axios
            .get(`catalog/${state.catalogActive}/products/?page=${page}`)
            .then(response => {
                commit('setProducts', response.data)
                commit('setTotalCountProducts', response.data)
                commit('setTotalPagesCountProducts', response.data)
            })
            .catch(error => console.log(error))
    },
    getAllCategory({commit}, id = 1) {
        axios
            .get(`/category/${id}/`)
            .then(response => {
                commit('setCategory', response.data)
            })
            .catch(error => console.log(error))
    },
    getAllCatalogs({commit}) {
        axios
            .get('/catalog/')
            .then(response => {
                commit('setCatalogs', response.data)
            })
            .catch(error => console.log(error))
    },
    getProductsCatalog({commit}, id) {
        axios
            .get(`/catalog/${id}/products/`)
            .then(response => {
                commit('setProducts', response.data)
                commit('setTotalCountProducts', response.data)
                commit('setTotalPagesCountProducts', response.data)
                commit('setActiveCatalog', id)
            })
            .catch(error => console.log(error))
    }
}

// mutations
const mutations = {
    setProducts(state, products) {
        state.listProducts = products.results
    },

    setTotalCountProducts(state, products) {
        state.total = products.count
    },

    setTotalPagesCountProducts(state) {
        const item = state.listProducts.length
        state.totalPages = Math.ceil(state.total / item)
    },

    setActiveCatalog(state, id) {
        state.catalogActive = id
    },

    setCategory(state, category) {
        state.listCategory = category.results
    },

    setCatalogs(state, catalogs) {
        state.listCatalogs = catalogs.results
    },

    incrementProductInventory(state, {id, quantity}) {
        const product = state.listProducts.find(product => product.id === id)
        console.log(quantity)
        if (quantity === 0) {
            product.inventory++
        } else {
            product.inventory = product.inventory + quantity
        }
    },

    decrementProductInventory(state, {id}) {
        const product = state.listProducts.find(product => product.id === id)
        product.inventory--
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}