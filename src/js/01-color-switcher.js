function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};

const INTERVAL_DELAY = 1000;
let intervalID = null;
let hasIntervalRun = false;

function onButtonStartChangeColorBodyClick() {
  if (hasIntervalRun) {
    return;
  }
  intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    console.log('Start');
  }, INTERVAL_DELAY);
  hasIntervalRun = true;
}

function onButtonStopChangeColorBodyClick() {
  clearInterval(intervalID);
  hasIntervalRun = false;
  console.log('Stop');
}

refs.buttonStart.addEventListener('click', onButtonStartChangeColorBodyClick);
refs.buttonStop.addEventListener('click', onButtonStopChangeColorBodyClick);
