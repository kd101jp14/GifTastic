$(document).ready(function () {

    var stillImage ="";

    // array that holds topics for the buttons and gifs
    var topics = ["excited", "afraid", "grateful", "bored", "enamoured", "annoyed", "heroic", "lonely", "silly"];
    
    // initial buttons for array items show on page
    createButtons()

    function createButtons() {
        // delete buttons prior to adding new buttons to avoid repeat buttons
        $(".buttonSpace").empty();
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
            $(".buttonSpace").append(topicButton);
        };
    }

    $("#submitButton").on("click", function(event) {
        // stop button from trying to submit form
        event.preventDefault();
        // save input value in a variable
        var inputVal = $("#searchBox").val().trim();
        // push input value into the array
        topics.push(inputVal);
        // call createButtons function to make new button for input value
        createButtons();
        // clear out search box after submit button has been clicked
        $("#searchBox").val("");
        console.log(topics);
    });

    $(".feeling").on("click", function(event) {

        // turn the data-name attribute for buttons into variables we can use
        var feeling = $(this).attr("data-name");

        // URL that plugs in the feeling variable (the data-name of the button)
        // limit of 10 pics
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + feeling + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

        // make ajax request and then use the response for a function
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){

            var results = response.data;
            console.log(response.data);

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");
                var rating = results[i].rating;
                console.log(rating);
                var ratingDisplay = $("<p>").text("Rating: " + rating);
                var imageDisplay = $("<img>");
                stillImage = results[i].images.fixed_height_still.url;

                imageDisplay.attr("src", stillImage);
                
                gifDiv.prepend(ratingDisplay);
                gifDiv.prepend(imageDisplay);

                $(".gifSpace").prepend(gifDiv);
            }
        });

    });
});