
/*
  potential future updates:
    re-factor toggleTime and timeSwap
    make the selection length items expand from a status button
    add a tab icon
    make the number of Pomodoros flexible
*/

// colors for Pomodoro fill ins and related buttons
const POMODOROCOLOR = "rgb(128, 0, 0)";
const BREAKCOLOR = "rgb(46, 46, 150)";
const LONGBREAKCOLOR = "rgb(128, 0, 128)";

// add event listeners for buttons
const startButton = document.querySelector("#start");
startButton.addEventListener('click', startTime)

const stopButton = document.querySelector("#stop");
stopButton.addEventListener('click', stopTime)

const skipButton = document.querySelector("#skip");
skipButton.addEventListener('click', skip);

const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', reset);

const resetAllButton = document.querySelector("#resetAll");
resetAllButton.addEventListener('click', resetAll);

const arrowButtons = document.querySelectorAll(".arrow")
arrowButtons.forEach(button => button.addEventListener('click', lengthClick));
const statusButtons = document.querySelectorAll(".status");


var timeId = true;

function startTime() {
  // start the countdown
  if (timeId === true) {
    timeId = setInterval(countdown, 1000);
  }
};

// decrement the clock in one second increments
function countdown() {
  let timing = document.querySelector("#timer");
  if (timing.textContent === "0:00") {
    timerEnd();
    return;
  }
  timing.textContent = secondToStringConversion(stringToSecondConversion(timing.textContent) - 1);
  const totalTiming = document.getElementsByClassName("time active")[0].textContent * 60;
  visualUpdate(stringToSecondConversion(timing.textContent) - 1, totalTiming);
};

function visualUpdate(currentTiming, totalTiming) {
  // do a visual update of the circles
  const currentProgression = 100 - Math.round(currentTiming * 100 / totalTiming);
  const progressBar = document.getElementsByClassName("inProgress")[0];
  let progressColor;
  switch (progressBar.classList[1]) {
    case "pom":
      progressColor = POMODOROCOLOR;
      break;
    case "brk":
      progressColor = BREAKCOLOR;
      break;
    case "lbrk":
      progressColor = LONGBREAKCOLOR;
      break;
  }
  progressBar.style.cssText = `background: conic-gradient(${progressColor}`+
      ` ${currentProgression}%, rgb(214, 214, 214) 0)`;
};

// stop the decrementing of the clock
function stopTime() {
  clearInterval(timeId);
  timeId = true;
};

// reset the clock to the selected time
function reset() {
  clearInterval(timeId);
  timeId = true;
  let newTime = parseInt(document.getElementsByClassName("time active")[0].textContent) * 60;
  document.querySelector("#timer").textContent = secondToStringConversion(newTime);
  let currentStatus = document.querySelector(".inProgress");
  currentStatus.style.cssText = 'background-color: rgb(214, 214, 214)';
};

// start over from the very beginning
function resetAll() {
  clearInterval(timeId);
  timeId = true;
  document.getElementsByClassName("time active")[0].classList.remove("active");
  document.getElementById("pomodoroTime").classList.add("active");
  let newTime = parseInt(document.getElementsByClassName("time active")[0].textContent) * 60;
  document.querySelector("#timer").textContent = secondToStringConversion(newTime);
  let allStatus = document.querySelectorAll(".progress")
  allStatus.forEach(item => item.style.cssText = 'background-color: rgb(214, 214, 214)');
  let currentStatus = document.querySelector(".inProgress");
  if (currentStatus !== null) currentStatus.classList.toggle("inProgress");
  document.getElementById("visual1").classList.add("inProgress");
  document.getElementById("label").innerText = "Pomodoro #1"
};

// skip to the next timer
function skip() {
  const visual = document.getElementsByClassName("inProgress")[0];
  const visualNumber = visual.id[visual.id.length - 1];
  visual.classList.remove("inProgress");
  visual.classList.add("complete");
  let nextId;
  let nextSession;
  // if the active circle is the very last one, start over from the beginning
  if (visualNumber === "8") {
    nextId = "visual1";
    nextSession = document.getElementById(nextId);
  } else {
    nextId = "visual" + parseInt(parseInt(visualNumber) + 1);
    nextSession = document.getElementById(nextId);
  }

  nextSession.classList.add("inProgress");
  timeSwap();
  reset();
};

// convert raw number of seconds to timeclock output
function secondToStringConversion(seconds) {
  const minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds - minutes * 60;
  remainderSeconds = remainderSeconds > 9 ? ":" + remainderSeconds : ":0" + remainderSeconds;
  return minutes + remainderSeconds;
};

// convert from timeclock output to raw number of seconds
function stringToSecondConversion(string) {
  const timeArray = string.split(":");
  return parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
};

// change the length of the different phases by clicking the button
function lengthClick(e) {

  let elementName = e.path[0].className.split(" ");
  let element;

  switch (elementName[2]) {
    case 'pomTime':
      element = document.querySelector("#pomodoroTime");
      break;
    case 'breakTime':
      element = document.querySelector("#breakTime");
      break;
    case 'lbTime':
      element = document.querySelector("#longbreakTime");
      break;
  }
  if (elementName[1] === "Down") {
    element.innerText = parseInt(element.innerText) - 1;
  } else {
    element.innerText = parseInt(element.innerText) + 1;
  }
  if (element.classList.contains("active")) {
    reset();
    document.querySelector("#timer").textContent = element.innerText + ":00";
  }

};

// go from the current timing method to whatever new timing method is next
function toggleTime() {
  const currentActive = document.getElementsByClassName("status active")[0].id;
  document.getElementsByClassName("time active")[0].classList.remove("active");
  let element;
  switch (currentActive) {
    case 'pomodoro':
      element = document.querySelector("#pomodoroTime");
      break;
    case 'break':
      element = document.querySelector("#breakTime");
      break;
    case 'longbreak':
      element = document.querySelector("#longbreakTime");
      break;
  }
  element.classList.add("active");
  reset();
};

// do all the things that need to be done when the timer is completed
function timerEnd() {
  // still in progress
  const session = document.getElementsByClassName("status active")[0];
  const visual = document.getElementsByClassName("inProgress")[0];
  const visualNumber = visual.id[visual.id.length - 1];
  //console.log(visualNumber);
  visual.classList.remove("inProgress");
  visual.classList.add("complete");
  let nextId;
  let nextSession;
  if (visualNumber === "8") {
    nextId = "visual1";
    nextSession = document.getElementById(nextId);
    resetAll();
  } else {
    nextId = "visual" + parseInt(parseInt(visualNumber) + 1);
    nextSession = document.getElementById(nextId);
  }
  nextSession.classList.add("inProgress");
  //alert(`${session.id} is over.  Next up, ${nextSession}!`);
  clearInterval(timeId);
  timeId = true;
  timeSwap();
  reset();
};

// update all the other class behavior not taken care of in toggleTime
function timeSwap() {
  const visual = document.getElementsByClassName("inProgress")[0];
  const visualNumber = visual.id[visual.id.length - 1];
  const label = document.getElementById("label");
  const currentActive = document.getElementsByClassName("status active")[0];
  let newActive;
  if (visualNumber % 2 === 1) {
    label.innerText = "Pomodoro #" + (parseInt(visualNumber) + 1) / 2;
    currentActive.classList.toggle("active");
    newActive = document.getElementById("pomodoro");
    newActive.classList.add("active");
  } else if (visualNumber == 8) {
    label.innerText = "Long Break";
    currentActive.classList.toggle("active");
    newActive = document.getElementById("longbreak");
    newActive.classList.add("active");
  } else {
    currentActive.classList.toggle("active");
    newActive = document.getElementById("break");
    newActive.classList.add("active");
    label.innerText = "Break #" + parseInt(visualNumber) / 2;
  }
  toggleTime();
};