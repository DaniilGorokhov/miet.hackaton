<template>
  <b-container fluid class="p-0">
    <header class="header">
      Соревнования
      <router-link to="/">
        <svg width="20" height="28" class="backButton" style="top:14px;" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4393 12.9393L6.99998 4.5C6.4477 3.94771 5.55227 3.94771 4.99998 4.5C4.4477 5.05228 4.4477 5.94771 4.99998 6.5L12.5 14L4.99998 21.5C4.4477 22.0523 4.4477 22.9477 4.99998 23.5C5.55227 24.0523 6.4477 24.0523 6.99998 23.5L15.4393 15.0607C16.0251 14.4749 16.0251 13.5251 15.4393 12.9393Z" fill="#3F8AE0"/>
        </svg>
      </router-link>
    </header>
    <label for="tags" class="mt-5 mx-3 grey">Выберите интересующие вас темы</label>
    <b-form id="tags" class="registrationFrom" style="height: calc( 100vh - 140px); min-height: auto" @submit.prevent="signUp">

      <b-button class="tag mb-2" v-for="(tag, index) in tags" :id="'tag' + index" :key="index" @click="changeTag(index)">
        {{ tag }}
      </b-button>

      <b-button variant="primary" class="primary btn-block" type="submit">
        Далее
      </b-button>
    </b-form>
  </b-container>
</template>


<script>
export default {
name: "Competive",
  data() {
    return {
      tags: ["IT", "Дизайн", "История", "Кулинария", "sdfs", "qdwqwdqwdq", "edqwdqwd"]
    }
  },
  methods: {
    signUp() {
      this.$router.push("/bestPlaces");
    },
    changeTag(index) {
      let tagEl = document.getElementById(`tag${index}`);
      if (tagEl.classList.contains("activeTag")) {
        tagEl.classList.remove("activeTag");
      } else {
        tagEl.classList.add("activeTag");
      }
    },
  }
}
</script>

<style scoped>

</style>