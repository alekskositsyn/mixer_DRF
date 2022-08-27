import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../views/SignUp'
import LogIn from '../views/LogIn'
import Activation from '../views/Activation'
Vue.use(VueRouter)

const routes = [
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
