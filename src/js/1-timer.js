import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const dataStart = document.querySelector('button');
const datetimePicker = document.querySelector('#datetime-picker');
let userSelectedDate;
dataStart.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      dataStart.setAttribute('disabled', 'disabled');
      iziToast.error({
        message: 'Please choose a date in the future',
        zindex: 999,
        position: 'topCenter',
        color: 'red',
      });
      return;
    } else {
      dataStart.removeAttribute('disabled');
    }
    console.log(selectedDates[0]);
    return (userSelectedDate = selectedDates[0]);
  },
};

flatpickr(datetimePicker, options);

dataStart.addEventListener('click', () => {
  dataStart.setAttribute('disabled', 'disabled');
  datetimePicker.setAttribute('disabled', 'disabled');
  const interval = setInterval(() => {
    const delta = userSelectedDate - Date.now();

    if (delta <= 0) {
      clearInterval(interval);
      dataStart.removeAttribute('disabled');
      datetimePicker.removeAttribute('disabled');
      iziToast.show({
        message: 'TIMER IS DONE',
        zindex: 999,
        position: 'topCenter',
        color: 'blue',
      });
      return;
    }
    const { seconds, minutes, hours, days } = convertMs(delta);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
    console.log(delta);
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
