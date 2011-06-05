var activity = 'click';
if ('ontouchstart' in document.documentElement) {
	activity = 'touchstart';
};

// immediately invoked on first run
var init = (function () {
})();

// a little inline controller
//when('#welcome');
when('#play', function () {
	display('#play');
});
when('.home', function () {
	display('#welcome');
});
x$('#reset').on(activity, function() {
	resetLocks();
});

document.addEventListener("deviceready", phoneGapReady, false);
function phoneGapReady() {
	document.addEventListener("menubutton", onMenuKeyDown, false);
	document.addEventListener("searchbutton", onSearchKeyDown, false);
};
function onMenuKeyDown() {
	display('#welcome');
}
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