var userClickedPattern = [];

// Initiating the pattern
var gamePattern = [];

// Defining the four button colors
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

// starting the game
document.addEventListener("keydown", function() {
    if(level === 0) {
        nextSequence();
    }
});

// function for creating the sequence of colors
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    // adding the randomly generated color into the pattern
    gamePattern.push(randomChosenColour);

    // flashing the chosen button
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // playing the sound of randomly chosen button
    playSound(randomChosenColour);
}

// clicking the button and saving it in the clickedPattern
$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    // playing the sound of clicked button
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

// function for playing sound
function playSound(name) {
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

// animating the clicked button
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

// checking answer
function checkAnswer(currentLevel) {
    // checking the current index is matching or not!!

    // correct answer
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // if the sequence is correctly over
        if(currentLevel == gamePattern.length - 1) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    // wrong answer
    else {
        var wrongSound = new Audio('./sounds/wrong.mp3');
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// for resetting the game
function startOver() {
    level=0;
    gamePattern = [];
}