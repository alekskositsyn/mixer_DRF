<template>
  <div id="app">
    <Nav/>
    <Catalogs/>
    <router-view/>
    <Footer/>
  </div>
</template>
<script>
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
import Catalogs from "@/components/Catalogs";


export default {
  name: 'App',
  components: {Catalogs, Nav, Footer},

  beforeCreate() {
    this.$store.commit('auth/initializeStore')


    // const access = this.$store.state.access

    // if (access) {
    //   axios.defaults.headers.common['Authorization'] = "Bearer " + access
    // } else {
    //   axios.defaults.headers.common['Authorization'] = ""
    // }
  },
  mounted() {
    if (localStorage.username) {
      this.$store.commit('auth/setShopUserName_mutation', localStorage.username)
    }
    if (localStorage.getItem("basket")) {
      this.$store.commit('basket/getCartItems')
    }
    // Получение токена через 5 секунд
    // setInterval(() => {
    //   this.getAccess()
    // }, 5000)
  },
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
