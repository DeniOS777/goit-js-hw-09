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
      refs.buttonStart.setAttribute('disabled', 'disabled');
      return alert('Please choose a date in the future');
    }
    refs.buttonStart.removeAttribute('disabled');
  },
};

const fp = flatpickr('#datetime-picker', options);

const refs = {
  buttonStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.buttonStart.addEventListener('click', onButtonStartTimerClick);

refs.buttonStart.setAttribute('disabled', 'disabled');

function onButtonStartTimerClick() {
  setInterval(() => {
    const deltaTime = selectedDate - Date.now();
    const formatComponents = convertMs(deltaTime);
    onShowInterface(formatComponents);
    console.log(formatComponents);
  }, 1000);
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
