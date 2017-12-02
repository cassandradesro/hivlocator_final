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




		

		
		
	

	function init () {
		setupListeners();
		coordinates = GoogleMapModule.startingPoint;
		console.log ('coordinates', coordinates)
	}

	shared.init = init

	return shared
}())

window.onload = function(){
	LocatorModule.init();
};