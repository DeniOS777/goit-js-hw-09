const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};

refs.buttonStart.addEventListener('click', onButtonStartChangeColorClick);
refs.buttonStop.addEventListener('click', onButtonStopChangeColorClick);

refs.buttonStop.setAttribute('disabled', 'disabled');

const INTERVAL_DELAY = 1000;
let intervalID = null;

function onButtonStartChangeColorClick() {
  intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DELAY);
  refs.buttonStop.removeAttribute('disabled');
  refs.buttonStart.setAttribute('disabled', 'disabled');
}

function onButtonStopChangeColorClick() {
  clearInterval(intervalID);
  refs.buttonStart.removeAttribute('disabled');
  refs.buttonStop.setAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
