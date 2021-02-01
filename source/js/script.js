'use strict';

(function () {
  // var body = document.querySelector('body');
  var buttons = document.querySelectorAll('.chairs__button');
  var modal = document.querySelector('.modal');
  var form = document.querySelector('.form');
  var inputs = document.querySelectorAll('.form__input');
  // var textarea = document.querySelector('.form__textarea');
  var close = document.querySelector('.form__close');
  var isStorageSupport = true;
  var userName = document.querySelector('#name');
  var userPhone = document.querySelector('#phone');
  var userEmail = document.querySelector('#email');
  var storageName = '';
  var storagePhone = '';
  var storageEmail = '';

  if (buttons) {
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        modal.classList.add('modal--active');
      });
    });
  }

  var closeModal = function () {
    modal.classList.remove('modal--active');
  };

  close.onclick = closeModal;
  close.ontouch = closeModal;

  form.onsubmit = function (event) {
    event.preventDefault();
    closeModal();
  };

  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      event.preventDefault();
      closeModal();
    }
  });

  if (inputs) {
    inputs.forEach(function (elem) {
      elem.removeAttribute('required');
    });
  }

  // Проверяем есть ли данные пользователя в LS
  try {
    storageName = localStorage.getItem('user');
    storagePhone = localStorage.getItem('phone');
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  }

  // Если есть, заполняем поля формы:
  if (storageName && storagePhone && storageEmail) {
    if (userName || userPhone || storageEmail) {
      userName.value = storageName;
      userPhone.value = storagePhone;
      userEmail.value = storageEmail;
    }
  } else {
    userName.focus();
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      inputs.forEach(function (elem) {
        if (!elem.value) {
          event.preventDefault();
          elem.classList.remove('form__input--error');
          elem.classList.add('form__input--error');
        } else if (isStorageSupport) {
          localStorage.setItem('user', userName.value);
          localStorage.setItem('phone', userPhone.value);
          localStorage.setItem('email', userEmail.value);
        }
      });
    });
  }

  document.addEventListener('click', function () {
    inputs.forEach(function (elem) {
      if (elem.classList.contains('form__input--error')) {
        elem.classList.remove('form__input--error');
      }
    });
  });
})();
