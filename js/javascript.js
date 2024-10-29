const gridContainer = document.querySelector("#gridContainer");
const button = document.querySelector("button");
const body = document.body;
// Default settings:
let numOfXSquares = 16;
let numOfYSquares = 16;

// Create grid, add a class for CSS styling and assign IDs to each square:

function gridCreator(numOfXSquares, numOfYSquares) {
  // Clear grid before creation:
  let removeSquares = document
    .querySelectorAll(".square")
    .forEach((e) => e.remove());

  for (let i = 0; i < numOfXSquares; i++) {
    for (let j = 0; j < numOfYSquares; j++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", `square${i}${j}`);
      square.style.cssText = `width: ${100 / numOfXSquares}%; height: ${
        100 / numOfYSquares
      }%;`;
      gridContainer.appendChild(square);
    }
  }
}

// Default initialization:

gridCreator(numOfXSquares, numOfYSquares);

// Identify square within the gridContainer with its ID and change to random color:

gridContainer.addEventListener("mouseover", (event) => {
  let target = event.target;

  target.style.background = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
});

// Create random number between 0 - 255 for random RGB value:

function randomColor() {
  return Math.floor(Math.random() * 256);
}

// Revert color back to white when mouse leaves the square:

gridContainer.addEventListener("mouseout", (event) => {
  let target = event.target;

  target.style.background = "whitesmoke";
});

// Event listener for grid-layout-button:

button.addEventListener("click", popUpWindow);

// Function to create pop up window upon button click:

function popUpWindow() {
  let popUp = document.createElement("div");
  popUp.classList.add("pop-up-window");

  let instructions = document.createElement("p");
  instructions.textContent = "Set the number of squares per side:";
  popUp.appendChild(instructions);

  let inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  let xInputContainer = document.createElement("div");
  xInputContainer.classList.add("x-input-container");

  let xSquaresLabel = document.createElement("label");
  xSquaresLabel.setAttribute("for", "numberOfXSquares");
  xSquaresLabel.textContent = "Number of squares on x-axis:";
  xInputContainer.appendChild(xSquaresLabel);

  let xSquares = document.createElement("input");
  xSquares.setAttribute("id", "xSquares");
  xSquares.setAttribute("name", "numberOfXSquares");
  xSquares.setAttribute("type", "number");
  xSquares.setAttribute("min", "1");
  xSquares.setAttribute("max", "100");
  xInputContainer.appendChild(xSquares);

  inputContainer.appendChild(xInputContainer);

  let yInputContainer = document.createElement("div");
  yInputContainer.classList.add("y-input-container");

  let ySquaresLabel = document.createElement("label");
  ySquaresLabel.setAttribute("for", "numberOfYSquares");
  ySquaresLabel.textContent = "Number of squares on y-axis:";
  yInputContainer.appendChild(ySquaresLabel);

  let ySquares = document.createElement("input");
  ySquares.setAttribute("id", "ySquares");
  ySquares.setAttribute("name", "numberOfYSquares");
  ySquares.setAttribute("type", "number");
  ySquares.setAttribute("min", "1");
  ySquares.setAttribute("max", "100");
  yInputContainer.appendChild(ySquares);

  inputContainer.appendChild(yInputContainer);

  popUp.appendChild(inputContainer);

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.classList.add("submit-button");
  submit.innerText = "Submit";
  submit.addEventListener("click", () => {
    numOfXSquares = document.querySelector("#xSquares").value;
    numOfYSquares = document.querySelector("#ySquares").value;
    gridCreator(numOfXSquares, numOfYSquares);
    body.removeChild(popUp);
  });
  popUp.appendChild(submit);
  body.insertBefore(popUp, gridContainer);
}
