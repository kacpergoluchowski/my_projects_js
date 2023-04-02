async function startApi()
{
    const apiUrl = "https://api.nbp.pl/api/exchangerates/tables/a?format=json";
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    drawTable(data[0]);
    calculate(data[0]);
}

startApi();

function drawTable(data)
{
    let table = document.createElement("table")
    document.getElementById("exchangeRates").appendChild(table);
    table.setAttribute("id", "table");
    let th = document.createElement("th");
    th.colSpan = "5";
    document.getElementById("table").appendChild(th);
    document.querySelector("table").querySelector("th").innerHTML = data.effectiveDate;

    for(let i = 0; i < data.rates.length; i++)
    {
        let row = document.createElement("tr");
        document.querySelector("table").appendChild(row);
        for(let j = 0; j < 5; j++)
        {
            let col = document.createElement("td");
            document.querySelectorAll("tr")[i].appendChild(col);
            switch(j)
            {
                case 0:
                    document.querySelectorAll("tr")[i].querySelectorAll("td")[j].innerHTML = `${i+1}.`;
                    break;
                case 1:
                    document.querySelectorAll("tr")[i].querySelectorAll("td")[j].innerHTML = data.rates[i].currency;
                    break;
                case 2:
                    document.querySelectorAll("tr")[i].querySelectorAll("td")[j].innerHTML = data.rates[i].mid;
                    break;
                case 3:
                    let input = document.createElement("input");
                    input.setAttribute("id", data.rates[i].code);
                    input.placeholder = `Wprowadz ilosc ${data.rates[i].code}`
                    document.querySelectorAll("tr")[i].querySelectorAll("td")[j].appendChild(input);
                    break;
                case 4:
                    document.querySelectorAll("tr")[i].querySelectorAll("td")[j].innerHTML = "Oblicz!";
                    break;

                    

            }
        }
    }
    console.log(data);
}

function calculate(data) 
{
    for(let i = 0; i < data.rates.length; i++)
    {
            document.querySelectorAll("tr")[i].querySelectorAll("td")[4].addEventListener('click', function() {
                if(document.querySelectorAll("input")[i].value=="")
                    window.alert(`Nie wprowadzono wartości dla: ${data.rates[i].code}`);
                else
                {
                    let x = document.querySelectorAll("input")[i].value * data.rates[i].mid;
                    let result = x.toFixed(2);
                    window.alert(`${result} PLN`);
                    document.querySelectorAll("input")[i].value = "";
                }
            })
    }
}