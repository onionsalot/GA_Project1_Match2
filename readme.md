# Match Two/Three Card Game

  

### What is this game?
---

Match two is a memory game where after briefly being shown a handfull of cards, you're asked to locate the matches once the cards are flipped over. You earn points by getting a match, and lose points by failing to match. The basic premise is very simple!

Alongside of the match two format, there is also a match three which will be significantly harder.

[PLAY THE GAME](https://onionsalot.github.io/GA_Project1_Match2/)
---
  
### Technologies Used:
---
- HTML ( Frontend basic interface)
- CSS ( + Animate.style for basic animations)
- Javascript (DOM manipulation, basic game functionality)

---

### Next Steps (ICEBOX FEATURES):
---
- ~~Allow MATCH THREE.~~
- ~~Player Theme choice.~~
- Making page look less ugly (***ongoing***)
- Earn fake internet monies for stage completion.
- Using fake internet monies to buy more themes.
- Mobile layout support.
- Persistent database of high scores to display in the GAMEOVER screen (atm it is very empty and lifeless.)
- ---
### Screenshots:
---
![pic1](/screenshots/1.png)
![pic2](/screenshots/2.png)
![pic3](/screenshots/3.png)

---
### Some Technical Notes:
- Z-index was used to replace left grid for start> main game> gameover transition.
- Use of TEXT-BASED buttons did not allow me to use `.disabled = true` as it is a method of BUTTONS only. Note to future self; buttons are good, just style them and stop being lazy. Instead of repurposing everything to buttons, I just removed the click listener when I wanted to disable a TEXT-BASED button.
- Player choice is stored in the appropriately named `choice1 choice2 choice3` and reset upon wrong or right guesses.
- `renderBoard()` functionality is to first create and load each `div` onto the rows(determined by mode+6) then once they are all loaded, `tableCells = document.querySelectorAll(".table_cell");` will grab them and await further instructions. `displayedCardList` will grab two or three of each item in the `cardList` array and shuffle them after. Once shuffle is done, the newly reshuffled `displayedCardList` will be placed in each newly created `tableCells`.
- Comparison functionality was simple;
	- First load new array of objects of double or triple loaded cards into global scoped `displayedCardList` doubling as the array of objects used to show pictures for the cards.
	- `choice1 choice2 choice3` are IDs that are placed on every single newly generated card on the screen. When user clicks one, ID is stored in those choices.
	- Using `displayedCardList[choiceX]` will get the item in that cell that was closed and so comparing the two or three choices would come down to that.
