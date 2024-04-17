# Wordle

This is implementation of popular game wordle in HTML, CSS, and JavaScript.

Everyday a new word would be generated and that is going to be the answer of the wordle. This word is generated using `https://words.dev-apis.com/word-of-the-day` and the words are validated using `https://words.dev-apis.com/validate-word`.

This project uses GET command from the api endpoint for getting the random generated word. Guesses allowed should be valid words. Valid words are confirmed from the api using POST command.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

To install the Wordle application, follow these steps:

1. Clone the repository to your local machine.
2. Open the terminal and navigate to the project directory.
3. Launch the `index.html` file in your web browser.

Now you have successfully installed the Wordle application and it is ready to use.

## Usage

To play the Wordle game, follow these steps:

1. Open the Wordle application in your web browser.
2. The game will start with a random five-letter word.
3. Guess the word by entering your guess in the input field.
4. After each guess, you will receive feedback on your guess.
   - A correct letter in the correct position will be marked with a green border.
   - A correct letter in the wrong position will be marked with a yellow border.
   - An incorrect letter will be marked with a red border.
5. Keep guessing until you correctly guess the word or run out of attempts.
6. If you run out of attempts, the correct word will be revealed.
7. You can start a new game by clicking the "New Game" button.

Enjoy playing Wordle and have fun!

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the [LICENSE](./LICENSE) file for more information.
