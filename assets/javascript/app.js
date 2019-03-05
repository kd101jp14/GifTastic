$(document).ready(function () {

    // global variables to be defined later in the interactiveGif function
    var stillImage = "";
    var dynamicImage = "";

    // array that holds topics for the buttons and gifs
    var topics = ["excited", "afraid", "grateful", "bored", "enamoured", "annoyed", "heroic", "lonely", "silly"];

    // initial buttons for array items are shown on the page and are functional
    createButtons()
    interactiveGif()

    function createButtons() {

        // delete buttons prior to adding new buttons to avoid repeat buttons
        $("#buttonSpace").empty();

        // for loop that appends a button for each string in the array
        for (var i = 0; i < topics.length; i++) {

            // create new button and save it as a variable
            var topicButton = $("<button>");

            // add information to buttons
            topicButton.attr("id", topics[i] + "Button");
            topicButton.addClass("feeling btn btn-warning");
            topicButton.attr("data-name", topics[i]);
            topicButton.text(topics[i]);

            // add buttons to the page
            $("#buttonSpace").append(topicButton);
        };
    }

    $("#submitButton").on("click", function (event) {

        // stop button from trying to submit form
        event.preventDefault();
        // save input value in a variable
        var feelingInput = $("#searchBox").val().trim();
        // push input value into the array
        topics.push(feelingInput);
        // call createButtons function to make new button for input value
        createButtons();
        // clear out search box after submit button has been clicked
        $("#searchBox").val("");
        console.log(topics);
        // call the interactiveGif function so that added buttons are functional
        interactiveGif();
    });

    function interactiveGif() {

        $(".feeling").on("click", function (event) {

            // save the data-name attribute for buttons as a variable to be used
            var feeling = $(this).attr("data-name");
            console.log(feeling);

            // URL plugs in the feeling variable (the data-name of the button)
            // limit of 10 pics, and no images with a rating over pg
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + feeling + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

            // make ajax request and then use the response for a function
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                // save the data of the response to a variable
                var results = response.data;
                console.log(response.data);

                // run for loop to iterate through the images
                for (var i = 0; i < results.length; i++) {

                    // create a div to hold the images
                    var gifDiv = $("<div>");

                    // save rating info in a variable
                    var rating = results[i].rating;
                    console.log(rating);
                    // create a paragraph tag to display rating info 
                    var ratingDisplay = $("<p>").text("Rating: " + rating);

                    // create an image tag for each image
                    var imageDisplay = $("<img>");

                    // add information to the images, incl. adding a class to make images responsive
                    imageDisplay.attr("id", "img" + [i]);
                    imageDisplay.addClass("img-fluid");
                    imageDisplay.attr("data-name", "img" + [i]);
                    imageDisplay.attr("data-state", "still");
                    stillImage = results[i].images.fixed_height_still.url;
                    imageDisplay.attr("data-still", stillImage);
                    console.log(stillImage);
                    dynamicImage = results[i].images.fixed_height.url;
                    imageDisplay.attr("data-dynamic", dynamicImage);
                    console.log(dynamicImage);
                    imageDisplay.attr("src", stillImage);

                    // place the rating and image diplays in the containing div
                    gifDiv.prepend(ratingDisplay);
                    gifDiv.prepend(imageDisplay);

                    // place the containing div in the space where it will be displayed on the page
                    $("#gifSpace").prepend(gifDiv);
                };

                // when clicking on an image, the state of the image changes between static and dynamic
                $("img").on("click", function (event) {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-dynamic"));
                        $(this).attr("data-state", "dynamic");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    };
                });

            });

        });

    };
});