<template>
  <b-container fluid class="p-0">
    <header class="header">
      Создать квест
      <router-link to="/me">
        <svg width="20" height="28" class="backButton" style="top:14px;" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4393 12.9393L6.99998 4.5C6.4477 3.94771 5.55227 3.94771 4.99998 4.5C4.4477 5.05228 4.4477 5.94771 4.99998 6.5L12.5 14L4.99998 21.5C4.4477 22.0523 4.4477 22.9477 4.99998 23.5C5.55227 24.0523 6.4477 24.0523 6.99998 23.5L15.4393 15.0607C16.0251 14.4749 16.0251 13.5251 15.4393 12.9393Z" fill="#3F8AE0"/>
        </svg>
      </router-link>
    </header>
    <b-form class="registrationFrom" @submit.prevent="signUp">

      <b-form-group id="input-group-3" label="Вопросы" label-for="input-3">
        <b-form-textarea
            id="input-4"
            v-model="questions"
            rows="3"
            no-resize
            required
            placeholder="Введите название квеста"
        />
      </b-form-group>

      <b-form-group id="description" label="Ответы" label-for="input-4">
        <b-form-textarea
            id="input-4"
            v-model="ans"
            rows="3"
            no-resize
            required
            placeholder="Введите название квеста"
        />
      </b-form-group>

      <b-button variant="primary" class="primary btn-block" type="submit">
        Далее
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "CreateTask",
  data() {
    return {
      questions:"",
      ans: "",
    }
  },
  methods: {
    signUp() {
      this.$router.push("/checkpoints");
    },
  }
}
</script>

<style scoped>

</style>