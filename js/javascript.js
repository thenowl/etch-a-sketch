const gridContainer = document.querySelector("#gridContainer");
let square;

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("id", `square${i}${j}`);
    gridContainer.appendChild(square);
  }
}

gridContainer.addEventListener("mouseover", (event) => {
  let target = event.target;

  target.style.background = "black";
});

gridContainer.addEventListener("mouseout", (event) => {
  let target = event.target;

  target.style.background = "white";
});
