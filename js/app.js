var map, infoWindow;
var locations = {
  "Cassia": "1314 7th St, Santa Monica, CA 90401",
  "Mastro's Steakhouse": "246 N Canon Dr, Beverly Hills, CA 90210",
  "Angelini Osteria": "7313 Beverly Blvd, Los Angeles, CA 90036",
  "Kotoya": "10422 National Blvd, Los Angeles, CA 90034",
  "Katsu-ya": "11680 Ventura Blvd, Studio City, CA 91604"
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 34.0736,
      lng: -118.4004
    },
    zoom: 12
  });
  var geocoder = new google.maps.Geocoder();

  function geocodeAddress(geocoder, resultsMap, address) {
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status === 'OK') {
        // resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  Object.keys(locations).forEach(function(key) {
    console.log(key, locations[key]);
    geocodeAddress(geocoder, map, locations[key]);
  });
}