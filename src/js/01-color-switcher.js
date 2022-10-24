const buttonStart = document.querySelector('[data-start]');
// const buttonStop = document.querySelector('[data-stop]');
let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function bgColorSwitch() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onButtonStart() {
  buttonStart.disabled = true;
  buttonStop.disabled = false;

  timer = setInterval(bgColorSwitch, 1000);
}

function onButtonStop() {
  clearInterval(timer);

  buttonStart.disabled = false;
  buttonStop.disabled = true;
}

buttonStart.addEventListener('click', onButtonStart);
buttonStop.addEventListener('click', onButtonStop);