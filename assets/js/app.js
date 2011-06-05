function bizt() {
	if (navigator && navigator.notification && navigator.notification.vibrate) {
		navigator.notification.vibrate(30);
	}
}
function onMenuKeyDown() {
	display('#play');
}
function onSearchKeyDown() {
	display('#info');
}
function display(id) {
    x$('.view').each(function(e, i) {
        var display = '#' + x$(e)[0].id === id ? 'block' : 'none';
        x$(e).css({ 'display':display });
    });
}

function onDeviceReady() {
	var activity = 'click';
	if ('ontouchstart' in document.documentElement) {
		activity = 'touchstart';
	};

	/*
	x$('#play').on(activity, function () {
		display('#play');
	});
	x$('#info').on(activity, function () {
		display('#info');
	});
	*/
	x$('#reset').on(activity, function() {
		resetLocks();
	});

	document.addEventListener("menubutton", onMenuKeyDown, false);
	document.addEventListener("searchbutton", onSearchKeyDown, false);
	display('#info');
}

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
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