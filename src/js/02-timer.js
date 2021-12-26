import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    if (selectedDate < Date.now()) {
      return alert('Please choose a date in the future');
    }
    refs.buttonStart.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

const refs = {
  buttonStart: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.buttonStart.addEventListener('click', onButtonStartTimerClick);

refs.buttonStart.setAttribute('disabled', 'disabled');

const INTERVAL_ID = 1000;
let timerID = null;

function onButtonStartTimerClick() {
  timerID = setInterval(() => {
    const deltaTime = selectedDate - Date.now();
    const formatComponents = convertMs(deltaTime);
    onShowInterface(formatComponents);
    console.log(formatComponents);
  }, INTERVAL_ID);

  refs.buttonStart.setAttribute('disabled', 'disabled');
  refs.input.setAttribute('disabled', 'disabled');
}

function onShowInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
