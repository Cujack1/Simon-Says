// Each of the four tiles on the screen
const tilesArray = [
  { key: document.querySelector(".t1") },
  { key: document.querySelector(".t2") },
  { key: document.querySelector(".t3") },
  { key: document.querySelector(".t4") },
];

// Hidden try again pop-up window
const tryAgain = document.querySelector(".try-again-display");

// Random Number Generation
const max = 4;
const min = 1;
let bublNum;
let bublSelector;

// Create a 500-tile sequence
let memoryArray = [];

// Keeping track of how many tiles should flash each turn
let turnCount = 0;
let turnCountIncrement = 1;
let flashCount = 0;
let selectionCount = 0;

// setTimeout time values
const addflashTime = 100;
const removeFlashTime = 1100;
const addBubbleTime = 10;
const removeBubbleTime = 410;
const timeBetweenTurns = 750;

// Buttons
const startButton = document.querySelector(".start-btn");
const restartButton = document.querySelector(".restart-btn");
const tryAgainBtn = document.querySelector(".try-again-btn");
// const increment1 = document.querySelector(".normal");
// const increment2 = document.querySelector(".medium");
// const increment3 = document.querySelector(".challenging");
// const increment5 = document.querySelector(".hard");
// const increment10 = document.querySelector(".what");

// Event Listeners
startButton.addEventListener("click", start);
restartButton.addEventListener("click", restart);
// increment1.addEventListener("click", normal);
// increment2.addEventListener("click", medium);
// increment3.addEventListener("click", challenging);
// increment5.addEventListener("click", hard);
// increment10.addEventListener("click", what);

// Increment Functions
// function normal() {
//   turnCountIncrement = 1;
//   turnCount = 0;
// }
// function medium() {
//   turnCountIncrement = 2;
//   turnCount = 1;
// }
// function challenging() {
//   turnCountIncrement = 3;
//   turnCount = 2;
// }
// function hard() {
//   turnCountIncrement = 5;
//   turnCount = 4;
// }
// function what() {
//   turnCountIncrement = 10;
//   turnCount = 9;
// }

//                                                               \\
// =========================| GamePlay|========================= \\
//                                                               \\

// The first thing to happen. Requires pressing the start button.
function start() {
  // Resetting variables for a new game.
  //   increment1.removeEventListener("click", normal);
  //   increment2.removeEventListener("click", medium);
  //   increment3.removeEventListener("click", challenging);
  //   increment5.removeEventListener("click", hard);
  //   increment10.removeEventListener("click", what);
  tryAgainBtn.removeEventListener("click", restart);
  startButton.removeEventListener("click", start);

  // Create a 500-tile sequence
  for (i = 0; i < 500; i++) {
    memoryArray.push(".t" + Math.floor(Math.random() * max + min));
  }

  // Flash the first memory tile
  flashTiles();
}

function flashTiles() {
  // 'selectionCount = 0' so that the count will be correct whenever checkSelection() is called.
  selectionCount = 0;

  // Add the flash class, then remove it after the tile flashes. There's a small delay before adding
  //   the class to make sure that the 'remove' does not bleed over into the 'add'
  setTimeout(() => {
    document.querySelector(memoryArray[flashCount]).classList.add("flash");
  }, addflashTime);
  setTimeout(() => {
    document.querySelector(memoryArray[flashCount]).classList.remove("flash");

    // when 'flashCount === turnCount' the player has clicked the appropriate number of tiles for that turn.
    flashCount += 1;
    if (flashCount <= turnCount) {
      flashTiles();
    } else playerSelectsTiles();
  }, removeFlashTime);
}

// Resets flashCount, increments turnCount in anticipation of the player clicking all
//   the correct tiles, and then adds a cursor to each tile while listening for a click.
function playerSelectsTiles() {
  console.log("player selects tiles is called");

  turnCount += turnCountIncrement;
  flashCount = 0;

  for (tile of tilesArray) {
    tile.key.style.cursor = "pointer";
    tile.key.addEventListener("click", checkSelection);
  }
}

// Checks to see if the tile you clicked is correct & and adds the goodBubble class to that tile.
// googBubble randomly assigns 1 of 6 classes, each with different colors (CSS).
function checkSelection() {
  // Randomly select a bubl color (CSS)
  bublNum = Math.floor(Math.random() * 6 + 1);
  bublSelector = "goodBubble" + bublNum;

  // Capture the clicked tile for comparison to the tile sequence in memoryArray[].
  let selection = "." + this.classList;
  let memoryCheck = memoryArray[selectionCount];

  if (selection !== memoryCheck) {
    tryAgain.classList.add("popup-visible");
    tryAgainBtn.addEventListener("click", restart);
  } else {
    setTimeout(() => {
      document.querySelector(selection).classList.add(bublSelector);
    }, addBubbleTime);
    setTimeout(() => {
      document.querySelector(selection).classList.remove(bublSelector);
    }, removeBubbleTime);

    // Increment selectionCount and wait for the next click.
    selectionCount += 1;
  }

  // When selectionCount === turnCount, flashTiles() will flash one more tile than before.
  if (selectionCount === turnCount) {
    for (tile of tilesArray) {
      tile.key.style.cursor = "default";
      tile.key.removeEventListener("click", checkSelection);
    }
    setTimeout(() => {
      flashTiles();
    }, timeBetweenTurns);
  }
}

function restart() {
  tryAgain.classList.remove("popup-visible");

  memoryArray = [];
  turnCount = 0;
  flashCount = 0;
  turnCountIncrement = 1;

  start();
}
// function checkSelection() {
//   console.log("check selection is called");
//   console.log(this.classList);
//   for (tile of tilesArray) {
//     tile.key.style.cursor = "default";
//     tile.key.removeEventListener("click", checkSelection);
//   }

//   //   if (this.classList === memoryArray[flashCount])
// }
