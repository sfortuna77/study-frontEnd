// Computer
let computerNumber = 0;

// User
let userGuess = 0;
let userTimeStart = 0;
let userTimeEnd = 0;
let userAttempt = 0;
let hitMeter = [];
let result = false;

// General
let ranking = [];
let firstPlay = true;
let smallestNumberGuess = 0;
let highestNumberGuess = 100;
let numberAttempt = 10;

// Arrow Function
const setRandomNumber = () => {
    const min = smallestNumberGuess;
    const max = highestNumberGuess;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getElementById = (id) => document.getElementById(id);
const getElementValue = (id) => getElementById(id).value;

const getUserName = () => getElementValue("name");

const getTimeSpent = () => userTimeEnd - userTimeStart;

const setUserAttempt = (reset) => userAttempt = reset ? numberAttempt : userAttempt--;
const getUserAttempt = () => userAttempt;

const setGuessRemainingText = () => {
    let manyGuessWord1 = getUserAttempt() !== 1 ? 'm' : '';
    let manyGuessWord2 = getUserAttempt() !== 1 ? 's' : '';
    getElementById("guessRemaining").textContent = `Falta${manyGuessWord1} ${getUserAttempt()} chute${manyGuessWord2}`;
}

// Functions Start Game
function setComputerNumber () {
    computerNumber = setRandomNumber();
}

function setNewGame() {
    setComputerNumber();
    userGuess = 0;
    hitMeter = [];
    userTimeStart = 0;
    userTimeEnd = 0;
    firstPlay = false;
    result = false;
    userAttempt = numberAttempt;
    setGuessRemainingText();
    console.log(`Número selecionado: ${computerNumber}`);
    console.log(`Você tem ${numberAttempt} tentativas para acertar o número.`);
}

// Function to register ranking
function createRegisterRanking () {
    let timeSpent = getTimeSpent();
    let userName = getUserName();
    let userAttempt = getUserAttempt();
    if (result == true) {
        return `${userName}: Ganhou com ${userAttempt} tentativas em ${timeSpent}s`
    } else {
        return `${userName}: Perdeu, quem sabe na próxima e gastou ${timeSpent}s`
    }
}

function addRegisterRanking () {
    let itemList = document.createElement("li");
    itemList.textContent = createRegisterRanking();
    getElementById("ranking").appendChild(itemList);
}

// Function do Guess
function guessButton () {
    userAttempt--;
    setGuessRemainingText();
    userGuess = getElementById("userGuess").value;
    if (userGuess == computerNumber) {
        result = true;
        addRegisterRanking();
        return;
    } else if (getUserAttempt() == 0) {
        addRegisterRanking();
        return;
    } else if (userGuess > computerNumber) {
        return;
    } else if (userGuess < computerNumber) {
        return;
    }
}

// Initialize game
document.addEventListener("DOMContentLoaded", function() {
    
});


