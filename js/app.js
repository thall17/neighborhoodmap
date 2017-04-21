// Initialize map and infoWindow
var map;
var observableMarkersArray = ko.observableArray();
var infowindows = [];

// MODEL
var model = {
  restaurants: [
    {
      name: "Angelini Osteria",
      address: '7313 Beverly Blvd, Los Angeles, CA 90036',
      lat: 34.076448,
      lng: -118.349148
    },
    {
      name: "Cassia",
      address: '1314 7th St, Santa Monica, CA 90401',
      lat: 34.019401,
      lng: -118.493702
    },
    {
      name: "Katsu-ya",
      address: '11680 Ventura Blvd, Studio City, CA 91604',
      lat: 34.140803,
      lng: -118.387423
    },
    {
      name: "Kotoya",
      address: '10422 National Blvd, Los Angeles, CA 90034',
      lat: 34.028577,
      lng: -118.411518
    },
    {
      name: "Mastro's Steakhouse",
      address: '246 N Canon Dr, Beverly Hills, CA 90210',
      lat: 34.068829,
      lng: -118.398821
    }

  ]
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 34.053477,
      lng: -118.242893
    },
    zoom: 11
  });

  console.log ("model.restaurants.length = " + model.restaurants.length);
  
  for (var i = 0; i < model.restaurants.length; i++) {
    r = model.restaurants[i];
    console.log("r.lat = " + r.lat);

    var myLatLng = {lat: r.lat, lng: r.lng};
    var lat = r.lat;

    

    var marker = new google.maps.Marker({
      position: myLatLng,
      // map: map,
      title: r.name,
      visible: true
    });

    

    observableMarkersArray().push(marker);

    marker = null;
    // marker.setMap(null);

  }

  for (var i = 0; i < observableMarkersArray().length; i++){
    var marker = observableMarkersArray()[i];
    marker.setMap(map);



    var infowindow = new google.maps.InfoWindow();

    infowindows.push(infowindow);

    var content = "Name: " + model.restaurants[i].name

    // google.maps.event.addListener(marker, 'click', function() {
    //   if (infowindow) {
    //       infowindow.close();
    //   }
    //   infowindow = new google.maps.InfoWindow();
    //   infowindow.setContent(content);
    //   infowindow.open(map,marker);
    // });

    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
      return function() {
         for (var i = 0; i < infowindows.length; i++) {
            infowindows[i].close();
         }
         infowindow.setContent(content);
         infowindow.open(map,marker);
      };
    })(marker,content,infowindow));
  }


  console.log("observableMarkersArray().length = " + observableMarkersArray().length);
  
};




// VIEWMODEL
var ViewModel = function() {

  var self = this;

  console.log("model.restaurants.length = " + model.restaurants.length);
  self.restaurants = ko.observableArray(model.restaurants);
  // self.markers = ko.observableArray(markers);

  console.log("self.restaurants().length = " + self.restaurants().length);
  
  self.searchString = ko.observable("");

  self.filteredRestaurants = ko.computed(function() {
    array = self.restaurants;
    returnArray = [];
    var index;
    // console.log("BEFORE FOR");
    // console.log("self.restaurants().length = " + self.restaurants().length);
    // console.log("array().length = " + array().length);

    for (index = 0; index < array().length; index++) {
      // console.log("INSIDE FOR");
      // console.log("index = " + index);
      // console.log("array()[index] = " + array()[index]);
      // console.log("searchString = " + self.searchString);
      if (self.searchString == "" || array()[index].name.toLowerCase().startsWith(self.searchString().toLowerCase())) {
        returnArray.push(array()[index]);
        console.log("observableMarkersArray()[index] = " + observableMarkersArray()[index]);
        if (observableMarkersArray()[index] != undefined) {
          observableMarkersArray()[index].setVisible(true);

        }
      }
      else {
        if (observableMarkersArray()[index] != undefined) {
          observableMarkersArray()[index].setVisible(false);
        }
      }
      // else {
      //   observableMarkersArray()[index].setVisible = false;
      // }
    }
    console.log ("returnArray.legnth = " + returnArray.length);
    return returnArray;
  });

};
  
ko.applyBindings(new ViewModel());
