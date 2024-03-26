//my all variables for accessing all itmes of HTML

let boxes = document.querySelectorAll(".game-smbl-box");
let msg_Div = document.querySelector(".msg-div");
let game_Box = document.querySelector("#game-box");
let msg = document.querySelector(".msg");
let new_Game_Btn = document.querySelector(".new-game-btn");
let reset_Game_Btn = document.querySelector(".reset-game-btn");


// variable for accessing the turn of user
let turn = true;

//variable for checking the count of click for tracking that the game is draw or not
let count = 1;

//variable for making an array of all the winning patterns of my game
let winning_Pattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*for each loop for
 increasing the count variable on every click of button,
 tracking the the turn of user,
 insert a game's symbol according to the turn of user,
 disable all buutons after one click on a button,
 checking winner through a checkwinner function which define below
*/
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turn) {
            turn = false;
            box.innerHTML = "<i class='fa-solid fa-check'></i>"
            box.classList.add("game-smbl-color");
        }
        else {
            turn = true;
            box.innerHTML = "<i class='fa-solid fa-o'></i>"
            box.classList.add("game-smbl-color-2");
        };
        box.disabled = true;
        check_Winner();
        count++; 
    })
});

// Winner checking function
let check_Winner = () => {
    let winnerFound = false; // Flag variable to track if winner is found
    
    winning_Pattern.forEach(pattern => {
        // These 3 variables are accessing the 3 positions of a winning pattern
        let pos1val = boxes[pattern[0]].innerHTML;
        let pos2val = boxes[pattern[1]].innerHTML;
        let pos3val = boxes[pattern[2]].innerHTML;

        // First, check if all positions are filled
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            // Check if all positions have same values
            if (pos1val === pos2val && pos2val === pos3val) {
                // Call the show_Winner function with the winning value
                show_Winner(pos1val);
                winnerFound = true; // Set the flag to true
            }
        }
    });

    // If winner is not found and count is 9, it's a draw
    if (!winnerFound && count === 9) {
        game_Draw();
    }
};



//this is the funtion for showing the winner
let show_Winner = (Winner) => {
    msg_Div.classList.remove("hide");
    msg.innerHTML = `<h3 class="winning-heading">Congratulations! <br><br> <span class="winning-heading-2">Winner is ${Winner} </span></h1>`;
    //its a funtion for disabling all the button after the winner was decided. it is also at below
    disable_Boxes();
};

//this is the function for disabling all buttons
let disable_Boxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

let reset_And_New_Game_Btn = () => {
    boxes.forEach(box => {
        box.innerHTML = "";
        box.disabled = false;
        box.classList.remove("game-smbl-color", "game-smbl-color-2")
    });
    msg_Div.classList.add("hide");
    count = 1;
};

//this is the funtion for showing the winner
let game_Draw = () => {
    msg_Div.classList.remove("hide");
    msg.innerHTML = `<h3 class="winning-heading">Ooo!Game is <br> <span class="winning-heading-2">Draw </span></h1>`
    disable_Boxes();
};

// this is for addding the add event listner on reset and new game buttons of html
reset_Game_Btn.addEventListener("click", reset_And_New_Game_Btn);
new_Game_Btn.addEventListener("click", reset_And_New_Game_Btn);