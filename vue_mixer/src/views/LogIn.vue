<template>
  <div class="login">
    <h1>Авторизация</h1>
    <form @submit.prevent="submitForm">
      <input type="username" name="username" v-model="username" placeholder="username">
      <input type="password" name="password" v-model="password" placeholder="password">
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import axios from 'axios'

export default {
  name: 'LogIn',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['setAccess']),
    submitForm(e) {
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('access')

      const formData = {
        username: this.username,
        password: this.password
      }

      axios
        .post('/auth/jwt/create', formData)
        .then(
          response => {
            console.log(response)

            const access = response.data.access
            const refresh = response.data.refresh

            this.$store.commit('setAccess', access)
            this.$store.commit('setRefresh', refresh)

            axios.defaults.headers.common['Authorization'] = "JWT " + access
            localStorage.setItem("access", access)
            localStorage.setItem("refresh", refresh)
            this.$router.push('/')
          }
        )
        .catch(error => {
          console.log(error)
        })
    }
  }

}
</script>