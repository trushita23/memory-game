let cardList = [];
var halfcardList = [{
    name: 'anchor',
    image: 'anchor.svg',
    open: 0
  },
  {
    name: 'beach-ball',
    image: 'beach-ball.svg',
    open: 0
  },
  {
    name: 'cocktail',
    image: 'cocktail.svg',
    open: 0
  },
  {
    name: 'compass',
    image: 'compass.svg',
    open: 0
  },
  {
    name: 'flipper',
    image: 'flipper.svg',
    open: 0
  },
  {
    name: 'island',
    image: 'island.svg',
    open: 0
  },
  {
    name: 'kite',
    image: 'kite.svg',
    open: 0
  },
  {
    name: 'pamela',
    image: 'pamela.svg',
    open: 0
  },
];
// Duplicate cards for matching pairs

cardList = halfcardList.concat(halfcardList);
let totalCards = cardList.length;
let gameBoard = document.querySelector('ul.deck');
let button = document.querySelector('button');

displayCards(cardList);


function close(type)
{
  if(button.value === 'close')
    return; // yet to code

}
function play(type)
{
  if(button.value === 'play')
    displayCards(cardList);
}
/*
 * Display the cards on the page
 */
function displayCards(array) {

  // shuffle all the cards using shuffle functionality
  let displayCardList = shuffle(array);

  displayCardList.forEach(function(card) {
    let item = document.createElement('li');
    item.setAttribute('class', 'card');
    item.setAttribute('data-name', card.name);
    let image = document.createElement('img');
    image.setAttribute('src', '../img/' + card.image);
    image.setAttribute('class', 'image');
    // hide the cards
    image.classList.add('hide');
    item.appendChild(image);
    //item.style.backgroundImage ='url(../img/'+card.image+')';
    gameBoard.appendChild(item);
  });
}

/*
 *   - shuffle the list of cards using the provided "shuffle" method below
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

// keep count on maximum two cards to be opened.
let count = 0;
// event listener for a card when it is clicked
gameBoard.addEventListener('click', showCard);

/*
 * Display the card's symbol
 */
let openCards = [];
let matchedCards = [];

function showCard(event) {

  // to avoid matching the single card when clicked twice
  let selectedtarget = event.target.children[0];
  // cards that are matched should be in open state and no action should be taken on click of matched cards

  if (!selectedtarget.classList.contains('hide')) {
    return;
  }

  if (matchedCards.indexOf(event.target.dataset.name) !== -1) {
    return;
  }

  if (count < 2) {
    console.log(event.target.nodeName);
    if (event.target.nodeName === 'LI') {
      event.target.children[0].classList.toggle("hide");
      event.target.classList.toggle("open");
      openCards.push(event.target);
      count++;
    }
    if (count === 2) {
      timerFunc = (function() {
        isMatched(openCards);
      });
      setTimeout(timerFunc, 500);
    }
  }

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
        popUp.style.display=flex;
  }
}

// closePopUp(popUp);
// function closePopUp(popUp)
// {
//     popUp.style.display=none;
// }

function isMatched(openCards) {
  count = 0;
  let firstCard = openCards[0].dataset.name;
  let secondCard = openCards[1].dataset.name;
  if (firstCard === secondCard) {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');

    addMatchedCards(firstCard);
  } else {
    openCards[0].firstElementChild.classList.toggle("hide");
    openCards[1].firstElementChild.classList.toggle("hide");
    openCards[0].classList.toggle('open');
    openCards[1].classList.toggle('open');
  }
  removeCards();
  checkGameWon(totalCards);
}
