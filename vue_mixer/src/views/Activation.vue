<template>
    <div class="login">

        <h1 v-if="activationStatus">Поздравляю вы активировали аккаунт!</h1>
        <h1 v-if="!activationStatus">Устаревший токен для данного пользователя.</h1>
        <router-link class="btn btn-primary" to='/log-in'> Вход на сайт. </router-link>

    </div>
</template>

<script>
import { faL } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default {
    name: 'Activation',
    data() {
        return {
            activationStatus: false

        }
    },
    async created() {
        let uid = this.$route.query.mixer.split("___")[1]
        let token = this.$route.query.mixer.split("___")[2]
        const activationData = {
            uid: uid,
            token: token
        }
        // console.log(activationData)

        axios
            .post('auth/users/activation/', activationData)
            .then(response => {
                if (response.status === '204') {
                    this.activationStatus = true
                }
                console.log(response.status)
            })
            .catch(error => { console.log(error) })
    }
}
</script>