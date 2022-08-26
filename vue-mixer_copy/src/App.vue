<template>
    <div id="app">
        <Nav />
        <router-view />
        <Footer />
    </div>
</template>
<script>
import "./assets/js/bootstrap.js"
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
import axios from 'axios'
// import store from '@/store'


export default {
    name: App,
    beforeCreate() {
        this.$store.commit('initializeStore')
        const token = this.$store.state.token

        if (token) {
            axios.defaults.headers.common['Authorization'] = "Token" + token
        } else {
            axios.defaults.headers.common['Authorization'] = ""

        }
    },

    components: { Nav, Footer }
}
</script>
<style lang="css">
@import "bootstrap/dist/css/bootstrap.css";
@import "./assets/css/fontawesome.css";
@import "./assets/css/style.css";
</style>