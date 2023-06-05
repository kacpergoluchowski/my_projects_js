let size;
let container = document.getElementById("game");

function regenerate() {
    container.innerHTML = "";
    size = document.getElementById("sizeOfBoard").value;
    drawNumbers();
    createBoard();
}

function createBoard() {
    const board = document.createElement("table");
    container.appendChild(board);
    createRows(board);
}

function createRows(board) {
    for(let i = 0; i < size*2; i++) {
        const row = document.createElement("tr");
        board.appendChild(row);
        createFields(row);
    }
}

function createFields(row) {
    for(let i = 0; i < size*2; i++) {
        const field = document.createElement("td");
        const paraph = document.createElement("p");
        field.appendChild(paraph);
        row.appendChild(field);
        paraph.innerHTML = shuffleArray.pop();
        field.classList.add("card");
        field.onclick = () => {move(field)};
    }
}

function move(item) {
    if(document.querySelectorAll(".active-card").length<=1) {
        item.classList.add("active-card");
        if(document.querySelectorAll(".active-card").length==2) {
            if(checkPairMatching())
                matching();
            else
                setTimeout(reset, 2000);
        }
    }       
}

function checkPairMatching() {
    let checkedCards = document.querySelectorAll(".active-card");
    if(checkedCards[0].innerHTML == checkedCards[1].innerHTML)
        return true;
    return false;
}

function matching() {
    let matchingCards = document.querySelectorAll(".active-card");
    for(let i = 0; i < matchingCards.length; i++) {
        matchingCards[i].classList.remove("active-card")
        matchingCards[i].classList.add("face-up-card");
    }
}

function reset() {
    let resetCards = document.querySelectorAll(".active-card");
    for(let i = 0; i < resetCards.length; i++) 
        resetCards[i].classList.remove('active-card');
}

function drawNumbers() {
    let randomNumbers = [];
    for(let i = 0; i < size * size * 2; i++) { 
        let random = Math.ceil(Math.random() * 100);
        randomNumbers.push(random);
        randomNumbers.push(random);
    }
    shuffleArray = shuffle(randomNumbers);
}

function shuffle(arr) {
    let shuffleArray = [];
    let usedIndexes = [];
    for(let i = 0; i < arr.length;) {
        let randomNumber = Math.floor(Math.random() * arr.length);
        if(!usedIndexes.includes(randomNumber)) {
            shuffleArray.push(arr[randomNumber]);
            usedIndexes.push(randomNumber);
            i++;
        } 
    }
    return shuffleArray;
}