import Vue from 'vue'
import App from './App.vue'
import map from '@/components/map';
import LK from '@/components/LK'
import VueRouter from "vue-router";
import Registration from "@/components/Registration";
import CreateCheck from "@/components/CreateCheck";
import Checkpoints from "@/components/Checkpoints";
import CheckSettings from "@/components/CheckSettings";
import CreateTask from "@/components/CreateTask";

Vue.config.productionTip = false

const routes = [
  { path: '/', component: App },
  { path: '/hello', component: map },
  { path: '/me', component: LK, meta: { title:"я                         лох" }},
  { path: '/reg', component: Registration, meta: { title:"я                         лох" }},
  { path: '/create', component: CreateCheck, meta: { title:"я                         лох" }},
  { path: '/checkpoints', component: Checkpoints, meta: { title:"я                         лох" }},
  { path: '/checkpoints/settings', component: CheckSettings, meta: { title:"я                         лох" }},
  { path: '/checkpoints/tasks', component: CreateTask, meta: { title:"я                         лох" }},




];

const router = new VueRouter({
  routes
});



new Vue({
  render: h => h(App),
  router
},
    ).$mount('#app')

