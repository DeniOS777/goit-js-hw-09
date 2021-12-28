import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

let intervalID = null;
let position = 0;

refs.form.addEventListener('submit', onFormButtonSubmitRunPromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormButtonSubmitRunPromise(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.elements.delay.value);
  let step = Number(e.currentTarget.elements.step.value);
  let amount = Number(e.currentTarget.elements.amount.value);
  let counter = 0;

  intervalID = setInterval(() => {
    if (counter === Number(amount)) {
      clearInterval(intervalID);
      counter = 0;
      position = 0;
      return;
    }

    position += 1;
    counter += 1;
    setTimeout(() => {
      delay += step;
    }, 0);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, step);
}
