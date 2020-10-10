<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import Vue from "vue";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

export default {
  name: 'app',
  components: {
    // HereMap
  },
  data() {
    return {
      center:{
        lat: 40.730610,
        lng: -73.935242
      }
    }
  }
}
</script>

<style>
.primary {
  height: 60px;
  background: #017AFF;
  border-radius: 12px;
  margin: 0 12px;
  font-family: SF Pro Text, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #FFFFFF;
}
</style>
