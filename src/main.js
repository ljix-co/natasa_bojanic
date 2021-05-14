import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import i18n from './i18n'
import Vue2Editor from "vue2-editor"
import LazyLoadDirective from './directives/LazyLoadDIrective.js';
import onScroll from './directives/onScroll';
import {VueHammer} from 'vue2-hammer';

Vue.use(VueI18n);
Vue.use(Vue2Editor);
Vue.use(VueHammer);
Vue.directive("lazyload", LazyLoadDirective);
Vue.directive("scroll", onScroll);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
