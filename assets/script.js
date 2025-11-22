const display = document.getElementById("display");
let justCalculated = false;

function appendToDisplay(input) {
  let allOperators = ["+", "-", "*", "/"];
  let lastCharacter = display.value[display.value.length - 1];

  // Stop if user tries to add an operator right after another operator
  if (allOperators.includes(input) && allOperators.includes(lastCharacter)) {
    return; // Don't allow it
  }

  // stop if user tries to add a decimal and theres already a decimal in current number
  if (input === ".") {
    let lastOperatorPosition = Math.max(
      display.value.lastIndexOf("+"),
      display.value.lastIndexOf("-"),
      display.value.lastIndexOf("*"),
      display.value.lastIndexOf("/")
    );

    let currentNumber = display.value.substring(lastOperatorPosition + 1);

    if (currentNumber.includes(".")) {
      return; // Don't allow another decimal
    }
  }

  // If just calculated and input is an operator, continue with that result
  if (justCalculated && ["+", "-", "*", "/", "."].includes(input)) {
    display.value += input;
    justCalculated = false;
    return;
  }

  // if just calculated and input is a number, replace the display
  if (justCalculated) {
    display.value = input;
    justCalculated = false;
  } else {
    display.value += input; // adding to display
  }
}

function backspace() {
  let current = display.value;
  display.value = current.slice(0, -1);
}

function clearEntry() {
  display.value = "";
}

function oddEven() {
  let current = display.value;

  if (current === "") {
    return; // dont toggle if empty
  }

  // find the last operator
  let lastOperatorPosition = Math.max(
    current.lastIndexOf("+"),
    current.lastIndexOf("-"),
    current.lastIndexOf("*"),
    current.lastIndexOf("/")
  );

  // If operator isnt found, toggle the entire display
  if (lastOperatorPosition === -1) {
    if (current.startsWith("-")) {
      display.value = current.slice(1);
    } else {
      display.value = "-" + current;
    }
  } else {
    // toggle only the number after the last operator
    let beforeLastPosition = current.substring(0, lastOperatorPosition + 1);
    let currentNumber = current.substring(lastOperatorPosition + 1);

    if (currentNumber.startsWith("-")) {
      display.value = beforeLastPosition + currentNumber.slice(1);
    } else {
      display.value = beforeLastPosition + "-" + currentNumber;
    }
  }
}

function calculate() {
  try {
    display.value = eval(display.value);
    justCalculated = true; // sets flag after calculating
  } catch (error) {
    display.value = "Error";
    justCalculated = true;
  }
}

let backgroundMusic = new Audio("assets/naruto.mp3");
let isMusicPlaying = false;

function musicButton() {
  if (isMusicPlaying) {
    backgroundMusic.pause(); // stop music
    isMusicPlaying = false;
  } else {
    backgroundMusic.play(); // start music
    backgroundMusic.loop = true; // Keep it looping
    isMusicPlaying = true;
  }
}
