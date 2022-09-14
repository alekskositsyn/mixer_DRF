// initial state
import axios from "axios";

const state = () => ({
    listCategory: [],
    listProducts: [],
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
                console.log(response.data);

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
    setCategory(state, category) {
        state.listCategory = category
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