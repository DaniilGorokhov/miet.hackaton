<template>
  <div id="map">
    <b-container fluid class="p-0">
      <div class="navBar">
        <svg width="20" height="28" class="backButton" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4393 12.9393L6.99998 4.5C6.4477 3.94771 5.55227 3.94771 4.99998 4.5C4.4477 5.05228 4.4477 5.94771 4.99998 6.5L12.5 14L4.99998 21.5C4.4477 22.0523 4.4477 22.9477 4.99998 23.5C5.55227 24.0523 6.4477 24.0523 6.99998 23.5L15.4393 15.0607C16.0251 14.4749 16.0251 13.5251 15.4393 12.9393Z" fill="#3F8AE0"/>
        </svg>
        <img class="infoBtn" @click="showPopup" src="../assets/info.svg" alt="info">
      </div>

      <div id="mapContainer" class="w-100 h-100" ref="hereMap"></div>
      <div class="popupHint">
        <div class="close" @click="closePopup">&times;</div>

        <b-col cols="12" class="mt-3">
          <p class="primaryText">
            Что здесь происходит?
          </p>

          <p class="description mt-4 mb-5">Это карта самых популярных точек. Здесь цветами выделены точки, в зависимости от их популярности</p>
          <div class="d-flex justify-content-center description align-items-center">
            Минимум
            <div class="colorfulRect" style="background-color: #ECF4FF; margin-left: 16px;"></div>
            <div class="colorfulRect" style="background-color: #8FBEFE;"></div>
            <div class="colorfulRect" style="background-color: #4586FE;"></div>
            <div class="colorfulRect" style="background-color: #2854B7;"></div>
            <div class="colorfulRect" style="background-color: #173779; margin-right: 16px;"></div>
            Максимум
          </div>
        </b-col>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "bestPlaces",
  data() {
    return {
      platform: null,
      app_id: 'khnsdv2IWZS2FuTdJCbH',
      apikey: "kXJLOsUqIDBiL9E3YeHpDqVOX2WOENM2yOAkzd-yq78",
      center: {lat: 40.730610, lng: -73.935242},
      userPosition: {},
      placesInfo: []
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

    axios
      .get("http://localhost:3000/bestPlaces")
      .then(response => {
        this.placesInfo = response.data;

        const H = window.H;

        for (let place of this.placesInfo) {
          let coords = place.coords;

          this.userPosition = coords;

          let svgMarkup = '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<circle cx="20" cy="20" r="18" fill="url(#paint0_linear)" stroke="white" stroke-width="4"/>\n' +
            '<defs>\n' +
            '<linearGradient id="paint0_linear" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">\n' +
            `<stop stop-color="${place.rating < 0 ? '#ECF4FF' : place.rating < 50 ? '#8FBEFE' : place.rating < 200 ? '#4586FE' : place.rating < 1000 ? '#2854B7' : '#173779'}"/>\n` +
            `<stop offset="1" stop-color="${place.rating < 0 ? '#ceeaff' : place.rating < 50 ? '#a2c9ff' : place.rating < 200 ? '#6198ff' : place.rating < 1000 ? '#3d6dd6' : '#173779'}"/>\n` +
            '</linearGradient>\n' +
            '</defs>\n' +
            '</svg>';

          let group = new H.map.Group();

          this.map.addObject(group);

          group.addEventListener('tap', (evt) => {
            // event target is the marker itself, group is a parent event target
            // for all objects that it contains
            let bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
              // read custom data
              content: evt.target.getData()
            });
            // show info bubble
            this.ui.addBubble(bubble);
          }, false);

          // Create an icon, an object holding the latitude and longitude, and a marker:
          let icon = new H.map.Icon(svgMarkup),
            marker = new H.map.Marker(coords, {icon: icon});

          // Add the marker to the map and center the map at the location of the marker:
          marker.setData(`<div><a href="http://localhost:8080/#/quest">${place.title}</a></div><div>Рейтинг: ${place.rating}</div>`);
          group.addObject(marker);
        }
      });
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
      this.ui = H.ui.UI.createDefault(map, maptypes, 'ru-RU');
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
    },
    closePopup() {
      let popup = document.querySelector(".popupHint");
      popup.style.bottom = "-240px";
    },
    showPopup() {
      let popup = document.querySelector(".popupHint");
      popup.style.bottom = "0";
    },
  }
}
</script>

<style scoped>
.popupHint {
  position: absolute;
  bottom: -240px;
  background-color: #fff;
  height: 240px;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 64px rgba(0, 0, 0, 0.25);
  border-radius: 24px 24px 0 0;
  transition: all 0.5s ease-out;
  padding: 20px 16px 0 16px;
}

#map {
  padding-bottom: 0!important;
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

.backButton {
  transform: rotate(180deg);
  margin-left: 12px;
}

.infoBtn {
  margin-left: 64px;
}

.colorfulRect {
  border-radius: 4px;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>
