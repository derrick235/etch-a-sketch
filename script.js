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

// add button functionality

function changeSize(e) {
  let newSize = prompt("Enter a new size:");
  if (newSize > 100) {
    alert("Only values 100 and less are accepted.");
    return;
  }

  // remove current grid
  let rows = document.querySelectorAll(".row");
  rows.forEach((row) => {
    grid.removeChild(row);
  })

  // add new grid
  for (let i = 0; i < newSize; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    grid.appendChild(row);
    for (let j = 0; j < newSize; j++) {
      let gridBox = document.createElement("div");
      gridBox.classList.add("grid-box");
      gridBox.addEventListener("mouseover", changeBackgroundColor);
      row.appendChild(gridBox);
    }
  }

}

let button = document.querySelector("button");
button.addEventListener("click", changeSize);