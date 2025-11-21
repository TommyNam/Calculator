const display = document.getElementById("display");
let justCalculated = false;

function appendToDisplay(input) {
  if (justCalculated) {
    display.value = input; // replace display with new number
    justCalculated = false;
  } else {
    display.value += input; // append normally
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
  if (current === "" || current === "0") {
    return; // dont toggle if dispaly is empty or 0
  }

  if (current.startsWith('-')){
    display.value = current.slice(1); // remove negative
  } else {
    display.value = '-' + current; // Add negative
  }
}

function calculate(){
    try{
        display.value = eval(display.value);
        justCalculated = true; // sets flag after calculating
    }
    catch(error){
        display.value = "Error";
        justCalculated = true;
    }
}

function powerButton() {}
