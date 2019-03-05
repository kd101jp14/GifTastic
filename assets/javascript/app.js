$(document).ready(function () {

    var stillImage = "";
    var dynamicImage = "";

    // array that holds topics for the buttons and gifs
    var topics = ["excited", "afraid", "grateful", "bored", "enamoured", "annoyed", "heroic", "lonely", "silly"];

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
            // put buttons on the page
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
        interactiveGif()
    });

    // initial buttons for array items show on page
    createButtons()
    interactiveGif()
    function interactiveGif() {

        $(".feeling").on("click", function (event) {

            // turn the data-name attribute for buttons into variables we can use
            var feeling = $(this).attr("data-name");
            console.log(feeling);

            // URL that plugs in the feeling variable (the data-name of the button)
            // limit of 10 pics
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + feeling + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

            // make ajax request and then use the response for a function
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var results = response.data;
                console.log(response.data);

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    console.log(rating);
                    var ratingDisplay = $("<p>").text("Rating: " + rating);
                    var imageDisplay = $("<img>");
                    imageDisplay.attr("id", "img" + [i]);
                    imageDisplay.attr("data-name", "img" + [i]);
                    imageDisplay.attr("data-state", "still");
                    stillImage = results[i].images.fixed_height_still.url;
                    imageDisplay.attr("data-still", stillImage);
                    console.log(stillImage);
                    dynamicImage = results[i].images.fixed_height.url;
                    imageDisplay.attr("data-dynamic", dynamicImage);
                    console.log(dynamicImage);
                    imageDisplay.attr("src", stillImage);
                    gifDiv.prepend(ratingDisplay);
                    gifDiv.prepend(imageDisplay);

                    $("#gifSpace").prepend(gifDiv);
                };

                $("img").on("click", function (event) {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-dynamic"));
                        $(this).attr("data-state", "dynamic");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

            });

        });

    };
});