const POMODOROCOLOR = "rgb(0, 128, 0)";
const BREAKCOLOR = "rgb(0, 0, 255)";
const LONGBREAKCOLOR = "rgb(128, 0, 128)";
//some weird skip issue
// finalize colors
document.getElementById("pomodoro").style.cssText = `background-color: ${POMODOROCOLOR}`;
document.getElementById("break").style.cssText = `background-color: ${BREAKCOLOR}`;
document.getElementById("longbreak").style.cssText = `background-color: ${LONGBREAKCOLOR}`;


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

const decrementButtons = document.querySelectorAll(".arrow")
decrementButtons.forEach(button => button.addEventListener('click', lengthClick)); 
const statusButtons = document.querySelectorAll(".status");
/* statusButtons.forEach(button => button.addEventListener('click', function(e){
    const currentActive = document.getElementsByClassName("status active")[0];
    currentActive.classList.toggle("active");
    e.target.classList.add("active");
    toggleTime();
})); */
var timeId = true;

function startTime(){
    // start the countdown
    if (timeId === true){
        timeId = setInterval(countdown, 1);
    }
};

function countdown(){
    // decrement the clock in one second increments
    let timing = document.querySelector("#timer");
    if (timing.textContent === "0:00") {
        timerEnd();
        return;
    }
    timing.textContent = secondToStringConversion(stringToSecondConversion(timing.textContent)-1);
    const totalTiming = document.getElementsByClassName("time active")[0].textContent*60;
    visualUpdate(stringToSecondConversion(timing.textContent)-1,totalTiming);
};

function visualUpdate(currentTiming, totalTiming) {
    // do a visual update of the circles
    // console.log(1 - currentTiming/totalTiming);
    const currentProgression = 100 - Math.round(currentTiming*100/totalTiming);
    //console.log(currentProgression);
    const progressBar = document.getElementsByClassName("inProgress")[0];
    // console.dir(progressBar);
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
    progressBar.style.cssText = `background: conic-gradient(${progressColor} ${currentProgression}%, rgb(214, 214, 214) 0)`;
    //console.dir(progressBar);
};

function stopTime() {
    // stop the documenting of the clock
    clearInterval(timeId);
    timeId = true;
};

function reset() {
    clearInterval(timeId);
    timeId = true;
    let newTime = parseInt(document.getElementsByClassName("time active")[0].textContent)*60;
    document.querySelector("#timer").textContent = secondToStringConversion(newTime);
    let currentStatus = document.querySelector(".inProgress");
    currentStatus.style.cssText = 'background-color: rgb(214, 214, 214)';

    // reset the clock to the selected time

};
function resetAll() {
    // still in progress
    clearInterval(timeId);
    timeId = true;
    let newTime = parseInt(document.getElementsByClassName("time active")[0].textContent)*60;
    document.querySelector("#timer").textContent = secondToStringConversion(newTime);
    let allStatus = document.querySelectorAll(".progress")
    allStatus.forEach(item => item.style.cssText = 'background-color: rgb(214, 214, 214)');
    let currentStatus = document.querySelector(".inProgress");
    if(currentStatus !== null) currentStatus.classList.toggle("inProgress");
    document.getElementById("visual1").classList.add("inProgress");
    document.getElementById("label").innerText = "Pomodoro #1"
};
function skip() {

    const visual = document.getElementsByClassName("inProgress")[0];
    const visualNumber = visual.id[visual.id.length-1];
    visual.classList.remove("inProgress");
    visual.classList.add("complete");
    let nextId;
    let nextSession;
    if (visualNumber === "8") {
        nextId = "visual1";
        nextSession = document.getElementById(nextId);

    }else {
        nextId = "visual"+parseInt(parseInt(visualNumber)+1);
        nextSession = document.getElementById(nextId);
    }

    nextSession.classList.add("inProgress");
    timeSwap();
    reset();
};

function secondToStringConversion(seconds) {
    const minutes = Math.floor(seconds/60);
    let remainderSeconds = seconds - minutes*60;
    remainderSeconds = remainderSeconds > 9 ? ":"+remainderSeconds : ":0"+remainderSeconds;
    return minutes+remainderSeconds;    
};
function stringToSecondConversion(string) {
    const timeArray = string.split(":");
    return parseInt(timeArray[0])*60+parseInt(timeArray[1]);
};

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
    }else {
        element.innerText = parseInt(element.innerText) + 1; 
    }
    //console.dir(element);
    if (element.classList.contains("active")) {
        reset();
        document.querySelector("#timer").textContent = element.innerText+":00";
    }

};

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

function timerEnd() {
    // still in progress
    const session = document.getElementsByClassName("status active")[0];
    const visual = document.getElementsByClassName("inProgress")[0];
    const visualNumber = visual.id[visual.id.length-1];
    //console.log(visualNumber);
    visual.classList.remove("inProgress");
    visual.classList.add("complete");
    let nextId;
    let nextSession;
    if (visualNumber === "8") {
        nextId = "visual1";
        nextSession = document.getElementById(nextId);
        resetAll();
    }else {
        nextId = "visual"+parseInt(parseInt(visualNumber)+1);
        nextSession = document.getElementById(nextId);
    }

    nextSession.classList.add("inProgress");
    //console.dir(nextSession);
    //console.dir(session);
    //console.dir(visual);

    //alert(`${session.id} is over.  Next up, ${nextSession}!`);
    clearInterval(timeId);
    timeId = true;
    timeSwap();
    reset();
};

function timeSwap() {
    const visual = document.getElementsByClassName("inProgress")[0];
    const visualNumber = visual.id[visual.id.length-1];
    const label = document.getElementById("label");
    const currentActive = document.getElementsByClassName("status active")[0];
    let newActive;
    if (visualNumber%2 === 1) {
        label.innerText = "Pomodoro #"+(parseInt(visualNumber)+1)/2;
        currentActive.classList.toggle("active");
        newActive = document.getElementById("pomodoro");
        newActive.classList.add("active");
    }else if (visualNumber == 8) {
        label.innerText = "Long Break";
        currentActive.classList.toggle("active");
        newActive = document.getElementById("longbreak");
        newActive.classList.add("active");
    }else {
        currentActive.classList.toggle("active");
        newActive = document.getElementById("break");
        newActive.classList.add("active");
        label.innerText = "Break #"+parseInt(visualNumber)/2;
    }
    toggleTime();
};