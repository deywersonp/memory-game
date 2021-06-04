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
        }, 1000);
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
  let currentScore = document.getElementById('currentScore');
  let bestScore = document.getElementById('bestScore');
  currentScore.setAttribute('value', parseInt(currentScore.value) + 1);

  if (bestScore.value != 0
    && parseInt(currentScore.value) > parseInt(bestScore.value)) {
    currentScore.setAttribute('style', 'color: red');
  }
}

function resetCurrentScore() {
  let currentScore = document.getElementById('currentScore');
  currentScore.setAttribute('value', 0);
  currentScore.setAttribute('style', 'color: black');
}

function checkBestScore() {
  let bestScore = document.getElementById('bestScore');
  let currentScore = document.getElementById('currentScore');

  if (bestScore.value == 0) {
    bestScore.setAttribute('value', currentScore.value)
  }

  if (currentScore.value <= bestScore.value) {
    bestScore.setAttribute('value', currentScore.value);
  }
}