$(document).ready(function() {
  $("#btnSubmit").on("click", function() {
    // for (var i = 0; i < 10; i++) {
    var googD = {
      api: "https://maps.googleapis.com",
      path: "/maps/api/place/details/",
      output: "json?",
      place: "placeid=",
      apiKey:
        "AIzaSyB3LTprm0Nv01RsSsS34XV3NoycAXNrd4Q",
      query: ""
    };

    var googText = {
      api: "https://maps.googleapis.com",
      path: "/maps/api/place/textsearch/",
      output: "json",
      query: "restaurant",
      location: "&location=",
      price: "&maxprice=" + userPrice + "&minprice=" + userPrice, 
      type: "&type=",
      lat: "",
      lng: "",
      radius: "&radius=500",
      apiKey: "&key=AIzaSyB3LTprm0Nv01RsSsS34XV3NoycAXNrd4Q"
    };

    var zipApi = {
      api: "https://www.zipcodeapi.com/rest/",
      apiKey:
        "6OxWvGx0Dw4wpSHoahcMzHjm2BaVgbNYD8TRuC5Pw4H6Bt1ZhqSPagogqujHNCvY",
      format: "/info.json",
      zip: "/" + userLocation,
      units: "/degrees",
      zipUrl: "",
      zipUrl: function() {
        zipApi.zipUrl =
          zipApi.api +
          zipApi.apiKey +
          zipApi.format +
          zipApi.zip +
          zipApi.units;
      }
    };
    zipApi.zipUrl();
    console.log(zipApi.zip);
    // var googDUrl = googD.api + googD.path + googD.output + googD.placeId + googD.apiKey;
    // var googTUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + googText.query + "&location=" + lat + "," + lng + "&radius=500" + googText.price + "&key=AIzaSyCncPas0D_Cgk8gECiV_7tEIqxkNa0f9Ns";

    var zipApiUrl = zipApi.zipUrl;

    console.log(zipApiUrl);

    $.ajax({
      url: zipApiUrl,
      dataType: "json",
      method: "GET"
    }).then(function(response) {
      // console.log("response" + response);

      var lat = response.lat;
      var lng = response.lng;
      console.log(lat + ", " + lng);

      var googTUrl =
        "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
        googText.query +
        googText.price +
        "&location=" +
        lat +
        "," +
        lng +
        "&radius=2&key=AIzaSyB3LTprm0Nv01RsSsS34XV3NoycAXNrd4Q";
      $.ajax({
        url: googTUrl,
        dataType: "json",
        method: "GET"
      }).then(function(response) {
        console.log(response);

        var placeId = response.results[0].place_id;
       
        //     for (var i = 0; i < response.results.length; i++) {

        // var photo = "";
        //         if (response.results[i].photos[i].photo_reference != undefined) {
        // var photo = response.results[0].photos[0].photo_reference;
        // var photo= response.results[0].photos[0].photo_reference;
        // console.log(photo+"first");
        //         // https://maps.googleapis.com/maps/api/place/photo?parameters
        //     }
        // var googPUrl = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photo + "&maxheight=500&key=AIzaSyCncPas0D_Cgk8gECiV_7tEIqxkNa0f9Ns"

        // $.ajax({
        //     url: googPUrl,
        //     dataType: "json",
        //     method: "GET",
        // }).then(function (response) {
        //     console.log(response);
        //     console.log("new"+photo);

        //     });
        // }
        var googDUrl =
          "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
          placeId +
          "&key=AIzaSyB3LTprm0Nv01RsSsS34XV3NoycAXNrd4Q";

        $.ajax({
          url: googDUrl,
          dataType: "json",
          method: "GET"
        }).then(function(response2) {
          console.log(response2);
          //   $("#itemsContainer").empty();

          for (var i = 0; i < 10; i++) {
            var photo = response.results[i].photos[0].photo_reference;
            // https://maps.googleapis.com/maps/api/place/photo?parameters
            console.log("afterajax:  " + photo);
//this ajax callpulls 
            var googPUrl =
              "https://maps.googleapis.com/maps/api/place/photo?photoreference=" +
              photo +
              "&maxheight=400&maxwidth=600&key=AIzaSyB3LTprm0Nv01RsSsS34XV3NoycAXNrd4Q";
            var name = response.results[i].name;
            console.log(name);
            var price = response.results[i].price_level;
            var hours = response.results[i].opening_hours;
            var address = response.results[i].formatted_address;
            var website = response.results[i].website;
            //insert the HTML elements for the carousel here:

            var newCarouselItem = $("<div class='carousel-item'>");
            // console.log(i);
            var newImg = $(`
              <img class= 'd-block w-100' src=${googPUrl} alt='slide image'/>
              <div class="carousel-caption d-none d-md-block">
                            <h5>${name}</h5>
                            <p>${price}</p>
                          </div>
              `);
            newCarouselItem.append(newImg);

            $("#itemsContainer").append(newCarouselItem);

            $("#tblContainer").append(
              `
                <tr>
                    <td class= "table-data">${name}</td>
                    <td class= "table-data">${price}</td>
                    <td class= "table-data">${address}</td>
                    <td class= "table-data">${hours}</td>  
                    <td class= "table-data">${website}</td>
                 </tr>
                `
            );
          }

          //     $.ajax({
          //         url: googPUrl,
          //         dataType: "json",
          //         method: "GET",
          //     }).then(function (response3) {
          //         console.log(response3);
          //         console.log(googPUrl+"yup");

          // });
        });
      });
    });

    // }
  });
});
// $.ajax({
//     url: googTUrl,
//     dataType: "json",
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);

//     var placeId = response.results[0].id;
//     var googDUrl = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyCncPas0D_Cgk8gECiV_7tEIqxkNa0f9Ns"

//   });

// });
