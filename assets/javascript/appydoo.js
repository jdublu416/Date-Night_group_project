
$(document).ready(function () {

    var googD = {
        api: "https://maps.googleapis.com",
        path: "/maps/api/place/details/",
        output: "json?",
        place: "placeid=",
        apiKey: "AIzaSyCncPas0D_Cgk8gECiV_7tEIqxkNa0f9Ns",
        query: ""
    }

    var googText = {
        api: "https://maps.googleapis.com",
        path: "/maps/api/place/textsearch/",
        output: "json",
        query: "?query=bar",
        location: "&location=",
        lat: "",
        lng: "",
        radius: "&radius=500",
        apiKey: "&key=AIzaSyCncPas0D_Cgk8gECiV_7tEIqxkNa0f9Ns",

    }

    var zipApi = {
        // https://www.zipcodeapi.com/rest/ZxyWjVv2ndjV5Gvve1NttbKtx63gut2K9qkD3W31cRA9md26FBkhAk8nERDhIQ32/info.json/23060/degrees

        api: "https://www.zipcodeapi.com/rest/",
        apiKey: "ZxyWjVv2ndjV5Gvve1NttbKtx63gut2K9qkD3W31cRA9md26FBkhAk8nERDhIQ32",
        format: "/info.json",
        zip: "/23220",
        units: "/degrees",
        zipUrl: "",
        zipUrl: function () {
            zipApi.zipUrl = zipApi.api + zipApi.apiKey + zipApi.format + zipApi.zip + zipApi.units;
        }
    }
    zipApi.zipUrl();

    // var googDUrl = googD.api + googD.path + googD.output + googD.placeId + googD.apiKey;

    var zipApiUrl = zipApi.zipUrl;



    $.ajax({

        url: zipApiUrl,
        dataType: "json",
        method: "GET",
        contentType: 'text/plain',

    }).then(function (response) {
        console.log("response" + response);

        var lat = response.lat;
        var lng = response.lng;
        console.log(lat + ", " + lng);

        var googTUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=&type=night_club&location=" + lat + "," + lng + "&radius=500&key=AIzaSyCncPas0D_Cgk8gECiV_7tEIqxkNa0f9Ns";
        $.ajax({
            url: googTUrl,
            dataType: "json",
            method: "GET",
        }).then(function (response) {
            

            var placeId = response.results[1].place_id;

            console.log(response);
            var googDUrl = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyCncPas0D_Cgk8gECiV_7tEIqxkNa0f9Ns";


            var photo = response.results[1].photos.reference;
            https://maps.googleapis.com/maps/api/place/photo?parameters

            var googPUrl = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photo + "&maxheight=500&key=AIzaSyCncPas0D_Cgk8gECiV_7tEIqxkNa0f9Ns"

            $.ajax({
                url: googPUrl,
                dataType: "json",
                method: "GET",
            }).then(function (response) {
                console.log(response);

            });

            $.ajax({
                url: googDUrl,
                dataType: "json",
                method: "GET",
            }).then(function (response) {
                console.log(response);
                // var photo = response.results[1].photos.reference;
                // // https://maps.googleapis.com/maps/api/place/photo?parameters

                // var googPUrl = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + photo + "&maxheight=500&key=AIzaSyCncPas0D_Cgk8gECiV_7tEIqxkNa0f9Ns"

                // $.ajax({
                //     url: googPUrl,
                //     dataType: "json",
                //     method: "GET",
                // }).then(function (response) {
                //     console.log(response);

                // });
            });


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

});
