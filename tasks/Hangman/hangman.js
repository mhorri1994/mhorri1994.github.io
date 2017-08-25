let difficulties = new Map();
let word = "";
let foundWord = "";
let guessedLetters = [];
let lives = 7;

function drawHangman(){
    let outputHangmanStateArea = document.getElementById('hangmanState'); 
    outputHangmanStateArea.innerHTML = lives;
}

function createDifficulties(easy, medium, hard) {
    difficulties.set("easy", easy);
    difficulties.set("medium", medium);
    difficulties.set("hard", hard);
}

function stripWord(word) {
    return word.replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "");
}

function downloadWords(callback) {
    let requestData;
    let requestURL = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function () {
        requestData = request.response.split("\n");
        let easyWords = [];
        let mediumWords = [];
        let hardWords = [];
        for (let i = 0; i < requestData.length; i++) {
            let theWord = stripWord(requestData[i]);
            if (theWord.length > 7) {
                easyWords.push(theWord);
            } else if (theWord.length > 5) {
                mediumWords.push(theWord);
            } else if (theWord.length > 3) {
                hardWords.push(theWord);
            }
        }
        createDifficulties(easyWords, mediumWords, hardWords);
        // console.log(difficulties.get("easy")[0]);
        return callback();
    }
}

var start = function startGame() {
    // console.log(difficulties.get("easy")[0]);
    let difficultyChosen = "easy";
    let randomNumber = Math.floor(Math.random() * difficulties.get(difficultyChosen).length) + 1;
    word = difficulties.get(difficultyChosen)[randomNumber];
    for (let i = 0; i < word.length; i++) {
        foundWord += "_";
    }
    console.log(word);
    outputWord();
    activate();

}

function deactivate() {
    let textInput = document.getElementById('guess');
    textInput.setAttribute("disabled", "disabled");
}

function activate() {
    let textInput = document.getElementById('guess');
    textInput.removeAttribute("disabled");
}

function outputWord() {
    let outputArea = document.getElementById('outputFoundWord');
    let outputString = "";
    for (let i = 0; i < foundWord.length; i++) {
        let char = foundWord.charAt(i);
        outputString += char + " ";
    }
    outputArea.innerHTML = outputString;
    let outputGuessedLettersArea = document.getElementById('guessedLetters');
    outputGuessedLettersArea.innerHTML = "Guessed Letters: ";
    guessedLetters.forEach(l => outputGuessedLettersArea.innerHTML += l + " ");
    
    // console.log(foundWord);
}

function checkWin() {
    if (foundWord === word) {
        deactivate();
        alert("YOU WIN!");
    }
    if (lives === 0) {
        deactivate();
        alert("YOU LOSE!");
    }
}

function performGuess(event, input) {
    if (event.key === 'Enter') {
        let charGuess = input.value.toLowerCase();
        input.value = "";
        if (!guessedLetters.includes(charGuess)) {
            let foundIt = false;
            for (let i = 0; i < word.length; i++) {
                if (word.charAt(i) === charGuess) {
                    foundWord = foundWord.substring(0, i) + charGuess + foundWord.substring(i + 1, foundWord.length);
                    foundIt = true;
                }
            }
            guessedLetters.push(charGuess);
            if (!foundIt) {
                lives--;
                drawHangman();
            }
        }
        console.log(foundWord);
        outputWord();
        checkWin();
    }
}



deactivate();
downloadWords(start);
