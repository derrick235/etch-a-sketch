const grid = document.querySelector(".grid");
const resizePrompt = document.querySelector(".resize-prompt");
const resizeCaption = document.querySelector(".resize-caption");

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

function openResize() {
  resizePrompt.style.display = "block";
}

function changeSizeOK(e) {
  let newSize = document.getElementById("size-input").value;
  if (newSize > 100) {
    resizeCaption.style.color = "red";
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
  resizeCaption.style.color = "black";
  resizePrompt.style.display = "none";
  
}

function addButtonAnimationResize() {
  this.classList.add("size-hover");
}

function removeButtonAnimationResize() {
  this.classList.remove("size-hover");
}

function addButtonAnimation() {
  this.classList.add("button-hover");
}

function removeButtonAnimation() {
  this.classList.remove("button-hover");
}

function cancel() {
  resizePrompt.style.display = "none";
}

let button = document.querySelector("button");
let okButton = document.querySelector(".done");
let cancelButton = document.querySelector(".cancel");
button.addEventListener("click", openResize);
button.addEventListener("mouseover", addButtonAnimationResize);
button.addEventListener("mouseout", removeButtonAnimationResize);

okButton.addEventListener("mouseover", addButtonAnimation);
okButton.addEventListener("mouseout", removeButtonAnimation);
okButton.addEventListener("click", changeSizeOK);
cancelButton.addEventListener("mouseover", addButtonAnimation);
cancelButton.addEventListener("mouseout", removeButtonAnimation);
cancelButton.addEventListener("click", cancel);