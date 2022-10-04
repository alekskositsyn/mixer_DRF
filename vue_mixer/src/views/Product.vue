<template>
  <div class="container">
    <div class="product-deal">
      <div class="row justify-content-center">
        <div class="col-lg-4 leftside"><img :src="product.image" alt=""></div>
        <div class="col-lg-4 rightside">
          <div class="nameProduct">
            <h2>{{ product.name }}</h2>
          </div>
          <div class="price">
            <div class="numprice">{{ product.price }}
              <font-awesome-icon icon="fa-solid fa-ruble-sign"
                                 size="2xs">
              </font-awesome-icon>
            </div>
            <div class="currancy"></div>
          </div>
          <div class="desc-product-deal"><strong> Описание: </strong>
            <p>{{ product.description }}</p>
          </div>
          <el-button :disabled="!product.inventory" @click="addProduct(product)" type="danger">В
            корзину
          </el-button>
        </div>
      </div>
      <Review :reviews="product_reviews" :product="product.id" @reLoad="loadReviews"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Review from '../components/Review'
import {mapActions} from "vuex";

export default {
  name: 'Product',
  components: {Review},
  data() {
    return {
      product: {},
      product_reviews: {}
    }
  },
  async beforeCreate() {
    const product_id = this.$route.params.id
    const product_item = await axios.get(`/products/${product_id}`)
    this.product = product_item.data
  },
  created() {
    this.loadReviews()
  }
  ,
  methods: {
    ...mapActions({
      addProduct: 'basket/addProductToCart',
    }),
    async loadReviews() {
      axios
          .get(`/product/reviews/${this.id}`)
          .then(response => {
            console.log(response)
            this.product_reviews = response.data
          })
          .catch(error => console.log(error))
    }
  }
}
</script>

<style>
.single {
  outline: none;
  outline-offset: -2px;
  cursor: inherit;
  color: rgb(33, 37, 41);
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0);
  font-family: Lato, sans-serif;
}

.editContent {
  outline: none;
  cursor: inherit;
}

.li-product {
  list-style: none;
}
</style>