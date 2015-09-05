/*** GLOBALS ***/
var secretNumber = null;
var guessCount = 5;
var allGuesses = [];
var currentGuess;
var diff = 0;
var textStatus = $("#status");
var guessSubmission;
var dupe = false;

initialize();

function initialize() {
    $("#start-game").show();
    $("h1").text('! GUESS !')
    $("#play-box").hide();
// reset variables
    guessCount = 5;
    $("#guess-count").text(guessCount);
    createSecretNumber();
    allGuesses = [];
    $("#guess-history").text(allGuesses.join(", "));
    $("#hint-text").hide();
    $("body").css("background-color","#3399FF");
    $("#status").text("Go ahead, pick a  number 1-100");
    $("#guess").val('');
}

function gameStart(){
    initialize();
    $("#start-game").hide();
    $("#play-box").show();
}

$('input').keyup(function(event){
    if(event.keyCode === 13){
        processGuess();
    }
})

function processGuess(){
    dupe = false;
    var submitted = ( $("#guess").val() );
    currentGuess = parseInt(submitted);

    //clear form
    $("#guess").val('');

    allGuesses.forEach(function(guess){
        if(parseInt(currentGuess) === parseInt(guess)){
            dupe = true;
        }
    });
    if (guessCount < 1){
        $("#status").text("Game over!!");
    } else if (isNaN(submitted)) {
        var invalidSubmission = ['Enter a number 1-100, genius ("', submitted, '", really!?)'].join('');
        $("#status").text(invalidSubmission)
    } else if (dupe === true) {
        $("#status").text("You already guessed that number, punk");
    } else if ((currentGuess > 100) || (currentGuess < 0)){
        $("#status").text("Can't you read? between 1 and 100 please!");
    } else {
        checkWin();
        $("#status").text(hotOrCold());
        guessCount--;
        allGuesses.push(currentGuess);
        $("#guess").text("");
        $("#guess-count").text(guessCount);
        $("#guess-history").text("you guessed: " + allGuesses.join(", "));
    }
}

function checkWin() {
    if (currentGuess === secretNumber){
        guessCount = 0;
        $("body").css("background-color","yellow");
        $("h1").text('! YOU WIN !')
        $("#play-box").hide();
        $("#start-game").show();
    }
}

function hint() {
    var hintText = ["Hint: ", secretNumber, " (cheater!)"].join('');
    $("#hint-text").text(hintText).show();
}

function hotOrCold() {
    diff = secretNumber - currentGuess;
    var aboveOrBelow = "";
    var howClose = ""
    if (diff > 0) {
        aboveOrBelow = "higher"
    } else if (diff < 0) {
        aboveOrBelow = "lower"
    }

    var distance = Math.abs(diff);

    if (distance < 3) {
        howClose = "hottt (ssss..~), guess " + aboveOrBelow;
    } else if (distance < 6) {
        howClose = "pretty hot, guess " + aboveOrBelow;
    } else if (distance <= 12) {
        howClose = "warm, guess " + aboveOrBelow;
    } else if (distance > 12 ) {
        howClose = "cold, guess " + aboveOrBelow;
    } else if (distance > 25) {
        howClose = "very cold, guess " + aboveOrBelow;
    }
    return howClose;
}

function createSecretNumber(){
    secretNumber = Math.floor((Math.random()*100)+1);
}








/*
$("#submit").click(function(event){
    currentGuess = $("#guess").val();

    $("#status").text();
});
*/




// 2. Show status of guess:
    // 2.1 Print guess in "status" area
    // 2.2 Print if it's "hot or cold"


// 3. Show number of guesses remaining

// 4. If user enters a correct guess:
    //4.1 change H1 top text to YOU WIN
        //could have an overlay go on and a "YOU WIN" use show("slow")
    //4.2 change background color

// 5. for PLAY AGAIN
    // 5.1 Reset everything to starting point -
    // 5 guesses, clear status, etc.





    //Hide Boom warning button
    // jQuery(".warning").hide();
    // jQuery(".warning").show("slow");
