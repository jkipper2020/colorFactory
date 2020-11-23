/**
 * Jonathan Kipper
 * @version 5-27-2020
 * This javascript file creates event listeners for all of the boxes, manages the generate colors button, creates table
 * elements and puts the rgb values into the table, and randomly generates all of the colors which are being used.
 * Furthermore, it resets itself after 8 colors have been selected, and then randomly re-generates them so you don't
 * have to repeatedly click the generate colors button.
 */
//table val counter is used for the iteration loops (box 1-8, so the counter just goes through them)
let tableVal = 1;
window.onload = function () {

    let wasClicked = false;
    let myButton = document.getElementById("buttonID");
    let bottomTable = document.getElementById("bottomTable");

    //this loop creates event listeners for all of the box's (box1-box8) and after 8 have been achieved resets them
    for (i = 1; i < 9; i++) {
        let a = "box" + i;
        let tmp = document.getElementById(a);

        tmp.onclick = function (event) {
            if (wasClicked === true && tableVal < 9) {
                saveColor(event);
            } else if (wasClicked === true && tableVal === 9) {
                resetColors();
            }
        };
    }

    //the event listener for the generate colors button
    myButton.onclick = function (event) {
        resetColors(); //causes the program to reset the table and colors when the button is pressed
        wasClicked = true; //forces the user to have to click the button at least once
    };
};

//this function is what randomly generates all of the colors and applies them to the boxes
function genColors() {
    for (i = 1; i < 9; i++) {
        let a = "box" + i;
        let tmp = document.getElementById(a);

        let r = randomNum(0, 255);
        let g = randomNum(0, 255);
        let b = randomNum(0, 255);

        tmp.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}

//this function resets all of the colors and regenerates them, and resets the tableVal counter
function resetColors() {
    for (i = 1; i < 9; i++) {
        let a = "box" + i;
        let tmp = document.getElementById(a);
        tmp.style.backgroundColor = "white";

        clearTable(document.getElementById("bottomTable"));
        genColors();
    }
    tableVal = 1;
}

//this deletes all the entries from the table so it can get reset properly
function clearTable(table) {
    let rows = table.rows;
    let j = rows.length;
    while (--j) {
        table.deleteRow(j);
    }
}

//this function takes an event listener input (from the squares being clicked) and creates a row, two elements, and adds
//those elements to the row into the table that's visible, and incriments the tableValue counter.
function saveColor(event) {
    //store the square clicked on
    let square = event.target;
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    td1.appendChild(document.createTextNode(square.style.backgroundColor));
    tr.append(td1);

    let td2 = document.createElement('td');
    td2.appendChild(document.createTextNode(''));
    td2.style.backgroundColor = square.style.backgroundColor;

    tr.appendChild(td2);
    let x = document.getElementById("bottomTable");
    x.appendChild(tr);

    tableVal++;
}

//this function generates a random number in a selected range
function randomNum(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
}