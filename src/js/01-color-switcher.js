function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.body;

btnStart.addEventListener('click', () => {
  btnStop.removeAttribute('disabled');
  btnStart.setAttribute('disabled', '');
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  s;
});

btnStop.addEventListener('click', ev => {
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', '');
  clearInterval(intervalId);
});
