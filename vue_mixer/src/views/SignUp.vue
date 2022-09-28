<template>
  <div class="singup">
    <main class="form-signin  m-auto">
      <form @submit.prevent="submitForm">
        <h1 v-if="errorMessage">{{ errorMessage }}</h1>
        <h1 class="h3 mb-3 fw-normal">Пожалуйста, зарегистрируйтесь</h1>
        <div class="form-floating">
          <input type="username" class="form-control" id="floatingUsername" placeholder="username"
                 v-model.trim="username">
          <label for="floatingUsername">Имя пользователя</label>
        </div>
        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                 v-model.trim="email">
          <label for="floatingInput">Email адрес</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Пароль"
                 v-model.trim="password">
          <label for="floatingPassword">Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary mt-2" type="submit">Регистрация</button>
        <router-link class="w-100 btn btn-lg btn-primary mt-2" to='/log-in'> Вход</router-link>

        <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
      </form>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SingUp',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      errorMessage: ''
    }
  },
  methods: {
    submitForm(e) {
      const formData = {
        username: this.username,
        password: this.password,
        email: this.email
      }

      axios
          .post('/auth/users/', formData)
          .then(response => {
            this.$router.push('/log-in')
            console.log(response)
          })
          .catch(error => {
            console.log(error)
            this.errorMessage = error.response.data.username[0]
          })
    }
  }
}
</script>
<style>
.form-signin {
  width: 40%;
}
</style>