import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Product from '../views/Product'
import SignUp from '../views/SignUp'
import LogIn from '../views/LogIn'
import Activation from '../views/Activation'
import store from '@/store/index'
Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products/:id',
    name: 'ProductView',
    component: Product,
    props: true
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/activate',
    name: 'Activation',
    meta: {},
    component: () => import ('../views/Activation')
  },
]

// router.beforeEach((to, from, next) => {
//   const isTokenExpectedAndExist =
//     (to.matched.some((r) => r.meta.accessTokenExpected) &&
//       store.state.access) ||
//     !to.matched.some((r) => r.meta.accessTokenExpected);
//   if (isTokenExpectedAndExist) {
//     return next();
//   }
//   store.dispatch("popUpMessage", {
//     message: "Требуется авторизация 😳",
//     type: "warning",
//   });
//   router.push("/");
//   store.dispatch("changeShowLoginForm_actions");
// });

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
