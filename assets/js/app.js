document.addEventListener("deviceready", phoneGapReady, false);

function phoneGapReady() {
	var activity = 'click';
	if ('ontouchstart' in document.documentElement) {
		activity = 'touchstart';
	};

	// a little inline controller
	when('#play', function () {
		display('#play');
	});
	when('.welcome', function () {
		display('#welcome');
	});
	x$('#reset').on(activity, function() {
		resetLocks();
	});

	document.addEventListener("menubutton", onMenuKeyDown, false);
	function onMenuKeyDown() {
		display('#welcome');
	}

	document.addEventListener("searchbutton", onSearchKeyDown, false);
	function onSearchKeyDown() {
		display('#deviceInfo');
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
}