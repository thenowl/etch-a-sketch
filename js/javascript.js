const sidebar = document.querySelector("#sidebar");
const pickColorContainer = document.querySelector("#pickColorContainer");
const chooseColorInput = document.querySelector("#chooseColorInput");
const randomButton = document.querySelector("#randomButton");
const eraseButton = document.querySelector("#eraseButton");
const layoutButton = document.querySelector("#layoutButton");
const gridSizeInput = document.querySelector("#gridSize");
const resetButton = document.querySelector("#resetButton");
const gridContainer = document.querySelector("#gridContainer");
// Default settings:
let numOfSquares = 16;

// Create grid, add a class for CSS styling and assign IDs to each square:

function gridCreator(numOfSquares) {
  // Clear grid before creation:
  let removeSquares = document
    .querySelectorAll(".square")
    .forEach((e) => e.remove());

  for (let i = 0; i < numOfSquares; i++) {
    for (let j = 0; j < numOfSquares; j++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.style.cssText = `width: ${100 / numOfSquares}%; height: ${
        100 / numOfSquares
      }%;`;
      gridContainer.appendChild(square);
    }
  }
}

// Default initialization:

gridCreator(numOfSquares);

// Checking mouse-states:

let isMouseDown = false;

gridContainer.addEventListener("mousedown", (event) => {
  event.preventDefault();
  isMouseDown = true;
});

gridContainer.addEventListener("mouseup", () => (isMouseDown = false));

// Change color of squares:

gridContainer.addEventListener("mouseover", (event) => {
  let target = event.target;

  if (target.getAttribute("class") === "square") {
    if (event.type === "mouseover" && !isMouseDown) return;
    if (randomColorPicker === true) {
      target.style.background = randomColor(randomNumber);
    } else if (erasePicker === true) {
      target.style.background = "inherit";
    } else if (colorPicker === true) {
      target.style.background = chooseColorInput.value;
    }
  }
});

// Choose color:

let colorPicker = false;

chooseColorInput.addEventListener("click", () => {
  colorPicker = true;
  randomColorPicker = false;
  erasePicker = false;

  pickColorContainer.style.cssText =
    "box-shadow: none; background: radial-gradient(#333, #000)";
  randomButton.style.cssText =
    "box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8); background: radial-gradient(#333, rgb(20, 20, 20))";
  eraseButton.style.cssText =
    "box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8); background: radial-gradient(#333, rgb(20, 20, 20))";

  gridContainer.focus();
});

// Random color generator:

let randomColorPicker = false;

randomButton.addEventListener("click", () => {
  colorPicker = false;
  randomColorPicker = true;
  erasePicker = false;

  pickColorContainer.style.cssText =
    "box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8); background: radial-gradient(#333, rgb(20, 20, 20))";
  randomButton.style.cssText =
    "box-shadow: none; background: radial-gradient(#333, #000)";
  eraseButton.style.cssText =
    "box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8); background: radial-gradient(#333, rgb(20, 20, 20))";

  gridContainer.focus();
});

function randomNumber() {
  return Math.floor(Math.random() * 256);
}

function randomColor(randomNumber) {
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}

// Color eraser:

let erasePicker = false;

eraseButton.addEventListener("click", () => {
  colorPicker = false;
  erasePicker = true;
  randomColorPicker = false;

  pickColorContainer.style.cssText =
    "box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8); background: radial-gradient(#333, rgb(20, 20, 20))";
  eraseButton.style.cssText =
    "box-shadow: none; background: radial-gradient(#333, #000)";
  randomButton.style.cssText =
    "box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8); background: radial-gradient(#333, rgb(20, 20, 20))";

  gridContainer.focus();
});

// Event listener for grid-layout-button:

layoutButton.addEventListener("click", popUpWindow);

// Pop-up window generator:

let isPopUpOpen = false;

function popUpWindow() {
  if (isPopUpOpen) {
    return;
  } else {
    let popUp = document.createElement("div");
    popUp.classList.add("pop-up-window");

    let inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    let numOfSquaresLabel = document.createElement("label");
    numOfSquaresLabel.setAttribute("for", "numOfSquaresInput");
    numOfSquaresLabel.textContent = "Set number of squares";
    inputContainer.appendChild(numOfSquaresLabel);

    let numOfSquaresInput = document.createElement("input");
    numOfSquaresInput.setAttribute("value", `${numOfSquares}`);
    numOfSquaresInput.setAttribute("id", "numOfSquaresInput");
    numOfSquaresInput.setAttribute("name", "numOfSquaresInput");
    numOfSquaresInput.setAttribute("type", "number");
    numOfSquaresInput.setAttribute("min", "1");
    numOfSquaresInput.setAttribute("max", "100");
    inputContainer.appendChild(numOfSquaresInput);

    popUp.appendChild(inputContainer);

    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.classList.add("submit-button");
    submit.setAttribute("value", "Submit");
    popUp.appendChild(submit);
    sidebar.appendChild(popUp);
    isPopUpOpen = true;
    submit.addEventListener("click", () => {
      numOfSquares = document.querySelector("#numOfSquaresInput").value;
      gridCreator(numOfSquares);
      isPopUpOpen = false;
      sidebar.removeChild(popUp);
    });
  }
}

// Stretch the grid:

gridSizeInput.addEventListener("input", () => {
  let gridSize = parseInt(document.querySelector("#gridSize").value);
  gridContainer.style.cssText = `width: ${gridSize}%; height:${gridSize}%`;
});

// Reset canvas:

resetButton.addEventListener("click", () => {
  colorPicker = false;
  randomColorPicker = false;
  erasePicker = false;

  pickColorContainer.style.cssText =
    "box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8); background: radial-gradient(#333, rgb(20, 20, 20))";
  eraseButton.style.cssText =
    "box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8); background: radial-gradient(#333, rgb(20, 20, 20))";
  randomButton.style.cssText =
    "box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8); background: radial-gradient(#333, rgb(20, 20, 20))";
  gridCreator(numOfSquares);
});
