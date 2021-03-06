$(document).ready(function () {

    if (localStorage.getItem("userID") > 0) {
        console.log("Local user ID found");
        localUserID = localStorage.getItem("userID");
        console.log("User ID = " + localUserID);
        localUserID = localStorage.getItem("userID");
        $('#userReturn').modal('show');
    } else {
        console.log("No local user ID found!")
        localStorage.setItem("userID", getRandom(0, 9999999));
        console.log("User ID generated");
        localUserID = localStorage.getItem("userID");
        console.log("User ID = " + localUserID);
    };

    $('.user-time').on('click', function () {
        console.log('Time of day: ' + $(this).attr('value'));
        userTime = $(this).attr('value');
        $('#choice2').text(this.text);
    });

    $('.user-day').on('click', function () {
        console.log('Day: ' + $(this).attr('value'));
        userDay = $(this).attr('value');
        $('#choice4').text(this.text);
    });

    $('.user-price').on('click', function () {
        console.log('Price level: ' + $(this).attr('value'));
        userPrice = $(this).attr('value');
        $('#choice1').text(this.text);
    });

    $('.user-activity').on('click', function () {
        console.log('Activity level: ' + $(this).attr('value'));
        userActivity = $(this).attr('value');
        $('#choice3').text(this.text);
    });

    $('#btnSubmit').on('click', function () {
        // event.preventDefault();
        var userLocationUnchecked = $('#btnZipCode').val().trim();

        if ((userLocationUnchecked.length === 5) && (!isNaN(userLocationUnchecked))) {
            $('#tblContainer').empty();
            // $('#itemsContainer').empty();
            console.log('test');
            userLocation = userLocationUnchecked

            database.ref('user-searches/' + localUserID).push({
                time: userTime,
                price: userPrice,
                location: userLocation,
                activity: userActivity
            });
            console.log('submitted');

        } else {
            $('#userError').modal('show');
        }

    });



});

var localUserID = '';
var userLocation = '23221';
var userPrice = '2';
var userTime = '1400';
var userInterest = '';
var userDay = '5';
var userActivity = '0';


// we need less/more generalized activities to not overdo the api pulls
// here are the vars as they orgiginally were
// ["restaurant","bar","movie_theater","liquor_store", "coffee", "cafe", "night_club", "stadium" ],
// ["bowling_alley",  "zoo", "amusement_park", "art-gallery","museum"],
// ["hiking", "park"],

var activityType = [
    ["restaurant"],
    ["zoo", "amusement_park", "art-gallery", "museum"],
    ["hiking", "park", "bowling_alley"],
    ['restaurant', 'museum', 'park', "stadium"]

];



var config = {
    apiKey: "AIzaSyAjqgeQLosZ5_RvLLayW-2umwOp6rdm9AI",
    authDomain: "date-night-68f3d.firebaseapp.com",
    databaseURL: "https://date-night-68f3d.firebaseio.com",
    projectId: "date-night-68f3d",
    storageBucket: "",
    messagingSenderId: "980274349046"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var price = "";
var hours = "";
var address = "";
var website = "";

var getRandom = function (min, max) {
    // min = inclusive, max = exclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

// var newRow = $("<tr>");
//     newRow.attr("id","tableRow");
//     var newName = $("<td>");
//     newName.attr("class","table-data");
//     newName.text(name);
//     var newPrice = $("<td>");
//     newPrice.attr("class","table-data");
//     newPrice.text(price);
//     var newAddress = $("<td>");
//     newAddress.attr("class","table-data");
//     newAddress.text(address);
//     var newHours = $("<td>");
//     newHours.attr("class", "table-data");
//     newHours.text(hours);
//     var newWebsite= $("<td>");
//     newWebsite.attr("class", "table-data");
//     newWebsite.text(website);


    // newRow.append(newName);
    // newRow.append(newPrice);
    // newRow.append(newAddress);
    // newRow.append(newHours);
    // newRow.append(newWebsite);


// $("#tblContainer").append(
//     `
//     <tr>
//         <td class= "table-data">${name}</td>
//         <td class= "table-data">${price}</td>
//         <td class= "table-data">${address}</td>
//         <td class= "table-data">${hours}</td>  
//         <td class= "table-data">${website}</td>
//      </tr>
//     `
// );