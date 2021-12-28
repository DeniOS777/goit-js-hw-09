const refs = {
  form: document.querySelector('.form'),
};

let delay = '';
let step = '';
let amount = '';

let intervalID = null;
let counterValue = null;
let position = null;

function onFormEnterValue(e) {
  delay = e.currentTarget.elements.delay.value;
  step = e.currentTarget.elements.step.value;
  amount = e.currentTarget.elements.amount.value;
  console.log(`{delay: ${delay}, step: ${step}, amount: ${amount}}`);
}

refs.form.addEventListener('input', onFormEnterValue);
refs.form.addEventListener('submit', onRunPromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function onRunPromise(e) {
  e.preventDefault();

  intervalID = setInterval(() => {
    if (counterValue >= amount) {
      clearInterval(intervalID);
      counterValue = null;
      position = null;
      return;
    }
    position += 1;
    counterValue += 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, delay);
}
