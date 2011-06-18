function bizt() {
	if (navigator && navigator.notification && navigator.notification.vibrate) {
		//navigator.notification.vibrate(30);
	}
}
function onMenuKeyDown() {
	display('#menu');
}
function onSearchKeyDown() {
	display('#info');
}
function display(id) {
	bizt();
    x$('.view').each(function(e, i) {
        var display = '#' + x$(e)[0].id === id ? 'block' : 'none';
        x$(e).css({ 'display':display });
    });
}

function initApp() {
	var activity = 'click';
	if ('ontouchstart' in document.documentElement) {
		activity = 'touchstart';
	};

	if (typeof(device) !== "undefined") {
		x$('#phoneGapVersion').html('version '+ device.phonegap);
		var element = document.getElementById('deviceProperties');
		if (element) {
			element.innerHTML =
				'Device: '     + device.name     + '<br />' + 
				'Running: ' + device.platform +' v'+ device.version + '<br />' + 
				'UUID: '     + device.uuid     + '<br />'
				;
		}
	}

	x$('#btnPlay').on(activity, function () {
		display('#play');
	});
	x$('#btnAbout').on(activity, function () {
		display('#info');
	});
	x$('#infoToHome').on(activity, function () {
		display('#menu');
	});

	x$('#btnPlayToMenu').on(activity, function() {
		display('#menu');
	});
	x$('#btnReset').on(activity, function() {
		GAME.reset();
		GAME.resetLocks();
		display('#play');
	});

	document.addEventListener("menubutton", onMenuKeyDown, false);
	document.addEventListener("searchbutton", onSearchKeyDown, false);
}
/*
document.addEventListener("backbutton", onBackKeyDown, false);
document.addEventListener("menubutton", onMenuKeyDown, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
function onBackKeyDown() {
	alert('Back button not supported.');
}
function onPause() {
	// Handle the pause event
}
function onResume() {
	alert('Welcome back! :D');
}
*/