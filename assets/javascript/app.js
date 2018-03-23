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

    $('.user-time').on('click', function () {
        console.log('Time of day: ' + $(this).attr('value'));
        userTime = $(this).attr('value');
        $('#choice2').text(this.text);
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
  
        if ((userLocationUnchecked.length === 5) && (!isNaN(userLocationUnchecked))){
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
var userLocation = '';
var userPrice = '';
var userTime = '';
var userInterest = '';
var userActivity = '';
var minimal = ["restaurant","bar","movie_theater","liquor_store", "coffee", "cafe", "night_club", "stadium" ];
var moderate=["bowling_alley",  "zoo", "amusement_park", "art-gallery","museum"];
var strenuous=["hiking", "park"];



var config = {
    apiKey: "AIzaSyBgnAU6r39_qdEb2eA203aA5Nh3D7spjDA",
    authDomain: "bootcamp-demo-4e619.firebaseapp.com",
    databaseURL: "https://bootcamp-demo-4e619.firebaseio.com",
    projectId: "bootcamp-demo-4e619",
    storageBucket: "bootcamp-demo-4e619.appspot.com",
    messagingSenderId: "952060630907"
};

firebase.initializeApp(config);

var database = firebase.database();

var name="";
var price="";
var hours="";
var address="";
var website="";

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