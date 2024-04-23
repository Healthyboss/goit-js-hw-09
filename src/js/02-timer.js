import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');

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
    }
  },
};
