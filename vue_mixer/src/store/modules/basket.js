// initial state
import store from '@/store/index.js';
import axios from "axios";
import id from "element-ui/src/locale/lang/id";

const headers = {'Content-Type': 'application/json'}

const state = () => ({
    items: [],
    countItems: 0,
    checkoutStatus: null
})

// getters
const getters = {
    // cartProducts: (state, getters) => {
    //     return state.items.map(({id, quantityBasket}) => {
    //         const product = state.items.find(product => product.id === id)
    //         // console.log(product)
    //         if (!product) {
    //             // console.log(product)
    //             // dispatch('getOneProduct', {id: product.id}, {root: true})
    //             console.log('Look in data_base')
    //         }
    //         return {
    //             id: product.id,
    //             name: product.name,
    //             price: product.price,
    //             inventory: product.inventory,
    //             quantityBasket: quantityBasket,
    //             image: product.image
    //         }
    //     })
    // },

    getCountBasketItems: (state, getters) => {
        return state.items.reduce((count, item) => {
            return count + item.quantityBasket
        }, 0)
    },

    cartTotalPrice: (state, getters) => {
        // return getters.cartProducts.reduce((total, product) => {
        //     return total + product.price * product.quantityBasket
        // }, 0)
        return state.items.reduce((total, product) => {
            return total + product.price * product.quantityBasket
        }, 0)
    }
}
// actions
const actions = {
    async checkout({commit, state}, user_id) {
        const savedCartItems = state.items.map(({id, quantityBasket}) => {
            return {
                product: id,
                quantity: quantityBasket
            }
        })
        console.log(savedCartItems)
        console.log(user_id)
        if (savedCartItems && user_id) {
            const basketItems = {
                "user": user_id,
                "orderitems": savedCartItems,

            }
            const dataToSend = JSON.stringify(basketItems)
            console.log(dataToSend)

            axios
                .post('/orders/create/', dataToSend, {
                    headers: headers
                })
                .then(response => {
                    // response = JSON.parse(response)
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
            // dispatch('getOneProduct', {id: product.id}, {root: true})
            console.log('Look in data_base')
        }


        // commit('setCheckoutStatus', null)
        // empty cart
        // commit('setCartItems', {items: []})
        // shop.buyProducts(
        //   products,
        //   () => commit('setCheckoutStatus', 'successful'),
        //   () => {
        //     commit('setCheckoutStatus', 'failed')
        //     // rollback to the cart saved before sending the request
        //     commit('setCartItems', { items: savedCartItems })
        //   }
        // )
    }
    ,
    // getOneProduct({commit}, {id}) {
    //     // console.log('get product id: ', id)
    //     axios
    //         .get(`/products/${id}`)
    //         .then(response => {
    //             commit('setOneCartItem', response.data)
    //         })
    //         .catch(error => console.log(error))
    //
    // },

    addProductToCart({state, commit}, product) {
        // commit('setCheckoutStatus', null)
        if (product.inventory > 0) {
            // console.log(product.inventory)
            const cartItem = state.items.find(item => item.id === product.id)
            if (!cartItem) {
                console.log('Not in items')
                console.log(product)
                commit('pushProductToCart', {product})
            } else {
                console.log('In items')
                commit('incrementItemQuantity', cartItem)
            }
            // commit('products/decrementProductInventory', {id: product.id}, {root: true})
            commit('savedCartItems')

        }
    }
    ,

    decreaseProductFromCart({state, commit}, product) {
        commit('setCheckoutStatus', null)
        const cartItem = state.items.find(item => item.id === product.id)
        if (cartItem.quantityBasket > 0) {
            console.log(cartItem.quantityBasket)
            commit('decrementItemQuantity', cartItem)
        }
        // commit('products/incrementProductInventory', {id: product.id, quantity: 0}, {root: true})
    }
    ,

    delProductFromCart({state, commit}, product) {
        commit('setCheckoutStatus', null)
        const cartItem = state.items.find(item => item.id === product.id)
        console.log(`deleting ${cartItem.id}`)
        commit('deleteItem', product)


        // commit('products/incrementProductInventory', {
        //     id: product.id,
        //     quantity: product.quantityBasket
        // }, {root: true})

    }
    ,
// TODO сделать геттер для отправка заказа на сервер
    async createOrder(savedCartItems, user_id) {
        console.log('Push order')
        // const basketItems = {
        //     "orderitems": [
        //         {"product": 1, "quantity": 1}
        //     ],
        //     "user": 28
        // }
        const basketItems = {
            "orderitems": savedCartItems,
            "user": user_id
        }
        const dataToSend = JSON.stringify(basketItems)
        console.log(dataToSend)

        axios
            .post('/orders/create/', dataToSend)
            .then(response => {
                // response = JSON.parse(response)
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })


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
            images: product.images
        })
        state.countItems++
    },

    incrementItemQuantity(state, {id}) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantityBasket++
        state.countItems++
        // console.log('Increment done!!!')

    },

    decrementItemQuantity(state, {id}) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantityBasket--
        state.countItems--
    },

    deleteItem(state, product) {
        const cartItem = state.items.findIndex(item => item.id === product.id)
        state.items.splice(cartItem, 1)
        store.commit('basket/savedCartItems')
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
        console.log('saving')
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
