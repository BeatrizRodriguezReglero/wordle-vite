import { formWordElement } from './dom';
import { functionFormWord } from './function-wordle';

// const playAgain = () => {
//   formWordElement.classList.remove('hide');
//   buttonElement.classList.add('hide');
//   correctWordElement.classList.add('hide');
//   gameBoardRow = 0;
//   userWord = '';
//   haveYouWon = false;
//   for (let i = 0; i < numberOfTries; i++) {
//     const gameBoardRowElement = gameBoardElement.children[i];
//     gameBoardRowElement.innerHTML = '';
//     gameBoardRowElement.className = 'boxes';
//   }
// };

// buttonElement.addEventListener('click', playAgain);

formWordElement.addEventListener('submit', functionFormWord);
