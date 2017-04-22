// Initialize map and infoWindow
var map;
var observableMarkersArray = ko.observableArray();
var infowindows = [];

var baseUrl = "https://api.foursquare.com/v2/";
var endpoint = "venues/search?"
var clientID = "&client_id=WEBC1WESOQN4A3VWY5VNA54NU4NIJ00QJGLLBAD0XXKFI150";
var clientSecret = "&client_secret=MMPCAP1UKMSZFKK3Z3N5HJXNC4DKU2FQWIMHZRRBWS50U1TL";
var paramsll = "ll=";
var paramsName = "&name=";
var paramsLimit = "&limit=1";
var paramsVersion = "&v=20170421";
var paramsMode = "&m=foursquare";

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

    var foursquareUrl = baseUrl + endpoint + paramsll + model.restaurants[i].lat + "," + model.restaurants[i].lng + paramsName + model.restaurants[i].name.split(' ').join('+') + paramsLimit + paramsVersion + paramsMode + clientID + clientSecret;

    console.log("foursquareUrl = " + foursquareUrl);

    var content = "";

    // var content = '<div id="content">'+
    //         '<div id="siteNotice">'+
    //         '</div>'+
    //         '<h1 id="firstHeading" class="firstHeading">' + model.restaurants[i].name + '</h1>'+
    //         '<div id="bodyContent">'+
    //         '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    //         'sandstone rock formation in the southern part of the '+
    //         'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    //         'south west of the nearest large town, Alice Springs; 450&#160;km '+
    //         '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    //         'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    //         'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    //         'Aboriginal people of the area. It has many springs, waterholes, '+
    //         'rock caves and ancient paintings. Uluru is listed as a World '+
    //         'Heritage Site.</p>'+
    //         '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    //         'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    //         '(last visited June 22, 2009).</p>'+
    //         '</div>'+
    //         '</div>'

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
         for (var i = 0; i < observableMarkersArray().length; i++) {
            observableMarkersArray()[i].setAnimation(null);

         }
         infowindow.setContent(content);
         infowindow.open(map,marker);

         if (marker.getAnimation() !== null) {
           marker.setAnimation(null);
         } else {
           marker.setAnimation(google.maps.Animation.BOUNCE);
           setTimeout(function(){ marker.setAnimation(null); }, 750);
         }
      };
    })(marker,content,infowindow));
  }


  console.log("observableMarkersArray().length = " + observableMarkersArray().length);
  
};


// VIEWMODEL
var ViewModel = function() {

  var self = this;



  self.isolateLocation = function(restaurant) {
    console.log("IN ISOLATELOCATION");
    self.searchString(restaurant.name);
    console.log("self.searchString = " + self.searchString);
    self.filteredRestaurants;
  };

  self.clearSearch = function() {
    self.searchString("");
  }



  console.log("model.restaurants.length = " + model.restaurants.length);
  self.observableMarkersArray = ko.observableArray(model.restaurants);
  // self.markers = ko.observableArray(markers);

  console.log("self.restaurants().length = " + self.observableMarkersArray().length);
  
  self.searchString = ko.observable("");

  self.filteredRestaurants = ko.computed(function() {
    array = self.observableMarkersArray;
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
          infowindows[index].close();
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
