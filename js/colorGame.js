var numSquares = 12;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var h1Bg = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");
var wins = document.querySelector('#wins');
var losses = document.querySelector('#losses');
var attempts = 3;
var score = {
    w: 0,
    l:0
}

init();

function init() {
    setUpModeButtons();
    setUpSquares();
    reset();
}

function reset() {
    setUpSquares();
    //generate all new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //reset the game counter based on easy/hard mode
    gameMode = document.querySelector('.mode.selected').textContent;
    (gameMode === "Hard") ? attempts = 3 : attempts = 6;
    console.log(gameMode);
    console.log(pickedColor);
    //change colorDisplay to match pickedColor
    colorDisplay.textContent = pickedColor;
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1Bg.style.backgroundColor = "steelblue";
    //remove "Correct" message from dom
    messageDisplay.textContent = attempts + " trys to win";
    resetButton.textContent = "New Colors";
}

resetButton.addEventListener("click", function () {
    reset();
});

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    //pick a random number
    var random = Math.floor(Math.random() * colors.length);
    //use number to access color out of array
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = [];
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into array
        arr.push(randomColor());
    }
    //return array at every end
    return arr;
}

function randomColor() {
    //pick a "red" from 0-255
    var r = Math.floor(Math.random() * 256)
    //pick a "green" from 0-255
    var g = Math.floor(Math.random() * 256)
    //pick a "blue" from 0-255
    var b = Math.floor(Math.random() * 256)
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function setUpModeButtons() {
    //mode button event listeners
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? attempts = 6 : attempts = 3;
            reset();
        });
    }
}

function setUpSquares() {
    for (i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", addEventListenerToSquares);
    }
}

function breakdownSquares() {
    for (i = 0; i < squares.length; i++) {
        squares[i].removeEventListener("click", addEventListenerToSquares);
    }
}

function addEventListenerToSquares() {
    var clickedColor = this.style.backgroundColor;
    if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct";
        resetButton.textContent = "Play again?";
        score.w += 1;
        wins.textContent = score.w;
        changeColors(pickedColor);
        h1Bg.style.backgroundColor = pickedColor;
    } else {
        this.style.background = "#232323";
        messageDisplay.textContent = (attempts - 1) + " trys left";
        attempts -= 1;
        if (attempts === 0) {
            breakdownSquares();
            messageDisplay.textContent = "You lose";
            score.l += 1;
            losses.textContent = score.l;
            resetButton.textContent = "Try again?";
            h1Bg.style.backgroundColor = pickedColor;
        }
    }
}