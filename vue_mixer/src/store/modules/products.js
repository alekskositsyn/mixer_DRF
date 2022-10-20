// initial state
import axios from "axios";

const state = () => ({
    listCategory: [],
    listProducts: [],
    product: {}
})

// getters
const getters = {}

// actions
const actions = {
    getAllProducts({commit}) {
        axios
            .get('/products/')
            .then(response => {
                commit('setProducts', response.data)
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
        state.listProducts = products
    },

    setOneProduct(state, product) {
        state.listProducts.push(product)
    },

    setCategory(state, category) {
        state.listCategory = category
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