// variables
const keyboardContainer = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startScreenOverlay = document.getElementById('overlay');
const startScreenOverlayHeading = document.querySelector('#overlay h2');
const phraseUL = document.querySelector('#phrase ul');
let letterMissed = 0;
const playerTry = document.querySelector('#scoreboard ol ');



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
  startScreenOverlay.style.left = '100%';
  startScreenOverlayHeading.style.opacity = '0';
  startGameButton.style.opacity = '0';
});

// function that Generats a random phrase and then splits the lettes randomly
const getRandomPhraseAsArray  = (arr) =>{
const randomNum = (Math.floor(Math.random() * phrases.length));
return arr[randomNum].split('');

}

// function that appends the characters of a phrase as a list item in a UL
const randomPhrase = getRandomPhraseAsArray(phrases);
const addPhraseToDisplay = (arr) =>{
  for (let i=0; i < randomPhrase.length; i++){
    let li = document.createElement('li');
    li.innerHTML = randomPhrase[i];
    if (li.textContent !== " "){
      li.className = "letter";
    }
    else{
      li.textContent = ' '
    }
    phraseUL.append(li);
}
}

// const randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);

// Checkletter function

// This function checks if the textContent of the keyboard letters is the same as the letters in the phrase

const checkLetter = (button) =>{
  let letters = document.getElementsByClassName('letter');
  for(let i =0; i < letters.length; i++){
    if (letters[i].textContent.toUpperCase() === button.textContent.toUpperCase() ){
      letters[i].classList.add('show');
    } else {
      letters = null;
    }
  }
  return letters
}


// Event listener for the display keyboard. This calls the checkletter function

keyboardContainer.addEventListener('click', (e)=>{
  if (e.target.tagName = 'BUTTON') {
    const letterFound  = checkLetter(e.target);
    if (letterFound === null){
      playerTry.firstElementChild.remove();
      letterMissed = +1;
      console.log(letterMissed);
    }
  }
});
