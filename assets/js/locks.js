function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var toggles = 0;

// Reset all locks
function resetLocks(a) {
	if (!a) {
		boardClass = 'threeLocks';
	} else {
		boardClass = a;
	}
	x$('#game.threeLocks').css({'display':'none'});
	x$('#game.fourLocks').css({'display':'none'});

	x$('.lock').removeClass('rotate90');
	x$('.lock').removeClass('rotate0');
	x$('.lock').addClass('rotate0');
	x$('.lock').addClass('rotate0');
	x$('.lock').css({'background-color':'#fff'});

	var row, col, i;
	for (i=1; i<toggles; i++) {
		row = getRandomInt(1,4);
		col = getRandomInt(1,4);

		console.log('Toggling row '+ row +' col '+ col);
		x$('.lock[row="' + row + '"]').each(function() {
			toggle(x$(this));
		});
		x$('.lock[col="' + col + '"]').each(function() {
			toggle(x$(this));
		});
		x$('.lock[row="' + row + '"][col="' + col + '"]').each(function() {
			toggle(x$(this));
		});
	}

	x$('#game.'+boardClass).css({'display':'block'});
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
	}
	toggles += 1;
	resetLocks('fourLocks');
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