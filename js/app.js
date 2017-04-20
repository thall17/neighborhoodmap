// Initialize map and infoWindow
var map;

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

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 34.0736,
      lng: -118.4004
    },
    zoom: 12
  });
};




// VIEWMODEL
var ViewModel = function() {

  var self = this;
  self.restaurants = ko.observableArray(model.restaurants);

  self.appName = ko.observable("App Name");

  console.log("self.restaurants = ");
  console.log(self.restaurants());



};
  
ko.applyBindings(new ViewModel());
