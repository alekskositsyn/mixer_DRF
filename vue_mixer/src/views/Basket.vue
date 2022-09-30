<template>
  <div class="cart container">
    <h2>Ваша корзина</h2>
    <div class="row">Корзина пуста</div>
    <div v-show="products.length > 0" class="left-side">
      <div class="cart-product">
        <table class="table">
          <caption>Таблица закозов</caption>
          <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Название</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Цена</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-show="product.quantityBasket >= 0" v-for="product in products" :key="product.id">
            <td><img :src="product.image" class="img-basket" alt="">
            </td>
            <td>{{ product.name }}</td>
            <td>
              <el-button @click="addProduct(product)" class="icon-plus" size="mini" round
                         icon="el-icon-plus"></el-button>
              {{ product.quantityBasket }}
              <el-button @click="delProduct(product)" size="mini" round icon="el-icon-minus"></el-button>
            </td>
            <td>{{ product.price }}</td>
            <td>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </td>
          </tr>
          </tbody>
        </table>
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
  computed: {
    ...mapState({
      checkoutStatus: state => state.basket.checkoutStatus
    }),
    ...mapGetters('basket', {
      products: 'cartProducts',
      total: 'cartTotalPrice',
      productsPrice: 'cartProductsPrice'
    })
  },
  methods: {
    ...mapActions('basket', {
      addProduct: 'addProductToCart',
      delProduct: 'delProductFromCart'
    }),
    checkout(products) {
      this.$store.dispatch('cart/checkout', products)
    },
  }
}
</script>

<style scoped>
.cart {
  margin: auto;
}

.icon-plus {
  margin-right: 10px;
}

.img-basket {
  height: 45px;
  width: 45px;
}
</style>