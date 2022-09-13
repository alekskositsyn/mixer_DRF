<template>
  <div class="home container">
    <section class="ab-info-main py-md-5 py-4 editContent">
      <div class="container-fluid py-md-3">
        <div class="row">
          <div class="side-bar col-lg-2">
            <div class="left-side my-4">
              <h3 class="sear-head editContent">Категории</h3>
              <ul class="w3layouts-box-list">
                <li v-for="category in listCategory" :key="category.id" class="editContent">
                  <input type="checkbox" class="checked">
                  <span class="span editContent">{{ category.name }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="left-ads-display col-lg-10">
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
                    <a class="btn btn-danger" href="#">В корзину</a>
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
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'


export default {
  name: 'Home',
  data() {
    return {
      popUP: false,
      // listCategory: [],
      // listProducts: [],
      listStar: [1, 2, 3, 4, 5]
    }
  },
  computed: mapState({
    products: state => state.products.listProducts,
  }),
  components: {},
  created() {
    this.$store.dispatch('products/getAllProducts')
    // this.loadListProducts(),
    //     this.loadListCategory()
  },
  methods: {
    // loadListProducts() {
    //     axios
    //         .get('/products/')
    //         .then(response => {
    //             this.listProducts = response.data
    //         })
    //         .catch(error => console.log(error))
    // },
    // loadListCategory() {
    //     axios
    //         .get('/category/')
    //         .then(response => {
    //             this.listCategory = response.data
    //         })
    //         .catch(error => console.log(error))
    // },
    goTo(id) {
      this.$router.push({name: 'ProductView', params: {id: id}})
    }
  }
}
</script>
<style scoped>
.stars-ul {
  padding-left: 0%;
}

.w3layouts-box-list {
  padding-left: 2rem;
}
</style>
