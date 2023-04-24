var gamePattern = [];

var buttonColors = ["red","blue","green","yellow"];

var userClickedPattern = [];

var level = 0;

var started = false;

function nextSequence(){
    
    userClickedPattern = [];
    level++;    
    $("#level-title").text("level "+level);
    var randomNumber = (Math.floor(Math.random()*4));
    var randomChosenColors = buttonColors[randomNumber];
    gamePattern.push(randomChosenColors);
    

    $("#"+randomChosenColors).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColors);
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length -1);
    
 
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();


}

function animatePress(currentColors){
    $("#"+currentColors).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColors).removeClass("pressed");
    },100);
    
}

$(document).keydown(function(Event){
    if(started === false){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);

        }

    }
    else if(gamePattern[currentLevel]!== userClickedPattern[currentLevel]){
        wrongClick();
        newStart();
        
    }
}

function wrongClick(){
    
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    $("body ").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
        
    },200);
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    
    
}

function newStart(){
    level = 0;
    gamePattern=[];
    started = false;
}

