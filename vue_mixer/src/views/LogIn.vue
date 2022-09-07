<template>
    <div class="login form-signin m-auto">
        <main class="m-auto">
            <form @submit.prevent="submitForm">
                <h1 class="h3 mb-3 fw-normal">Авторизация</h1>
                <h1 v-if="errorMessage">{{ errorMessage }}</h1>

                <div class="form-floating">
                    <input type="username" class="form-control" name="username" v-model="username"
                        placeholder="username">
                    <label for="floatingUsername">Логин</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" name="password" v-model="password"
                        placeholder="password">
                    <label for="floatingUsername">Пароль</label>
                </div>
                <!-- <button class="w-100 btn btn-lg btn-primary" type="submit">Войти</button> -->
                <el-button native-type="submit" :loading="loading">
                    Войти
                </el-button>

            </form>
        </main>

    </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'


export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            loading: false
        }
    },
    methods: {
        ...mapActions({
            createToken: "createToken",
        }),
        async submitForm(e) {
            this.loading = true;
            const formData = {
                username: this.username,
                password: this.password
            }
            const result = await this.createToken(formData);
            this.loading = false;
            if (!result.error) {
                const dataForPopUpMessage = {
                    message: this.username + ", добро пожаловать 😘",
                    customClass: "element-ui-message__success",
                    type: "success",
                };
                await this.$store.dispatch("popUpMessage", dataForPopUpMessage);
                this.username = "";
                this.password = "";
                this.$router.push('/');
            };
        }
        // submitForm(e) {
        //     axios.defaults.headers.common['Authorization'] = ''
        //     localStorage.removeItem('access')

        //     const formData = {
        //         username: this.username,
        //         password: this.password
        //     }
        //     console.log(formData)

        //     axios
        //         .post('/auth/jwt/create', formData)
        //         .then(
        //             response => {
        //                 console.log(response)

        //                 const access = response.data.access
        //                 const refresh = response.data.refresh

        //                 this.$store.commit('setAccess', access)
        //                 this.$store.commit('setRefresh', refresh)
        //                 this.$store.commit('setShopUser',this.username)

        //                 axios.defaults.headers.common['Authorization'] = "JWT " + access
        //                 localStorage.setItem("access", access)
        //                 localStorage.setItem("refresh", refresh)

        //                 this.$router.push('/')
        //             }
        //         )
        //         .catch(error => {
        //             console.log(error)
        //             this.errorMessage = error.response.data.detail
        //         })
        // }
    },

}
</script>