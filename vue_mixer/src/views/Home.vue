<template>
  <div class="home container">
    <section class="ab-info-main py-md-5 py-4 editContent">
      <div class="container-fluid py-md-3">
        <div class="row">
          <div class="side-bar col-lg-2">
            <div class="left-side my-4">
              <h3 class="sear-head editContent">Категории</h3>
              <ul class="w3layouts-box-list">
                <li v-for="category in categories" :key="category.id" class="editContent">
                  <label>
                    <input type="checkbox"
                           :value="category.id"
                           v-model="selectedCategories"
                           class="checked"
                    >
                    {{ category.name }}
                  </label>
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
                      <img :src="product.images[0].image" class="img-fluid" alt="">
                      <div class="nameOfProduct"> {{ product.name }}</div>
                    </a>
                    <div class="numprice">{{ product.price }}
                      <font-awesome-icon
                          icon="fa-solid fa-ruble-sign"></font-awesome-icon>
                    </div>
                    <el-button :disabled="!product.inventory" @click="addProduct(product)" type="danger">В
                      корзину
                    </el-button>
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
            <Pagination
                @pagechanged="onPageChange"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {mapState, mapActions, mapMutations} from 'vuex'


export default {
  name: 'Home',

  data() {
    return {
      popUP: false,
      listStar: [1, 2, 3, 4, 5],
      currentPage: 1,
      selectedCategories: []
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.listProducts,
      categories: state => state.products.listCategory,
      catalog: state => state.products.catalogActive
    })
  },
  components: {Pagination},
  created() {
    this.$store.dispatch('products/getAllProducts')
  },
  methods: {
    ...mapActions({
      addProduct: 'basket/addProductToCart',
      getAllProducts: 'products/getAllProducts',
      getProductsByCategory: 'products/getProductsByCategory'
    }),
    ...mapMutations({
      setCategoriesId: 'products/setCategoriesId'
    }),

    goTo(id) {
      this.$router.push({path: `/products/${id}`})
    },
    onPageChange(page) {
      this.getAllProducts(page)
    }
  },
  watch: {
    selectedCategories: {
      handler: function () {
        const formData = this.selectedCategories
        this.setCategoriesId(formData)
        this.getAllProducts()
      },
      deep: true,
    }
  }
}
</script>
<style scoped>
.stars-ul {
  padding-left: 0;
}

.w3layouts-box-list {
  padding-left: 2rem;
}
</style>
