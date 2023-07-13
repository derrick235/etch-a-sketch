const grid = document.querySelector(".grid");

// function to add background color
function changeBackgroundColor(e) {
  e.target.style.backgroundColor = "black";
}

// add grid of 16x16 square divs
for (let i = 0; i < 16; i++) {
  let row = document.createElement("div");
  row.classList.add("row");
  grid.appendChild(row);
  for (let j = 0; j < 16; j++) {
    let gridBox = document.createElement("div");
    gridBox.classList.add("grid-box");
    gridBox.addEventListener("mouseover", changeBackgroundColor);
    row.appendChild(gridBox);
  }
}
