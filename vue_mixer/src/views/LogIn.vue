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
    submitForm(e) {
      const formData = {
        username: this.username,
        password: this.password
      }

      axios
        .post('api/v1/auth/token/login/', formData)
        .then(
          response => {
            console.log(response)

            const token = response.data.auth_token
            this.$store.commit('setToken', token)
            axios.defaults.headers.common['Authorization'] = "Token " + token
            localStorage.setItem("token", token)
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