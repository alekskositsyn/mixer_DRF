<template>
    <div id="app">
        <Nav />
        <router-view />
        <Footer />
    </div>
</template>
<script>
import "bootstrap/dist/js/bootstrap.js"
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
export default {
    components: { Nav, Footer }
}
</script>
<style lang="css">
@import "bootstrap/dist/css/bootstrap.css";
@import "./assets/css/fontawesome.css";
@import "./assets/css/style.css";
</style>