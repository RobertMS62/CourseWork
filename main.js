import Vue from "vue";
import BootstrapVue from "bootstrap-vue"
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFilm,
  faTv,
  faSearch,
  faTimes,
  faCoins,
  faStar,
  faClock,
  faFlag,
  faVideo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faFilm, faTv, faSearch, faTimes, faStar, faCoins, faClock, faFlag, faVideo);

Vue.use(BootstrapVue)

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
