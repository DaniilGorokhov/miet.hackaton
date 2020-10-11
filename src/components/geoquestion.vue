<template>
  <div id="map">
    <b-container fluid class="p-0">
      <header class="header">
        Геозагадка

        <svg width="20" height="28" class="backButton" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4393 12.9393L6.99998 4.5C6.4477 3.94771 5.55227 3.94771 4.99998 4.5C4.4477 5.05228 4.4477 5.94771 4.99998 6.5L12.5 14L4.99998 21.5C4.4477 22.0523 4.4477 22.9477 4.99998 23.5C5.55227 24.0523 6.4477 24.0523 6.99998 23.5L15.4393 15.0607C16.0251 14.4749 16.0251 13.5251 15.4393 12.9393Z" fill="#3F8AE0"/>
        </svg>
      </header>

      <div class="navBar">
        <svg @click="$router.push('/')" style="cursor: pointer;" width="20" height="28" class="backButton" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4393 12.9393L6.99998 4.5C6.4477 3.94771 5.55227 3.94771 4.99998 4.5C4.4477 5.05228 4.4477 5.94771 4.99998 6.5L12.5 14L4.99998 21.5C4.4477 22.0523 4.4477 22.9477 4.99998 23.5C5.55227 24.0523 6.4477 24.0523 6.99998 23.5L15.4393 15.0607C16.0251 14.4749 16.0251 13.5251 15.4393 12.9393Z" fill="#3F8AE0"/>
        </svg>
        <img class="infoBtn" @click="showPopup" src="../assets/info.svg" alt="info">
      </div>

      <div id="mapContainer" class="w-100 h-100" ref="hereMap"></div>
    </b-container>

    <div class="popupHint">
      <div class="close" @click="closePopup">&times;</div>

      <b-col cols="12" class="mt-3" style="height: inherit;">
        <p class="primaryText">
          Геозагадка
        </p>

        <p class="primaryTextS">
          В этой точке располагается домик первого Императора Всероссийского
        </p>

        <b-button variant="primary" class="primary position-relative" @click="closePopupShowModal">Получить подсказку</b-button>
      </b-col>
    </div>
    <b-modal id="modalCheck"  modal-class="modalCheck" content-class="modalBody" body-class="questHeader" hide-footer hide-header>

      Подсказка

      <div class="close" @click="showClose">&times;</div>

      <b-container class="p-0 mt-4 text-left" style="height: 370px">
        <b-row style="height: 370px;">

          <b-col cols="12" class="mt-3">

            <p class="primaryTextS">
              Описание подсказки (ПС здесь когда-то что-то будет)
            </p>

          </b-col>
          <b-button variant="primary" class="primary1 position-relative" @click="showClose">Вперед</b-button>

        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "geoquestion",
  data() {
    return {
      platform: null,
      app_id: 'khnsdv2IWZS2FuTdJCbH',
      apikey: "kXJLOsUqIDBiL9E3YeHpDqVOX2WOENM2yOAkzd-yq78",
      center: { lat: 40.730610, lng: -73.935242 },
      userPosition: {}
    };
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;

    this.initializeHereMap();

    navigator.geolocation.getCurrentPosition(this.setCenter);
  },
  methods: {
    initializeHereMap() {
      // rendering map
      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      let maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      let map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 10,
        center: this.center
      });

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, maptypes, 'ru-RU');
      // End rendering the initial map

      this.map = map;

      console.log(map);
    },
    setCenter({coords: {latitude, longitude}}) {
      const H = window.H;

      let coords = {lat: latitude, lng: longitude};

      this.userPosition = coords;
      this.map.setCenter(coords);

      let svgMarkup = '<svg width="28" height="48" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="13" width="2" height="11" fill="url(#paint0_linear)"/> <circle cx="7" cy="7" r="7" fill="url(#paint1_radial)"/> <defs> <linearGradient id="paint0_linear" x1="7" y1="13" x2="7" y2="24" gradientUnits="userSpaceOnUse"> <stop stop-color="#5AA9FF"/> <stop offset="0.341281" stop-color="#B5D8FF"/> <stop offset="1" stop-color="white"/> </linearGradient><radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.875 5.25) rotate(95.7106) scale(8.79364 9.53555)"><stop stop-color="#BBDCFF"/> <stop offset="0.537828" stop-color="#208BFF"/> </radialGradient></defs> </svg>';

      // Create an icon, an object holding the latitude and longitude, and a marker:
      let icon = new H.map.Icon(svgMarkup),
        marker = new H.map.Marker(coords, {icon: icon});

      // Add the marker to the map and center the map at the location of the marker:
      this.map.addObject(marker);

      this.map.addObject(new H.map.Circle(
        // The central point of the circle
        coords,
        // The radius of the circle in meters
        10000,
        {
          style: {
            strokeColor: '#017AFF', // Color of the perimeter
            lineWidth: 2,
            fillColor: 'rgba(125, 192, 224, 0.7)'  // Color of the circle
          }
        }
      ));
    },
    closePopup() {
      let popup = document.querySelector(".popupHint");
      popup.style.bottom = "-250px";
    },
    showPopup() {
      let popup = document.querySelector(".popupHint");
      popup.style.bottom = "0";
    },
    closePopupShowModal() {
      this.closePopup();
      this.$bvModal.show('modalCheck');
    },
    showClose() {
      this.$bvModal.hide('modalCheck');
      this.showPopup();
    }
  }
}
</script>

<style scoped>
#map {
  padding-bottom: 60px!important;
  overflow: hidden;
}

.navBar {
  position: absolute;
  bottom: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 24px;
  width: calc(38% - 24px);
  margin: 0 12px;
  z-index: 1000;
  height: 64px;
  display: flex;
  align-items: center;
}

.primary {
  width: 100%;
  bottom: 0!important;
}

.backButton {
  transform: rotate(180deg);
  margin-left: 12px;
}

.infoBtn {
  margin-left: 64px;
}

.popupHint {
  position: absolute;
  bottom: -250px;
  background-color: #fff;
  height: 250px;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 64px rgba(0, 0, 0, 0.25);
  border-radius: 24px 24px 0 0;
  transition: all 0.5s ease-out;
  padding: 20px 16px 0 16px;
}
</style>
