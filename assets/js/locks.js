var UTIL = (function(my) {
	my.getRandomInt = function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return my;
}(UTIL || {}));

var GAME = (function (my) { 
	my.toggles = 0;
	my.animate = function() {
		var isAnimated = true;//(window.localStorage.getItem("animate") === "true");
		return isAnimated;
	};

	my.resetLocks = function(a) {
		var row, col, i;
		if (!a) {
			GAME.boardClass = 'threeLocks';
		} else {
			GAME.boardClass = a;
		}
		$('#game.threeLocks').css({'display':'none'});
		$('#game.fourLocks').css({'display':'none'});

		$('.lock').css({'background-color':'#fff'});
		$('.lock').removeClass('rotate90');
		$('.lock').removeClass('rotate90animated');
		$('.lock').removeClass('rotate0');
		$('.lock').removeClass('rotate0animated');

		var zeroClass = 'rotate0';
		if (GAME.animate()) {
			zeroClass = 'rotate0animated';
		}
		$('.lock').addClass(zeroClass);

		for (i=1; i<GAME.toggles; i++) {
			if (GAME.boardClass === 'threeLocks') {
				row = UTIL.getRandomInt(1,3);
				col = UTIL.getRandomInt(1,3);
			} else {
				row = UTIL.getRandomInt(1,4);
				col = UTIL.getRandomInt(1,4);
			}

			console.log('Toggling row '+ row +' col '+ col);
			$('.lock[row="' + row + '"]').each(function() {
				GAME.toggle($(this));
			});
			$('.lock[col="' + col + '"]').each(function() {
				GAME.toggle($(this));
			});
			$('.lock[row="' + row + '"][col="' + col + '"]').each(function() {
				GAME.toggle($(this));
			});
		}

		$('#game.'+ GAME.boardClass).css({'display':'block'});
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
		var audio = new Audio('assets/audio/done.mp3');
		audio.play();

		GAME.toggles += 1;
		bizt();
		if (typeof(navigator) !== "undefined" && typeof(navigator.notification) !== "undefined") {
			navigator.notification.alert('Well done!', GAME.alertDismissed, 'You did it!', 'Reset');
		} else {
			alert('Well done!');
			GAME.resetLocks('fourLocks');
		}
	};

	my.checkIfWon = function() {
		var classText = '.'+ GAME.boardClass +'.rotate0';
		if (GAME.animate()) {
			classText += 'animated';
		}
		if ($(classText).length === 0) {
			$('.rotate90').css({'background-color':'#0f0'});
			$('.rotate90animated').css({'background-color':'#0f0'});
			setTimeout(GAME.showWon, 500);
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


$('.lock').parent().bind(GAME.activity, function() {
	var audio = new Audio('assets/audio/snap.mp3');
	audio.play();

	var cellid = this.childNodes[0].id;
	var that = $('#'+cellid);
	// Identify the row and column
	var row = that.attr('row');
	var col = that.attr('col');
	// Toggle every cell in the row, and every cell in the column
	$('.lock[row="' + row + '"]').each(function() {
		if (this.id !== that.attr('id')) {
			GAME.toggle($(this));
		}
	});
	$('.lock[col="' + col + '"]').each(function() {
		GAME.toggle($(this));
	});

	GAME.checkIfWon();
});
