// Reset all locks
x$('.lock').addClass('rotate0');

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

function checkIfWon() {
    if (x$('.rotate0').length == 0) {
        x$('#result').html('You did it!');
        x$('.rotate90').css({'background-color':'#0f0'});
    }
}

// Define click handler
x$('.lock').click(function() {
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