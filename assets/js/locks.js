var UTIL = (function(my) {
	my.getRandomInt = function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return my;
}(UTIL || {}));

var GAME = (function (my) { 
	my.toggles = 0;
	my.animate = function() {
		var isAnimated = (window.localStorage.getItem("animate") === "true");
		return isAnimated;
	};

	my.resetLocks = function(a) {
		var row, col, i;
		if (!a) {
			GAME.boardClass = 'threeLocks';
		} else {
			GAME.boardClass = a;
		}
		x$('#game.threeLocks').css({'display':'none'});
		x$('#game.fourLocks').css({'display':'none'});

		x$('.lock').css({'background-color':'#fff'});
		x$('.lock').removeClass('rotate90');
		x$('.lock').removeClass('rotate90animated');
		x$('.lock').removeClass('rotate0');
		x$('.lock').removeClass('rotate0animated');

		var zeroClass = 'rotate0';
		if (GAME.animate()) {
			zeroClass = 'rotate0animated';
		}
		x$('.lock').addClass(zeroClass);

		for (i=1; i<GAME.toggles; i++) {
			if (GAME.boardClass === 'threeLocks') {
				row = UTIL.getRandomInt(1,3);
				col = UTIL.getRandomInt(1,3);
			} else {
				row = UTIL.getRandomInt(1,4);
				col = UTIL.getRandomInt(1,4);
			}

			console.log('Toggling row '+ row +' col '+ col);
			x$('.lock[row="' + row + '"]').each(function() {
				GAME.toggle(x$(this));
			});
			x$('.lock[col="' + col + '"]').each(function() {
				GAME.toggle(x$(this));
			});
			x$('.lock[row="' + row + '"][col="' + col + '"]').each(function() {
				GAME.toggle(x$(this));
			});
		}

		x$('#game.'+ GAME.boardClass).css({'display':'block'});
	};

	my.toggle = function(lock) {
		var zeroClass = 'rotate0';
		var ninetyClass = 'rotate90';
		if (GAME.animate()) {
			zeroClass = 'rotate0animated';
			ninetyClass = 'rotate90animated';
		}

		if (lock.hasClass(ninetyClass)) {
			lock.removeClass(ninetyClass);
			lock.addClass(zeroClass);
		} else {
			lock.removeClass(zeroClass);
			lock.addClass(ninetyClass);
		}
	}

	my.alertDismissed = function() {
		GAME.resetLocks('fourLocks');
	};

	my.showWon = function() {
		GAME.toggles += 1;
		if (typeof(navigator) !== "undefined" && typeof(navigator.notification) !== "undefined") {
			navigator.notification.alert('Well done!', GAME.alertDismissed, 'You did it!', 'Reset');
		} else {
			alert('Well done! You did it!');
			GAME.resetLocks('fourLocks');
		}
	};

	my.checkIfWon = function() {
		var classText = '.'+ GAME.boardClass +'.rotate0';
		if (GAME.animate()) {
			classText += 'animated';
		}
		if (x$(classText).length === 0) {
			x$('.rotate90').css({'background-color':'#0f0'});
			setTimeout(GAME.showWon, 100);
		}
	};

	// Define click handler
	my.activity = 'click';
	if ('ontouchstart' in document.documentElement) {
		my.activity = 'touchstart';
		console.log('Cool, touchstart is supported.');
	};

	my.reset = function() {
		GAME.toggles = 0;
		GAME.resetLocks();
	};

	return my;
}(GAME || {}));

GAME.resetLocks();


x$('.lock').on(GAME.activity, function() {
	var cellid = this.id;
	// Identify the row and column
	var row = x$(this).attr('row');
	var col = x$(this).attr('col');
	// Toggle every cell in the row, and every cell in the column
	x$('.lock[row="' + row + '"]').each(function() {
		GAME.toggle(x$(this));
	});
	x$('.lock[col="' + col + '"]').each(function() {
		GAME.toggle(x$(this));
	});
	// Toggle the cell clicked as well
	GAME.toggle(x$(this));

	GAME.checkIfWon();
});