"use strict";

const startBtn = document.getElementById("start");
const lapBtn = document.getElementById("lap");
const table = document.getElementById("table");
const timer = document.getElementById("timer");
let start = false;
let startTime = 0;
let lapNum = 0;

startBtn.addEventListener("click", () => {
    startTimer();
});

lapBtn.addEventListener("click", () => {
    if (start) {
        lapNum += 1;
        addLap();
    } else {
        start = false;
        startTime = 0;
        lapNum = 0;

        table.innerHTML = "";
    }
});

function startTimer() {
    start = !start
    startTime = Date.now() - startTime;

    startBtn.innerText = (start) ? "Stop" : "Start";
    lapBtn.innerText = (start) ? "Lap" : "Reset";

    updateTimer();
    let timerId = setInterval(updateTimer, 1);
}

function updateTimer() {
    if (start) {
        timer.innerText = formatTime(Date.now() - startTime);
    } else {
        timer.innerText = formatTime(startTime);
    }
}

function formatTime(time) {
    let date = new Date(time);
    let centiseconds = `${time}`.slice(-3, -1)
    let seconds = date.getSeconds() % 60;
    let minutes = date.getMinutes() % 60;
    let hours = date.getHours() - 19;

    if (centiseconds === "") {
        centiseconds = "00";
    }

    return `${hours}:${minutes}:${seconds}:${centiseconds}`
}

function addLap() {
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);

    let lapText = document.createTextNode("Lap " + lapNum);
    let timeText = document.createTextNode(formatTime(Date.now() - startTime));

    cell1.appendChild(lapText);
    cell2.appendChild(timeText);
}