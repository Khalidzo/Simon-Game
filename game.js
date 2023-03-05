var buttonColors = ["red", "blue", "green", "yellow"];
var colorSounds = [new Audio("sounds/red.mp3"), new Audio("sounds/blue.mp3"), new Audio("sounds/green.mp3"), new Audio("sounds/yellow.mp3")];
var gamePattern = [];
var playerPattern = [];
var gameStarted = false;
var level = 0;


$("body").keypress(function () {
    if (!gameStarted) {
        $("#level-title").html("level " + level);
        nextSequence(); 
        gameStarted = true;
    }
})

$(".btn").click(function () {

    var playerChosenColor = this.id;
    playerPattern.push(playerChosenColor);

    playSound(playerChosenColor);
    animatePress(playerChosenColor);

    checkAnswer(playerPattern.length - 1);

})

function nextSequence() {
    playerPattern = [];
    level++;
    $("#level-title").html("level " + level);
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
    playSound(randomChosenColour);
    
}

function playSound(color){
    switch (color){
        case "red":
            colorSounds[0].play();
            break;
        case "blue":
            colorSounds[1].play();
            break;
        case "green":
            colorSounds[2].play();
            break;
        case "yellow":
            colorSounds[3].play();
            break;
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === playerPattern[currentLevel]) {

        if (gamePattern.length === playerPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        let gameOverSound = new Audio("sounds/wrong.mp3");
        gameOverSound.play();

        $("body").addClass("game-over");
        setTimeout(() =>{
            $("body").removeClass("game-over");
        }, 200);

        gamePattern = [];
        playerPattern = [];
        level = 0;
        gameStarted = false;
        $("#level-title").html("Game Over, Press Any Key to Restart");
    }
}