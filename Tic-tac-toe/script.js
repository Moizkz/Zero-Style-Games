let turn = "p1"

let box = document.querySelector(".box");
let btn = document.querySelectorAll(".btn");
let win = document.querySelector(".winner");
let p1_score = document.querySelector(".p1_score");
let p2_score = document.querySelector(".p2_score");
            p1_score.innerText = 0;
            p2_score.innerText = 0;

btn.forEach((btn) =>{
    btn.addEventListener("click", () =>{
        if(turn === "p1"){
            btn.innerText = "X";
            btn.style.color = "blue";
            turn = "p2";
            console.log("Player 2 turn");
        }
        else{
            btn.innerText = "O";
            btn.style.color = "red";
            turn = "p1";
            console.log("Player 1 turn");

        }
        checkWinner();

    })
})

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
        }else{
                p2_score.innerText++;
        }
}
    showWinner();
        for(let bt of btn){
            bt.disabled = true;
        }
    }}
}}
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
