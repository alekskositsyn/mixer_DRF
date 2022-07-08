<template>
    <div class="home">
        <section class="ab-info-main py-md-5 py-4 editContent">
            <div class="container-fluid py-md-3">
                <div class="row">
                    <div class="side-bar col-lg-3">
                        <div class="search-bar w3layouts-newsletter">
                            <h3 class="sear-head editContent">Поиск товара</h3>
                            <form action="#" method="post" class="d-flex editContent">
                                <input type="search" placeholder="Введите название..." name="search"
                                    class="form-control" required="">
                                <button class="btn1 btn">
                                    <font-awesome-icon icon="fa-light fa-magnifying-glass"></font-awesome-icon>
                                </button>
                            </form>
                        </div>
                        <div class="left-side my-4">
                            <h3 class="sear-head editContent">Категории</h3>
                            <ul class="w3layouts-box-list">
                                <li class="editContent">
                                    <input type="checkbox" class="checked">
                                    <span class="span editContent">Красители</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="left-ads-display col-lg-9">
                        <div class="row">
                            <div class="col-md-4 product-men">
                                <div class="product-shoe-info editContent text-center mt-lg-4">
                                    <div class="men-thumb-item">
                                        <img src="bundles/images/s1.jpg" class="img-fluid" alt="">
                                    </div>
                                    <div class="item-info-product">
                                        <h4 class="">
                                            <a href="moviesingle.html" class="editContent">К звездам</a>
                                        </h4>
                                        <div class="product_price">
                                            <div class="grid-price">
                                                <span class="money editContent">«The Game Begins»</span>
                                            </div>
                                        </div>
                                        <ul class="stars">
                                            <li><a href="#">
                                                    <font-awesome-icon icon="fa-solid fa-star-sharp">
                                                    </font-awesome-icon>
                                                </a></li>
                                            <li><a href="#"><span class="fa fa-star" aria-hidden="true"></span></a></li>
                                            <li><a href="#"><span class="fa fa-star-half-o"
                                                        aria-hidden="true"></span></a></li>
                                            <li><a href="#"><span class="fa fa-star-half-o"
                                                        aria-hidden="true"></span></a></li>
                                            <li><a href="#"><span class="fa fa-star-o" aria-hidden="true"></span></a>
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

export default {
    name: 'HomeView',
    components: {
    }
}
</script>
<style scoped>
.editContent {
    padding-left: 3rem;
    padding-right: 3rem;
}
</style>
