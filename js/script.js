let totalGymTime = localStorage.getItem('totalGymTime') ? parseInt(localStorage.getItem('totalGymTime')) : 0;
let breakTime = localStorage.getItem('breakTime') ? parseInt(localStorage.getItem('breakTime')) : 0;
let gymTimerInterval, breakTimerInterval;
let isBreak = false;

// Initialize the display with stored values
document.getElementById('totalGymTime').textContent = formatTime(totalGymTime);
document.getElementById('breakTime').textContent = formatTime(breakTime);

// Update the display every second
setInterval(() => {
    document.getElementById('totalGymTime').textContent = formatTime(totalGymTime);
    document.getElementById('breakTime').textContent = formatTime(breakTime);

    // Save to localStorage
    localStorage.setItem('totalGymTime', totalGymTime.toString());
    localStorage.setItem('breakTime', breakTime.toString());
}, 1000);

document.getElementById('startButton').addEventListener('click', () => {
    if (!gymTimerInterval) {
        gymTimerInterval = setInterval(() => totalGymTime++, 1000);
    }

    if (isBreak && breakTimerInterval) {
        clearInterval(breakTimerInterval);
        breakTimerInterval = null;
        isBreak = false;
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    if (gymTimerInterval) {
        clearInterval(gymTimerInterval);
        gymTimerInterval = null;
    }

    if (breakTimerInterval) {
        clearInterval(breakTimerInterval);
        breakTimerInterval = null;
    }
    isBreak = false;
});

document.getElementById('resetButton').addEventListener('click', () => {
    if (!isBreak) {
        isBreak = true;
        breakTimerInterval = setInterval(() => breakTime++, 1000);
    }
});

document.getElementById('stopBreakButton').addEventListener('click', () => {
    if (breakTimerInterval) {
        clearInterval(breakTimerInterval);
        breakTimerInterval = null;
        breakTime = 0;
        localStorage.setItem('breakTime', '0');
        document.getElementById('breakTime').textContent = formatTime(breakTime);
    }
    isBreak = false;
});

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs].map(v => v < 10 ? "0" + v : v).join(":");
}

document.getElementById('resetEverythingButton').addEventListener('click', () => {
    clearInterval(gymTimerInterval);
    clearInterval(breakTimerInterval);

    totalGymTime = 0;
    breakTime = 0;

    document.getElementById('totalGymTime').textContent = formatTime(totalGymTime);
    document.getElementById('breakTime').textContent = formatTime(breakTime);

    localStorage.setItem('totalGymTime', '0');
    localStorage.setItem('breakTime', '0');
});