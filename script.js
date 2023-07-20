// get all HTML elements
const grid = document.querySelector(".grid");
const resizePrompt = document.querySelector(".resize-prompt");
const resizeCaption = document.querySelector(".prompt-caption");
const renamePrompt = document.querySelector(".rename-prompt");
const colorToolsPrompt = document.querySelector(".color-prompt");
const solid = document.querySelector("#solid");
const rainbow = document.querySelector("#rainbow");
const resize = document.querySelector("#resize");
const colorTools = document.querySelector("#color-tools");
const tools = document.querySelectorAll(".button-tool");
const doneButtons = document.querySelectorAll(".done");
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clear");
const rename = document.querySelector("#rename");
const headingTitle = document.querySelector(".heading-title");
const colorSelect = document.querySelector(".color-select");
const colorCaption = document.querySelector("#color-caption")
const full = document.querySelector("#full");
const shading = document.querySelector("#shading")
const hoverDraw = document.querySelector("#hover-draw");
const clickDraw = document.querySelector("#click-draw");
const pen = document.querySelector("#pen");

// booleans
let isRainbow = false;
let isEraser = false;
let shadingOn = false;
let mouseDownDraw = false;

// initial values
let penColor = "#000000";

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
    e.target.style.backgroundColor = penColor;
  }
}

function startChangeColorClick(e) {
  let allGrids = document.querySelectorAll(".grid-box");
  allGrids.forEach((singleGrid) => {
    singleGrid.addEventListener("mouseover", changeBackgroundColor);
    singleGrid.addEventListener("mouseup", endChangeColorClick);
  })
  changeBackgroundColor(e);
}

function endChangeColorClick(e) {
  let allGrids = document.querySelectorAll(".grid-box");
  allGrids.forEach((singleGrid) => {
    singleGrid.removeEventListener("mouseover", changeBackgroundColor);
    singleGrid.removeEventListener("mouseup", endChangeColorClick);
  })
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

// BUTTON FUNCTIONALITY METHODS ***********************************

// open resize prompt
function openResize() {
  resizePrompt.style.display = "block";
}

// open rename prompt
function openRename() {
  renamePrompt.style.display = "block";
}

// open color tools prompt
function openColorTools() {
  colorToolsPrompt.style.display = "block";
}

// change color from rainbow to solid and vice versa
function changeColorOptions() {
  if (this.getAttribute("id") === "rainbow") {
    isRainbow = true;
  }
  else {
    isRainbow = false;
  }
  if (isRainbow) {
    rainbow.classList.add("select");
    solid.classList.remove("select");
    colorSelect.style.display = "none";
    colorCaption.style.display = "none";
  }
  else {
    rainbow.classList.remove("select");
    solid.classList.add("select");
    colorSelect.style.display = "block";
    colorCaption.style.display = "block";
  }
}

// change opacity
function enableOpacity() {
  shadingOn = true;
}

// switch to eraser or turn off
function erase() {
  isEraser = !(isEraser);
  if (isEraser) {
    eraser.classList.add("select");
    pen.classList.remove("select");  
  }
  else {
    eraser.classList.remove("select");
    pen.classList.add("select");
  }
}

// clear entire grid with white background
function clearAll() {
  let allBoxes = document.querySelectorAll(".grid-box");
  allBoxes.forEach((box) => {
    box.style.backgroundColor = "white";
  });
}

// change grid size once OK is selected
function changeSizeOK(e) {
  let newSize = document.getElementById("size-input").value;

  // check if size inputted is greater than 100 and stop user if so
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

  // reset caption color if it turned red before
  resizeCaption.style.color = "black";
  resizePrompt.style.display = "none";
  
}

function changeClick() {
  clickDraw.classList.add("select");
  hoverDraw.classList.remove("select");
  let allGrids = document.querySelectorAll(".grid-box");
  allGrids.forEach((singleGrid) => {
    singleGrid.removeEventListener("mouseover", changeBackgroundColor);
    singleGrid.addEventListener("mousedown", startChangeColorClick);
  })
  mouseDownDraw = true;
}

function changeHover() {
  clickDraw.classList.remove("select");
  hoverDraw.classList.add("select");
  let allGrids = document.querySelectorAll(".grid-box");
  allGrids.forEach((singleGrid) => {
    singleGrid.removeEventListener("mousedown", startChangeColorClick);
    singleGrid.addEventListener("mouseover", changeBackgroundColor);
  })
  mouseDownDraw = false;
}

function renameTitle() {
  headingTitle.textContent = document.getElementById("rename-input").value + ".etchasketch";
  renamePrompt.style.display = "none";
}

function changeColorTools() {
  penColor = colorSelect.value;
  colorToolsPrompt.style.display = "none";
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

function cancelPrompt() {
  let typePrompt = this.getAttribute("id");
  if (typePrompt === 'resize') {
    resizePrompt.style.display = "none";
  }
  else if (typePrompt === 'rename') {
    renamePrompt.style.display = "none";
  }
  else if (typePrompt === 'colorTools') {
    colorToolsPrompt.style.display = "none";
  }
}

let resizeOkButton = document.querySelector(".doneResize");
resize.addEventListener("click", openResize);

rename.addEventListener("click", openRename);
rainbow.addEventListener("click", changeColorOptions);
solid.addEventListener("click", changeColorOptions);
eraser.addEventListener("click", erase);
pen.addEventListener("click", erase);
clear.addEventListener("click", clearAll);
colorTools.addEventListener("click", openColorTools);

clickDraw.addEventListener("click", changeClick);
hoverDraw.addEventListener("click", changeHover);

tools.forEach((tool) => {
  tool.addEventListener("mouseover", addButtonAnimationTools);
  tool.addEventListener("mouseout", removeButtonAnimationTools);
})

resizeOkButton.addEventListener("click", changeSizeOK);

let renameOkButton = document.querySelector(".doneRename");
renameOkButton.addEventListener("click", renameTitle);

let colorOkButton = document.querySelector(".doneColor");
colorOkButton.addEventListener("click", changeColorTools);

let cancelButtons = document.querySelectorAll(".cancel");

cancelButtons.forEach((cancel) => {
  cancel.addEventListener("click", cancelPrompt);
});

document.addEventListener("mousedown", () => {
  console.log("mousedown!");
})