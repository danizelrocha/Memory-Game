const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form')

const agradecimentosButton = document.querySelector('.agradecimentos_button');

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', '');
  }
}

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html';
}

const handleButton = () => {
  window.location = 'pages/agradecimentos.html'
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
agradecimentosButton.addEventListener('click', handleButton)