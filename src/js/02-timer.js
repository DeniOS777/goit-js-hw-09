import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  buttonStart: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.buttonStart.setAttribute('disabled', 'disabled');

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    if (selectedDate < Date.now()) {
      return Notify.failure('Please choose a date in the future', { timeout: 1500 });
    }
    Notify.success('Date is valid', { timeout: 1500 });
    refs.buttonStart.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onShow }) {
    this.intervalId = 1000;
    this.timerID = null;
    this.onShow = onShow;
  }

  start() {
    this.timerId = setInterval(() => {
      if (selectedDate - Date.now() < 0) {
        clearInterval(this.timerID);
        refs.input.removeAttribute('disabled');
        return Report.success('SALE', 'Sale started!!!', 'Okay');
      }
      const deltaTime = selectedDate - Date.now();
      const formatComponents = convertMs(deltaTime);
      this.onShow(formatComponents);
    }, this.intervalId);

    refs.buttonStart.setAttribute('disabled', 'disabled');
    refs.input.setAttribute('disabled', 'disabled');
  }
}

const timer = new Timer({
  onShow: updateTimerInterface,
});

refs.buttonStart.addEventListener('click', timer.start.bind(timer));

function updateTimerInterface({ days, hours, minutes, seconds }) {
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
