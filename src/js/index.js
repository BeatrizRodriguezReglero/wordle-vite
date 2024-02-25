import { buttonElement, formWordElement } from './dom';
import { functionFormWord, playAgain } from './function-wordle';

buttonElement.addEventListener('click', playAgain);

formWordElement.addEventListener('submit', functionFormWord);
