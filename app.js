// variables
const keyboardContainer = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startScreenOverlay = document.getElementById('overlay');
const startScreenOverlayHeading = document.querySelector('#overlay h2');
const phraseUL = document.querySelector('#phrase ul');
let letterMissed = 0;
const playerTry = document.querySelectorAll('#scoreboard ol li');



let missed = 0;

const startGameButton = document.querySelector('#overlay a');


// array of phrases

const phrases = ['In a pickle',
'Silence is golden',
'On the edge of your seat',
'Rolling out the red carpert',
'Finger painting  '
]



// Start Game button slide left effect

startGameButton.addEventListener('click', () =>{
  startScreenOverlay.style.display = 'none';
});

// function that Generats a random phrase and then splits the lettes randomly
const getRandomPhraseAsArray  = (arr) =>{
const randomNum = (Math.floor(Math.random() * phrases.length));
return arr[randomNum].split('');

}

// function that appends the characters of a phrase as a list item in a UL

const addPhraseToDisplay = (arr) =>{
  for (let i=0; i < arr.length; i++){
    let li = document.createElement('li');
    li.innerHTML = randomPhrase[i];
    if (li.textContent !== " "){
      li.className = "letter";
    }
    else{
      li.classList.add('space');
    }
    phraseUL.append(li);
}
}

// const randomPhrase = getRandomPhraseAsArray(phrases);
const randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);

// Checkletter function

// This function checks if the textContent of the keyboard letters is the same as the letters in the phrase

const checkLetter = (button) =>{
  const letter = document.getElementsByClassName('letter');
  let matchFound = null;
  for(let i =0; i < letter.length; i++){
    if (letter[i].textContent.toUpperCase() === button.textContent.toUpperCase() ){
      matchFound = letter[i];
      matchFound.classList.add('show');
    }
  }
  return matchFound;
}


// Event listener for the display keyboard. This calls the checkletter function



const checkWin = () =>{
  const letter = document.querySelectorAll('.letter');
  const lishow = document.querySelectorAll('.show');
  const heading = startScreenOverlay.querySelector('h2');

  if (letter.length === lishow.length){
    startScreenOverlay.className = 'win';
    heading.textContent = 'Well Done. You\'ve guessed the correct Phrase';
    startScreenOverlay.style.display = 'flex';

  } else if (letterMissed >= 5) {
    startScreenOverlay.className = 'lose';
    heading.textContent = 'Oh no! You\'ve ran out of geusses. Press the reset button to try again';
    startScreenOverlay.style.display = 'flex';
  }
}

keyboardContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add('chosen');
    const letterFound  = checkLetter(e.target);
    if (letterFound === null){
      letterMissed += 1;
      for (i = 4; i >=0; i-= 1){
        if(playerTry[i].firstElementChild.src.includes('images/liveHeart.png')) {
                playerTry[i].firstElementChild.src = 'images/lostHeart.png';
                break;
            }
      }
    }
  }
  checkWin();
});
