<template>
  <div id="map">
    <!--In the following div the HERE Map will render-->
    <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
    <b-button @click="createRoute">
      Go to куда-то
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
    },
    setCenter({coords: {latitude, longitude}}) {
      let coords = {lat: latitude, lng: longitude};

      this.userPosition = coords;
      this.map.setCenter(coords);
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
        'destination': `${this.userPosition.lat + 2},${this.userPosition.lng + 1}`,
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
            let startMarker = new H.map.Marker(section.departure.place.location);

            // Create a marker for the end point:
            let endMarker = new H.map.Marker(section.arrival.place.location);

            // Add the route polyline and the two markers to the map:
            this.map.addObjects([routeLine, startMarker, endMarker]);

            // Set the map's viewport to make the whole route visible:
            this.map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
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
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>
