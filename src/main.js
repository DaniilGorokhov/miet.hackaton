import Vue from 'vue'
import App from './App.vue'
import map from '@/components/map';
import LK from '@/components/LK'
import VueRouter from "vue-router";
import bestPlacesMap from "@/components/bestPlacesMap";
import Registration from "@/components/Registration";

Vue.config.productionTip = false

const routes = [
  { path: '/', component: LK },
  { path: '/hello', component: map },
  { path: '/bestPlaces', component: bestPlacesMap },
  { path: '/registration', component: Registration }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

