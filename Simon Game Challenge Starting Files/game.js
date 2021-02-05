var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}


function checkAnswer(lastindex) {
  if (userClickedPattern[lastindex] === gamePattern[lastindex]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    console.log("Failure");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNo = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNo];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor);

}


function playSound(chosenColor) {
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}






$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})


$(document).keypress(function() {
  if (started === false) {
    started = true;
    nextSequence();
  }
});
