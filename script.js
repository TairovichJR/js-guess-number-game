'use strict';

let secretNumber = generateRandomNumber();
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const updateScore = function (score) {
  document.querySelector('.score').textContent = score;
};
function generateRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

const updateSecretNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = generateRandomNumber();
  updateScore(score);
  displayMessage('Start guessing...');
  updateSecretNumber('?');
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(typeof guess);

  //where there is no input
  if (!guess) {
    displayMessage('⛔ No number!');
    //when player wins
  } else if (guess === secretNumber) {
    updateSecretNumber(secretNumber);
    displayMessage('🎉 Correct number!');
    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';
    //implement highest score
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    //when guess is too high
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      updateScore(score);
    } else {
      displayMessage('💣 You lost the game');
      updateScore(0);
    }
  }
});
