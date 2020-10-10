<template>
  <div id="app">
    <router-view></router-view>
    <h1>Hello</h1>
  </div>
</template>

<script>
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import Vue from "vue";

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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
