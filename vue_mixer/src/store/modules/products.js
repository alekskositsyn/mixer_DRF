// initial state
import axios from "axios";
import store from '@/store/index.js';


const state = () => ({
    listCategory: [],
    listProducts: [],
    listCatalogs: [],
    product: {},
    catalogActive: 1,
    total: 0,
    page: 1,
    categoriesId: ''
})

// getters
const getters = {}

// actions
const actions = {
    getAllProducts({state, commit}, page = 1) {
        axios
            .get(`catalog/${state.catalogActive}/products/?categories=${state.categoriesId}&page=${page}`)
            .then(response => {
                commit('setProducts', response.data)
                store.commit('pagination/setTotalCountProducts', response.data)
                store.commit('pagination/setTotalPagesCountProducts', response.data)
                store.commit('pagination/setCurrentPage', page)
                store.commit('pagination/setStartPage', page)
            })
            .catch(error => console.log(error))
    },
    getAllCategory({state, commit}) {
        axios
            .get(`/category/${state.catalogActive}/`)
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
    }
}

// mutations
const mutations = {
    setProducts(state, products) {
        state.listProducts = products.results
    },
    setCategoriesId(state, id) {
        state.categoriesId = id.join()
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
        // console.log(quantity)
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