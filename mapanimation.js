mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJpYW50aGFuc2VuIiwiYSI6ImNsZDNqcmR6OTBjbHczcnFqZ2M4eG9mdmcifQ.A5x138liLOgJ9b2FG96lsw";
var busMarkers = [];
// Sets the starting map coordinates, focal point, and zoom.
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.104875, 42.3504],
  zoom: 13,
});
map.resize();

// Requests bus data from MBTA
async function getBusLocations() {
  const url =
    "https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

async function run() {
  // get bus data
  const locations = await getBusLocations();
  //loops through data and assigns bus markers
  locations.forEach((bus, i) => {
    var marker = new mapboxgl.Marker()
      .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
      .addTo(map);
    busMarkers.push(marker);
  });
  //removes bus markers
  function removeMarker() {
    if (busMarkers !== null) {
      for (var i = busMarkers.length - 1; i >= 0; i--) {
        busMarkers[i].remove();
      }
    }
  }

  //removes markers
  SetTimeout(removeMarker, 7500);

  // timer
  setTimeout(run, 15000);
}
map.on("load", function () {
  run();
});
