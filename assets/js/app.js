run(function () {
	// immediately invoked on first run
	var init = (function () {
	})();

	// a little inline controller
	when('#welcome');
	when('#play', function () {
		display('#play');
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
		element.innerHTML = 'Built with Phonegap '+ device.phonegap +' and xuijs.';
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