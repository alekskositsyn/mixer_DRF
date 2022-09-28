

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
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.listProducts.find(product => product.id === id)
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

// actions
const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
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

  addProductToCart ({ state, commit }, product) {
    commit('setCheckoutStatus', null)
    if (product.quantity > 0) {
      commit('incrementCountItem')
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToCart', { id: product.id })
      } else {
        commit('incrementItemQuantity', cartItem)
      }
    }
  }
}

// mutations
const mutations = {
  pushProductToCart (state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  },

  incrementItemQuantity (state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },

  incrementCountItem (state) {
    state.countItems++
  },

  setCartItems (state, { items }) {
    state.items = items
  },

  setCheckoutStatus (state, status) {
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
