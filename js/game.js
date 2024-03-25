const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

const createElement = (tag, className) =>{
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if(disabledCards.length === 20){
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if(firstCharacter == secondCharacter){

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard ='';
    secondCard ='';

    checkEndGame();

  }else{
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard ='';
      secondCard = '';
    
    }, 500);
  }
}

const revealCard = ({ target }) => {

  if(target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if(firstCard ===''){

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard ===''){

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../image/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character) 

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [ ...characters, ...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);   
  });
}


/* // Detalhado passo a passo - Neste código, a função `startTimer` inicializa as variáveis seconds e minutes e então utiliza um `setInterval`
 para incrementar os segundos a cada segundo. Quando os segundos atingem 60, eles são resetados para 0 e os minutos são incrementados. 
 As variáveis são formatadas para garantir que os valores sejam exibidos no formato de tempo correto no elemento HTML com o ID timer.//

const startTimer = () => {
  let seconds = 0;
  let minutes = 0;

  this.loop = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    timer.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
  }, 1000);
} */


/* Neste código, utilizo o operador de módulo (%) para manter os segundos entre 0 e 59, 
e a função `padStart` para garantir que os valores de minutos e segundos sejam exibidos com dois dígitos, 
adicionando um zero à esquerda se necessário. Isso torna o código mais limpo e mais curto.
*/

const startTimer = () => {
  let seconds = 0;
  let minutes = 0;

  this.loop = setInterval(() => {
    seconds = (seconds + 1) % 60;
    minutes = seconds === 0 ? minutes + 1 : minutes;

    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}



window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}


