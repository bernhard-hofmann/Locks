var withToggles = true;

// Reset all locks
function resetLocks() {
	x$('#game.threeLocks').css({'display':'none'});
	x$('#game.fourLocks').css({'display':'none'});

	x$('.lock').removeClass('rotate90');
	x$('.lock').removeClass('rotate0');
	x$('.lock').addClass('rotate0');
	x$('.lock').addClass('rotate0');
	x$('.lock').css({'background-color':'#fff'});

	boardClass = 'threeLocks';
	x$('#game.threeLocks').css({'display':'block'});
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

function showWon() {
	if (typeof(navigator) !== "undefined" && typeof(navigator.notification) !== "undefined") {
		navigator.notification.alert('Well done!', alertDismissed, 'You did it!', 'Reset');
	} else {
		alert('Well done! You did it!');
		resetLocks();
		boardClass = 'fourLocks';
		x$('#game.threeLocks').css({'display':'none'});
		x$('#game.fourLocks').css({'display':'block'});
	}
}

function checkIfWon() {
    if (x$('.'+ boardClass +'.rotate0').length == 0) {
        x$('.rotate90').css({'background-color':'#0f0'});
		setTimeout(showWon, 100);
    }
}

// Define click handler
var activity = 'click';
if ('ontouchstart' in document.documentElement) {
	activity = 'touchstart';
	console.log('Cool, touchstart is supported.');
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

	checkIfWon();
});