import { letterColors, numberOfTries, words } from './constants';
import {
	buttonElement,
	correctWordElement,
	formWordElement,
	gameBoardElement,
	inputElement,
	lengthErrorElement
} from './dom';

let gameBoardRow = 0;

let secretWord;
let userWord;
let wordToCheck;

let haveYouWon = false;

const createGameBoard = () => {
	const fragment = document.createDocumentFragment();
	for (let index = 0; index < numberOfTries; index++) {
		const newBoxesRow = document.createElement('div');
		newBoxesRow.classList.add('boxes');

		for (let j = 0; j < secretWord.length; j++) {
			const newBoxesColumn = document.createElement('span');

			newBoxesColumn.classList.add('letter');
			newBoxesRow.append(newBoxesColumn);
		}
		fragment.append(newBoxesRow);
	}
	gameBoardElement.append(fragment);
};
const generateRandomWord = () => {
	const randomNumber = Math.floor(Math.random() * words.length);
	secretWord = words[randomNumber];
	wordToCheck = secretWord;
	console.log(secretWord);
	createGameBoard();
};

const changeCurrentRow = () => {
	console.log('Changing Row:', gameBoardRow);
	gameBoardRow++;
};

const replaceLetter = userLetter => {
	wordToCheck = wordToCheck.replace(userLetter, '-');
};

const paintLetter = (color, index) => {
	const gameBoardSpan = gameBoardElement.children[gameBoardRow].children[index];
	gameBoardSpan.classList.add(color);
};

const checkPresentAndIncorrectLetters = () => {
	wordToCheck = secretWord;
	console.log(wordToCheck);
	for (let index = 0; index < userWord.length; index++) {
		const userLetter = userWord[index];
		const gameBoardSpan =
			gameBoardElement.children[gameBoardRow].children[index];

		if (
			!gameBoardSpan.classList.contains(letterColors.correct) &&
			wordToCheck.includes(userLetter)
		) {
			replaceLetter(userLetter);
			console.log(wordToCheck);
			paintLetter(letterColors.present, index);
		} else if (!gameBoardSpan.classList.contains(letterColors.correct)) {
			paintLetter(letterColors.incorrect, index);
		}
	}

	changeCurrentRow();
};

const checkCorrectLetters = () => {
	console.log('Checking Correct Letters');
	for (let index = 0; index < userWord.length; index++) {
		const userLetter = userWord[index];
		const secretLetter = secretWord[index];
		if (userLetter === secretLetter) {
			replaceLetter(userLetter);
			paintLetter(letterColors.correct, index);
		}
	}
	checkPresentAndIncorrectLetters();
};
const printAllCells = () => {
	for (let index = 0; index < userWord.length; index++) {
		paintLetter(letterColors.correct, index);
	}
};

const checkWin = () => {
	console.log('Checking Win');
	haveYouWon = userWord === secretWord;
	if (haveYouWon) {
		console.log('You Won!');
		correctWordElement.classList.remove('hide');
		correctWordElement.classList.add('correct-word');
		correctWordElement.textContent = 'Has acertado!';
		buttonElement.classList.remove('hide');
		formWordElement.classList.add('hide');
		printAllCells();
	} else {
		checkCorrectLetters();
	}
};

const printWord = () => {
	console.log(userWord);
	console.log('Printing Word:', userWord);
	for (let i = 0; i < userWord.length; i++) {
		console.log('Setting Letter:', userWord[i].toUpperCase());
		gameBoardElement.children[gameBoardRow].children[i].textContent =
			userWord[i].toUpperCase();
	}

	checkWin();
};

const startGame = () => {
	generateRandomWord();
	console.log(secretWord);
};
startGame();

const checkLengthWord = () => {
	const userWord = inputElement.value;

	if (userWord.length < secretWord.length) {
		lengthErrorElement.classList.add('length-error');
		lengthErrorElement.textContent = 'La palabra es demasiado corta';
	} else if (userWord.length > secretWord.length) {
		lengthErrorElement.classList.add('length-error');
		lengthErrorElement.textContent = 'La palabra es demasiado larga';
	} else {
		lengthErrorElement.textContent = '';
		lengthErrorElement.classList.remove('length-error');
		printWord();
	}
};
const functionFormWord = event => {
	event.preventDefault();
	userWord = event.target.word.value;

	checkLengthWord(event.target.input.value);

	event.target.reset();
};
export { createGameBoard, functionFormWord };
