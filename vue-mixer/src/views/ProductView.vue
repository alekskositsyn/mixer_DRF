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
                        <div class="numprice">{{ product.price }} <font-awesome-icon icon="fa-solid fa-ruble-sign"
                                size="2xs">
                            </font-awesome-icon>
                        </div>
                        <div class="currancy"></div>
                    </div>
                    <div class="desc-product-deal"><strong> Описание: </strong>
                        <p>{{ product.description }}</p>
                    </div>
                    <div class="button_order_deal clearfix"><a href="#" class="button_red_deal">Купить</a></div>
                </div>
            </div>
        </div>
        <div class="hot_sale">
            <h3>Отличное предложение</h3>
            <div class="col-lg-12 products">
                <div class="row justify-content-center">
                    <div class="col-lg-3 col-md-6 ">
                        <div class="product border border-dark rounded-lg m-1 p-1">
                            <a href="{% url 'mainapp:product' product.pk %}" class="linkBuyProduct"><img
                                    :src=" product.image " alt="">
                                <div class="nameOfProduct">{{ product.name }}
                                </div>
                            </a>
                            <div class="numprice">{{ product.price }}<i class="currancy fas fa-ruble-sign"></i></div>
                            <a class="btn btn-danger" href="#">В корзину</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import store from '@/store'

export default {
    name: 'ProductView',
    props: ['id'],
    data() {
        return {
            product: {}
        }
    },
    created() {
        this.loadProduct()
    },
    methods: {
        async loadProduct() {
            this.product = await fetch(
                `${store.getters.getServerUrl}/products/${this.id}`
            ).then(response => response.json())
            console.log(this.product)
            console.log(this.id)

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