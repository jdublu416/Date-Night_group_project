$(document).ready(function () {

  $("#btnSubmit").on("click", function () {
    var apiKey = "&key=AIzaSyDAqnSVueutVyZHZt8JvMh-A0UW6lFL4MY";
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

        "jdfl4FiPUZGRIRmX87i7GsXiFarDOkV1Kpn8eHsGoDHs1VPhrCLNerU1XU4HHsMr",
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

    var zipApiUrl = zipApi.zipUrl;
    $.ajax({
      url: zipApiUrl,
      dataType: "json",
      method: "GET"
    }).then(function (local) {

      var lat = local.lat;
      var lng = local.lng;

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

          // $('#itemsContainer').empty();

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



              var day = userDay;
              if (details.result.opening_hours.periods[day].open.time) {
                var open = details.result.opening_hours.periods[day].open.time
                var close = details.result.opening_hours.periods[day].close.time
                console.log("open close test: " + open + " " + close);

              }
                if (open < userTime && userTime > close) {


              if (details.result.photos[0].photo_reference) {
                var photo = details.result.photos[0].photo_reference;

                console.log("photo test: " + i + " " + photo);

                var googPUrl =
                  "https://maps.googleapis.com/maps/api/place/photo?photoreference=" +
                  photo +
                  "&maxheight=400&maxwidth=600" + apiKey;


                var name = details.result.name;
                var rating = details.result.rating;
                var hours = details.result.opening_hours.weekday_text[day];
                var price = details.result.price_level;
                var address = details.result.formatted_address;
                var website = details.result.website;


                //insert the HTML elements for the carousel here:

                var newCarouselItem = $("<div class='carousel-item'>");

                var newImg = $(`
              <img class= 'd-block w-100' src=${googPUrl} alt='slide image'/>
              <div class="carousel-caption d-none d-md-block">
              <h5>${name}</h5>
              <p>Google Rating: ${rating}</p>
              </div>
              `);
                newCarouselItem.append(newImg);

                $("#itemsContainer").append(newCarouselItem);
              }

              $("#tblContainer").append(
                `
                <tr>
                    <td class="table-data">${name}</td>
                    <td class="table-data" id='itemRating'>${rating}</td>
                    <td class="table-data">${address}</td>
                    <td class="table-data">${hours}</td>  
                    <td class="table-data"><a href='${website}'>${name}</a></td>

                 </tr>
                `
              );

              if (!details.result.rating) {
                $('#itemRating').text('No rating');
              }
              // }
            }
            });

          }

        });
      }
    });

  });

});

