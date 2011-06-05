// Reset all locks
function resetLocks() {
	x$('.lock').removeClass('rotate90');
	x$('.lock').removeClass('rotate0');
	x$('.lock').addClass('rotate0');
	x$('.lock').addClass('rotate0');
	x$('.lock').css({'background-color':'#fff'});
};
resetLocks();

// Define a function to toggle a lock
function toggle(lock) {
    if (lock.hasClass('rotate90')) {
        lock.removeClass('rotate90');
        lock.addClass('rotate0');
    } else {
        lock.removeClass('rotate0');
        lock.addClass('rotate90');
    }
}

function alertDismissed() {
	resetLocks();
}

function checkIfWon() {
    if (x$('.rotate0').length == 0) {
        x$('.rotate90').css({'background-color':'#0f0'});
		navigator.notification.alert('Well done!', alertDismissed, 'You did it!', 'Reset');
    }
}

// Define click handler
var activity = 'click';
if ('ontouchstart' in document.documentElement) {
	activity = 'touchstart';
};
x$('.lock').on(activity, function() {
	var cellid = this.id;
	// Identify the row and column
	var row = x$(this).attr('row');
	var col = x$(this).attr('col');
	// Toggle every cell in the row, and every cell in the column
	x$('.lock[row="' + row + '"]').each(function() {
		toggle(x$(this));
	});
	x$('.lock[col="' + col + '"]').each(function() {
		toggle(x$(this));
	});
	// Toggle the cell clicked as well
	toggle(x$(this));

	// Allow the browser some time to animate the CSS
	setTimeout(checkIfWon, 500);
});