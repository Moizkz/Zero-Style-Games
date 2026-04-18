let turn = "p1"

let box = document.querySelector(".box");
let btn = document.querySelectorAll(".btn");
let win = document.querySelector(".winner");
let con = document.querySelector(".container");
let ai = document.querySelector("#Computer");
let cc = document.querySelector(".cc");
let player = document.querySelector("#player");
let p1_score = document.querySelector(".p1_score");
let p2_score = document.querySelector(".p2_score");
            p1_score.innerText = 0;
            p2_score.innerText = 0;
let scnd_player = "";
    cc.style.display = "none";
player.onclick = () =>{ 
    scnd_player= "p2"
    console.log(scnd_player);
    cc.style.display = "block";
con.style.display = "none";
}

Computer.onclick = () =>{ scnd_player= "ai";
con.style.display = "none";
    cc.style.display = "block";

    console.log(scnd_player);}

let choices = () => {
    let emptyBoxes = [];
    btn.forEach((b,i) =>{
        if(b.innerText === ""){
            emptyBoxes.push(i);
        }
    });
    if(emptyBoxes.length === 0){
        return undefined; /* draw */
    }
    for(let[a,b,c] of patterns){
        if(btn[a].innerText === "O" && btn[b].innerText === "O" && btn[c].innerText === "") return c;
        if(btn[a].innerText === "O" && btn[c].innerText === "O" && btn[b].innerText === "") return b;
        if(btn[c].innerText === "O" && btn[b].innerText === "O" && btn[a].innerText === "") return a;
    
        if(btn[a].innerText === "X" && btn[b].innerText === "X" && btn[c].innerText === "") return c;
        if(btn[a].innerText === "X" && btn[c].innerText === "X" && btn[b].innerText === "") return b;
        if(btn[c].innerText === "X" && btn[b].innerText === "X" && btn[a].innerText === "") return a;
    }
    if(emptyBoxes.includes(4)) return 4;
    let corners = [0,2,6,8].filter(i=> emptyBoxes.includes(i))
    if(corners.lenth > 0){
        return corners[Math.floor(Math.random()*corners.lengh)]
    }
    let rndmidx = Math.floor(Math.random()*emptyBoxes.length);
    return emptyBoxes[rndmidx];
}



let winner;
let patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8],
]

    
let checkWinner = () =>{
for(let pattern of patterns){
    console.log(btn[pattern[0]].innerText, btn[pattern[1]].innerText, btn[pattern[2]].innerText);
    console.log(pattern[0], pattern[1], pattern[2]);
    let pos1 = btn[pattern[0]].innerText.trim();
    let pos2 = btn[pattern[1]].innerText.trim();
    let pos3 = btn[pattern[2]].innerText.trim();
    if(pos1 != "" && pos2 != "" && pos3 != ""){
    if(pos1 == pos2 && pos2 == pos3){
        console.log("winner is", pos1);
        let showWinner = () =>{
        win.style.display = "block";
        winner = pos1;
        win.innerText += " "+pos1;
        if(pos1 == "X"){
            p1_score.innerText++
        }else if(winner != pos1){
        win.style.display = "block";
            win.innerText = "draw";
            console.log("draw");
        }
        else{
                p2_score.innerText++;
        }
}
    showWinner();
        for(let bt of btn){
                    bt.disabled = true;
                }
                return; // ye add karo taake winner milne ke baad draw check na ho
            }
        }
    }

    // DRAW CHECK YAHAN ADD KARO
    let isDraw = [...btn].every(b => b.innerText!== "");
    if(isDraw){
        win.style.display = "block";
        win.innerText = "Draw!";
        for(let bt of btn){
            bt.disabled = true;
        }
    }
}
// reset button 
let reset = document.querySelector(".reset");
reset.onclick = () =>{
    resetBtn();
    console.log("btn was click");
}

let resetBtn = () =>{
    for(let bt of btn){
        bt.disabled = false;
        bt.innerText = "";
        win.style.display = "none";
        win.innerText = "winner is";
    }
} 

 btn.forEach((singleBtn) =>{
    singleBtn.addEventListener("click", () =>{
        if(singleBtn.innerText!== "" || scnd_player === "") return;

        // Player 1 ka move
        if(turn === "p1"){
            singleBtn.innerText = "X";
            singleBtn.style.color = "blue";
            singleBtn.disabled = true;
            checkWinner();
            if(win.style.display === "block") return;

            // Agar AI mode hai
            if(scnd_player === "ai"){
                turn = "ai";
                setTimeout(() => {
                    let aiChoice = choices();
                    if(aiChoice!== undefined){
                        btn[aiChoice].innerText = "O";
                        btn[aiChoice].style.color = "red";
                        btn[aiChoice].disabled = true;
                        checkWinner();
                        turn = "p1";
                    } else {
                        turn = "p1"; // draw case
                    }
                }, 200);
            }
            // Agar Player vs Player mode hai
            else if(scnd_player === "p2"){
                turn = "p2";
            }
        }
        // Player 2 ka move - sirf p2 mode me chalega
        else if(turn === "p2" && scnd_player === "p2"){
            singleBtn.innerText = "O";
            singleBtn.style.color = "red";
            singleBtn.disabled = true;
            checkWinner();
            turn = "p1";
        }
    })
})
