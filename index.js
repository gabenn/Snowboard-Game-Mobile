const playerCharacter = document.getElementById("playerCharacter");
const score = document.getElementById("score");

const leftArrow = document.getElementById("leftArrow")
const downArrow = document.getElementById("downArrow")
const rightArrow = document.getElementById("rightArrow")

let highScore, intervalLeft, intervalDown, intervalRight, intervalUp, traps, gameScore;

let trapX, trapY, treeTrap;

if (localStorage.getItem('highScoreLS') == undefined) localStorage.setItem('highScoreLS', 0);

highScore = parseInt(localStorage.getItem('highScoreLS'))
gameScore = 0;

function lose() {
    traps.forEach(trap => {
        //hitboxes (Ik they sucks sometimes)
        if (trap.offsetTop < playerCharacter.offsetTop + 16 &&
            trap.offsetTop > playerCharacter.offsetTop - 24 &&
            trap.offsetLeft < playerCharacter.offsetLeft + 24 &&
            trap.offsetLeft > playerCharacter.offsetLeft - 60
        ) {
            if (highScore == undefined || highScore < gameScore) localStorage.setItem('highScoreLS', gameScore);

            clearIntervals();
            alert(`High Score: ${localStorage.getItem('highScoreLS')}\nScore: ${gameScore}`);
            location.reload();
        }

    });
}

function levelWin() {
    for (let i = 0; i < traps.length; i++) {
        if (traps[i].offsetTop < 0) { //changing position when trap is unvisible 

            traps[i].style.top = `${Math.floor(Math.random() * window.innerHeight)+350}px`;
            trapX = Math.floor(Math.random() * window.innerWidth);

            traps[i].style.left = `${trapX}px`;

            if (i % traps.length == 0) createTrap(); // adding new element after "level win"

            gameScore = traps.length - 10;; //score
            score.innerHTML = `Score ${gameScore}`;
        }
    }
}

function moveDown() {
    playerCharacter.style.backgroundImage = 'url("./assets/playerDown.png")';
    clearIntervals();
    intervalDown =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop-2}px`;
            }
            lose();
            levelWin();
        }, 15)
}

function moveRight() {
    clearIntervals();
    playerCharacter.style.backgroundImage = 'url("./assets/playerRight.png")';
    intervalRight =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop-2}px`;
                traps[i].style.left = `${traps[i].offsetLeft-2}px`;
            }
            lose();
            levelWin();
        }, 15)
}

function moveLeft() {
    clearIntervals();
    playerCharacter.style.backgroundImage = 'url("./assets/playerLeft.png")';
    intervalLeft =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop-2}px`;
                traps[i].style.left = `${traps[i].offsetLeft+2}px`;
            }
            lose();
            levelWin();
        }, 15)
}

function clearIntervals() { //"dev" function :D   
    clearInterval(intervalDown);
    clearInterval(intervalRight);
    clearInterval(intervalLeft);
    clearInterval(intervalUp);
}

function createTrap() {
    // trap styles
    treeTrap = document.createElement('div');
    treeTrap.className = "traps";
    treeTrap.id = "deadTree";
    treeTrap.style.left = `${trapX}px`;
    treeTrap.style.top = `${trapY}px`;
    treeTrap.style.backgroundImage = "url('assets/deadTree.png')";
    //create trap
    document.body.appendChild(treeTrap);
    //trap array
    traps = document.getElementsByClassName("traps");
    traps = [...traps];
}

function init() {
    for (let i = 0; i < 10; i++) { // Traps quantity

        trapX = Math.floor(Math.random() * window.innerWidth);

        if (trapX < 65) trapX += 64;
        if (trapX > innerWidth - 65) trapX -= 64;

        trapY = Math.floor(Math.random() * window.innerHeight)

        while (trapY < window.innerHeight * 0.5) {
            trapY = Math.floor(Math.random() * window.innerHeight);
        }
        createTrap();
    }
}

init();