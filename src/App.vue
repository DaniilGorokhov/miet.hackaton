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
  },
  watch: {
    '$route' (to) {
      document.title = to.meta.title || 'Stonks';
    }
  },
}
</script>

<style>
img {
  user-select: none;
}

.header {
  font-family: 'TT Commons', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 26px;
  color: #000000;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

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

.primaryText {
  font-family: SF Pro Text, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  color: #2F2F2F;
}

.description {
  font-family: SF Pro Text, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #818C99;
  margin-bottom: 24px;
}

.primaryTextS {
  font-family: SF Pro Text, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #3C3C3C;
}
</style>
