<template>
  <div class="cart container row">
    <div class="left-side col-md-9">
      <h2>Ваша корзина</h2>
      <div v-show="products.length === 0" class="row">Корзина пуста</div>
      <div v-show="products.length > 0" class="">
        <div class="cart-product">
          <table class="table">
            <caption>Таблица заказа</caption>
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
            <tr v-show="product.quantityBasket !== null" v-for="product in products" :key="product.id">
              <td><img :src="product.image" class="img-basket" alt="">
              </td>
              <td>{{ product.name }}</td>
              <td>
                <el-button :disabled="!product.inventory" @click="addProduct(product)" class="icon-plus" size="mini"
                           round
                           icon="el-icon-plus"></el-button>
                {{ product.quantityBasket }}
                <el-button @click="decreaseProduct(product)" size="mini" round icon="el-icon-minus"></el-button>
              </td>
              <td>{{ product.price }}</td>
              <td>
                <el-button @click='deleteProduct(product)' type="danger" icon="el-icon-delete" circle></el-button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="right-side col-md-3">
      <h2 class="">Сумма:</h2>
      <h4 class="total">{{ total }}</h4>
      <el-button @click="checkout(user_id, products)" type="success" round>Оформить закзаз</el-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

export default {
  name: "Basket",
  computed: {
    ...mapState({
      // checkoutStatus: state => state.basket.checkoutStatus,
      user_id: state => state.auth.shopUserId,
      products: state => state.basket.items
    }),
    ...mapGetters('basket', {
      // products: 'cartProducts',
      total: 'cartTotalPrice',
    })
  },
  methods: {
    ...mapActions('basket', {
      addProduct: 'addProductToCart',
      decreaseProduct: 'decreaseProductFromCart',
      deleteProduct: 'delProductFromCart',
      checkout: 'checkout'
    }),
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