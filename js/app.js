// Initialize map and infoWindow
var map, infoWindow;


// MODEL
var model = {
    restaurants: [
        {
            name: "Cassia",
            address: '1314 7th St, Santa Monica, CA 90401'
        },
        {
            name: "Mastro's Steakhouse",
            address: '246 N Canon Dr, Beverly Hills, CA 90210'
        },
        {
            name: "Angelini Osteria",
            address: '7313 Beverly Blvd, Los Angeles, CA 90036'
        },
        {
            name: "Kotoya",
            address: '10422 National Blvd, Los Angeles, CA 90034'
        },
        {
            name: "Katsu-ya",
            address: '11680 Ventura Blvd, Studio City, CA 91604'
        }

        // "Cassia": "1314 7th St, Santa Monica, CA 90401",
        // "Mastro's Steakhouse": "246 N Canon Dr, Beverly Hills, CA 90210",
        // "Angelini Osteria": "7313 Beverly Blvd, Los Angeles, CA 90036",
        // "Kotoya": "10422 National Blvd, Los Angeles, CA 90034",
        // "Katsu-ya": "11680 Ventura Blvd, Studio City, CA 91604"
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


    // Object.keys(locations).forEach(function(key) {
    //     console.log(key, locations[key]);
    //     geocodeAddress(geocoder, map, locations[key]);
    // });

    for (var i = 0; i < model.restaurants.length; i++) {
        console.log(model.restaurants[i].name);
        console.log(model.restaurants[i].address);
        geocodeAddress(geocoder, map, model.restaurants[i].address);
    }
}