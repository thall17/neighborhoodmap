// Initialize map and infoWindow
var map;



function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 34.0736,
      lng: -118.4004
    },
    zoom: 12
  });

  var infoWindow = new google.maps.InfoWindow({
    // default content
    content: '<div><h4 id="brewery-name"></h4><p id="brewery-address"></p><p id="yelp"></p></div>'
  });

  var geocoder = new google.maps.Geocoder();
  var markers = [];

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

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }
  for (var i = 0; i < model.restaurants.length; i++) {
    console.log(model.restaurants[i].name);
    console.log(model.restaurants[i].address);
    geocodeAddress(geocoder, map, model.restaurants[i].address);
  }
}

// MODEL
var model = {
  restaurants: [{
      name: "Cassia",
      address: '1314 7th St, Santa Monica, CA 90401',
      lat: 34.019401,
      lng: -118.493702
    },
    {
      name: "Mastro's Steakhouse",
      address: '246 N Canon Dr, Beverly Hills, CA 90210',
      lat: 34.068829,
      lng: -118.398821
    },
    {
      name: "Angelini Osteria",
      address: '7313 Beverly Blvd, Los Angeles, CA 90036',
      lat: 34.076448,
      lng: -118.349148
    },
    {
      name: "Kotoya",
      address: '10422 National Blvd, Los Angeles, CA 90034',
      lat: 34.028577,
      lng: -118.411518
    },
    {
      name: "Katsu-ya",
      address: '11680 Ventura Blvd, Studio City, CA 91604',
      lat: 34.140803,
      lng: -118.387423
    }
  ]
};


// VIEWMODEL
var ViewModel = function() {
  console.log("INSIDE VM");
  'use strict';
  var self = this;
  self.restaurantList = ko.observableArray([]);
  self.filteredRestaurantList = ko.observableArray([]);

  self.buildRestaurantLocations = function() {
    restaurantLocations.forEach(function(r) {
      self.restaurantList.push( new Restaurant(r) );
    });
  };
  console.log(self.restaurantList);
};

var Restaurant = function(r) {
  'use strict';

  // Set properties as Knockout observables
  var marker;
  this.name = ko.observable(r.name);
  this.address = ko.observable(r.address);
  this.lat = ko.observable(r.lat);
  this.lng = ko.observable(r.lng);

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(this.lat(), this.lng()),
    map: map,
    title: this.name()
  });

  this.marker = ko.observable(marker);
};

ko.applyBindings(new ViewModel());