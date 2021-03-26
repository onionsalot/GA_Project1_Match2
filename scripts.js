/*----- constants -----*/
const cardList = {
    0: [{ 'name': 'Pomeranian', 'img': '<img class="front" src="cards/dogs/pomeranian.png">'},
        { 'name': 'Pomsky', 'img': '<img class="front" src="cards/dogs/pomsky.png">'},
        { 'name': 'Golden Retriever', 'img': '<img class="front" src="cards/dogs/goldenretriever.png">'},
        { 'name': 'Corgi', 'img': '<img class="front" src="cards/dogs/corgi.png">'},
        { 'name': 'Dachshund', 'img': '<img class="front" src="cards/dogs/dachshund.png">'},
        { 'name': 'Beagle', 'img': '<img class="front" src="cards/dogs/beagle.png">'},
        { 'name': 'Siberian Husky', 'img': '<img class="front" src="cards/dogs/husky.png">'},
        { 'name': 'Shiba Inu', 'img': '<img class="front" src="cards/dogs/shiba.png">'},
        { 'name': 'Pitbull', 'img': '<img class="front" src="cards/dogs/pitbull.png">'},
        { 'name': 'Australian Shepherd', 'img': '<img class="front" src="cards/dogs/australianshepherd.png">'},
        { 'name': 'German Shepherd', 'img': '<img class="front" src="cards/dogs/germanshepherd.png">'},
        { 'name': 'Poodle', 'img': '<img class="front" src="cards/dogs/poodle.png">'},
        { 'name': 'Pug', 'img': '<img class="front" src="cards/dogs/pug.png">'}],

    1: [{ 'name': 'Asuna', 'img': '<img class="front" src="cards/anime/asuna.png">'},
        { 'name': 'Saitama', 'img': '<img class="front" src="cards/anime/saitama.png">'},
        { 'name': 'Aqua', 'img': '<img class="front" src="cards/anime/aqua.png">'},
        { 'name': 'Luffy', 'img': '<img class="front" src="cards/anime/luffy.png">'},
        { 'name': 'Zero Two', 'img': '<img class="front" src="cards/anime/zerotwo.png">'},
        { 'name': 'Levi', 'img': '<img class="front" src="cards/anime/levi.png">'},
        { 'name': 'Mikasa', 'img': '<img class="front" src="cards/anime/mikasa.png">'},
        { 'name': 'Goku', 'img': '<img class="front" src="cards/anime/goku.png">'},
        { 'name': 'Megumin', 'img': '<img class="front" src="cards/anime/megumin.png">'},
        { 'name': 'Naruto', 'img': '<img class="front" src="cards/anime/naruto.png">'},
        { 'name': 'L', 'img': '<img class="front" src="cards/anime/L.png">'},
        { 'name': 'Emilia', 'img': '<img class="front" src="cards/anime/emilia.png">'},
        { 'name': 'Edward', 'img': '<img class="front" src="cards/anime/edward.png">'}],

    2: [{ 'name': 'Donut', 'img': '<img class="front" src="cards/food/donut.png">'},
        { 'name': 'Fries', 'img': '<img class="front" src="cards/food/fries.png">'},
        { 'name': 'Hamburger', 'img': '<img class="front" src="cards/food/hamburger.png">'},
        { 'name': 'Hotdogs', 'img': '<img class="front" src="cards/food/hotdogs.png">'},
        { 'name': 'Ice Cream', 'img': '<img class="front" src="cards/food/icecream.png">'},
        { 'name': 'Pizza', 'img': '<img class="front" src="cards/food/pizza.png">'},
        { 'name': 'Ramen', 'img': '<img class="front" src="cards/food/ramen.png">'},
        { 'name': 'Salad', 'img': '<img class="front" src="cards/food/salad.png">'},
        { 'name': 'Spaghetti', 'img': '<img class="front" src="cards/food/spaghetti.png">'},
        { 'name': 'Steak', 'img': '<img class="front" src="cards/food/steak.png">'},
        { 'name': 'Sushi', 'img': '<img class="front" src="cards/food/sushi.png">'},
        { 'name': 'Taco', 'img': '<img class="front" src="cards/food/taco.png">'},
        { 'name': 'Wings', 'img': '<img class="front" src="cards/food/wings.png">'}]
};

const stageToCells = {
  // STAGE: [p2CELLS, p3CELLS, p2MATCHES, p3MATCHES]
  1: [8, 6, 4, 2],
  2: [10, 9, 5, 3],
  3: [12, 12, 6, 4],
  4: [14, 15, 7, 5],
  5: [16, 18, 8, 6],
  6: [18, 21, 9, 7],
  7: [20, 24, 10, 8],
  8: [22, 27, 11, 9],
  9: [24, 30, 12, 10],
  10: [26, 33, 13, 11],
};

let displayedCardList = [];
const imgLinks = [];
/*----- app's state (variables) -----*/
let stage, score, lives, matchedCount, currentRowPlacement;
let mode = 0;
let theme = "dogs";
let choice1, choice2, choice3;
let timeOut, currentTime;
/*----- cached element references -----*/
const stageEl = document.querySelector(".stage");
const scoreEl = document.querySelector(".score");
const livesEl = document.querySelector(".lives");
const modeEl = document.querySelector(".mode");
const themeEl = document.querySelector(".theme");
const table = document.getElementsByClassName("table");
const startButton = document.querySelector(".startB");
const nextButton = document.querySelector(".next_button");
let tableCells; // Initialized, but not rendered
const tableRows = document.querySelectorAll(".row");
const countdown = document.querySelector("#countdown");
const openingScreen = document.querySelector(".opening");
const gameoverScreen = document.querySelector(".gameover");
const pick2 = document.querySelector(".pick2");
const pick3 = document.querySelector(".pick3");
const themeSelection = document.getElementById("theme_selection");
const wallpaperSelection = document.querySelector("main.left_box");
const restart = document.querySelector(".restart");
/*----- event listeners -----*/
document.querySelector(".table").addEventListener("click", clickCard);
startButton.addEventListener("click", initiateGame);
nextButton.addEventListener("click", initiateGame);
pick2.addEventListener("click", pickMode);
pick3.addEventListener("click", pickMode);
restart.addEventListener("click", endGame);
/*----- functions -----*/
function initiateGame() {
  if (stage === undefined) {
    animateCSS(".startB", "bounceOut");
    stage = 1;
    score = 0;
    lives = 20;
    theme = themeSelection.options[themeSelection.selectedIndex].text;
    matchedCount = 0;
    currentRowPlacement = 0;
    if (themeSelection.value === "0") {
      wallpaperSelection.classList.add("dogback");
    } else if (themeSelection.value == "1") {
      wallpaperSelection.classList.add("animeback");
    } else {
      wallpaperSelection.classList.add("foodback");
    }
  } else {
    stage++;
    matchedCount = 0;
    currentRowPlacement = 0;
    removeBoard();
    document.querySelector(".table").addEventListener("click", clickCard);
  }

  if (stage > 10) {
    gameOver();
    document.querySelector(".table").removeEventListener("click", clickCard);
  } else {
    currentTime = 60;
    renderElements();
    countdownTimer();
  }
  nextButton.style.opacity = "0";
  nextButton.disabled = true;
}



function clickCard(clicked) {
  const idClicked = clicked.target.parentNode.id;
  if (
    clicked.target.tagName !== "IMG" ||
    clicked.target.classList.contains("front")
  ) {
    return;
  } else {
    clicked.target.parentNode.style.removeProperty("transform");
    if (mode === 0) {
      if (choice1 === undefined) {
        choice1 = idClicked;
      } else {
        clicked.target.parentNode.style.removeProperty("transform");
        choice2 = idClicked;
        checkMatch();
      }
    } else {
      if (choice1 === undefined) {
        choice1 = idClicked;
      } else if (choice2 === undefined) {
        choice2 = idClicked;
      } else {
        clicked.target.parentNode.style.removeProperty("transform");
        choice3 = idClicked;
        checkMatch();
      }
    }
  }
}



function checkMatch() {
  document.querySelector(".table").removeEventListener("click", clickCard);
  if (mode === 0) {
    if (displayedCardList[choice1] === displayedCardList[choice2]) {
      choice1 = undefined;
      choice2 = undefined;
      score += 1000;
      renderElements();
      matchedCount++;
      if (stageToCells[stage][2] === matchedCount) {
        nextButton.style.opacity = "1";
        nextButton.disabled = false;
        clearInterval(timeOut);
      } else {
        document.querySelector(".table").addEventListener("click", clickCard);
      }
    } else {
      setTimeout(function () {
        tableCells[choice1].style.transform = "rotateY(180deg)";
        choice1 = undefined;
        tableCells[choice2].style.transform = "rotateY(180deg)";
        choice2 = undefined;
        score -= 300;
        lives--;
        renderElements();
        if (lives === 0) {
          gameOver();
        } else {
          document.querySelector(".table").addEventListener("click", clickCard);
        }
      }, 1000);
    }
  } else {
    if (
      displayedCardList[choice1] === displayedCardList[choice2] &&
      displayedCardList[choice1] === displayedCardList[choice3]
    ) {
      choice1 = undefined;
      choice2 = undefined;
      choice3 = undefined;
      score += 2000;
      renderElements();
      matchedCount++;
      if (stageToCells[stage][3] === matchedCount) {
        nextButton.style.opacity = "1";
        nextButton.disabled = false;
        clearInterval(timeOut);
      } else {
        document.querySelector(".table").addEventListener("click", clickCard);
      }
    } else {
      setTimeout(function () {
        tableCells[choice1].style.transform = "rotateY(180deg)";
        choice1 = undefined;
        tableCells[choice2].style.transform = "rotateY(180deg)";
        choice2 = undefined;
        tableCells[choice3].style.transform = "rotateY(180deg)";
        choice3 = undefined;
        score -= 300;
        lives--;
        renderElements();
        if (lives === 0) {
          gameOver();
        } else {
          document.querySelector(".table").addEventListener("click", clickCard);
        }
      }, 1000);
    }
  }
}



function pickMode(choice) {
  if (choice.target.classList.contains("pick2")) {
    pick3.classList.remove("picked");
    pick2.classList.add("picked");
    mode = 0;
  } else {
    pick2.classList.remove("picked");
    pick3.classList.add("picked");
    mode = 1;
  }
  renderElements();
}



function renderElements() {
  if (livesEl.innerHTML != lives) {
    livesEl.style.color = "red";
    animateCSS(".lives", "flash").then((message) => {
      livesEl.style.color = "black";
    });
  }
  stageEl.textContent = stage;
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  modeEl.textContent = mode + 2;
  themeEl.textContent = theme;
}



function renderBoard() {
  openingScreen.style.setProperty("z-index", "-1");
  gameoverScreen.style.setProperty("z-index", "-1");

  for (let i = 0; i < stageToCells[stage][mode]; i++) {
    const createDiv = document.createElement("div");
    createDiv.setAttribute("class", "table_cell");
    createDiv.setAttribute("id", i);
    tableRows[currentRowPlacement].appendChild(createDiv);
    if (tableRows[currentRowPlacement].childElementCount === mode + 6) {
      currentRowPlacement++;
    }
  }

  tableCells = document.querySelectorAll(".table_cell");
  displayedCardList = [];
  if (mode === 0) {
    for (let i = 0; i < stageToCells[stage][mode] / 2; i++) {
      displayedCardList.push(cardList[themeSelection.value][i]);
      displayedCardList.push(cardList[themeSelection.value][i]);
    }
  } else {
    for (let i = 0; i < stageToCells[stage][mode] / 3; i++) {
      displayedCardList.push(cardList[themeSelection.value][i]);
      displayedCardList.push(cardList[themeSelection.value][i]);
      displayedCardList.push(cardList[themeSelection.value][i]);
    }
  }

  displayedCardList = displayedCardList.sort(() => Math.random() - 0.5);
  for (let i = 0; i < tableCells.length; i++) {
    tableCells[i].innerHTML = `${displayedCardList[i].img}
        <img class="back" src="cards/dogs/back.png">`;
  }
}



function removeBoard() {
  tableRows.forEach((row) => {
    while (row.firstChild) {
      row.removeChild(row.firstChild);
    }
  });
  countdown.innerHTML = "";
}



function countdownTimer() {
  restart.removeEventListener("click", endGame);
  setTimeout(function () {
    renderBoard();
  }, 1000);
  setTimeout(function () {
    countdown.innerHTML = "3";
    animateCSS("#countdown", "bounceIn");
  }, 2000);
  setTimeout(function () {
    countdown.innerHTML = "2";
    animateCSS("#countdown", "bounceIn");
  }, 3000);
  setTimeout(function () {
    countdown.innerHTML = "1";
    animateCSS("#countdown", "bounceIn");
  }, 4000);
  setTimeout(function () {
    countdown.innerHTML = "";
  }, 5000);
  setTimeout(function () {
    tableCells.forEach((cell) => {
      cell.style.transform = "rotateY(180deg)";
    });
    timeOut = setInterval(timeOutTimer, 1000);
    restart.addEventListener("click", endGame);
  }, 5000);
}



function timeOutTimer() {
  countdown.innerHTML = currentTime;
  if (currentTime > 0) {
    currentTime--;
  } else {
    gameOver();
  }
}



function gameOver() {
  removeBoard();
  clearInterval(timeOut);
  gameoverScreen.style.setProperty("z-index", "1");
  document.querySelector(
    ".gameover article"
  ).innerHTML = `Final Statistics:<br><br>
    Stage Reached: ${stage}<br>
    Final Score: ${score}<br>
    Lives Remaining: ${lives}`;
  stage = undefined;
}



const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });



function endGame() {
  gameoverScreen.style.setProperty("z-index", "-1");
  openingScreen.style.setProperty("z-index", "1");
  clearInterval(timeOut);
  stage = undefined;
  removeBoard();
}
