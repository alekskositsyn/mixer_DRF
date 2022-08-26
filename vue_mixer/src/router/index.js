import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../views/SignUp'
import LogIn from '../views/LogIn'
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
]

const router = new VueRouter({
  routes
})

export default router
