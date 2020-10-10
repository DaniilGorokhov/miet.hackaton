<template>
  <div id="map">
    <!--In the following div the HERE Map will render-->
    <div id="mapContainer" style="height: 500px; width: 100%" ref="hereMap"></div>
    <b-button variant="primary" class="mt-3 primary btn-block" @click="createRoute">
      Проложить маршрут
    </b-button>
  </div>
</template>

<script>
export default {
  name: "HereMap",
  data() {
    return {
      platform: null,
      app_id: 'khnsdv2IWZS2FuTdJCbH',
      apikey: "81OcyI2i4uyi5m-QzZ58U8J2Sm5gc1VA4-zBa6pwysc",
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
    },
    createRoute() {
      const H = window.H;

      // Create the parameters for the routing request:
      let routingParameters = {
        'routingMode': 'fast',
        'transportMode': 'pedestrian',
        // The start point of the route:
        'origin': `${this.userPosition.lat},${this.userPosition.lng}`,
        // The end point of the route:
        'destination': `${this.userPosition.lat + 0.1},${this.userPosition.lng + 0.05}`,
        // Include the route shape in the response
        'return': 'polyline'
      };

      // Define a callback function to process the routing response:
      let onResult = (result) => {
        // ensure that at least one route was found
        if (result.routes.length) {
          result.routes[0].sections.forEach((section) => {
            // Create a linestring to use as a point source for the route line
            let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

            // Create a polyline to display the route:
            let routeLine = new H.map.Polyline(linestring, {
              style: { strokeColor: 'blue', lineWidth: 3 }
            });

            // Create a marker for the start point:
            // let startMarker = new H.map.Marker(section.departure.place.location);

            // Create a marker for the end point:
            // let endMarker = new H.map.Marker(section.arrival.place.location);
            let svgMarkup = '<svg width="28" height="48" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '<rect x="6" y="13" width="2" height="11" fill="url(#paint0_linear)"/>\n' +
              '<circle cx="7" cy="7" r="7" fill="url(#paint1_radial)"/>\n' +
              '<defs>\n' +
              '<linearGradient id="paint0_linear" x1="6" y1="17.95" x2="8" y2="17.95" gradientUnits="userSpaceOnUse">\n' +
              '<stop stop-color="#A19B93"/>\n' +
              '<stop offset="0.261719" stop-color="#6B6763"/>\n' +
              '<stop offset="0.390625" stop-color="#AB9A8F"/>\n' +
              '<stop offset="0.574219" stop-color="#5D524F"/>\n' +
              '<stop offset="0.78125" stop-color="#655B59"/>\n' +
              '<stop offset="1" stop-color="#DEC9BC"/>\n' +
              '</linearGradient>\n' +
              '<radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.875 5.25) rotate(95.7106) scale(8.79364 9.53555)">\n' +
              '<stop stop-color="#FFA8A6"/>\n' +
              '<stop offset="0.537828" stop-color="#ED5A5A"/>\n' +
              '</radialGradient>\n' +
              '</defs>\n' +
              '</svg>\n';

            let icon = new H.map.Icon(svgMarkup);
            let endMarker = new H.map.Marker(section.arrival.place.location, {icon: icon});

            // Add the route polyline and the two markers to the map:
            this.map.addObjects([routeLine, endMarker]);

            // Set the map's viewport to make the whole route visible:
            this.map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
            this.map.setZoom(11);
          });
        }
      };

      // Get an instance of the routing service version 8:
      let router = this.platform.getRoutingService(null, 8);

      // Call calculateRoute() with the routing parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      router.calculateRoute(routingParameters, onResult,
        function(error) {
        alert(error.message);
      });
    }
  }
};
</script>

<style scoped>
#map {
  width: 60vw;
  min-width: 320px;
  text-align: center;
  padding-top: 30px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
</style>
