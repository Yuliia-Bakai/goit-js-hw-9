import { Notify } from 'notiflix';

const refs = {
  formRef: document.querySelector('.form'),
  firstDelayRef: document.querySelector('[name="delay"]'),
  delayStepRef: document.querySelector('[name="step"]'),
  amountRef: document.querySelector('[name="amount"]'),
};

refs.formRef.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(evt) {
  evt.preventDefault();
  const firstDelayValue = refs.firstDelayRef.value;
  const delayStepValue = refs.delayStepRef.value;
  const amountValue = refs.amountRef.value;
  console.log(amountValue);
  let delayStep = +firstDelayValue;
  for (let i = 0; i < +amountValue; i += 1) {
    createPromise(i + 1, delayStep)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }); 
    delayStep += +delayStepValue;
  }
}