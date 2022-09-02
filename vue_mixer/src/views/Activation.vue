<template>
  <div class="login">
    <h1>Поздравляю вы активировали аккаунт!</h1>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Activation',
  async created() {
    let uid = this.$route.query
    // let token = this.$route.query.murr_code.split("___")[2];
    console.log(uid)
    // console.log(token)

  }
}
</script>