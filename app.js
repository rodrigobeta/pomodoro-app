const bells = new Audio('/sounds/bell.mp3'); 
const startBtn = document.querySelector('.btn-start'); 
const resetBtn = document.querySelector('.btn-reset');
const minuteDiv = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');
let myInterval; 
let state = true;

const resetTimer = () => {
  clearInterval(myInterval);
  state = true;
  startBtn.textContent = 'start';
  minuteDiv.textContent = '25';
  secondDiv.textContent = '00';
};

const appTimer = () => {
  if (state) {
    state = false;
    startBtn.textContent = 'pause';

    const sessionAmount = Number.parseInt(minuteDiv.textContent);
    const secondsAmount = Number.parseInt(secondDiv.textContent);
    let totalSeconds = (sessionAmount * 60) + secondsAmount;

    const updateSeconds = () => {
      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;

      minuteDiv.textContent = String(minutesLeft).padStart(2, '0');
      secondDiv.textContent = String(secondsLeft).padStart(2, '0');

      if (totalSeconds <= 0) {
        bells.play();
        clearInterval(myInterval);
        state = true;
        startBtn.textContent = 'start';
      }
    };
    
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    clearInterval(myInterval);
    state = true;
    startBtn.textContent = 'start';
  }
};

startBtn.addEventListener('click', appTimer);
resetBtn.addEventListener('click', resetTimer);