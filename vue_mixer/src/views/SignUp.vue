<template>
    <div class="singup">
        <h1>Регистрация</h1>
        <form @submit.prevent="submitForm">
            <input type="username" name="username" v-model="username">
            <input type="password" name="password" v-model="password">
            <input type="email" name="email" v-model="email">
            <button type="submit">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
// import { error } from 'console'

export default {
    name: 'SingUp',
    data() {
        return {
            username: '',
            password: '',
            email: ''
        }
    },
    methods: {
        submitForm(e) {
            const formData = {
                username: this.username,
                password: this.password,
                emal: this.email
            }

            axios
                .post('/api/v1/users/', formData)
                .then(response => {
                    this.$router.push('/log-in')
                    console.log(response)
                })
                // .catch(error => {
                //     console.log(error)
                // })
        }
    }
}
</script>