$(document).ready(function () {

    // array that holds topics for the buttons and gifs
    var topics = ["excited", "afraid", "thankful", "bored", "loved", "annoyed", "brave", "lonely", "silly"];
    
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

    $("#submitButton").click(function (event) {
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
    });

    $(".feeling").click(function (event) {

        // turn the data-name attribute for buttons into variables we can use
        var feeling = $(this).attr("data-name");

        // URL that plugs in the feeling variable (the data-name of the button)
        // limit of 10 pics
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + feeling + "&api_key=dc6zaTOxFJmzC&limit=10";

        // make ajax request and then use the resposnse for a function
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
        });

    });
});