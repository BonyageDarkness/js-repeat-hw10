import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = Number(e.target.elements.delay.value);
  const type = e.target.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (type == 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
      console.log(delay);
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: `✅ OK`,
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        icon: null,
        backgroundColor: '#59A10D',
        theme: 'dark',
      });
      form.reset();
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
        icon: null,
      });
      form.reset();
    });

  return promise;
});
