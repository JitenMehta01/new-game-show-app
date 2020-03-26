// variables
const keyboardContainer = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startScreenOverlay = document.getElementById('overlay');
const startScreenOverlayHeading = document.querySelector('#overlay h2');
const phraseUL = document.querySelector('#phrase ul');
let letterMissed = 0;
const playerTry = document.querySelectorAll('#scoreboard ol li');
const startGameButton = document.querySelector('#overlay a');


// array of phrases
const phrases = ['In a pickle',
'Silence is golden',
'On the edge of your seat',
'Rolling out the red carpert',
'Finger painting  '
]




// function that Generats a random phrase and then splits the lettes randomly
const getRandomPhraseAsArray  = (arr) =>{
const randomNum = (Math.floor(Math.random() * arr.length));
return arr[randomNum].split('');

}

// function that appends the characters of a phrase as a list item in a UL
const addPhraseToDisplay = (arr) => {
	const phrase = getRandomPhraseAsArray(phrases);
	for (let i = 0; i < arr.length; i++) {
		let li = document.createElement('li');
		li.innerHTML = arr[i];
		if (li.textContent !== " ") {
			li.className = "letter";
		}
		else {
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


			for (let i =0; i <= 3; i++){ // this generates 4 divs and adds classes to each div depending on its index
				const div = document.createElement('div');
				matchFound.appendChild(div);
				if (i === 0){
					div.className = 'bar top';
				}
				else if (i === 1){
					div.className = 'bar right delay';
				}
				else if (i === 2){
					div.className = 'bar bottom delay';
				}
				else{
					div.className = 'bar left';
				}
			}

			if(matchFound.className === 'show'){
				matchFound.style.boxShadow = 'inset 100px 0 0 0 #76CE82;'
			}
    }

  }
  return matchFound;
}


// This function checks whether the player has won or lost
// in each if statement there is a DOM manipulation to the overaly
// this also calls the reset function

const checkWin = () =>{
  const letter = document.querySelectorAll('.letter');
  const lishow = document.querySelectorAll('.show');
  const heading = startScreenOverlay.querySelector('h2');

  if (letter.length === lishow.length){
    startScreenOverlay.className = 'win';
    heading.textContent = 'Well Done. You\'ve guessed the correct Phrase';
    startGameButton.textContent = 'Play Again';
    startScreenOverlay.style.display = 'flex';
		startScreenOverlay.style.height = '100vh';
	  setTimeout(function(){
	    startGameButton.style.opacity = '1';
	    startScreenOverlayHeading.style.opacity = '1' }
	    , 500);
		phraseUL.style.opacity = '0';


  } else if (letterMissed >= 5) {
    startScreenOverlay.className = 'lose';
    heading.textContent = 'Oh no! You\'ve ran out of guesses. Press the reset button to try again';
    startGameButton.textContent = 'Play Again';
    startScreenOverlay.style.display = 'flex';
		startScreenOverlay.style.height = '100vh';
	  setTimeout(function(){
	    startGameButton.style.opacity = '1';
	    startScreenOverlayHeading.style.opacity = '1' }
	    , 500);
		phraseUL.style.opacity = '0';
  }
  reset();
}


// This animates the start of the overlay.
// The win and lose overlay's transitions can be found in the checkWin function.

startGameButton.addEventListener('click', (e) =>{
  if (startScreenOverlay.className = 'start'){
    startGameButton.style.opacity = '0';
    startScreenOverlayHeading.style.opacity = '0'
    setTimeout(function(){
      startScreenOverlay.style.height = '0vh'; }
      , 500);
  }
});


// rest the Game
const reset = () =>{
  startScreenOverlay.addEventListener('click', (e) => {
      if (e.target.textContent === 'Play Again'){
        const phraseremove = phraseUL.querySelectorAll('li');
        for(let i =0; i < phraseremove.length; i++){
          phraseUL.removeChild(phraseremove[i]);
        }

        phraseUL.innerHTML = '';
        const randomPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(randomPhrase);
        letterMissed = 0;
        for(let i =0; i < playerTry.length; i++){
          playerTry[i].firstElementChild.src = 'images/liveHeart.png';
        }
        const keys = keyboardContainer.getElementsByTagName('button');
        for (let i =0; i < keys.length; i++){
          keys[i].className = '';
          keys[i].disabled = '';
        }
        startScreenOverlay.className = '';
				phraseUL.style.opacity = '1';
      }
  });
}


// Event Listener for the keyboard buttons
keyboardContainer.addEventListener('click', (e) => {
  const button = e.target
  if (button.tagName === 'BUTTON') {
    button.classList.add('chosen');
    if(button.className = 'chosen'){
      button.disabled = 'true';
    }
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
