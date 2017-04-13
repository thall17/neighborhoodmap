var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.052234, lng: -118.243685},
    zoom: 12
  })
};
