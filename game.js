buttonColors = ["red", "blue", "green", "yellow"]
gamePattern = []
userClickedPattern = []

var started = false;
var level = 0;


function nextSequence() {
    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)

}


$(".btn").click(
    function () {
        userChosenColor = $(this).attr("id")
        userClickedPattern.push(userChosenColor)

        checkAnswer(userClickedPattern.length - 1)
        console.log(userClickedPattern.length - 1)
        playSound(userChosenColor)
        animatePress(userChosenColor)
    }
)


function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed")
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed")
    }, 100)
}


$(document).keypress(function (event) {
    console.log(event)
    if (!started) {
        started = true;
        level = 0;
        gamePattern = []
        nextSequence(level);
    }
})



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () { nextSequence(); }, 1000)
        }
    }
    else {
        var gameOver = new Audio('sounds/wrong.mp3')
        gameOver.play()
        $("h1").text("Game Over Press any key to restart.")
        $("body").addClass("game-over");
        setTimeout(function () { $("body").removeClass("game-over"); }, 2000)
        started = false;

    }
}