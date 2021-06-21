'use strict';

// selecting elements
// changing player 0 score
const player0El = document.querySelector('.player--0'); // player 1 class name from html file
const player1El = document.querySelector('.player--1'); // player 2 class name from html file
const score0El = document.querySelector('#score--0');

// getElementById is the same as query selector without hash
const score1El = document.getElementById('score--1');
// player 0 which is player 1 current score
const current0El = document.getElementById('current--0');
// player 2 current score
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; // global scope to be used outside of init function values declared
//variables inside init function are assigned values
// values declared and assigned are different within a fucntion scope.

const init = function () {
  // starting conditions
  scores = [0, 0];
  // let variable is going to be reassigned its value, saving current score
  currentScore = 0;
  activePlayer = 0; // player 1 is 0
  playing = true; // At the beginning of game we are playing which is set to true
  document.querySelector('#score--0').textContent = 0; // code same for score0El.textcontent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  // removing background styles for winning player reverting back to beginning style
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Using the ternary operator to switch the active player
  // reasigning active player and checking wether active player is currently 0 and switching to 1
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle method adds class if its not there  if its there it will remove it
  player0El.classList.toggle('player--active'); // toggle both
  player1El.classList.toggle('player--active'); // toggle both
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // playing itself is already a boolean variable a condition is not needed
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // logs dice roll to console
    console.log(dice);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    // dynamically load png image based on random generated number
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // current0El.textContent = currentScore; // CHANGE LATER TO CURRENT PLAYER
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add currentScore to active players score
    // scores at position active player
    //   scores[1] = scores[1] + currentScore;
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false; // when we are done playing the game its set to false
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        // css style for winning player which is black background
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // Switch to the next player
    else {
      switchPlayer();
    }
  }
  
});
