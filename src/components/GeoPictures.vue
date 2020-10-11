<template>
<b-container>
  <header class="header">
      Гео-рисунки
    <router-link to="/">
      <svg width="20" height="28" class="backButton" style="top:14px;" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.4393 12.9393L6.99998 4.5C6.4477 3.94771 5.55227 3.94771 4.99998 4.5C4.4477 5.05228 4.4477 5.94771 4.99998 6.5L12.5 14L4.99998 21.5C4.4477 22.0523 4.4477 22.9477 4.99998 23.5C5.55227 24.0523 6.4477 24.0523 6.99998 23.5L15.4393 15.0607C16.0251 14.4749 16.0251 13.5251 15.4393 12.9393Z" fill="#3F8AE0"/>
      </svg>
    </router-link>
  </header>
  <div class="primaryText text-center my-4">У вас {{points}} очков команды</div>
  <b-row class="px-4">
    <b-col cols="12" class="cardQuest my-3">
      <b-col cols="12" class="mt-3">
        <p class="primaryText">
          Пример гео-рисунка
        </p>

        <p class="description">Этот велосипедист сможет доехать до дома благодаря тебе!</p>

      </b-col>
      <b-col cols="12" class="imageHistory"></b-col>
    </b-col>

    <b-button variant="primary" class="primary"><router-link to="/createGeoPicture" class="text-light">Попробовать самому</router-link></b-button>

  </b-row>
</b-container>
</template>

<script>
export default {
name: "GeoPictures",
  props: {
    points: Number,
  },
}
</script>

<style scoped>
.primary {
  width: calc(100% - 48px);
}

.imageHistory {
  background-image: url("https://bugaga.ru/uploads/posts/2016-02/1455714186_risunki-na-velike-9.jpg");
}
</style>
