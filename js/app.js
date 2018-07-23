var halfcardList = [{
    name: 'anchor',
    image: 'anchor.svg'
  },
  {
    name: 'beach-ball',
    image: 'beach-ball.svg'
  },
  {
    name: 'cocktail',
    image: 'cocktail.svg'
  },
  {
    name: 'compass',
    image: 'compass.svg'
  },
  {
    name: 'flipper',
    image: 'flipper.svg'
  },
  {
    name: 'island',
    image: 'island.svg'
  },
  {
    name: 'kite',
    image: 'kite.svg'
  },
  {
    name: 'pamela',
    image: 'pamela.svg'
  },
];

// initialize game board.
let gameBoard = document.querySelector('ul.deck');

// Duplicate cards for matching pairs
let cardList = [];
cardList = halfcardList.concat(halfcardList);
let totalCards = cardList.length;

// fetch the DOM element
let buttons = document.querySelectorAll('.button');
let restart = document.querySelector('.restart');
let popUp = document.querySelector('.popUp__Container');
let moveSpan = document.querySelectorAll('.moves');
let stars = document.querySelectorAll('.stars');

// keep count on maximum two cards to be opened.
let count = 0;
let openCards = [];
let matchedCards = [];
let moves = 0;

//timer
let sec = 0;
let timer;

//audio elements
const successSound = document.getElementById('success');
const wonSound = document.getElementById('won-Sound');

// populate all cards on the game board.
displayCards(cardList);

// add addEventListener to buttons and cards
gameBoard.addEventListener('click', showCard);
buttons[0].addEventListener('click', play);
buttons[1].addEventListener('click', close);
restart.addEventListener('click', replay);


// Format timer in mm::ss
function timeFormat(val) {
  return val > 9 ? val : "0" + val;
}

function startTime() {
  timer = setInterval(function() {
    document.getElementById("secs").innerHTML = timeFormat(++sec % 60);
    document.getElementById("mins").innerHTML = timeFormat(parseInt(sec / 60, 10));
  }, 1000);
}

function rating() {
  let starNodes = [];
  stars.forEach(function(star) {
    starNodes = star.children;
    if (moves > 14 && moves < 17)
      starNodes[2].classList.add('brown__stars');

    else if (moves >= 17 && moves <= 22)
      starNodes[1].classList.add('brown__stars');

    else if (moves > 22)
      starNodes[0].classList.add('brown__stars');
  });
}


/**
 * @description Reset the game.
 */
function replay() {
  gameBoard.innerHTML = "";
  moveSpan[0].innerHTML = "0";
  matchedCards = [];
  moves = 0;
  sec = 0;
  document.getElementById("secs").innerHTML = timeFormat(++sec % 60);
  document.getElementById("mins").innerHTML = timeFormat(parseInt(sec / 60, 10));
  clearInterval(timer);
  refreshRating();
  displayCards(cardList);
}

/**
 * @description Refresh the star rating
 */

function refreshRating() {
  let starNodes = [];
  stars.forEach(function(star) {
    starNodes = star.children;
    starNodes[2].classList.remove('brown__stars');
    starNodes[1].classList.remove('brown__stars');
    starNodes[0].classList.remove('brown__stars');
  });
}

/**
 * @description Display the cards on the page
 */

function displayCards(array) {
  count = 0;
  // shuffle all the cards.
  let shuffleCardList = shuffle(array);
  // populate the game board with shuffled cards.
  populateCardsOnBoard(shuffleCardList);
  startTime();
}

/**
 *   @description shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/**
 * @description Populate cards on game board.
 */

function populateCardsOnBoard(cards) {
  cards.forEach(function(card) {

    // creating li element.
    let item = document.createElement('li');
    item.setAttribute('class', 'card');


    //creating div1 element. It will be child of li element
    let divBack = document.createElement('div');
    divBack.setAttribute('class', 'card__face');
    divBack.classList.add('card__face--back');

    //creating div2 element. It will be child of li element
    let divFront = document.createElement('div');
    divFront.setAttribute('class', 'card__face');
    divFront.classList.add('card__face--front');
    divFront.setAttribute('data-name', card.name);

    //appending div to li element.
    item.appendChild(divBack);
    item.appendChild(divFront);

    //creating image element to be content of div element
    let image = document.createElement('img');
    image.setAttribute('src', '../img/' + card.image);
    image.setAttribute('class', 'image');
    divBack.appendChild(image);
    gameBoard.appendChild(item);
  });
}

/**
 * @description Open only two cards at time and check if they match.Also check if the game is won.
 *
 */

function showCard(event) {
  if (event.target.nodeName === 'DIV') {
    let parentElement = event.target.parentNode;
    if (parentElement.classList.contains('is-flipped')) {
      return;
    }
    // Not more than two cards should be open at a time
    if (count < 2) {
      parentElement.classList.toggle('is-flipped');
      openCards.push(event.target);
      count++;
    }
    // check if two cards match
    if (count == 2) {
      moves++;
      moveSpan[0].innerHTML = moves;
      rating();
      timerFunc = (function() {
        isMatched(openCards);
      });
      setTimeout(timerFunc, 500);
    }
  }
}

/**
 * @description Check if the two currently open cards are matching.
 *
 */

function isMatched(openCards) {
  let firstCard = openCards[0].dataset.name;
  let secondCard = openCards[1].dataset.name;
  if (firstCard === secondCard) {
    successSound.play();
    openCards[0].parentNode.firstChild.classList.add('match');
    openCards[1].parentNode.firstChild.classList.add('match');
    addMatchedCards(firstCard);
  } else {
    openCards[0].parentNode.classList.toggle('is-flipped');
    openCards[1].parentNode.classList.toggle('is-flipped');

  }
  removeCards();
  checkGameWon(totalCards);
  count = 0;
}


function addMatchedCards(name) {
  matchedCards.push(name);
}


function removeCards() {
  openCards.splice(0, 2);
}


function checkGameWon(totalCards) {
  // matchedCards array is storing one card for each matched pairs hence the array length of it  will be half the total cards.
  if (matchedCards.length === totalCards / 2) {
    displayResults();
    wonSound.play();
    popUp.classList.toggle('hide');
  }
}

function displayResults() {
  // Display time taken
  document.getElementById("res_secs").innerHTML = timeFormat(sec % 60);
  document.getElementById("res_mins").innerHTML = timeFormat(parseInt(sec / 60, 10)) + ":";
  clearInterval(timer);

  //Display Moves
  moveSpan[1].innerHTML = moves;

  // Display message
  let msg = document.querySelector('.scoreCard.msg');
  if (moves < 14)
    msg.innerHTML = "AWESOME!!";
  else if (moves > 14 && moves < 17)
    msg.innerHTML = "GOOD!!";
  else
    msg.innerHTML = "Try Again!!";
}

function close() {
  popUp.classList.toggle('hide');
}

/**
 * @description  Win game pop up play button
 */

function play() {
  close();
  replay();
}
