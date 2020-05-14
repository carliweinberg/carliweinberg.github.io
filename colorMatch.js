

var config = {
    apiKey: "AIzaSyCp43vt855enyRtFVMbym8-rDsgzI9CdIg",
    authDomain: "gamefirebase-9b42c.firebaseapp.com",
    databaseURL: "https://gamefirebase-9b42c.firebaseio.com",
    projectId: "gamefirebase-9b42c",
    storageBucket: "gamefirebase-9b42c.appspot.com",
    messagingSenderId: "432402204046"
};
firebase.initializeApp(config);

var myFirebase = firebase.database().ref();

//TODO: need to store highscorre in local array, currently it is replacing the old one every time

function writeUserData() {
    highscores.push([score, player]);
    firebase.database().ref('highscores/').set({
        highscores
    });
}

var redAns = 0;
var blueAns = 0;
var greenAns = 0;
var redGuess = 0;
var blueGuess = 0;
var greenGuess = 0;
var score = 0;
var player = "carli";
var level = 1;
var threshold = 140;
var highscores = [];

$(document).ready(function () {
    popupForName();
    startGame();
    var blueSlider = document.getElementById("rangeBlue");
    blueSlider.oninput = function () {
        document.getElementById("blueLabel").textContent = blueSlider.value;
    }
    var redSlider = document.getElementById("rangeRed");
    redSlider.oninput = function () {
        document.getElementById("redLabel").textContent = redSlider.value;
    }
    var greenSlider = document.getElementById("rangeGreen");
    greenSlider.oninput = function () {
        document.getElementById("greenLabel").textContent = greenSlider.value;
    }

    ////////

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
        submitGuess();
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    ////////////
});


var leadsRef = firebase.database().ref('highscores');
leadsRef.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        highscores = childData;
    });
});

function popupForName() {
    player = prompt("Please enter your name:");
}

function startGame() {
    score = 0;
    newQuestion();
}

function newQuestion() {
    console.log(highscores);
    redAns = Math.floor(Math.random() * 255);
    blueAns = Math.floor(Math.random() * 255);
    greenAns = Math.floor(Math.random() * 255);
    console.log(redAns + " " + blueAns + " " + greenAns);
    var c = document.getElementById("mainColorCanvas");
    var ctx = c.getContext("2d"); ////this is throwing an error
    ctx.fillStyle = 'rgb(' + redAns + ', ' + greenAns + ', ' + blueAns + ')';
    ctx.fillRect(0, 0, 200, 100);
}


function submitGuess() {
    redGuess = document.getElementById("rangeRed").value;
    blueGuess = document.getElementById("rangeBlue").value;
    greenGuess = document.getElementById("rangeGreen").value;

    var c = document.getElementById("guessColorCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = 'rgb(' + redGuess + ', ' + greenGuess + ', ' + blueGuess + ')';
    ctx.fillRect(0, 0, 200, 100);
    var c = document.getElementById("answerColorCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = 'rgb(' + redAns + ', ' + greenAns + ', ' + blueAns + ')';
    ctx.fillRect(0, 0, 200, 100);


    var diffX = Math.floor(Math.sqrt((Math.pow((redAns - redGuess), 2)) + (Math.pow((blueAns - blueGuess), 2)) + (Math.pow((greenAns - greenGuess), 2))));
    console.log(diffX);
    console.log(redAns + " " + blueAns + " " + greenAns);
    console.log(redGuess + " " + blueGuess + " " + greenGuess);

    if (diffX < threshold) {
        score = score + 1;

        threshold = threshold - 3;

        document.getElementById("modalHeaderText").textContent = "correct! score: " + score;
        newQuestion();
    } else {
        document.getElementById("modalHeaderText").textContent = "wrong";
        writeUserData();
        startGame();
    }
    document.getElementById("score").textContent = "score: " + score;
}

