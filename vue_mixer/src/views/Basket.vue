<template>
  <div class="cart">
    <h2>Ваша корзина</h2>
    <div class="left-side">
      <div class="cart-product">
        <div class="row">
          <div v-for="product in products" :key="product.id" class="col-md-2">
            <div class="productCard">
              <div class=" product product-men rounded-3 border shadow">
                <a href="#" @click="goTo(product.id)" class="linkBuyProduct">
                  <img :src="product.image" class="img-fluid" alt="">
                  <div class="nameOfProduct"> {{ product.name }}</div>
                </a>
                <div class="numprice">{{ product.price }}
                  <font-awesome-icon
                      icon="fa-solid fa-ruble-sign"></font-awesome-icon>
                </div>
                <a class="btn btn-danger" href="#" @click="addProductToCart(product)">В корзину</a>
                <ul class="stars stars-ul">
                  <li v-for="star in listStar" :key="star">
                    <a href="#" class="">
                          <span>
                              <font-awesome-icon
                                  :icon="star <= product.middle_rating ? 'fa-solid fa-star' : 'fa-regular fa-star'">
                              </font-awesome-icon>
                          </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="right-side">
      <h2 class="">Сумма:</h2>
      <h4 class="total">{{ total }}</h4>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: "Basket",
    data() {
    return {
      popUP: false,
      listStar: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    ...mapState({
      checkoutStatus: state => state.basket.checkoutStatus
    }),
    ...mapGetters('basket', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    })
  },
  methods: {
    ...mapActions('basket', [
      'addProductToCart'
    ]),
    checkout(products) {
      this.$store.dispatch('cart/checkout', products)
    }
  }
}
</script>

<style scoped>

</style>