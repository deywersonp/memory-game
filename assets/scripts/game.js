let game = {

  techs: [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react',
  ],

  cards: null,

  lockMode: false,
  firstCard: null,
  secondCard: null,

  setCard: function (id) {

    let card = this.cards.filter(card => card.id == id)[0];
    console.log(card);
    if (card.flipped || this.lockMode) {
      return false;
    }

    if (this.firstCard === null) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }

  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon == this.secondCard.icon;
  },

  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  checkGameOver: function () {
    return this.cards.filter(card => !card.flipped).length == 0;
  },


  createCardsFromTechs: function () {
    this.cards = [];

    this.techs.forEach((tech) => {
      this.cards.push(this.createPairFromTech(tech));
    })

    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    console.log(this.cards);
    return this.cards;
  },

  createPairFromTech: function (tech) {

    return [{
      id: this.createIdWithTech(tech),
      icon: tech,
      flipped: false,
    }, {
      id: this.createIdWithTech(tech),
      icon: tech,
      flipped: false,
    }]
  },

  createIdWithTech: function (tech) {
    return tech = parseInt(Math.random() * 1000);
  },


  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    }
  }
}

