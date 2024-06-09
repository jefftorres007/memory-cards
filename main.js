import { GameData } from './js/gameData.js';
import { Router } from './js/router.js';
import { PATHS } from './js/routes.js';

const initViewHome = () =>{
  const userElm = document.querySelector('#username');
  userElm.addEventListener('input', function (e) {
      const value = e.target.value;    
      const charsOK = value.replace(/[^a-zA-Z0-9]/g, '');
      if (value !== charsOK) {
          e.target.value = charsOK;
      }

      const btnGoGame = document.querySelector("#btn-go-game");
      btnGoGame.addEventListener("click", goGame);
  });
}
const initViewGame = () =>{

  const level = document.querySelector("#level");
  let levels = ``;
  for (let i = 0; i < gameData.levels.length; i++) {
    levels += `<option value="${gameData.levels[i].level}">${gameData.levels[i].name}</option>`   
  }
  level.innerHTML = levels;

  const btnInitGame = document.querySelector("#btn-init-game");
  btnInitGame.addEventListener("click", initGame);

  const cntNumbers = document.querySelectorAll('.cnt-numbers .number');
  cntNumbers.forEach(cntNumber => {
      cntNumber.addEventListener('click', () => clickNumber(cntNumber));
  });
}

const gameData = new GameData();
const ROUTER = new Router(PATHS,()=>{initViewHome()});


const goGame = () => {
    const userElm = document.querySelector('#username');

    if(!userElm.value){
        alert(`El nombre de usuario "${userElm.value}" no es válido, inténtelo nuevamente.`);
        return;
    }

    gameData.userName = userElm.value;
    gameData.gameOver = false;
    gameData.score = 0;
    
    ROUTER.load('game',true,()=>{initViewGame()});
    const userText = document.querySelector('#username-text');
    userText.innerHTML = gameData.userName;    
}



const prepareTimer = () => {
    let i = 0;
    let valueInterval = 1000;
    const cntTimer = document.querySelector('#cnt-timer');
    cntTimer.classList.remove('hidden');
    const timer = document.querySelector('#timer-data');
    timer.innerHTML = gameData.getDurationByLevel(level.value) / valueInterval;

    const intervalTimer = setInterval(() => {
        i++;
        const level = document.querySelector('#level');
        let restTime = (gameData.getDurationByLevel(level.value) - (valueInterval*i)) / valueInterval;
        if (restTime >= 0){
            timer.innerHTML = restTime;
        }else{
            clearInterval(intervalTimer);
        }
    }, valueInterval);
}

const initGame = () => {    
    // validaciones
    if (gameData.gameOver){
        alert(`Gracias por jugar ${gameData.userName}, has obtenido una puntuación de ${gameData.score} puntos.`);
        ROUTER.load('home',true,()=>{initViewHome()});
        return;
    }
    prepareTimer();
    prepareBoard(); 
}

const prepareBoard = ()=>{
    gameData.inGame = true;
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() -0.5);    
    const cntNumbers = document.querySelectorAll('.cnt-numbers .number');
    
    cntNumbers.forEach((cntNumber,i) => {
        cntNumber.innerHTML = numbers[i];
        cntNumber.value = numbers[i];
    });

    const elmTitle = document.querySelector('#title-1');
    elmTitle.innerHTML = 'Memorice las cartas';
    
    cntNumbers.forEach((cntNumber,i) => {
        cntNumber.innerHTML = numbers[i];
        cntNumber.value = numbers[i];
        cntNumber.classList.remove('no');
        cntNumber.classList.remove('yes');
    });

    setDisabledControlsGame(true);
    setTimeout(() => {
        
        const elmTitle = document.querySelector('#title-1');
        gameData.numberToFind = Math.floor(Math.random() * 9) + 1;
        elmTitle.innerHTML = `Seleccione el número ${gameData.numberToFind}`;        
        
        cntNumbers.forEach((cntNumber) => {
            cntNumber.innerHTML = '?';
        });
        setDisabledNumbers(false);

    }, gameData.getDurationByLevel(level.value));
}

const clickNumber =  (elm) =>{
    let numSelected = parseInt(elm.value);
    if(numSelected === gameData.numberToFind){
        playSoundNumber(true);
        const level = document.querySelector('#level');
        level.disabled = false;
        elm.classList.add('yes');
        elm.innerHTML = elm.value;

        const scoreData = document.querySelector('#score-data');
        gameData.addScore(gameData.getPointsByLevel(level.value));
        scoreData.innerHTML = gameData.score;

        setTimeout(() => {
            initGame();
        }, 1000);
    }else{
        playSoundNumber(false);
        window.navigator.vibrate([2000]);
        gameData.gameOver = true;
        gameData.inGame = false;
        elm.classList.add('no');        
    }
    setDisabledNumbers(true);
    setDisabledControlsGame(false);
    elm.innerHTML = elm.value;
}

const playSoundNumber =  (win) =>{
    const audio = new Audio(`./sounds/${win === true ? 'win.mp3' : 'lose.mp3'}`);
    audio.volume = 1;
    audio.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
    });
}

const setDisabledControlsGame =  (disabled) =>{
    const level = document.querySelector('#level');
    level.disabled = disabled;
    const btnInitGame = document.querySelector('#btn-init-game');
    btnInitGame.disabled = disabled;
}

const setDisabledNumbers =  (disabled) =>{
    const cntNumbers = document.querySelectorAll('.cnt-numbers .number');
    cntNumbers.forEach((cntNumber,i) => {
        cntNumber.disabled = disabled;
    });
}




/*******
 * Service worker
 ******/

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}


