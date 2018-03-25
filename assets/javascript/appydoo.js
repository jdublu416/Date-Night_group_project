$(document).ready(function () {

  $("#btnSubmit").on("click", function () {
    // for (var i = 0; i < 10; i++) {


    // switch case for activity level

    if (userActivity.value == 0) {
      console.log(minimal);
    }



    var apiKey = "&key=AIzaSyA2SzP91grr5OJHZONUYV-PHOdtftVbk1Q";
    var googD = {
      api: "https://maps.googleapis.com",
      path: "/maps/api/place/details/",
      output: "json?",
      place: "placeid=",
    };

    var googText = {
      api: "https://maps.googleapis.com",
      path: "/maps/api/place/textsearch/",
      output: "json",
      radius: "&radius=500",
    };

    var zipApi = {
      api: "https://www.zipcodeapi.com/rest/",
      apiKey:
        "6OxWvGx0Dw4wpSHoahcMzHjm2BaVgbNYD8TRuC5Pw4H6Bt1ZhqSPagogqujHNCvY",
      format: "/info.json",
      zip: "/" + userLocation,
      units: "/degrees",
      zipUrl: "",
      zipUrl: function () {
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

    var zipApiUrl = zipApi.zipUrl;

    console.log(zipApiUrl);

    $.ajax({
      url: zipApiUrl,
      dataType: "json",
      method: "GET"
    }).then(function (local) {


      var lat = local.lat;
      var lng = local.lng;
      console.log(lat + ", " + lng);

      console.log(userActivity);
      for (var j = 0; j < activityType[userActivity].length; j++) {

        var type = activityType[userActivity];
        var googTUrl =
          "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
          "&type=" +
          type[j] +
          "&minprice=" +
          userPrice +
          "&maxprice=" +
          userPrice +
          "&location=" +
          lat +
          "," +
          lng +
          "&radius=2" +
          apiKey;
        console.log("url test: " + googTUrl);
        console.log("type test: " + type);

        $.ajax({
          url: googTUrl,
          dataType: "json",
          method: "GET"
        }).then(function (data) {
          console.log("search test: ");
          console.log(data);

          for (var i = 0; i < data.results.length; i++) {



            var placeId = data.results[i].place_id;
            var googDUrl =
              "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
              placeId + apiKey;

            $.ajax({
              url: googDUrl,
              dataType: "json",
              method: "GET"
            }).then(function (details) {
              console.log("details test:");
              console.log(details);
              //   $("#itemsContainer").empty();

              // for (var i = 0; i < 10; i++) {

              if (details.result.photos[0].photo_reference) {
                var photo = details.result.photos[0].photo_reference;

                console.log("photo test: " + i + " " + photo);

                var googPUrl =
                  "https://maps.googleapis.com/maps/api/place/photo?photoreference=" +
                  photo +
                  "&maxheight=400&maxwidth=600" + apiKey;


                var name = details.result.name;
                console.log(name);
                var price = details.result.price_level;
                var hours = details.result.opening_hours.weekday_text[4];
                var address = details.result.formatted_address;
                var website = details.result.website;


                //insert the HTML elements for the carousel here:

                var newCarouselItem = $("<div class='carousel-item'>");

                var newImg = $(`
              <img class= 'd-block w-100' src=${googPUrl} alt='slide image'/>
              <div class="carousel-caption d-none d-md-block">
                            <h5>${name}</h5>
                            <p>${price}</p>
                          </div>
              `);
                newCarouselItem.append(newImg);

                $("#itemsContainer").append(newCarouselItem);
              }
              $("#tblContainer").append(
                `
                <tr>
                    <td class= "table-data">${name}</td>
                    <td class= "table-data">${price}</td>
                    <td class= "table-data">${address}</td>
                    <td class= "table-data">${hours}</td>  
                    <td class= "table-data"><a href='${website}'>${name}</a></td>
                 </tr>
                `
              );
              // }

            });

          }

        });
      }
    });

  });

});

