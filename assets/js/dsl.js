// the app method accepts a fn to invoke on init unobtrusively 
var run = function(application) {
    if ((navigator.userAgent.indexOf('Browzr') > -1) || navigator.platform === 'Win32') {
        // blackberry
        setTimeout(application, 250);
    } else {
		// attach to deviceready event, which is fired when phonegap is all good to go.
		x$(document).on('deviceready', application, false);
	}
}

, isReady = false

// shows id passed
, display = function(id) {
    x$(["#welcome", "#play", "#deviceInfo"]).each(function(e, i) {
        var display = '#' + x$(e)[0].id === id ? 'block' : 'none';
        x$(e).css({ 'display':display });
    });
}

// reg a click to [id]_button, displays id (if it exists) and executes callback (if it exists)
, when = function(id, callback) {
    var activity = 'click';
    if ('ontouchstart' in document.documentElement) {
       activity = 'touchstart';
    }

    x$(id + '_button').on(activity, function () {
		if (navigator && navigator.notification && navigator.notification.vibrate) {
			navigator.notification.vibrate(30);
		}
        if (x$(id).length > 0) {
            display(id);
		} else {
			//alert('There is no element with ID "'+ id +'" to display as a result of the click on "'+ id +'_button".');
		}
        if (callback) {
            callback.call(this);
		}
		return false;
    });
}
;