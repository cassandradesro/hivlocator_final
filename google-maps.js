var GoogleMapModule = (function() {
	var shared = {};

	var map;
	var infowindow;
	var startingPoint = {lat: 33.813245, lng: -84.362171};
	shared.startingPoint = startingPoint;

	function placeResults(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
	}

	//function geocode(address) {
	//	var input = document.getElementById('q');
	//	var searchTerm = input.value;
	//	var api_key = 'AIzaSyBs3JbTm5Mmh-oL70aSuANrBeSiUzhIXDk';
	//	
	//	var url = "https://maps.googleapis.com/maps/api/geocode/json?";
	//	url += 'address=' + encodeURIComponent(searchTerm);
	//	url += '&key=' + api_key;

	//	fetch(url, {
	//		method: 'GET', 
	//	})

	//	.then(response => returnJson(response)) //processing the response
	//	//this code is always going to be the same!

	//	.then(allData => processTheData(allData))
	//}

	//function processTheData (allData){
	//	
	//}
	function createMarker(place) {
		var marker = new google.maps.Marker({
			map: map,
			position: place.coordinates,
			icon: place.icon
		});

		marker.addListener('click', function() {
			infowindow.setContent(place.content);
			infowindow.open(map, marker);
		})

		return marker;

	}
	shared.createMarker = createMarker;



	function recenterMapOnZip(zip) {

	}
	shared.recenterMapOnZip = recenterMapOnZip;


	// Call GoogleMapModule.searchForPlaces(term) to put places on map.

	function searchForPlaces(term, radius) {
		var r = radius || 500;
		var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: startingPoint,
          radius: r,
          keyword: term
        }, placeResults);
	}
	shared.searchForPlaces = searchForPlaces;

	function initMap() {
	  map = new google.maps.Map(document.getElementById('map'), {
	    center: startingPoint,
	    zoom: 14
	  });

	   var marker = new google.maps.Marker({
          position: startingPoint,
          map: map
        });

	   var contentString = '<h1>Hi!</h1> <p> I am an <strong>explanation</strong> popup!</p>';
	   infowindow = new google.maps.InfoWindow({
	     content: contentString
	   });

	   marker.addListener('click', function() {
	   	infowindow.open(map, marker);
	   });
	}
	shared.init = initMap;

	return shared;
}());
