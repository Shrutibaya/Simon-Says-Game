let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;
let highScore = 0;
let highScoreDisplay = document.getElementById("highScore");
let btns=["yellow","red","green","purple"];
let h2=document.querySelector("h2");


document.addEventListener("keypress",function(){
    if(started==false) {
        console.log("game is started");
        started=true;
        levelUp();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randClr=btns[randIdx];
    let randbtn=document.querySelector(`.${randClr}`);
    gameSeq.push(randClr);
    console.log(gameSeq);
    gameflash(randbtn);
}

function checkAns(idx){
    // console.log("curr level : ",level);
    
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length== gameSeq.length)
        {
            if (level > highScore) {
                highScore = level;
                highScoreDisplay.innerText = `High Score: ${highScore}`;
            }
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b><br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150)
        reset();
    }
}

function btnPress(){
    let btn=this;
    userflash(btn);
    userColor= btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allbtns= document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
    
}
