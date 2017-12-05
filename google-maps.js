var GoogleMapModule = (function() {
	var shared = {};

	var map;
	var infowindow;
	var startingPoint = {lat: 33.813245, lng: -84.362171};
	shared.startingPoint = startingPoint;
	var markers = [];

	function placeResults(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
	}

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

		markers.push(marker);

		return marker;


	}
	shared.createMarker = createMarker;

	function removeMarkers(place){
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}

	}
	shared.removeMarkers = removeMarkers


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
	


	function recenterMapByZip(zip){

		//when user enters zipcode, ask google lat/lng of the zip


		//then tell the map to recenter on that lat long (1 function)


	}
	shared.recenterMapByZip = recenterMapByZip;
	


	function initMap() {
	  map = new google.maps.Map(document.getElementById('map'), {
	    center: startingPoint,
	    zoom: 14
	  });

	   var marker = new google.maps.Marker({
          position: startingPoint,
          map: map
        });

	   var contentString = '<h1>You are here</h1>';
	   infowindow = new google.maps.InfoWindow({
	     content: contentString
	   });

	   marker.addListener('click', function() {
	   	infowindow.open(map, marker);
	   });

	   shared.map = map;
	}
	shared.init = initMap;



	return shared;
}());
