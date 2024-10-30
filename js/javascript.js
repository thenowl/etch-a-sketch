const sidebar = document.querySelector("#sidebar");
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
      // square.setAttribute("id", `square${i}${j}`);
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
    }
  }
});

// Random color generator:
let randomColorPicker = false;

randomButton.addEventListener("click", () => {
  randomColorPicker = true;
  erasePicker = false;
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
  erasePicker = true;
  randomColorPicker = false;
});

// Event listener for grid-layout-button:

layoutButton.addEventListener("click", popUpWindow);

function popUpWindow() {
  let popUp = document.createElement("div");
  popUp.classList.add("pop-up-window");

  let instructions = document.createElement("p");
  instructions.textContent = "Set the number of squares per side:";
  popUp.appendChild(instructions);

  let inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  let numOfSquaresLabel = document.createElement("label");
  numOfSquaresLabel.setAttribute("for", "numOfSquaresInput");
  numOfSquaresLabel.textContent = "Number of squares:";
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
  submit.addEventListener("click", () => {
    numOfSquares = document.querySelector("#numOfSquaresInput").value;
    gridCreator(numOfSquares);
    sidebar.removeChild(popUp);
  });
  popUp.appendChild(submit);
  sidebar.appendChild(popUp);
}

// Stretch the grid:

gridSizeInput.addEventListener("input", () => {
  let gridSize = parseInt(document.querySelector("#gridSize").value);
  gridContainer.style.cssText = `width: ${gridSize}%; height:${gridSize}%`;
});

// Reset canvas:

resetButton.addEventListener("click", () => gridCreator(numOfSquares));
