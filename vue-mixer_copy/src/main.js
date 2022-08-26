import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVk } from '@fortawesome/free-brands-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons'
import { faRubleSign } from '@fortawesome/free-solid-svg-icons'
import { faStar as faSolidStar} from '@fortawesome/free-solid-svg-icons'

axios.defaults.baseURL = "http://127.0.0.1:8000"

library.add(faShoppingBasket, faMagnifyingGlass, faVk, faSolidStar, faRegularStar, faRubleSign)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')