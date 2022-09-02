<template>
    <div class="singup">
        <!-- <main class="form-signin  m-auto"> -->
            <form @submit.prevent="submitForm">
                <img class="mb-4" src="../assets/logo.png" alt="" width="72" height="72">
                <h1 class="h3 mb-3 fw-normal">Пожалуйста, зарегистрируйтесь</h1>
                <div class="form-floating">
                    <input type="email" class="form-control" id="floatingUsername" placeholder="username" v-model.trim="username">
                    <label for="floatingUsername">Login</label>
                </div>
                <!-- <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model.trim="email">
                    <label for="floatingInput">Email address</label>
                </div> -->
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model.trim="password">
                    <label for="floatingPassword">Password</label>
                </div>


                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
            </form>
        <!-- </main> -->
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
            // email: ''
        }
    },
    methods: {
        submitForm(e) {
            const formData = {
                username: this.username,
                password: this.password,
                // email: this.email
            }

            axios
                .post('/api/v1/auth/users/', formData)
                .then(response => {
                    this.$router.push('/log-in')
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
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