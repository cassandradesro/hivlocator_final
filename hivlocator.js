var LocatorModule = (function () {
	var shared = {}

	var BASE_URL = './locator.php?';

	function setupListeners(){
		var btn = document.querySelector('#btn');
		btn.addEventListener('click', search);
	}

	function search (evt){
		evt.preventDefault();
		var input = document.querySelector('#query');
		var query = input.value;

		var fetchOptions = {
			method: 'GET', 
		};
		var queryString = "zip=" + query + '&';
		queryString += 'lat=' + '&';
		queryString += 'lng=' + '&';
		queryString += '&distance=10';


		fetch(BASE_URL + queryString, fetchOptions)
		.then(response => response.json())
		.then(data => addLocationsToMap(data))
	}

	function addLocationsToMap(data){
		console.log('got data', data);

		// loop through the services array (in the data)
		var services = data.services;

		for (var i = 0; i < services.length; i++) {
			//for each of the services you'll loop through the providers array
			var providers = services[i].providers

			for (var j = 0; j < providers.length; j++) {
				var provider = providers[j]

				//for each of the providers grab, name, coordinates, telephone info, to put in the info window of the Marker
				var markerData = {};
				markerData.coordinates = {
					lat: parseFloat(provider.point.lat), 
					lng: parseFloat(provider.point.long)
				}
				markerData.content = `<div>${provider.title}<hr/>${provider.streetAddress}</div>`;

				GoogleMapModule.createMarker(markerData);	
			}
		}
	}

	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var icons = {
	    clinic: {
	      icon: iconBase + 'clinic.svg'
	    },
	    testing: {
	      icon: iconBase + 'testingcentermarker.svg'
	    },
	    ryan: {
	      icon: iconBase + 'ryan.svg'
	    },
	};

	var features = [
	    {
	      position: new google.maps.LatLng(-33.91721, 151.22630),
	      type: 'clinic'
	    }, 
	    {
	      position: new google.maps.LatLng(-34.91721, 151.22630),
	      type: 'testing'
	    }, {
	      position: new google.maps.LatLng(-35.91721, 151.22630),
	      type: 'ryan'
	    }, 
	];

	// Create markers.
	features.forEach(function(feature) {
	    var marker = new google.maps.Marker({
	      position: feature.position,
	      icon: icons[feature.type].icon,
	      map: map
	    });
	});
	


	function init () {
		setupListeners();
		coordinates = GoogleMapModule.startingPoint;
		console.log ('coordinates', coordinates);
	}

	shared.init = init

	return shared
}())

window.onload = function(){
	LocatorModule.init();
};