(function () {

    /*
        By: Carli Weinberg
        On: 9/30/2017
    */

    "use strict";

    // CONSTANTS
    const SIZE = 4;  // 4 for 16 puzzle, 5 for 25 puzzle, etc.
    const BOARD_WIDTH = 500;  // 500 pixels
    const BORDER_SIZE = 3;    // 3 pixels


    // OTHER VARS
    let Board_Size = 0;
    let puzzle = [];
    let inSetUp = true;
    let score = 0;


    document.getElementById("button").onclick = function () { setup(); };


    // called when the page first loads to create tiles and empty space 
    function setup() {

        const radioList = document.getElementsByName("size");
        for (let i = 0; i < radioList.length; i++) {
            if (radioList[i].checked) {
                Board_Size = (radioList[i].value);
            }
        }
        document.getElementById("board").innerHTML = "";
        for (let i = 0; i < (Board_Size * Board_Size) - 1; i++) {
            const newDiv = document.createElement('div');
            newDiv.className += "tile";
            newDiv.id = i + 1;
            const newText = document.createTextNode(i + 1);
            newDiv.addEventListener("click", moveTile); /////just added
            newDiv.appendChild(newText);
            const position = document.getElementById("board");
            position.appendChild(newDiv);
            puzzle.push(newDiv.textContent);
            ///

            document.getElementsByClassName('tile')[i].setAttribute("style", "width:" + BOARD_WIDTH / 4 + "px ; height:" + BOARD_WIDTH / 4 + "px ; border:" + BORDER_SIZE + "px solid red; line-height: 125px");
            if ((i + 1) % Board_Size === 0) {
                const newBr = document.createElement("br");
                const position = document.getElementById("board");
                position.appendChild(newBr);
            }
        }
        const newDiv = document.createElement('div');
        newDiv.className += "tile";
        newDiv.id = Board_Size * Board_Size;
        const newText = document.createTextNode(Board_Size * Board_Size);
        newDiv.appendChild(newText);
        const position = document.getElementById("board");
        position.appendChild(newDiv);
        puzzle.push(newDiv.textContent);
        document.getElementsByClassName('tile')[(Board_Size * Board_Size) - 1].setAttribute("style", "width:" + BOARD_WIDTH / 4 + "px ; height:" + BOARD_WIDTH / 4 + "px ; border:" + BORDER_SIZE + "px solid red; line-height: 125px; color: #999; background-color: #999");
        shuffle();
    }

    // Exchange the locations of two elements in the DOM.  
    // Assumes that neither element is the parent of the other.	
    // from http://stackoverflow.com/questions/10716986/swap-2-html-elements-and-preserve-event-listeners-on-them

    function swapDomElements(element1, element2) {
        // create marker element and insert it where element1 is
        const temp = document.createElement("div");
        element1.parentNode.insertBefore(temp, element1);

        // move element1 to immediately before element2
        element2.parentNode.insertBefore(element1, element2);

        // move element2 to immediately before where element1 used to be
        temp.parentNode.insertBefore(element2, temp);

        // remove temporary marker node
        temp.parentNode.removeChild(temp);
    }

    // If clicked tile is next to the empty space, 
    // swap them
    function moveTile(theTile) {
        let firstPos;
        for (let i = 0; i < puzzle.length; i++) {
            if (puzzle[i] == theTile.toElement.textContent) {
                firstPos = i;
            }
        }
        firstPos = parseInt(firstPos);
        Board_Size = parseInt(Board_Size);

        try {
            if (puzzle[firstPos - 1] == Board_Size * Board_Size && (parseInt(firstPos % Board_Size) > 0)) {
                let secondPos;
                for (let i = 0; i < puzzle.length; i++) {
                    if (puzzle[i] == puzzle[firstPos - 1]) {
                        secondPos = i;
                    }
                }
                swapDomElements(theTile.toElement, document.getElementById(puzzle[firstPos - 1]));
                puzzle[firstPos] = puzzle[firstPos - 1];
                puzzle[secondPos] = theTile.toElement.textContent;
                score++;
                if (!inSetUp) {
                    document.getElementById("score").textContent = score;
                }
            }

        }
        catch (err) {
            return;
        }

        try {

            if (puzzle[firstPos + 1] == Board_Size * Board_Size && (parseInt(firstPos + 1) % Board_Size) > 0) { ///prevent tile6 and blank
                let secondPos;

                for (let i = 0; i < puzzle.length; i++) {
                    if (puzzle[i] == puzzle[firstPos + 1]) {
                        secondPos = i;
                    }
                }
                swapDomElements(theTile.toElement, document.getElementById(puzzle[firstPos + 1]));
                puzzle[firstPos] = puzzle[firstPos + 1];
                puzzle[secondPos] = theTile.toElement.textContent;
                score++;
                if (!inSetUp) {
                    document.getElementById("score").textContent = score; //////
                }
            }

        }
        catch (err) {
            return;
        }

        try {

            if (puzzle[firstPos + Board_Size] == Board_Size * Board_Size) {
                let secondPos;

                for (let i = 0; i < puzzle.length; i++) {
                    if (puzzle[i] == puzzle[firstPos + Board_Size]) {
                        secondPos = i;
                    }
                }
                swapDomElements(theTile.toElement, document.getElementById(puzzle[firstPos + Board_Size]));
                puzzle[firstPos] = puzzle[firstPos + Board_Size];
                puzzle[secondPos] = theTile.toElement.textContent;
                score++;
                if (!inSetUp) {
                    document.getElementById("score").textContent = score; //////
                }
            }

        }
        catch (err) {
            return;
        }

        try {

            if (puzzle[firstPos - Board_Size] == Board_Size * Board_Size) {
                let secondPos;

                for (let i = 0; i < puzzle.length; i++) {
                    if (puzzle[i] == puzzle[firstPos - Board_Size]) {
                        secondPos = i;
                    }
                }
                swapDomElements(theTile.toElement, document.getElementById(puzzle[firstPos - Board_Size]));
                puzzle[firstPos] = puzzle[firstPos - Board_Size];
                puzzle[secondPos] = theTile.toElement.textContent;
                score++;
                if (!inSetUp) {
                    document.getElementById("score").textContent = score; //////
                }
            }

        }
        catch (err) {
            return;
        }
        if (!inSetUp) {
            checkIfWon();
        }

    }

    function shuffle() {
        for (let a = 0; a < 3000; a++) {
            document.getElementsByClassName("tile")[Math.floor(Math.random() * (Board_Size * Board_Size))].click();
        }
        inSetUp = false;
        score = 0;
    }

    function checkIfWon() {
        let won = true;
        for (let i = 0; i < puzzle.length; i++) {
            if (parseInt(puzzle[i]) != parseInt(i + 1)) {

                won = false;
            }
        }
        if (won) {
            setTimeout(function () { alert("you won"); }, 1);
        }
    }

})();