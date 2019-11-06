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
var id = true;

function startTime(){
    // start the countdown
   id = setInterval(countdown, 100)
};

function countdown(){
    // decrement the clock in one second increments
    let timing = document.querySelector("#timer");
    timing.textContent = secondToStringConversion(stringToSecondConversion(timing.textContent)-1);

};

function stopTime() {
    // stop the documenting of the clock
    clearInterval(id);
};

function reset() {
    clearInterval(id);
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
    


    reset();
};