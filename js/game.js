// Variáveis globais
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const characters = [
    'beth', 'jerry', 'jessica', 'morty', 'pessoa-passaro', 
    'pickle-rick', 'rick', 'summer', 'meeseeks', 'scroopy'
];

// Variáveis para cartas selecionadas
let firstCard = '';
let secondCard = '';

// Função para criar elementos HTML
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Função para verificar o fim do jogo
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  if (disabledCards.length === 20) {
      clearInterval(this.loop);
      const endTime = timer.innerHTML; // Obtém o tempo final do jogador
      const playerName = localStorage.getItem('player'); // Obtém o nome do jogador
      const playerTime = { name: playerName, time: endTime }; // Cria um objeto com o nome e tempo do jogador
      let rankings = JSON.parse(localStorage.getItem('rankings')) || []; // Obtém os rankings do armazenamento local ou inicializa um array vazio
      rankings.push(playerTime); // Adiciona o tempo do jogador aos rankings
      rankings.sort((a, b) => a.time.localeCompare(b.time)); // Ordena os rankings pelo tempo
      localStorage.setItem('rankings', JSON.stringify(rankings)); // Salva os rankings atualizados no armazenamento local
      updateRankings(rankings); // Atualiza a exibição dos rankings na interface
      document.getElementById('restartButton').disabled = false; // Habilita o botão de reinício
  }
}


const updateRankings = (rankings) => {
  const topRankings = rankings.slice(0, 3); // Obtém os 3 melhores tempos
  const rankingsList = document.querySelector('.rankings'); // Seleciona a lista de rankings na interface
  rankingsList.innerHTML = ''; // Limpa a lista de rankings
  topRankings.forEach((player, index) => {
      const listItem = document.createElement('li'); // Cria um item de lista para cada ranking
      listItem.textContent = `${index + 1}. ${player.name}: ${player.time}`; // Define o texto do item de lista com o nome e tempo do jogador
      rankingsList.appendChild(listItem); // Adiciona o item de lista à lista de rankings na interface
  });
}


// Função para verificar as cartas selecionadas
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
    if (firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';
        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

// Função para revelar uma carta
const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}

// Função para criar uma carta
const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    front.style.backgroundImage = `url('../image/${character}.png')`;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);
    return card;
}

// Função para carregar o jogo
const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
    document.getElementById('restartButton').disabled = true; // Desabilita o botão de reinício  
  }

// Função para iniciar o temporizador
const startTimer = () => {
    let seconds = 0;
    let minutes = 0;
    this.loop = setInterval(() => {
        seconds = (seconds + 1) % 60;
        minutes = seconds === 0 ? minutes + 1 : minutes;
        timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Função para reiniciar o jogo
const restartGame = () => {
    clearInterval(this.loop); // Para o temporizador
    timer.innerHTML = '00:00'; // Reinicia o contador exibido
    grid.innerHTML = ''; // Limpa a grade de cartas
    loadGame(); // Carrega um novo jogo
    startTimer(); // Inicia o temporizador novamente
}

// Adiciona o evento de clique ao botão de reinício
document.getElementById('restartButton').addEventListener('click', restartGame);

// Função que é executada quando a janela é carregada
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player'); // Define o nome do jogador
    startTimer(); // Inicia o temporizador
    loadGame(); // Carrega o jogo
    // Adiciona o botão de reinício ao corpo do documento
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Reiniciar';
    restartButton.addEventListener('click', restartGame);
    document.body.appendChild(restartButton);
}
