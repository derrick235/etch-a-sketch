// HTML ELEMENTS **********************************

// grid elements
const grid = document.querySelector(".grid");
const doneButtons = document.querySelectorAll(".done");
const headingTitle = document.querySelector(".heading-title");

// tools
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clear");
const customize = document.querySelector("#customize");

// resizing elements
const resizePrompt = document.querySelector("#resize-prompt");
const resizeCaption = document.querySelector(".prompt-caption");
const resize = document.querySelector("#resize");

// color tools elements
const colorToolsPrompt = document.querySelector("#color-prompt");
const colorTools = document.querySelector("#color-tools");
const solid = document.querySelector("#solid");
const rainbow = document.querySelector("#rainbow");
const rainbowDisclaimer = document.querySelector("#rainbow-disclaimer");
const colorSelect = document.querySelector(".color-select");
const colorCaption = document.querySelector("#color-caption");
const opacitySelect = document.querySelector(".opacity-kind");
const opacityCaption = document.querySelector("#opacity-caption");
const full = document.querySelector("#full");
const shading = document.querySelector("#shading");
const hoverDraw = document.querySelector("#hover-draw");
const clickDraw = document.querySelector("#click-draw");

// customization elements
const customizeTitle = document.querySelector("#customize-title");
const customizeCaption = document.querySelector("#customize-caption");
const bitCaption = document.querySelector("#bit");
const customizePrompt = document.querySelector("#customize-prompt");
const tools = document.querySelectorAll(".button-tool");
const selectTools = document.querySelectorAll(".select-tool");

// clear all elements
const clearPrompt = document.querySelector("#clear-prompt");

// booleans
let isRainbow = false;
let isEraser = false;
let shadingOn = false;
let mouseDownDraw = false;
let clickMethod = false;

// initial values
let penColor = "#000000";

// INITIAL GRID: add grid of 16x16 square divs ********************
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

// function to add background color
function changeBackgroundColor(e) {
  if (isEraser) {
    e.target.style.backgroundColor = "rgb(255, 255, 255)";
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
    let origColor = e.target.style.backgroundColor;
    if (shadingOn) {
      // pen color is always originally in hex. Obtain separate r, g, and b values
      let rValue = parseInt(penColor.substring(1,3), 16);
      let gValue = parseInt(penColor.substring(3,5), 16);
      let bValue = parseInt(penColor.substring(5,7), 16);

      // orig color is either in rgb or rgba. check if it is rgb or rgba and then obtain the r, g, and b values
      let origBeginning = origColor.indexOf("(") + 1; // beginning of first value (R value)
      let origLast;
      if (origColor.substring(0,4) === "rgb(") { // Once a color reaches an opacity of 1, Js converts it from RGBA to RGB
        origLast = origColor.lastIndexOf(")");
      }
      else {
        origLast = origColor.lastIndexOf(","); // get last comma which is to the right of the B value and left of the A value
      }

      // check if the grid box color and pen color are the same
      if ((rValue + ", " + gValue + ", " + bValue) != origColor.substring(origBeginning, origLast)) { 
        e.target.style.backgroundColor = "rgba(" + rValue + ", " + gValue + ", " + bValue + ", 0.2)";
      }

      else {
        if (origColor.substring(0,4) === "rgb(") { // if it is already opacity = 1 (which it then becomes RGB)
          return;
        } 
        let origEnd = origColor.indexOf(")");
        let newOpacity = Number(origColor.substring(origLast + 1, origEnd));
        if (newOpacity <= 0.8) {
          newOpacity += 0.2;
        }
        else {
          newOpacity = 1.0;
        }
        e.target.style.backgroundColor = origColor.substring(0, origLast) + ", " + newOpacity + ")";
      }
    }

    // if shading is off
    else {
      e.target.style.backgroundColor = penColor;
    }
  }
}

// add and remove select classes (blue highlight)
function swapSelectClass(newSelect, oldSelect) {
  newSelect.classList.add("select");
  oldSelect.classList.remove("select");
}

// BUTTON FUNCTIONALITY METHODS ***********************************

// open resize prompt
function openResize() {
  resizePrompt.style.display = "block";
}

// open rename prompt
function openCustomize() {
  customizePrompt.style.display = "block";
}

// open color tools prompt
function openColorTools() {
  colorToolsPrompt.style.display = "block";
}

// customization methods
function customizeDone() {
  headingTitle.textContent = document.getElementById("rename-input").value + ".etchasketch";
  customizeTitle.textContent = document.getElementById("rename-input").value + ".etchasketch";
  customizeCaption.textContent = document.getElementById("caption-input").value;

  customizePrompt.style.display = "none";
}

// COLOR TOOLS METHODS *************************

function changeColorTools() {
  penColor = colorSelect.value;
  colorToolsPrompt.style.display = "none";
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
    swapSelectClass(rainbow, solid);
    colorSelect.style.display = "none";
    colorCaption.style.display = "none";
    opacitySelect.style.display = "none";
    opacityCaption.style.display = "none";
    rainbowDisclaimer.style.display = "block";
  }
  else {
    swapSelectClass(solid, rainbow);
    colorSelect.style.display = "block";
    colorCaption.style.display = "block";
    opacitySelect.style.display = "flex";
    opacityCaption.style.display = "block";
    rainbowDisclaimer.style.display = "none";
  }
}

// change opacity
function turnOnOpacity() {
  shadingOn = true;
  swapSelectClass(shading, full);
}

function turnOffOpacity() {
  shadingOn = false;
  swapSelectClass(full, shading);
}

// (COLOR TOOLS CONT.) CLICK AND DRAG METHODS ******************************
function startChangeColorClick(e) {
  let allGrids = document.querySelectorAll(".grid-box");
  document.addEventListener("mouseup", endChangeColorClick); // if mouse is released anywhere, stop coloring

  // upon 1st click, on any encounter with a grid box while hover + click, color it in
  allGrids.forEach((singleGrid) => {
    singleGrid.addEventListener("mouseover", changeBackgroundColor);
  })
  changeBackgroundColor(e);
}

function endChangeColorClick(e) {
  let allGrids = document.querySelectorAll(".grid-box");

  document.removeEventListener("mouseup", endChangeColorClick);
  allGrids.forEach((singleGrid) => {
    singleGrid.removeEventListener("mouseover", changeBackgroundColor);
  })
}

function changeClick() {
  swapSelectClass(clickDraw, hoverDraw);
  clickMethod = true;

  let allGrids = document.querySelectorAll(".grid-box");
  allGrids.forEach((singleGrid) => {
    singleGrid.removeEventListener("mouseover", changeBackgroundColor);
    singleGrid.addEventListener("mousedown", startChangeColorClick);
  })
  mouseDownDraw = true;
}

function changeHover() {
  swapSelectClass(hoverDraw, clickDraw);
  clickMethod = false;

  let allGrids = document.querySelectorAll(".grid-box");
  allGrids.forEach((singleGrid) => {
    singleGrid.removeEventListener("mousedown", startChangeColorClick);
    singleGrid.addEventListener("mouseover", changeBackgroundColor);
  })
  mouseDownDraw = false;
}

// PEN / ERASER METHOD ********************************
function erase() {
  isEraser = !(isEraser);

  // add/remove select class from button
  if (isEraser) {
    swapSelectClass(eraser, pen);
  }
  else {
    swapSelectClass(pen, eraser);
  }
}

// CLEAR ALL METHODS *******************************

// clear entire grid with white background
function clearAllSure() { // popup
  clearPrompt.style.display = "block";
}

function clearAllCancel() {
  clearPrompt.style.display = "none";
}

function clearAll() {
  let allBoxes = document.querySelectorAll(".grid-box");
  allBoxes.forEach((box) => {
    box.style.backgroundColor = "rgb(255, 255, 255)";
  });
  clearPrompt.style.display = "none";
}

// CHANGE GRID SIZE METHOD *******************************
function changeSizeOK(e) {
  let newSize = document.getElementById("size-input").value;

  // check if size inputted is greater than 100 and stop user if so
  if (newSize > 100) {
    resizeCaption.style.color = "red";
    return;
  }

  bitCaption.textContent = newSize + "-bit";

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

      if (clickMethod) {
        gridBox.addEventListener("mousedown", startChangeColorClick);
      }
      else {
        gridBox.addEventListener("mouseover", changeBackgroundColor);
      }
      row.appendChild(gridBox);
    }
  }

  // reset caption color if it turned red before
  resizeCaption.style.color = "black";
  resizePrompt.style.display = "none"; 
}

// ANIMATION FUNCTIONS *************************************
 
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

function addDeleteAnimation() {
  this.classList.add("delete-all");
}

function removeDeleteAnimation() {
  this.classList.remove("delete-all");
}

function cancelPrompt() {
  let typePrompt = this.getAttribute("id");
  if (typePrompt === 'resize') {
    resizePrompt.style.display = "none";
  }
  else if (typePrompt === 'rename') {
    customizePrompt.style.display = "none";
  }
  else if (typePrompt === 'colorTools') {
    colorToolsPrompt.style.display = "none";
  }
  else {
    clearPrompt.style.display = "none";
  }
}

// OPEN TOOLS EVENTS
customize.addEventListener("click", openCustomize);
colorTools.addEventListener("click", openColorTools);
resize.addEventListener("click", openResize);

// OK AND CANCEL BUTTONS
const resizeOkButton = document.querySelector("#done-resize");
resizeOkButton.addEventListener("click", changeSizeOK);

const customizeOkButton = document.querySelector("#done-customize");
customizeOkButton.addEventListener("click", customizeDone);

const colorOkButton = document.querySelector("#done-color");
colorOkButton.addEventListener("click", changeColorTools);

const cancelButtons = document.querySelectorAll(".cancel");
cancelButtons.forEach((cancel) => {
  cancel.addEventListener("click", cancelPrompt);
});

const deleteAll = document.querySelector("#delete-all");
deleteAll.addEventListener("click", clearAll);

// SELECT OPTIONS BUTTON EVENTS
rainbow.addEventListener("click", changeColorOptions);
solid.addEventListener("click", changeColorOptions);
eraser.addEventListener("click", erase);
pen.addEventListener("click", erase);
clear.addEventListener("click", clearAllSure);
full.addEventListener("click", turnOffOpacity);
shading.addEventListener("click", turnOnOpacity);
clickDraw.addEventListener("click", changeClick);
hoverDraw.addEventListener("click", changeHover);

// BUTTON ANIMATIONS
tools.forEach((tool) => {
  tool.addEventListener("mouseover", addButtonAnimationTools);
  tool.addEventListener("mouseout", removeButtonAnimationTools);
})

selectTools.forEach((tool) => {
  tool.addEventListener("mouseover", addButtonAnimation);
  tool.addEventListener("mouseout", removeButtonAnimation);
})

deleteAll.addEventListener("mouseover", addDeleteAnimation);
deleteAll.addEventListener("mouseout", removeDeleteAnimation);