'use strict';

(function () {
  var modal = document.querySelector('.modal');
  var form = document.querySelector('.form');
  var inputs = document.querySelectorAll('.form__input');
  var close = document.querySelector('.form__close');
  var isStorageSupport = true;
  var userName = document.querySelector('#name');
  var userPhone = document.querySelector('#phone');
  var userEmail = document.querySelector('#email');
  var storageName = '';
  var storagePhone = '';
  var storageEmail = '';

  // Данные из JSON:
  function readTextFile(file, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.overrideMimeType('application/json');
    xhttp.open('GET', file, true);
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        callback(this.responseText);
      }
    };
    xhttp.send();
  }

  // использование:
  var url = 'http://localhost:3000/js/data.json';
  var data = {};

  readTextFile(url, function (text) {
    data = JSON.parse(text);
    var ul = document.createElement('ul');
    document.querySelector('.assortment').appendChild(ul);
    ul.classList.add('assortment__chairs');
    ul.classList.add('chairs');

    // создаёт карточки на каждый элемент из json и пушит в список:
    data.product.forEach(function (item) {
      var fragment = document.createElement('li');
      fragment.classList.add('chairs__item');
      fragment.innerHTML = '\n      <img class=\'chairs__img\' src='.concat(item.img, ' alt=').concat(item.name, ' width=\'125\' height=\'166\'>\n      <h2 class="chairs__title">').concat(item.name, '</h2>\n      <p class="chairs__price">').concat(item.price, ' &#8381;</p>\n      <button class="chairs__button" type="button">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n      ');
      ul.appendChild(fragment);
    });

    // При клике по кнопке 'Купить' появляется модальное окно и заполняется название товара в textarea
    var cards = document.querySelectorAll('.chairs__item');
    cards.forEach(function (card) {
      var redButton = card.querySelector('.chairs__button');
      redButton.addEventListener('click', function () {
        modal.classList.add('modal--active');
        modal.querySelector('#item').textContent = card.querySelector('.chairs__title').textContent;
      });
    });
  });

  var closeModal = function () {
    modal.classList.remove('modal--active');
  };

  close.onclick = closeModal;
  close.ontouch = closeModal;

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
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
    if (userName || userPhone || userEmail) {
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
      if (userName && userPhone && storageEmail) {
        event.preventDefault();
        closeModal();
      }
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
