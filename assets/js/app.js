function bizt() {
	if (navigator && navigator.notification && navigator.notification.vibrate) {
		navigator.notification.vibrate(30);
	}
}
function onMenuKeyDown() {
	$.mobile.changePage( "menu", { transition: "none"} );
}
function onSearchKeyDown() {
	$.mobile.changePage( "info", { transition: "none"} );
}
function loadOptions() {
	$('#animatedLocks')[0].checked = (window.localStorage.getItem("animate") === "true");
}
function saveOptions() {
	window.localStorage.setItem("animate", $('#animatedLocks')[0].checked);
}

function initApp() {
	var activity = 'click';
	if ('ontouchstart' in document.documentElement) {
		activity = 'touchstart';
	};

	if (typeof(device) !== "undefined") {
		$('#phoneGapVersion').html('version '+ device.phonegap);
		var element = document.getElementById('deviceProperties');
		if (element) {
			element.innerHTML =
				'Device: '     + device.name     + '<br />' + 
				'Running: ' + device.platform +' v'+ device.version + '<br />' + 
				'UUID: '     + device.uuid     + '<br />'
				;
		}
	}

	$('#btnReset').bind(activity, function() {
		GAME.reset();
		GAME.resetLocks();
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