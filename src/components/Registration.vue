<template>
  <b-container fluid class="p-0">
    <header class="header">
      Регистрация
    </header>
    <b-form class="registrationFrom" @submit.prevent="signUp">
      <b-form-group id="input-group-1" label="Имя" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="username"
          type="text"
          required
          placeholder="Введите имя"
        />
      </b-form-group>

      <b-form-group id="input-group-2" label="Пароль" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          required
          placeholder="Введите пароль"
        />
      </b-form-group>

      <b-form-group id="input-group-3" label="Команда" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="team"
          :options="teams"
          required
        ></b-form-select>
      </b-form-group>

      <label class="grayLabel" for="tags">Выберите интересующие вас темы</label>
      <input type="text" style="display: none" id="tags">
      <br>
      <b-button class="tag mb-2" v-for="(tag, index) in tags" :id="'tag' + index" :key="index" @click="changeTag(index)">
        {{ tag }}
      </b-button>

      <b-form-group label="Добавить фотографию для профиля" label-for="file-input" style="display: none">
        <b-form-file id="file-input" class="fileInput" placeholder="Добавить фотографию"></b-form-file>
      </b-form-group>

      <div class="fileInput mt-2" @click="addFoto">
        Добавить фотографию
      </div>

      <b-button variant="primary" class="primary btn-block" type="submit">
        Далее
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      username: "",
      password: "",
      team: null,
      teams: [{ text: 'Выберите команду', value: null }, "Stonks", "не Stonks"],
      tags: ["IT", "Дизайн", "История", "Кулинария"]
    }
  },
  methods: {
    signUp() {
      this.$router.push("/");
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

<style>
.registrationFrom {
  padding: 0 12px;
  min-height: calc(100vh - 60px);
  position: relative;
}

.registrationFrom input, .registrationFrom select, .custom-file-label, .registrationFrom textarea {
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
