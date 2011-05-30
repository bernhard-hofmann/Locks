run(function () {
	// immediately invoked on first run
	var init = (function () {
		/*
		navigator.network.isReachable("google.com", function(status) {
			var connectivity = (status.internetConnectionStatus || status.code || status);
			if (connectivity === NetworkStatus.NOT_REACHABLE) {
				alert("No internet connection.");
			}
		});
		*/
	})();

	// a little inline controller
	when('#welcome');
	when('#settings', function() {
		/*
		// load settings from store and make sure we persist radio buttons.
		store.get('config', function(saved) {
			if (saved) {
				if (saved.map) {
					x$('input[value=' + saved.map + ']').attr('checked',true);
				}
				if (saved.zoom) {
					x$('input[name=zoom][value="' + saved.zoom + '"]').attr('checked',true);
				}
			}
		});
		*/
	});
	when('#play', function () {
		display('#play');
		/*
		store.get('config', function (saved) {
			// construct a gmap str
			var map  = saved ? saved.map || ui('map') : ui('map')
			,   zoom = saved ? saved.zoom || ui('zoom') : ui('zoom')
			,   path = "http://maps.google.com/maps/api/staticmap?center=";

			navigator.geolocation.getCurrentPosition(function (position) {
				var location = "" + position.coords.latitude + "," + position.coords.longitude;
				path += location + "&zoom=" + zoom;
				path += "&size=250x250&maptype=" + map + "&markers=color:red|label:P|";
				path += location + "&sensor=false";

				x$('img#static_map').attr('src', path);
			});
		});
		*/
	});
	when('#save', function () {
		store.save({
			key:'config',
			map:ui('map'),
			zoom:ui('zoom')
		});
		display('#welcome');
	});
	when('#home', function () {
		display('#welcome');
	});
	when('#deviceInfo', function() {
		var element = document.getElementById('deviceDetails');

		element.innerHTML = ''+
			'Device Name: '     + device.name     + '<br />' + 
			'Device PhoneGap: ' + device.phonegap + '<br />' + 
			'Device Platform: ' + device.platform + '<br />' + 
			'Device UUID: '     + device.uuid     + '<br />' + 
			'<hr />'+
			'Screen: '+ screen.availWidth +'x'+ screen.availHeight +' ('+ screen.colorDepth +'&nbsp;colors)';

		navigator.geolocation.getCurrentPosition(function(position) {
			var element = document.getElementById('geolocation');
			element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + new Date(position.timestamp)          + '<br />';
			}, function (error) {
				alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
				
		element = document.getElementById('libraries');
		element.innerHTML = 'Built with Phonegap '+ device.phonegap +', xuijs and lawnchair.';
		});
	});

	document.addEventListener("backbutton", onBackKeyDown, false);
	document.addEventListener("menubutton", onMenuKeyDown, false);
	document.addEventListener("pause", onPause, false);
	document.addEventListener("resume", onResume, false);
	document.addEventListener("searchbutton", onSearchKeyDown, false);
	function onBackKeyDown() {
		alert('Back button not supported.');
	}
	function onMenuKeyDown() {
		display('#welcome');
	}
	function onPause() {
		// Handle the pause event
	}
	function onResume() {
		alert('Welcome back! :D');
	}
	function onSearchKeyDown() {
		display('#deviceInfo');
	}
});