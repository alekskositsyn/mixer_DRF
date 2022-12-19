// initial state
import store from '@/store/index.js';
import axios from "axios";

const state = () => ({
    items: [],
    countItems: 0,
    checkoutStatus: null
})

// getters
const getters = {
    cartProducts: (state, getters) => {
        return state.items.map(({id, quantityBasket}) => {
            const product = state.items.find(product => product.id === id)
            if (!product) {
                console.log(product)
                // dispatch('getOneProduct', {id: product.id}, {root: true})
                // console.log('Look in data base')
            }
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

    getCountBasketItems: (state, getters) => {
        return state.items.reduce((count, item) => {
            return count + item.quantityBasket
        }, 0)
    },

    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantityBasket
        }, 0)
        // return state.items.reduce((total, product) => {
        //     console.log(total,product)
        //     return total + product.price * product.quantityBasket
        // })
    }
}

// actions
const actions = {
    // checkout({commit, state}, products) {
    //     const savedCartItems = [...state.items]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', {items: []})
    //     // shop.buyProducts(
    //     //   products,
    //     //   () => commit('setCheckoutStatus', 'successful'),
    //     //   () => {
    //     //     commit('setCheckoutStatus', 'failed')
    //     //     // rollback to the cart saved before sending the request
    //     //     commit('setCartItems', { items: savedCartItems })
    //     //   }
    //     // )
    // },
    getOneProduct({commit}, {id}) {
        // console.log('get product id: ', id)
        axios
            .get(`/products/${id}`)
            .then(response => {
                commit('setOneCartItem', response.data)
            })
            .catch(error => console.log(error))

    },

    addProductToCart({state, commit}, product) {
        // commit('setCheckoutStatus', null)
        if (product.inventory > 0) {
            console.log(product.inventory)
            const cartItem = state.items.find(item => item.id === product.id)
            if (!cartItem) {
                console.log('Not in items')
                commit('pushProductToCart', {product})
            } else {
                console.log('In items')
                commit('incrementItemQuantity', cartItem)
            }
            // commit('products/decrementProductInventory', {id: product.id}, {root: true})
            commit('savedCartItems')

        }
    },

    decreaseProductFromCart({state, commit}, product) {
        commit('setCheckoutStatus', null)
        const cartItem = state.items.find(item => item.id === product.id)
        if (cartItem.quantityBasket > 0) {
            console.log(cartItem.quantityBasket)
            commit('decrementItemQuantity', cartItem)
        }
        // commit('products/incrementProductInventory', {id: product.id, quantity: 0}, {root: true})
    },

    delProductFromCart({state, commit}, product) {
        commit('setCheckoutStatus', null)
        const cartItem = state.items.find(item => item.id === product.id)
        commit('deleteItem', cartItem)
        commit('products/incrementProductInventory', {id: product.id, quantity: product.quantityBasket}, {root: true})

    },

    async createOrder({state, commit}) {
        console.log('Push order')
        const basketItems = {
            orderitems: [{
                product: 3,
                quantity: 1
            }],
            user: 25
        }
        const dataToSend = JSON.stringify(basketItems)
        axios
            .post('orders/create/', dataToSend)
            .then(response => {
                this.$router.push('/log-in')
                console.log(response)
            })
            .catch(error => {
            console.log(error)})

        console.log(dataToSend)

    }
}

// mutations
const mutations = {
    pushProductToCart(state, {product}) {
        state.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            inventory: product.inventory,
            quantityBasket: 1,
            image: product.image
        })
        state.countItems++
    },

    incrementItemQuantity(state, {id}) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantityBasket++
        state.countItems++
        console.log('Increment done!!!')

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

    setCartItems(state, {items}) {
        state.items = items
    },

    setOneCartItem(state, {items}) {
        state.items.push(items)
    },

    setCheckoutStatus(state, status) {
        state.checkoutStatus = status
    },

    savedCartItems(state) {
        const parsed = JSON.stringify(state.items)
        localStorage.setItem('basket', parsed)
    },

    getCartItems(state) {
        try {
            // const parsed =
            state.items = JSON.parse(localStorage.getItem('basket'))

        } catch (e) {
            console.log(e)
            localStorage.removeItem('basket')
        }

    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
