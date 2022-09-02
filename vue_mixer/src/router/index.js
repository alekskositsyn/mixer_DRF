import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Product from '../views/Product'
import SignUp from '../views/SignUp'
import LogIn from '../views/LogIn'
import Activation from '../views/Activation'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/:id',
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
    component: Activation
  },
]

const router = new VueRouter({
  routes
})

export default router
