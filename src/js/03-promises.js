const refs = {
  form: document.querySelector('.form'),
};

let delay = null;
let step = null;
let amount = null;

let intervalID = null;
let position = null;

function onFormEnterValue(e) {
  delay = Number(e.currentTarget.elements.delay.value);
  step = Number(e.currentTarget.elements.step.value);
  amount = Number(e.currentTarget.elements.amount.value);
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
  let counterValue = null;
  e.preventDefault();

  intervalID = setTimeout(() => {
    if (counterValue === Number(amount)) {
      clearTimeout(intervalID);
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
