// Setting up the game parameters
const smallestNumberGuess = 1;
const highestNumberGuess = 100;
const numberAttempt = 10;

// Element Functions
const getElementById = (id) => document.getElementById(id);
const getElementValue = (id) => getElementById(id).value;
const setElementText = (id, value) => getElementById(id).textContent = value;
const setElementHTML = (id, value) => getElementById(id).innerHTML = value;

// Random Number Generation
let computerNumber = 0;
const setRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const setRandomNumberDefault = () => setRandomNumber(smallestNumberGuess, highestNumberGuess);
function setComputerNumber() { 
    computerNumber = setRandomNumberDefault(); 
}

// User
let hitMeter = [];
let userAttempt = numberAttempt;
const getUserName = () => getElementValue("name");
const getUserGuess = () => Number.parseInt(getElementValue("userGuess")); 

const setUserAttempt = () => {
    userAttempt--;
    const textRemaining = (userAttempt > 1) ? `Faltam ${userAttempt} tentativas` : 
                         (userAttempt === 1) ? `Falta ${userAttempt} tentativa` : 
                         "Sem tentativas restantes";
    setElementText("guessRemaining", textRemaining);
}

const resetUserAttempt = () => {
    userAttempt = numberAttempt;
    setElementText("guessRemaining", `Faltam ${userAttempt} tentativas`);
}

// Hint Guess
let hintGuessMin = smallestNumberGuess;
let hintGuessMax = highestNumberGuess;

function updateHintGuess() {
    const userGuess = getUserGuess();
    if (userGuess < computerNumber) {
        hintGuessMin = Math.max(hintGuessMin, userGuess + 1);
    } else {
        hintGuessMax = Math.min(hintGuessMax, userGuess - 1);
    }
    updateHintDisplay();
}

function updateHintDisplay() {
    setElementHTML("hintGuess", `
        <li class="hint-min">${hintGuessMin}</li>
        <li class="hint-separator">|||</li>
        <li class="hint-max">${hintGuessMax}</li>
    `);
}

function resetHintGuess() {
    hintGuessMin = smallestNumberGuess;
    hintGuessMax = highestNumberGuess;
    updateHintDisplay();
}

// Ranking
let rankingPanel = [];

const setRankingPanel = (newRanking) => rankingPanel.push(newRanking);

const constructRankingPanel = () => {
    let rankingList = "";
    if (rankingPanel.length === 0) {
        rankingList = '<li class="no-games">Nenhum jogo ainda</li>';
    } else {
        rankingPanel.forEach((ranking, index) => {
            rankingList += `<li class="ranking-item">${index + 1}. ${ranking}</li>`;
        });
    }
    setElementHTML("ranking", rankingList);
}

const setRankingVictory = (victory) => {
    const playerName = getUserName() || "Anônimo";
    const attemptsUsed = numberAttempt - userAttempt;
    
    if (victory) {
        setRankingPanel(`${playerName}: ✅ Ganhou com ${attemptsUsed} tentativas`);
    } else {
        setRankingPanel(`${playerName}: ❌ Perdeu. O número era ${computerNumber}`);
    }
    constructRankingPanel();
}

// Validation
function validateInput() {
    const userName = getUserName().trim();
    const userGuess = getUserGuess();
    
    if (!userName) {
        alert("Por favor, digite seu nome!");
        return false;
    }
    
    if (isNaN(userGuess) || userGuess < smallestNumberGuess || userGuess > highestNumberGuess) {
        alert(`Por favor, digite um número entre ${smallestNumberGuess} e ${highestNumberGuess}!`);
        return false;
    }
    
    return true;
}

// Start Game
function setNewGame() {
    setComputerNumber();
    getElementById("userGuess").value = "";
    setElementText("resultGame", "");
    resetHintGuess();
    resetUserAttempt();
}

// Guess Function
function guessButton() {
    if (!validateInput()) return;
    
    const userGuess = getUserGuess();
    
    if (userGuess === computerNumber) {
        setVictory(true);
    } else if (userAttempt <= 1) {
        setUserAttempt();
        setVictory(false);
    } else {
        setUserAttempt();
        updateHintGuess();
        
        // Feedback adicional
        if (userGuess < computerNumber) {
            setElementText("resultGame", "📈 Muito baixo! Tente um número maior.");
        } else {
            setElementText("resultGame", "📉 Muito alto! Tente um número menor.");
        }
    }
}

// Victory 
const setVictory = (victory) => {
    if (victory) {
        setElementText("resultGame", "🎉 Parabéns! Você acertou o número!");
    } else {
        setElementText("resultGame", `😔 Que pena! O número era ${computerNumber}`);
    }
    setRankingVictory(victory);
}

// Initialize game
document.addEventListener("DOMContentLoaded", function() {
    setNewGame();
    constructRankingPanel();
});

// Enter key support
document.getElementById("userGuess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        guessButton();
    }
});
