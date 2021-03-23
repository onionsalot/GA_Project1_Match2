/*
- App should start with user clicking start. Initiates the vars and creates a randomized version of the array of objs passed in.
- Optional choices will be easy or medium under start (default will be easy)
- Once start clicked, start will disappear and board will be created in it's place
- Easy = pick 2 Medium = pick 3
- Board will have all cards revealed for 5 seconds with a countdown up top
- Flip cards over to blank side once countdown is done and allow users to flip cards over to check for matches
- Score by matching 2, win by flipping over EVERY CARD and matching each card.
    1. There will be an array of objs of possible cards to place. (2 of each)
    2. The array will use Math.Random to randomize the position of the cards
    3. Will push randomized cards render imgs to all cells on table
    4. Once two are clicked, compare the clicked cels. If match, score, if not flip cards around.
- Lose by failing to match items with scaling difficulty. Hearts for health
- score will be kept on right of screen
- difficulty picked along with other vars will be stored on right side of screen.
        - ICEBOX: Themes for cards
        - ICEBOX: Assist button that will reveal all remaining 
        - ICEBOX: Scaling difficulty; Once won, click next to restart board. After 3 successful 4x2, do 8x2, then 10x3
        - ICEBOX: Infomational box which will not only display name of the item clicked, but some trivia as well.
*/

/*----- constants -----*/
const cardList = [
    { 'name': 'Pomeranian', 'img': '<img class="front" src="https://www.thesprucepets.com/thmb/wpN_ZunUaRQAc_WRdAQRxeTbyoc=/4231x2820/filters:fill(auto,1)/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg">'},
    { 'name': 'Pomsky', 'img': '<img class="front" src="https://i.pinimg.com/originals/b5/f7/86/b5f786c94dc2eea43ea9e3f9b5224cd5.jpg">'},
    { 'name': 'Golden Retriever', 'img': '<img class="front" src="https://s01.sgp1.cdn.digitaloceanspaces.com/article/131928-mxiccwtarv-1575034997.jpg">'},
    { 'name': 'Corgi', 'img': '<img class="front" src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/14112506/Pembroke-Welsh-Corgi-standing-outdoors-in-the-fall.jpg">'},
    { 'name': 'Dachshund', 'img': '<img class="front" src="https://www.dogtime.com/assets/uploads/2011/01/file_23020_dachshund-dog-breed.jpg">'}
];
const stageToCells = {
    1: 8,
    2: 10,
    3: 12,
    4: 14,
    5: 20,
    6: 22,
    7: 24
}
let displayedCardList =[];
const imgLinks =[];
/*----- app's state (variables) -----*/
let stage, score, lives, mode, theme;
let choice1, choice2;
/*----- cached element references -----*/
const timerEl = document.querySelector('.timer');
const stageEl = document.querySelector('.stage');
const scoreEl = document.querySelector('.score');
const livesEl = document.querySelector('.lives');
const modeEl = document.querySelector('.mode');
const themeEl = document.querySelector('.theme');
const table = document.getElementsByClassName('table');
const startButton = document.querySelector('.startB');
let tableCells;
const tableRows = document.querySelectorAll('.row');
/*----- event listeners -----*/
document.querySelector('.table').addEventListener('click', clickCard);
startButton.addEventListener('click', initiateGame);
/*----- functions -----*/
function initiateGame() {
    if (stage === undefined) {
        stage = 1;
        score = 0;
        lives = 10;
    }
    renderElements();
    timers();
    //render();
}

function clickCard(clicked) {
    const idClicked = clicked.target.parentNode.id;
    if (clicked.target.tagName !== 'IMG' || clicked.target.classList.contains('front')) {
        return
    } else {
        console.log(clicked.target)
        console.log(clicked);
        console.log(idClicked);
        clicked.target.parentNode.style.removeProperty('transform');
        if (choice1 === undefined) {
            choice1 = idClicked;
        } else {
            clicked.target.parentNode.style.removeProperty('transform');
            choice2 = idClicked;
            checkMatch()
        }
        
    }
}

function checkMatch() {
    document.querySelector('.table').removeEventListener('click', clickCard);
    if (displayedCardList[choice1] === displayedCardList[choice2]) {
        console.log(`MATCH`)
        choice1 = undefined;
        choice2 = undefined;
        score += 1000;
        renderElements();
        document.querySelector('.table').addEventListener('click', clickCard);
    } else {
        setTimeout(function(){ 
            console.log(`no match in ${displayedCardList[choice1]} and ${displayedCardList[choice2]}`)
            tableCells[choice1].style.transform = 'rotateY(180deg)';
            choice1 = undefined;
            tableCells[choice2].style.transform = 'rotateY(180deg)';
            choice2 = undefined;
            lives --;
            renderElements();
            document.querySelector('.table').addEventListener('click', clickCard);
        }, 1000);
    }
}
function renderElements() {
    console.log(`current score is ${score}`)
    stageEl.textContent= stage;
    scoreEl.textContent= score;
    livesEl.textContent= lives;

}

function renderBoard() {
    // create a new array which will be rendered onto the field
    // loop through cardlist and take first 4, and add els to new array x2
    // cardList.forEach((ele) => {
    //     displayedCardList.push(ele);
    //     displayedCardList.push(ele);
    // })
    
    // Stage1=8 Stage2=10 Stage3=12 Stage4=14 Stage5=16 Stage6=18 ...
    
    for (let i=0; i < stageToCells[stage]; i++){
        const createDiv = document.createElement('div');
        createDiv.setAttribute('class', 'table_cell');
        createDiv.setAttribute('id',i)
        if (tableRows[0].childElementCount < 5) {
            tableRows[0].appendChild(createDiv);
        } else {
            tableRows[1].appendChild(createDiv);
        }
        

    };
    tableCells = document.querySelectorAll('.table_cell');
    displayedCardList = [];
    for (let i=0; i<stageToCells[stage]/2; i++) {
        displayedCardList.push(cardList[i]);
        displayedCardList.push(cardList[i]);
    }
    // RANDOMIZE FUNCTION V
    displayedCardList = displayedCardList.sort(() => Math.random() - 0.5)
    for (let i=0; i<tableCells.length; i++) {
        tableCells[i].innerHTML = `${displayedCardList[i].img}
        <img class="back" src="https://static.wikia.nocookie.net/megamitensei/images/4/45/Tarot.png/revision/latest/scale-to-width-down/340?cb=20160405134836">`;
        console.log(`ran ${i} times`)
    }

    // })
}

function timers() {
    setTimeout(function(){ renderBoard();}, 1000);
    setTimeout(function(){ startButton.innerHTML='3'}, 2000);
    setTimeout(function(){ startButton.innerHTML='2'}, 3000);
    setTimeout(function(){ startButton.innerHTML='1'}, 4000);
    setTimeout(function(){ startButton.innerHTML=''}, 5000);
    setTimeout(function(){ 
        tableCells.forEach((cell) => {
            cell.style.transform = 'rotateY(180deg)'
        })
    }, 5000);
    
}