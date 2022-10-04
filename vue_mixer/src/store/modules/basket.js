// import { calculateAmount, calculateTotal, copyFunc } from "@/function"


// initial state
// shape: [{ id, quantity }]
const state = () => ({
    items: [],
    countItems: 0,
    checkoutStatus: null
})

// getters
const getters = {
    cartProducts: (state, getters, rootState) => {
        return state.items.map(({id, quantityBasket}) => {
            const product = rootState.products.listProducts.find(product => product.id === id)
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                inventory: product.inventory,
                quantityBasket: quantityBasket,
                image: product.image
            }
        })
    },

    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantityBasket
        }, 0)
    }
}

// actions
const actions = {
    checkout({commit, state}, products) {
        const savedCartItems = [...state.items]
        commit('setCheckoutStatus', null)
        // empty cart
        commit('setCartItems', {items: []})
        // shop.buyProducts(
        //   products,
        //   () => commit('setCheckoutStatus', 'successful'),
        //   () => {
        //     commit('setCheckoutStatus', 'failed')
        //     // rollback to the cart saved before sending the request
        //     commit('setCartItems', { items: savedCartItems })
        //   }
        // )
    },

    addProductToCart({state, commit}, product) {
        commit('setCheckoutStatus', null)
        if (product.inventory > 0) {
            // commit('incrementCountItem')
            const cartItem = state.items.find(item => item.id === product.id)
            if (!cartItem) {
                commit('pushProductToCart', {id: product.id})
            } else {
                commit('incrementItemQuantity', cartItem)
            }
            commit('products/decrementProductInventory', {id: product.id}, {root: true})
        }
    },

    decreaseProductFromCart({state, commit}, product) {
        commit('setCheckoutStatus', null)
        const cartItem = state.items.find(item => item.id === product.id)
        if (cartItem.quantityBasket > 0) {
            console.log(cartItem.quantityBasket)
            commit('decrementItemQuantity', cartItem)
        }
        commit('products/incrementProductInventory', {id: product.id, quantity: 0}, {root: true})
    },

    delProductFromCart({state, commit}, product) {
        commit('setCheckoutStatus', null)
        const cartItem = state.items.find(item => item.id === product.id)
        commit('deleteItem', cartItem)
        commit('products/incrementProductInventory', {id: product.id, quantity: product.quantityBasket}, {root: true})

    }
}

// mutations
const mutations = {
    pushProductToCart(state, {id}) {
        state.items.push({
            id,
            quantityBasket: 1
        })
        state.countItems++
    },

    incrementItemQuantity(state, {id}) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantityBasket++
        state.countItems++

    },

    decrementItemQuantity(state, {id}) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantityBasket--
        state.countItems--
    },

    deleteItem(state, {id}) {
        const cartItem = state.items.find(item => item.id === id)
        state.countItems = state.countItems - cartItem.quantityBasket
        cartItem.quantityBasket = null
    },
    // incrementCountItem(state) {
    //     state.countItems++
    // },
    // incrementCountItem(state) {
    //     state.countItems++
    // },

    setCartItems(state, {items}) {
        state.items = items
    },

    setCheckoutStatus(state, status) {
        state.checkoutStatus = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
