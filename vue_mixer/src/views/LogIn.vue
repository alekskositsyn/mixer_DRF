<template>
    <div class="login form-signin m-auto">
        <main class="m-auto">
            <form @submit.prevent="submitForm">
                <h1 class="h3 mb-3 fw-normal">Авторизация</h1>
                <h4 v-if="errorMessage">{{ errorMessage }}</h4>
                <div class="form-floating mt-2">
                    <input type="username" class="form-control" name="username" v-model="username"
                        placeholder="Имя пользователя">
                    <label for="floatingUsername">Имя пользователя</label>
                </div>
                <div class="form-floating mt-2">
                    <input type="password" class="form-control" name="password" v-model="password"
                        placeholder="Пароль">
                    <label for="floatingUsername">Пароль</label>
                </div>
                <el-button class="w-100 mt-2" native-type="submit" :loading="loading">
                    Войти
                </el-button>
            </form>
        </main>

    </div>
</template>

<script>
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
            createToken: "auth/createToken",
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
                await this.$router.push('/');
            }
            if (result.error) {
                console.log(result)
                this.errorMessage = result.errorMessage
            }
        }
    },

}
</script>