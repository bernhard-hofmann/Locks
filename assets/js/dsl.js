// shows id passed
var display = function(id) {
    x$(["#welcome", "#play", "#deviceInfo"]).each(function(e, i) {
        var display = '#' + x$(e)[0].id === id ? 'block' : 'none';
        x$(e).css({ 'display':display });
    });
};

// reg a click to [id]_button, displays id (if it exists) and executes callback (if it exists)
var when = function(id, callback) {
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
			console.error('There is no element with ID "'+ id +'" to display as a result of the click on "'+ id +'_button".');
		}
        if (callback) {
            callback.call(this);
		}
		return false;
    });
};