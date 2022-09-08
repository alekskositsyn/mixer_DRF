<template>
  <div id="app">
    <Nav />
    <router-view />
    <Footer />
    <!-- <router-link to="/sign-up">Sign Up</router-link> |
      <router-link to="/log-in">Log In</router-link> -->
  </div>
</template>
<script>
import axios from "axios";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";


export default {
  name: 'App',
  components: { Nav, Footer },

  beforeCreate() {
    this.$store.commit('initializeStore')

    const access = this.$store.state.access

    if (access) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + access
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  // mounted() {
  //   // Получение токена через 5 секунд
  //   // setInterval(() => {
  //   //   this.getAccess()
  //   // }, 5000) 
  // },
  methods: {
    // getAccess(e) {
    //   const accessData = {
    //     refresh: this.$store.state.refresh
    //   }

    //   // axios
    //   //   .post('/auth/jwt/refresh/', accessData)
    //   //   .then(response => {
    //   //     const access = response.data.access

    //   //     localStorage.setItem('access', access)
    //   //     this.$store.commit('setAccess', access)
    //   //   })
    //   //   .catch(error =>
    //   //     console.log(error)
    //   //   )
    // }
  }
}
</script>
<style>
</style>
