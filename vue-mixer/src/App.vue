<template>
    <div id="app">
        <Nav />
        <router-view />
        <Footer />
    </div>
</template>
<script>
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
export default {
    components: { Nav, Footer }
}
</script>
<style lang="css">
@import "./assets/css/bootstrap.css";
@import "./assets/css/fontawesome.css";
@import "./assets/css/style.css";
</style>