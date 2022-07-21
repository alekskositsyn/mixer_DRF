import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVk } from '@fortawesome/free-brands-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons'
import { faRubleSign } from '@fortawesome/free-solid-svg-icons'
import { faStar as faSolidStar} from '@fortawesome/free-solid-svg-icons'


library.add(faShoppingBasket, faMagnifyingGlass, faVk, faSolidStar, faRegularStar, faRubleSign)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
