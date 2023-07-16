// get all HTML elements
const grid = document.querySelector(".grid");
const resizePrompt = document.querySelector(".resize-prompt");
const resizeCaption = document.querySelector(".resize-caption");
const solid = document.querySelector("#solid");
const rainbow = document.querySelector("#rainbow");
const resize = document.querySelector("#resize");
const tools = document.querySelectorAll(".button-tool");
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clear");

// booleans
let isRainbow = false;
let isEraser = false;

// function to add background color
function changeBackgroundColor(e) {
  if (isEraser) {
    e.target.style.backgroundColor = "white";
  }
  else if (isRainbow) {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      let randomColor = Math.floor(Math.random() * 17);
      color += randomColor.toString(16);
    }
    e.target.style.backgroundColor = color;
  }
  else {
    e.target.style.backgroundColor = "black";
  }
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

// open resize prompt
function openResize() {
  resizePrompt.style.display = "block";
}

// change color from rainbow to solid and vice versa
function changeColorOptions() {
  if (this.getAttribute("id") === "rainbow") {
    isRainbow = true;
  }
  else {
    isRainbow = false;
  }
  isEraser = false;
  eraser.classList.remove("select");
  if (isRainbow) {
    rainbow.classList.add("select");
    solid.classList.remove("select");
  }
  else {
    rainbow.classList.remove("select");
    solid.classList.add("select");
  }
}

function erase() {
  isEraser = !(isEraser);
  if (isEraser) {
    eraser.classList.add("select");
    rainbow.classList.remove("select");
    solid.classList.remove("select");    
  }
  else {
    if (isRainbow) {
      eraser.classList.remove("select");
      rainbow.classList.add("select");
      solid.classList.remove("select");       
    }
    else {
      eraser.classList.remove("select");
      rainbow.classList.remove("select");
      solid.classList.add("select");       
    }
  }
}

function clearAll() {
  let allBoxes = document.querySelectorAll(".grid-box");
  allBoxes.forEach((box) => {
    box.style.backgroundColor = "white";
  });
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

function addButtonAnimationTools() {
  this.classList.add("tools-hover");
}

function removeButtonAnimationTools() {
  this.classList.remove("tools-hover");
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

let okButton = document.querySelector(".done");
let cancelButton = document.querySelector(".cancel");
resize.addEventListener("click", openResize);
rainbow.addEventListener("click", changeColorOptions);
solid.addEventListener("click", changeColorOptions);
eraser.addEventListener("click", erase);
clear.addEventListener("click", clearAll);

tools.forEach((tool) => {
  tool.addEventListener("mouseover", addButtonAnimationTools);
  tool.addEventListener("mouseout", removeButtonAnimationTools);
})

okButton.addEventListener("mouseover", addButtonAnimation);
okButton.addEventListener("mouseout", removeButtonAnimation);
okButton.addEventListener("click", changeSizeOK);
cancelButton.addEventListener("mouseover", addButtonAnimation);
cancelButton.addEventListener("mouseout", removeButtonAnimation);
cancelButton.addEventListener("click", cancel);