const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};

refs.buttonStart.addEventListener('click', onButtonStartChangeColorClick);
refs.buttonStop.addEventListener('click', onButtonStopChangeColorClick);

refs.buttonStop.disabled = true;

const INTERVAL_DELAY = 1000;
let intervalID = null;

function onButtonStartChangeColorClick() {
  intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DELAY);
  refs.buttonStop.disabled = false;
  refs.buttonStart.disabled = true;
}

function onButtonStopChangeColorClick() {
  clearInterval(intervalID);
  refs.buttonStop.disabled = true;
  refs.buttonStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
