let sizes = [undefined, 4, 6, 8, 10];
let activeCard = new Array(), firstPlayerPoints = 0, secondPlayerPoints = 0, pairs, round = 0;

function regenerate() {
    openPairs=firstPlayerPoints=secondPlayerPoints=round=0
    document.getElementById("result").innerHTML = `Gracz 1 - ${firstPlayerPoints}:${secondPlayerPoints} - Gracz 2`
    size = document.querySelector("#size-board").value;
    var contener = document.querySelector("#board");
    contener.innerHTML = "";
    generateTables();
    if(validateInput()) {
        createBoard(contener);
        drawNumbers();
        fillFields(); 
    }
    setActiveCardDependencies();
}

function validateInput() {
    if (document.querySelector("#size-board").value == "") {
      alert("Pole wejścia nie może być puste!");
      return false;
    }
    return true;
}

function setActiveCardDependencies() {
    for(let i = 0; i <= activeCard.length; i++)
        activeCard.pop();
    activeCardCounters = 0;
}

function generateTables() {
    fields = [];
    for(let i = 0; i < sizes[size]; i++)
        fields[i] = [];
}

function createBoard(contener) {
    let board = document.createElement("table");
    contener.appendChild(board);
    createRows(board);
}

function createRows(board) {
    for(let rowNumber = 0; rowNumber < sizes[size]; rowNumber++) {
        let row = document.createElement("tr");
        board.appendChild(row);
        createColumns(row, rowNumber);
    }
}

function createColumns(row, rowNumber) {
    for(let colNumber = 0; colNumber < sizes[size]; colNumber++) {
        let column = document.createElement("td");
        column.style.backgroundColor = "red";
        let card = document.createElement("p");
        column.appendChild(card);
        row.appendChild(column);
        createField(column, rowNumber, colNumber);
    }  
}

function createField(column, rowNumber, colNumber) {
    fields[rowNumber][colNumber] = column;
    column.addEventListener('click', () => {
         move(column);
    })
}

function drawNumbers() {
    let randomNumbers = new Array();
    for(let i = 0; i < Math.pow(sizes[size],2) / 2; i++) { 
        let random = Math.ceil(Math.random() * 100);
        randomNumbers.push(random);
        randomNumbers.push(random);
    }
    array = shuffle(randomNumbers);
}

function shuffle(arr) {
    let shuffleArray = [];
    let usedIndexes = [];
    let i = 0;

    while(i < arr.length) {
        let randomNumber = Math.floor(Math.random() * arr.length);
        if(!usedIndexes.includes(randomNumber)) {
            shuffleArray.push(arr[randomNumber]);
            usedIndexes.push(randomNumber);
            i++;
        } 
    }
    return shuffleArray;
}

function fillFields() {
    for(let i = 0; i < sizes[size]; i++) 
        for(let j = 0; j < sizes[size]; j++) 
            fields[i][j].querySelector("p").innerHTML = array.pop();
} 

function move(field) {
    if(field.style.backgroundColor == "red" && activeCard.length < 2) {
        round+=0.5;
        activeCard[activeCardCounters] = field;
        activeCardCounters++;
        field.querySelector("p").style.display = "block";
        field.style.backgroundColor = "white";
        if(activeCardCounters==2)
            checkCard();
        if(openPairs==Math.pow(sizes[size], 2) / 2)   {
            displayWinner();
        }
    }
    else
        alert("Pole zostało już odwrócone lub odwrócono maksymalną ilość kart!");
}

function checkCard() {
    let cardNumber = activeCard[0].querySelector("p").innerHTML;
    for(let i = 0; i < activeCard.length; i++) {
        if(activeCard[i].querySelector("p").innerHTML == cardNumber)
            continue;
        else {
            setTimeout(resetActive, 2000);
            return;
        }
    }
    matchPairs();
}

function resetActive() {
    for(let i = 0; i < activeCard.length; i++) {
        activeCard[i].style.backgroundColor = "red";
        activeCard[i].querySelector("p").style.display = "none";
    }
    setActiveCardDependencies();
}

function matchPairs() {
    openPairs++;
    for(let i = 0; i < activeCard.length; i++) 
        activeCard[i].style.backgroundColor = "lime";
    setActiveCardDependencies();
    setPoint();
}

function setPoint() {
    if(round%2==0) 
        secondPlayerPoints++;
    else
        firstPlayerPoints++;
    document.getElementById("result").innerHTML = `Gracz 1 - ${firstPlayerPoints}:${secondPlayerPoints} - Gracz 2`
}

function displayWinner() {
    if(firstPlayerPoints>secondPlayerPoints)
        alert(`Wszystkie karty zostały odkryte! Wygrywa gracz 1!`);
    else if(firstPlayerPoints<secondPlayerPoints)
        alert(`Wszystkie karty zostały odkryte! Wygrywa gracz 2!`);   
    else
        alert("Wszystkie karty zostały odkryte! Remis!");
}

