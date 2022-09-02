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
                            <div v-for="product in listProducts" :key="product.id"
                                class="product col-md-2 product-men rounded-3 m-1 p-1 border shadow-lg">
                                <div class="product-shoe-info editContent text-center mt-lg-4">
                                    <a href="#" @click="goTo(product.id)" class="men-thumb-item">
                                        <img :src="product.image" class="img-fluid" alt="">
                                        <div class="nameOfProduct"> {{ product.name }} </div>
                                    </a>
                                    <div class="numprice">{{ product.price }} <font-awesome-icon
                                            icon="fa-solid fa-ruble-sign"></font-awesome-icon>
                                    </div>
                                    <a class="btn btn-danger" href="#">В корзину</a>
                                    <ul class="stars">
                                        <li v-for="star in listStar" :key="star">
                                            <a href="#" class="">
                                                <span>
                                                    <font-awesome-icon icon=""
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
        </section>
    </div>
</template>

<script>
import store from '@/store'
import axios from 'axios'

export default {
    name: 'Home',
    data() {
        return {
            listCategory: [],
            listProducts: [],
            listStar: [1, 2, 3, 4, 5]
        }
    },
    components: {},
    created() {
        this.loadListProducts(),
        this.loadListCategory()
    },
    methods: {
        loadListProducts() {
            axios
                .get('api/v1/products/')
                .then(response => {
                    this.listProducts = response.data
                })
                .catch(error => console.log(error))
        },
        loadListCategory() {
            axios
                .get('api/v1/category/')
                .then(response => {
                    this.listCategory = response.data
                })
                .catch(error => console.log(error))
        },
        // async loadListProducts() {
        //     this.listProducts = await fetch(
        //         `${store.getters.getServerUrl}/products`
        //     ).then(response => response.json())
        //     console.log(this.listProducts)
        // },
        // async loadListCategory() {
        //     this.listCategory = await fetch(
        //         `${store.getters.getServerUrl}/category`
        //     ).then(response => response.json())
        //     console.log(this.listProducts)
        // },
        goTo(id) {
            this.$router.push({ name: 'ProductView', params: { id: id } })
        }
    }
}
</script>
<style scoped>
.w3layouts-box-list {
    padding-left: 2rem;
}
</style>
