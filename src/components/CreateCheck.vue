<template>
  <b-container fluid class="p-0">
    <header class="header">
      Создать квест
      <router-link to="/">
      <svg width="20" height="28" class="backButton" style="top:14px;" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.4393 12.9393L6.99998 4.5C6.4477 3.94771 5.55227 3.94771 4.99998 4.5C4.4477 5.05228 4.4477 5.94771 4.99998 6.5L12.5 14L4.99998 21.5C4.4477 22.0523 4.4477 22.9477 4.99998 23.5C5.55227 24.0523 6.4477 24.0523 6.99998 23.5L15.4393 15.0607C16.0251 14.4749 16.0251 13.5251 15.4393 12.9393Z" fill="#3F8AE0"/>
      </svg>
      </router-link>
    </header>
    <b-form class="registrationFrom" @submit.prevent="signUp">
      <b-form-group id="input-group-1" label="Имя" label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="questname"
            type="text"
            required
            placeholder="Введите название квеста"
        />
      </b-form-group>

      <b-form-group id="input-group-3" label="Теги" label-for="input-3">
        <b-form-input
            id="input-3"
            type="text"
            v-model="tags"
            placeholder="Введите название тегов или тем"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="description" label="Описание" label-for="input-4">
        <b-form-textarea
            id="input-4"
            v-model="description"
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
  name: "createQuest",
  data() {
    return {
      questname: "",
      description: "",
      team: null,
      tags: "",
    }
  },
  methods: {
    signUp() {
      this.$router.push("/checkpoints");
    },
    changeTag(index) {
      let tagEl = document.getElementById(`tag${index}`);
      if (tagEl.classList.contains("activeTag")) {
        tagEl.classList.remove("activeTag");
      } else {
        tagEl.classList.add("activeTag");
      }
    },
    addFoto() {
      document.getElementById('file-input').click();
    }
  }
}
</script>

<style scoped>
.registrationFrom {
  padding: 0 12px;
  min-height: calc(100vh - 60px);
  position: relative;
}

.registrationFrom input, .registrationFrom select, .registrationFrom textarea {
  background-color: #F2F3F5;
  color: #818C99;
}

.grayLabel, .form-group {
  color: #6D7885!important;
  font-size: 14px;
}

.primary {
  margin: 0!important;
  position: absolute;
  width: calc(100% - 24px);
  bottom: 8px;
}

.tag {
  background-color: #F2F3F5!important;
  box-shadow: none!important;
  color: #818C99;
  transition: all .15s ease-in-out!important;
  border: none;
  margin-right: 8px;
}

.tag.activeTag {
  background-color: #017AFF!important;
  color: #FFFFFF!important;
}

.fileInput {
  color: #3F8AE0;
  padding: 24px;
  width: 100%;
  border-radius: 12px;
  border: #3F8AE0 dashed 1px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
</style>
