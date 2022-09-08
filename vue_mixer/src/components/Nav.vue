<template>
  <div class="container">
    <header class="p-3 mb-3 border-bottom">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          <img class="logo" src="../assets/logo.png" alt="logo">
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 link-secondary">Продукты</a></li>
          <li><a href="#" class="nav-link px-2 link-dark">Доставка</a></li>
          <li><a href="#" class="nav-link px-2 link-dark">Контакты</a></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control" placeholder="Поиск товара..." aria-label="Search">
        </form>

        <div class="dropdown text-end">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" class="user_avatar rounded-circle">
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <router-link v-if="!$store.state.isAuthenticated" class="dropdown-item" to='/log-in'> Вход </router-link>
            <router-link v-if="!$store.state.isAuthenticated" class="dropdown-item" to='/sign-up'> Регистрация </router-link>
            <li><a class="dropdown-item" href="#">Профиль</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" @click="logout" href="#">Выход</a></li>
          </ul>
        </div>
        <a href="#" class="basket">
          <font-awesome-icon icon="fa-solid fa-basket-shopping" class="fa-basket-shopping"></font-awesome-icon>
        </a>
      </div>
    </header>
  </div>
</template>

<script>
import { mapMutations } from "vuex";


export default {
  name: 'Nav',
  methods: {
    logout() {
      this.$store.commit('logout_mutation')
    }
  }
}

</script>

<style scoped>


.user_avatar {
  width: 32px;
  height: 32px;
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}

.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}

.basket{
  color: #000000b5;
  margin-left: 3rem;
}


.fa-basket-shopping {
  margin-right: 10px;
  margin-left: 5px;
  font-size: 3em;
  
}

.fa-basket-shopping:hover {
  color: #f44336;
}

.fa-basket-shopping:active {
  opacity: 0;
}
</style>