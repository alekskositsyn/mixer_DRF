import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
]

const router = new VueRouter({
  routes
})

export default router
