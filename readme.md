# Multi-Themed Browser Tic-Tac-Toe
`HTML` `CSS` `JavaScript`
----
## Want to jump straight in?
Play the game at https://elperez.github.io/tic-tac-toe/.
----
## Table of contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [How to play](#how-to-play)
4. [The nerdy details](#the-nerdy-details)
5. [Conclusions and lessons learnt](#conclusions-and-lessons-learnt)

## Introduction
This is a browser version of a very familiar game (if you don't know it, ask Wikipedia (or the person beside you)).

While not exactly an MMORPG, this game will provide countless hours of fun, and I'm sure you will appreciate the replay value as much as I did making the game.

Have more fun by choosing you custom theme (each having their own styles and sounds).

Finding the game easy>? Add difficulty using move timers. Beware, not making a move within the timeframe cause the game to make a move for you!

## Features
1. Prompting of user names.
2. Player turn duration using selected timer
3. Randomly generated move at the end of selected timer
3. Changeable game themes (each has their own style background, and sounds)

## How to play
1. Click on the New Game button and enter player 1 and player 2 names.
2. The game start's with player 1's turn with the symbol 'O'. Note that player turn information is in the Game header
3. To change game difficulty, click on the timer dropdown box and select a number of player turn duration. 3 seconds, is the fastest and more difficult one.
4. Themes (e.g. pastel and winter) can also be changed by clicking on the theme dropdown box.

## The nerdy details

### The board
```
        |        |
 (0, 0) | (0, 1) | (0, 2)
  c1    |   c2   |   c3
--------------------------
        |        |
 (1, 0) | (1, 1) | (1, 2)
   c4   |   c5   |   c6
--------------------------
        |        |
 (2, 0) | (2, 1) | (2, 2)
   c7   |   c8   |   c9
```

Internally, the board is represented as an array of cells with each three elements in the sub-array represents a cell/tile object in the same row.

Example: `board[0][2]` refers to cell `(2)` and `board[1][2]` refers to cell `(5)`

***

Externally, each tile is represented by `td`s, and dynamically created on page load.

This dynamic creation allows the game to be easily extended to bigger board sizes in the future (because 6 x 6 Tic-Tac-Toe is so much more fun), and makes the HTML file cleaner.

DOM methods are used to query, traverse and manipulate the DOM.

### Detecting wins

A 2-D array of combinations was used in checking if there is a winner to represent the following win combinations.
`winCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8]]`

* A function `checkWinner(pattern)` that, given the pattern (or token), would check the `cellList` array against the `winCombinations` array for the winning combinations. For example, when a `winCombination` of [0,1,2] (c0, c1, c2 of the board) have the same pattern/token then checkWinner returns true.

* This function would be called every time a move was made; the token/pattern will be passed to the function, and the result returned.

## Future work
* Implement a cleaner way to update the UI (maybe make use of the `view` properties)

* Implement a cleaner way to reset the game

* Allow game customisable options, board size, game rounds, name & profiles etc.

* Allow players to customise their token (X, O, name, picture, avatar etc.)

* Use **LocalStorage** or **SessionStorage** to persist data locally to allow games to continue after page refresh or loss of internet connectivity

* Add the ability to play against a perfect computer player

* Add some creative twists

* Make it look nicer

## Conclusions and lessons learnt
Phew! Making an interactive game as seemingly simple as Tic-Tac-Toe was surprisingly challenging.

A mobile-first approach is easier to start with. site design and layout are better to be firstly optimised for small screens, and then progressively optimised for larger screens.
