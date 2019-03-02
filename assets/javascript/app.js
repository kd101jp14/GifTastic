$(document).ready(function() {

var topics = ["excitement", "fear", "boredom", "disgust", "rage", "love", "annoyance", "gratitude", "amusement", "loneliness"];

for (var i = 0; i < topics.length; i++) {
    // loop that appends a button for each string in the array
    var topicButton = $("<button>");
    topicButton.attr("id", topics[i] + "Button");
    topicButton.text(topics[i]);
    topicButton.addClass("btn btn-warning");
    // topicButton.addClass("btn btn-warning");
    $(".buttonSpace").append(topicButton);
};

});