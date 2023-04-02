const SIGN = ["x", "o"];

function drawBoard(param) {
    winPoz = winPio = winL = winP = round = currentPlayer = 0;
    document.getElementById("tictactoe").innerHTML = "";
    const board = document.createElement("table");
    board.setAttribute("id", "board");
    document.getElementById("tictactoe").appendChild(board);

    let x = 1;
    for (let i = 0; i < param.value; i++) {
        const row = document.createElement("tr");
        row.setAttribute("id", i + "row");
        document.getElementById("board").appendChild(row);
        for (let j = 0; j < param.value; j++) {
            const col = document.createElement("td");
            col.setAttribute("id", x + "b");
            x++;
            document.getElementById(i + "row").appendChild(col);
        }
    }
    move(param);
}

function move(param) {
    console.log("prosze o 6");
    for (let i = 1; i <= Math.pow(param.value, 2); i++) {
        document.getElementById(i + "b").addEventListener("click", function () {
            if (document.getElementById(i + "b").innerHTML != "")
                window.alert("Pole zajęte!");
            else {
                document.getElementById(i + "b").innerHTML = SIGN[currentPlayer];
                currentPlayer++;
                round++;
                if(checkWin(param))
                {
                    return 0;
                }
                else if (round == param.value * param.value) {
                    window.alert("Remis! Wszystkie pola zostały zajęte!");
                    return 0;
                }
                // checkWin(param);
            }
            if (currentPlayer == 2) 
                currentPlayer = 0;
        });
    }
}

function checkWin(param)
{
    // poziomo
    for(let i = 0; i < 2; i++) // po znakach
    {
        for(let rows = 0; rows < param.value; rows++) // po rzedach
        {
            if(document.querySelectorAll("tr")[rows].querySelectorAll("td")[0].innerHTML == SIGN[i])
            {
                for(let columns = 0; columns < param.value; columns++) // po kolumnach
                {
                    if(document.querySelectorAll("tr")[rows].querySelectorAll("td")[columns].innerHTML == SIGN[i])
                    {
                        winPoz++;
                        if(winPoz==param.value)
                        {
                            window.alert(`${SIGN[i]} WYGRYWA!`);
                            return true;
                        }
                    }
                    else
                    {
                        winPoz = 0;
                        break;
                    }
                }
            }
        }
    }
    // pionowo
    for(let i = 0; i < 2; i++) // po znakach
    {
        for(let columns = 0; columns < param.value; columns++) // po wierszach
        {
            if(document.querySelectorAll("tr")[0].querySelectorAll("td")[columns].innerHTML == SIGN[i])
            {
                for(let rows = 0; rows < param.value; rows++)
                {
                    if(document.querySelectorAll("tr")[rows].querySelectorAll("td")[columns].innerHTML == SIGN[i])
                    {
                        winPio++;
                        if(winPio==param.value)
                        {
                            window.alert(`${SIGN[i]} WYGRYWA!`);
                            return true;
                        }    
                    }
                    else
                    {
                        winPio = 0;
                        break;
                    }
                }
            }
        }
    }
    // po prawym skosie \
    for(let sign = 0; sign < 2; sign++)
    {
        for(let i = 0; i < param.value; i++)
        {   
            if(document.querySelectorAll("tr")[i].querySelectorAll("td")[i].innerHTML == SIGN[sign])
            {
                winP++;
                if(winP==param.value)
                {
                    window.alert(`${SIGN[sign]} WYGRYWA!`);
                    return true;
                }
            }
            else
            {
                winP = 0;
                break;
            }
        }
    }
    // po lewym skosie /
    let x = 0;
    for(let sign = 0; sign < 2; sign++)
    {
        for(let i = param.value-1; i >= 0; i--)
        {
            if(document.querySelectorAll("tr")[x].querySelectorAll("td")[i].innerHTML == SIGN[sign])
            {
                x++;
                winL++;
                if(winL==param.value)
                {
                    window.alert(`${SIGN[sign]} WYGRYWA!`);
                    return true;
                } 
            }
            else
                {
                    winL = 0;
                    x=0;
                    break;
                }
        }
    }
}