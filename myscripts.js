const startButton = document.querySelector("#start");
startButton.addEventListener('click', startTime)
const stopButton = document.querySelector("#stop");
stopButton.addEventListener('click', stopTime)
const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', reset);
const decrementButtons = document.querySelectorAll(".arrow")
decrementButtons.forEach(button => button.addEventListener('click', lengthClick)); 
const statusButtons = document.querySelectorAll(".status");
statusButtons.forEach(button => button.addEventListener('click', function(e){
    const currentActive = document.getElementsByClassName("status active")[0];
    currentActive.classList.toggle("active");
    e.target.classList.add("active");
    toggleTime();
}));
var timeId = true;

function startTime(){
    // start the countdown
    if (timeId === true){
        timeId = setInterval(countdown, 20);
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

    // reset the clock to the selected time

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

};

function toggleTime() {
    const currentActive = document.getElementsByClassName("status active")[0].id;
    // console.dir(currentActive);
    document.getElementsByClassName("time active")[0].classList.remove("active");
    //e.target.classList.add("active");
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
    const session = document.getElementsByClassName("status active")[0].id;
    const nextSession = "next";
    alert(`${session} is over.  Next up, ${nextSession}!`);
    clearInterval(timeId);
    timeId = true;
};