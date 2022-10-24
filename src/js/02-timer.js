import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
let endDate = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    endDate = selectedDates[0].getTime();
    const delta = endDate - Date.now();
    if (delta <= 0) {
      // alert('Please choose a date in the future')
      Notify.failure('Please choose a date in the future', this.notifyOptions);
      return;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(input, options);

const timer = {
  intervalId: null,
  refs: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
  start() {
    this.intervalId = setInterval(() => {
      const diff = endDate - Date.now();
      console.log(diff, 'intervall');
      if (diff <= 1000) {
        clearInterval(this.intervalId);
        Notify.success('Дедлайн настав!', this.notifyOptions);
      }

      const data = this.convertMs(diff);
      //   Object.entries(data).forEach(([name, value]) => {
      //     this.refs[name].textContent = this.addLeadinZero(value);
      //   });
      this.refs.days.textContent = this.addLeadingZero(data.days);
      this.refs.hours.textContent = this.addLeadingZero(data.hours);
      this.refs.minutes.textContent = this.addLeadingZero(data.minutes);
      this.refs.seconds.textContent = this.addLeadingZero(data.seconds);
    }, 1000);
  },

  convertMs(ms) {
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
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },
};

startBtn.addEventListener('click', handleClick);

function handleClick() {
  timer.start();
};