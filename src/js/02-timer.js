import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const btnStart = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate.getTime() <= now.getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
      btnStart.dataset.start = selectedDate;
    }
  },
};

flatpickr('input#datetime-picker', options);

btnStart.addEventListener('click', ev => {
  const { start } = ev.currentTarget.dataset;
  const timeThen = new Date(start);
  let interval = null;
  interval = setInterval(() => {
    const timeNow = new Date();
    const timeLeft = timeThen.getTime() - timeNow.getTime();

    if (timeLeft >= 0) {
      const timeLeftObj = convertMs(timeLeft);
      daysField.innerText = `${timeLeftObj.days}`.padStart(2, '0');
      hoursField.innerText = `${timeLeftObj.hours}`.padStart(2, '0');
      minutesField.innerText = `${timeLeftObj.minutes}`.padStart(2, '0');
      secondsField.innerText = `${timeLeftObj.seconds}`.padStart(2, '0');
    }
    if (timeLeft <= 0) {
      clearInterval(interval);
    }
  }, 1000);
});
