<template>
  <b-container fluid class="p-0" style="height: calc( 100vh - 60px)">
    <b-form class="registrationFrom vh-100" @submit.prevent="Checkpoint">
    <header class="header">
      Настроить чекпоинт
      <router-link to="/checkpoints">
        <svg width="20" height="28" class="backButton" style="top:14px;" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4393 12.9393L6.99998 4.5C6.4477 3.94771 5.55227 3.94771 4.99998 4.5C4.4477 5.05228 4.4477 5.94771 4.99998 6.5L12.5 14L4.99998 21.5C4.4477 22.0523 4.4477 22.9477 4.99998 23.5C5.55227 24.0523 6.4477 24.0523 6.99998 23.5L15.4393 15.0607C16.0251 14.4749 16.0251 13.5251 15.4393 12.9393Z" fill="#3F8AE0"/>
        </svg>
      </router-link>
    </header>


    <b-col cols="12" class="w-100  d-flex flex-column justify-content-center align-items-center grey mt-3">

      <div class="topic settingBorder text-center pb-4">
        <svg width="34" height="58" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="13" width="2" height="11" fill="url(#paint0_linear)"/>
          <circle cx="7" cy="7" r="7" fill="url(#paint1_radial)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="7" y1="13" x2="7" y2="24" gradientUnits="userSpaceOnUse">
              <stop stop-color="#5AA9FF"/>
              <stop offset="0.341281" stop-color="#B5D8FF"/>
              <stop offset="1" stop-color="white"/>
            </linearGradient>
            <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.875 5.25) rotate(95.7106) scale(8.79364 9.53555)">
              <stop stop-color="#BBDCFF"/>
              <stop offset="0.537828" stop-color="#208BFF"/>
            </radialGradient>
          </defs>
        </svg>

        <div class="mt-2">Выберите один удобный для вас, способ установки чекпоинтов. Это не займет много времени, а в дальнейшем сэкономит его</div>
      </div>

      <div class="settingBorder">
          <b-form-group id="input-group-1" label="Имя" label-for="input-1" >
            <b-form-input
                id="input-1"
                v-model="address"
                type="text"
                required
                placeholder="Укажите точные адрес"
                class="mx-2"
            />
          </b-form-group>

      </div>

      <div class="settingBorder pb-0">
        <label for="mapSetting">Карта</label>

        <router-link class="p-2 w-100" to="/placeOnMap" id="mapSetting">
          <div class="d-flex flex-row justify-content-between align-items-center ml-2">
            <div class="topics h-auto">
              <span class="primaryTextS"><b>Соревнования</b></span>
            </div>
            <div class="goTo">
              <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.4393 12.9393L6.99998 4.5C6.4477 3.94771 5.55227 3.94771 4.99998 4.5C4.4477 5.05228 4.4477 5.94771 4.99998 6.5L12.5 14L4.99998 21.5C4.4477 22.0523 4.4477 22.9477 4.99998 23.5C5.55227 24.0523 6.4477 24.0523 6.99998 23.5L15.4393 15.0607C16.0251 14.4749 16.0251 13.5251 15.4393 12.9393Z" fill="#3F8AE0"/>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </b-col>

    <b-button  variant="primary" class="primary" type="submit">
      Далее
    </b-button>
    </b-form>
  </b-container>
</template>

<script>

export default {
name: "CheckSettings",
  data() {
    return {
      address:""
    }
  },
  methods: {
    Checkpoint() {
      this.$router.push("/checkpoints/tasks");
    }
  }

}
</script>

<style>

.settingBorder {
  border-bottom: 1px solid #DFDFDF;
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 16px;
}

</style>