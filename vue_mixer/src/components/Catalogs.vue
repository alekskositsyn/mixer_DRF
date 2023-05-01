<template>
  <div class="container">
    <header class="d-flex justify-content-center py-2">
      <ul class="nav nav-pills">
        <li class="nav-item"
            v-for="catalog in catalogs" :key="catalog.id">
          <a href="#"
             class="nav-link"
             :class="{active: catalogActive === catalog.id}"
             @click="getData(catalog.id)"
             aria-current="page"
          >{{ catalog.name }}</a>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "Catalogs",
  computed: mapState({
    catalogs: state => state.products.listCatalogs,
    categories: state => state.products.listCategory,
    catalogActive: state => state.products.catalogActive
  }),

  created() {
    this.$store.dispatch('products/getAllCatalogs')
    this.$store.dispatch('products/getAllCategory')

  },
  methods: {
    ...mapActions('products', {
      getProducts: 'getAllProducts',
      getCategory: 'getAllCategory',
    }),
    ...mapMutations('products', {
      setCatalogId: 'setActiveCatalog'
    }),
    getData(id) {
      this.setCatalogId(id)
      this.getProducts()
      this.getCategory(id)
    }
  }
}
</script>

<style scoped>

</style>