$(document).ready(function () {

    // array that holds topics for the buttons and gifs
    var topics = ["excitement", "fear", "boredom", "disgust", "rage", "love", "annoyance", "gratitude", "amusement", "loneliness"];

    function createButtons() {
        // delete buttons prior to adding new buttons to avoid repeat buttons
        $(".buttonSpace").empty();
        // for loop that appends a button for each string in the array
        for (var i = 0; i < topics.length; i++) {
            var topicButton = $("<button>");
            topicButton.attr("id", topics[i] + "Button");
            topicButton.addClass("emotion btn btn-warning");
            topicButton.attr("data-name", topics[i]);
            topicButton.text(topics[i]);
            $(".buttonSpace").append(topicButton);
        };
    }

    $("#submitButton").click(function (event) {
        // stop button from trying to submit form
        event.preventDefault();
        var inputVal = $("#searchBox").val().trim();
        // push input into the array
        topics.push(inputVal);
        createButtons();
        // clear out search box
        $("#searchBox").val("");
    });
    createButtons()
});