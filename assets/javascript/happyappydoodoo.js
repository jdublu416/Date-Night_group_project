$(document).ready(function () {

    $('#user-time-radio input:radio').change(function() {
        console.log($(this).val() + ' ' + $(this).attr('id'));
        userTime = $(this).val();
    });

    $('#user-price-radio input:radio').change(function() {
        console.log($(this).val() + ' ' + $(this).attr('id'));
        userPrice = $(this).val();
    });

});

var userLocation = '';
var userPrice = '';
var userTime = '';
var userInterest = '';


