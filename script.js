// script.js
document.addEventListener('DOMContentLoaded', () => {
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;
    let running = false;
    const timerDisplay = document.getElementById('timer');
    const startStopBtn = document.getElementById('start-stop-btn');
    const resetBtn = document.getElementById('reset-btn');
    const lapBtn = document.getElementById('lap-btn');
    const lapsList = document.getElementById('laps-list');

    function formatTime(time) {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 2)}`;
    }

    function pad(number, length = 2) {
        return number.toString().padStart(length, '0');
    }

    function updateTimer() {
        elapsedTime = Date.now() - startTime;
        timerDisplay.textContent = formatTime(elapsedTime);
    }

    function startStop() {
        if (!running) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTimer, 10);
            running = true;
            startStopBtn.textContent = 'Stop';
            resetBtn.disabled = false;
            lapBtn.disabled = false;
        } else {
            clearInterval(timerInterval);
            running = false;
            startStopBtn.textContent = 'Start';
        }
    }

    function reset() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        timerDisplay.textContent = '00:00:00:00';
        startStopBtn.textContent = 'Start';
        resetBtn.disabled = true;
        lapBtn.disabled = true;
        running = false;
        lapsList.innerHTML = '';
    }

    function recordLap() {
        const lapTime = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }

    startStopBtn.addEventListener('click', startStop);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', recordLap);
});
