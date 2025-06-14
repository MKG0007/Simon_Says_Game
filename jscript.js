// to store the game squence
let gameSeq = [];
// to store the user sequence
let userSeq = [];

let btns = ["red" , "blue" , "green" , "yellow"];

let started = false;
let level = -1;

let h2 = document.querySelector("h2");

document.addEventListener("keypress" , function(){

    startMusic();

    if(started == false){
    console.log("game started");
    started = true;

    levelUp();

    }
});


// -------------------------------------------------------------------------------------------------------------
// for auto flesh (white color)
function btnFlash(btn){

    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    } , 250);

}

// for user flash (green color)
function userFlash(btn){

    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    } , 250);

}
// ---------------------------------------------------------------------------------------------------------

// computer auto player system 
function levelUp(){

    userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;

    let randNum = Math.floor(Math.random()*3);
    let randColor = btns[randNum];
    gameSeq.push(randColor);
    let randbtn = document.querySelector(`#${randColor}`);
    btnFlash(randbtn);
}

// --------------------------------------------------------------------------------------------------------------

function checkAns(index){
    console.log("current level = ", level);

    if(userSeq[index] == gameSeq[index]){
        if(userSeq.length == gameSeq.length){
           setTimeout( levelUp , 500);
        }
    }
    else{
        playFailSound();
        h2.innerHTML = `Game Over! <b><u>Your score was ${level}</u></b> <br> Press any key to play again.`;

        document.querySelector("body").style.background = "red";

        setTimeout(function(){
        document.querySelector("body").style.background = "linear-gradient(135deg, #f9f9f9, #d4f1f9)";
        } , 250);
        reset();
    }
}


// -----------------------------------------------------------------------------------------------------

// user player system 
function btnPress(){
    if(started){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
    }
}


// ----------------------------------------------------------------------------------------------------------------


let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click" , btnPress);
}



// ----------------------------------------------------------------------------------------------------------
// background music handler function 

function startMusic(){
    const sMusic =     document.querySelector('#bg-music');
    sMusic.currentTime = 0;
    sMusic.play();
}


function stopMusic() {
    const music = document.querySelector('#bg-music');
    music.pause();
    music.currentTime = 0;
}

// ------------------------------------------------------------------------------------------------------------

// to play the fail sound 
function playFailSound() {
  const gmo = document.querySelector('#gameOver');
  gmo.currentTime = 0.95;
  gmo.play();
}


// -----------------------------------------------------------------------------------------------------


// to reset the game 
function reset(){
    started = false;
    gameSeq = [];
    userSeq =[];
    level = 0;
    stopMusic();

}

// ------------------------------------------------------------------------------------------------------
   
