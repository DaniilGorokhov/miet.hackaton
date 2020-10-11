<template>
  <div id="map">
    <b-container fluid class="p-0">
      <header class="header">
        Создать квест
        <router-link to="/checkpoints/settings">
          <svg width="20" height="28" class="backButton" style="top:14px;" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4393 12.9393L6.99998 4.5C6.4477 3.94771 5.55227 3.94771 4.99998 4.5C4.4477 5.05228 4.4477 5.94771 4.99998 6.5L12.5 14L4.99998 21.5C4.4477 22.0523 4.4477 22.9477 4.99998 23.5C5.55227 24.0523 6.4477 24.0523 6.99998 23.5L15.4393 15.0607C16.0251 14.4749 16.0251 13.5251 15.4393 12.9393Z" fill="#3F8AE0"/>
          </svg>
        </router-link>
      </header>


      <div id="mapContainer" class="w-100 h-100" ref="hereMap"></div>
      <div class="popupHint">
        <div class="close" @click="closePopup">&times;</div>

        <b-col cols="12" class="mt-3">
          <p class="primaryText">
            Медный всадник
          </p>

<!--          <p class="primaryTextS">-->
<!--            Медный всадник, символ Санкт-Петербурга, на самом деле изготовлен не из меди, а из бронзы. Монумент был открыт в 1782 году по велению императрицы Екатерины Второй. В тот год отмечался 100-летний юбилей вступления на престол юного Петра.-->
<!--          </p>-->

          <p class="description mt-4 mb-5">Создайте свой первый чекпоинт, вы можете задать интересный вопрос или оставить послание игроку.</p>
          <b-button @click="choosePosition" class="primary extraPrimary">Установить чекпоинт</b-button>
        </b-col>
      </div>

      <b-button @click="showPopup" class="primary">Установить чекпоинт</b-button>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "PlaceOnMap",
  data() {
    return {
      platform: null,
      app_id: 'khnsdv2IWZS2FuTdJCbH',
      apikey: "81OcyI2i4uyi5m-QzZ58U8J2Sm5gc1VA4-zBa6pwysc",
      center: { lat: 40.730610, lng: -73.935242 },
      userPosition: {},
      marker: null
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
        center: this.center,
        pixelRatio: window.devicePixelRatio || 1
      });

      addEventListener("resize", () => map.getViewPort().resize());

      this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      H.ui.UI.createDefault(map, maptypes, 'ru-RU');

      this.map = map;

      console.log(map);
    },
    setCenter({coords: {latitude, longitude}}) {
      const H = window.H;

      let coords = {lat: latitude, lng: longitude};

      this.userPosition = coords;
      this.map.setCenter(coords);

      let svgMarkup = '<svg width="28" height="48" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="13" width="2" height="11" fill="url(#paint0_linear)"/> <circle cx="7" cy="7" r="7" fill="url(#paint1_radial)"/> <defs> <linearGradient id="paint0_linear" x1="7" y1="13" x2="7" y2="24" gradientUnits="userSpaceOnUse"> <stop stop-color="#5AA9FF"/> <stop offset="0.341281" stop-color="#B5D8FF"/> <stop offset="1" stop-color="white"/> </linearGradient><radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.875 5.25) rotate(95.7106) scale(8.79364 9.53555)"><stop stop-color="#BBDCFF"/> <stop offset="0.537828" stop-color="#208BFF"/> </radialGradient></defs> </svg>';

      let icon = new H.map.Icon(svgMarkup);
      this.marker = new H.map.Marker(coords, {icon: icon, volatility: true});

      this.marker.draggable = true;

      this.map.addObject(this.marker);

      this.map.addEventListener('dragstart', (ev) => {
        const H = window.H;
        let target = ev.target,
          pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
          let targetPosition = this.map.geoToScreen(target.getGeometry());
          target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
          this.behavior.disable();
        }
      }, false);

      this.map.addEventListener('dragend', (ev) => {
        const H = window.H;
        let target = ev.target;
        if (target instanceof H.map.Marker) {
          this.behavior.enable();
        }
      }, false);

      this.map.addEventListener('drag', (ev) => {
        const H = window.H;
        let target = ev.target,
          pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
          target.setGeometry(this.map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
        }
      }, false);
    },
    // createRoute() {
    //   const H = window.H;
    //
    //   // Create the parameters for the routing request:
    //   let routingParameters = {
    //     'routingMode': 'fast',
    //     'transportMode': 'pedestrian',
    //     // The start point of the route:
    //     'origin': `${this.userPosition.lat},${this.userPosition.lng}`,
    //     // The end point of the route:
    //     'destination': `${this.userPosition.lat + 0.1},${this.userPosition.lng + 0.05}`,
    //     // Include the route shape in the response
    //     'return': 'polyline'
    //   };
    //
    //   // Define a callback function to process the routing response:
    //   let onResult = (result) => {
    //     // ensure that at least one route was found
    //     if (result.routes.length) {
    //       result.routes[0].sections.forEach((section) => {
    //         // Create a linestring to use as a point source for the route line
    //         let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
    //
    //         // Create a polyline to display the route:
    //         let routeLine = new H.map.Polyline(linestring, {
    //           style: { strokeColor: 'blue', lineWidth: 3 }
    //         });
    //
    //         // Create a marker for the start point:
    //         // let startMarker = new H.map.Marker(section.departure.place.location);
    //
    //         // Create a marker for the end point:
    //         // let endMarker = new H.map.Marker(section.arrival.place.location);
    //         let svgMarkup = '<svg width="28" height="48" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    //           '<rect x="6" y="13" width="2" height="11" fill="url(#paint0_linear)"/>\n' +
    //           '<circle cx="7" cy="7" r="7" fill="url(#paint1_radial)"/>\n' +
    //           '<defs>\n' +
    //           '<linearGradient id="paint0_linear" x1="6" y1="17.95" x2="8" y2="17.95" gradientUnits="userSpaceOnUse">\n' +
    //           '<stop stop-color="#A19B93"/>\n' +
    //           '<stop offset="0.261719" stop-color="#6B6763"/>\n' +
    //           '<stop offset="0.390625" stop-color="#AB9A8F"/>\n' +
    //           '<stop offset="0.574219" stop-color="#5D524F"/>\n' +
    //           '<stop offset="0.78125" stop-color="#655B59"/>\n' +
    //           '<stop offset="1" stop-color="#DEC9BC"/>\n' +
    //           '</linearGradient>\n' +
    //           '<radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.875 5.25) rotate(95.7106) scale(8.79364 9.53555)">\n' +
    //           '<stop stop-color="#FFA8A6"/>\n' +
    //           '<stop offset="0.537828" stop-color="#ED5A5A"/>\n' +
    //           '</radialGradient>\n' +
    //           '</defs>\n' +
    //           '</svg>\n';
    //
    //         let icon = new H.map.Icon(svgMarkup);
    //         let endMarker = new H.map.Marker(section.arrival.place.location, {icon: icon});
    //
    //         // Add the route polyline and the two markers to the map:
    //         this.map.addObjects([routeLine, endMarker]);
    //
    //         // Set the map's viewport to make the whole route visible:
    //         this.map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
    //         this.map.setZoom(11);
    //       });
    //     }
    //   };
    //
    //   // Get an instance of the routing service version 8:
    //   let router = this.platform.getRoutingService(null, 8);
    //
    //   // Call calculateRoute() with the routing parameters,
    //   // the callback and an error callback function (called if a
    //   // communication error occurs):
    //   router.calculateRoute(routingParameters, onResult,
    //     function(error) {
    //       alert(error.message);
    //     });
    // },
    closePopup() {
      let popup = document.querySelector(".popupHint");
      popup.style.bottom = "-240px";
    },
    showPopup() {
      let popup = document.querySelector(".popupHint");
      popup.style.bottom = "0";
    },
    choosePosition() {
      localStorage.setItem("position", `${this.marker.ea[0]},${this.marker.ea[1]}`);
    }
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
  padding-bottom: 130px!important;
  overflow: hidden;
}

.primary {
  margin: 0 12px!important;
}

.extraPrimary {
  position: relative;
  border: none;
  width: 100%;
  margin: 0;
}
</style>
