const FRONT = "cardFront";
const BACK = "cardBack";
const CARD = "card";
const ICON = "icon";


startGame();

function startGame() {
  initializeCards(game.createCardsFromTechs());
}

function initializeCards() {
  let gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  game.cards.forEach(card => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);

  })

}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);

  if (face === FRONT) {
    let iconElement = document.createElement('img');
    iconElement.classList.add(ICON);
    iconElement.src = "./assets/images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = "&lt/&gt";
  }
  element.appendChild(cardElementFace);
}


function flipCard() {
  if (game.setCard(this.id)) {

    this.classList.add("flip");

    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        currentScore();
        if (game.checkGameOver()) {
          setTimeout(() => {
            let gameOverLayer = document.getElementById('gameOver');
            gameOverLayer.style.display = 'flex';
          }, 500);
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id)

          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflipCards();
          currentScore();
        }, 500);
      };
    }
  }
}

function restart() {
  checkBestScore();
  resetCurrentScore();
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById('gameOver');
  gameOverLayer.style.display = 'none';
}

function currentScore() {
  let currentScoreInput = document.getElementById('currentScoreInput');
  let bestScoreInput = document.getElementById('bestScoreInput');
  currentScoreInput.setAttribute('value', parseInt(currentScoreInput.value) + 1);

  if (bestScoreInput.value != 0
    && parseInt(currentScoreInput.value) > parseInt(bestScoreInput.value)) {
    currentScoreInput.setAttribute('style', 'color: red');
  }
}

function resetCurrentScore() {
  let currentScoreInput = document.getElementById('currentScoreInput');
  currentScoreInput.setAttribute('value', 0);
  currentScoreInput.setAttribute('style', 'color: black');
}

function checkBestScore() {
  let bestScoreInput = document.getElementById('bestScoreInput');
  let currentScoreInput = document.getElementById('currentScoreInput');

  if (bestScoreInput.value == 0) {
    bestScoreInput.setAttribute('value', currentScoreInput.value)
  }

  if (currentScoreInput.value <= bestScoreInput.value) {
    bestScoreInput.setAttribute('value', currentScoreInput.value);
  }
}