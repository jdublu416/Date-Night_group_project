$(document).ready(function () {

    if (localStorage.getItem("userID") > 0) {
        console.log("Local user ID found");
        localUserID = localStorage.getItem("userID");
        console.log("User ID = " + localUserID);
        localUserID = localStorage.getItem("userID");
    } else {
        console.log("No local user ID found!")
        localStorage.setItem("userID", getRandom(0, 9999999));
        console.log("User ID generated");
        localUserID = localStorage.getItem("userID");
        console.log("User ID = " + localUserID);
    };

    $('.user-day').on('click', function () {
        console.log('Day: ' + $(this).attr('value'));
        userDay = $(this).attr('value');
        $('#choice4').text(this.text);
    });

    $('.user-time').on('click', function () {
        console.log('Time of day: ' + $(this).attr('value'));
        userTime = $(this).attr('value');
        $('#dropdownMenuTime').text(this.text);
    });

    $('.user-price').on('click', function () {
        console.log('Price level: ' + $(this).attr('value'));
        userPrice = $(this).attr('value');
        $('#dropdownMenuPrice').text(this.text);
    });

    $('.user-activity').on('click', function () {
        console.log('Activity level: ' + $(this).attr('value'));
        userActivity = $(this).attr('value');
        $('#dropdownMenuActivity').text(this.text);
    });

    $('#btnZipCode').change(function () {
        // event.preventDefault();
        userLocation = $('#btnZipCode').val();
        console.log(userLocation);
        // database.ref('user-searches/' + localUserID).push({
        //     time: userTime,
        //     price: userPrice,
        //     location: userLocation,
        //     activity: userActivity
        // });
        console.log('submitted');
    });

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    });

    $(function () {
        $('[data-toggle="popover"]').popover()
    });

});

var localUserID = '';
var userLocation = '';
var userPrice = '';
var userTime = '';
var userInterest = '';
var userActivity = '';


var config = {
    apiKey: "AIzaSyBgnAU6r39_qdEb2eA203aA5Nh3D7spjDA",
    authDomain: "bootcamp-demo-4e619.firebaseapp.com",
    databaseURL: "https://bootcamp-demo-4e619.firebaseio.com",
    projectId: "bootcamp-demo-4e619",
    storageBucket: "bootcamp-demo-4e619.appspot.com",
    messagingSenderId: "952060630907"
};

// firebase.initializeApp(config);

// var database = firebase.database();

// var getRandom = function (min, max) {
//     // min = inclusive, max = exclusive
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min;
// };