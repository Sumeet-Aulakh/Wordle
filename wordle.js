const letters = document.querySelectorAll(".scoreboard-letter");
const infoBar = document.querySelector(".info-bar");
var answer = "";
var number = 0;
var alreadyGuessed = [false, false, false, false, false, false];
var alreadyGuessedNumber = 0;

const WORDLE_URL = "https://words.dev-apis.com/word-of-the-day";
const VALIDATE_WORD = "https://words.dev-apis.com/validate-word";

document.addEventListener("keydown", function (event) {
  if (number <= 30) {
    if (
      event.key === "Backspace" &&
      number > 0 &&
      number > alreadyGuessedNumber * 5
    ) {
      document.getElementById(`letter-${--number}`).innerText = "";
    } else if (event.key === "Enter" && number % 5 === 0 && number !== 0) {
      let guess = (
        document.getElementById(`letter-${number - 5}`).innerText +
        document.getElementById(`letter-${number - 4}`).innerText +
        document.getElementById(`letter-${number - 3}`).innerText +
        document.getElementById(`letter-${number - 2}`).innerText +
        document.getElementById(`letter-${number - 1}`).innerText
      ).toLowerCase();
      checkAnswer(guess);
    } else if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
      if (
        (number > 4 && alreadyGuessed[Math.floor(number / 5) - 1]) ||
        number <= 4
      ) {
        document.getElementById(`letter-${number++}`).innerText =
          event.key.toUpperCase();
      }
    }
  }
});

async function validWord(guess) {
  const promise = await fetch(VALIDATE_WORD, {
    method: "POST",
    body: JSON.stringify({ word: `${guess}` }),
  });
  const response = await promise.json();
  return response.validWord;
}

function notValid() {
  for (let i = number - 5; i < number; i++) {
    document.getElementById(`letter-${i}`).classList.add("invalid");
  }
  alreadyGuessed[Math.floor(number / 5) - 1] = false;
  alreadyGuessedNumber--;
}

async function checkAnswer(guess) {
  toggleSpin();
  alreadyGuessed[Math.floor(number / 5) - 1] = true;
  alreadyGuessedNumber++;
  for (let i = number - 5; i < number; i++) {
    if (document.getElementById(`letter-${i}`).classList.contains("invalid")) {
      document.getElementById(`letter-${i}`).classList.remove("invalid");
    }
  }
  let valid = await validWord(guess);
  toggleSpin();
  if (!valid) {
    notValid();
    return;
  }
  if (guess === answer) {
    for (let i = number - 5; i < number; i++) {
      document.getElementById(`letter-${i}`).classList.add("correct");
    }
    number = 31;
    alert("You win!");
    document.getElementById("brand").classList.add("winner");
  } else {
    let alreadyChecked = [false, false, false, false, false];
    let characters = "" + answer;
    for (let i = number - 5; i < number; i++) {
      index = i % 5;
      if (
        answer.includes(guess[index]) &&
        guess[index] === answer[index] &&
        alreadyChecked[index] === false &&
        characters.includes(guess[index])
      ) {
        document.getElementById(`letter-${i}`).classList.add("correct");
        alreadyChecked[index] = true;
        characters =
          characters.substring(0, characters.indexOf(guess[index])) +
          characters.substring(characters.indexOf(guess[index]) + 1);
      }
    }
    for (let i = number - 5; i < number; i++) {
      index = i % 5;
      if (
        answer.includes(guess[index]) &&
        guess[index] !== answer[index] &&
        alreadyChecked[index] === false &&
        characters.includes(guess[index])
      ) {
        document.getElementById(`letter-${i}`).classList.add("close");
        alreadyChecked[index] = true;
        characters =
          characters.substring(0, characters.indexOf(guess[index])) +
          characters.substring(characters.indexOf(guess[index]) + 1);
      }
    }
    for (let i = number - 5; i < number; i++) {
      index = i % 5;
      if (alreadyChecked[index] === false) {
        document.getElementById(`letter-${i}`).classList.add("wrong");
      }
    }
    if (number === 30) {
      alert("You lose! The answer was " + answer.toUpperCase());
    }
  }
}

function toggleSpin() {
  document.querySelector(".info-bar").classList.toggle("hidden");
}

async function init() {
  const promise = await fetch(WORDLE_URL);
  const response = await promise.json();
  answer = response.word;
  toggleSpin();
}

init();
