import Vue from 'vue'
import App from './App.vue'
import map from '@/components/map';
import LK from '@/components/LK'
import VueRouter from "vue-router";

Vue.config.productionTip = false

const routes = [
  { path: '/', component: App },
  { path: '/hello', component: map },
  { path: '/me', component: LK, meta: { title:"я                         лох" }}
];

const router = new VueRouter({
  routes
});



new Vue({
  render: h => h(App),
  router
},
    ).$mount('#app')

