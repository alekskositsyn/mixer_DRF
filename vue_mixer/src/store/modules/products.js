// initial state
import axios from "axios";

const state = () => ({
    listCategory: [],
    listProducts: [],
    product: {},
    // page: 1,
    totalPages: 0,
    total: 0
})

// getters
const getters = {}

// actions
const actions = {
    getAllProducts({state, commit}, page=1) {
        axios
            .get(`/products?page=${page}`)
            .then(response => {
                commit('setProducts', response.data)
                commit('setTotalCountProducts', response.data)
                commit('setTotalPagesCountProducts', response.data)
            })
            .catch(error => console.log(error))
    },

    getAllCategory({commit}) {
        axios
            .get('/category/')
            .then(response => {
                commit('setCategory', response.data)
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

    setTotalPagesCountProducts(state, products) {
        const item = state.listProducts.length
        console.log(item)
        state.totalPages = Math.ceil(state.total / item)
    },

    setOneProduct(state, product) {
        state.listProducts.push(product)
    },

    setCategory(state, category) {
        state.listCategory = category.results
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