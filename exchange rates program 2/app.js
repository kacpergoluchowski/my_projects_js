async function App()
{
    const apiUrl = "https://api.nbp.pl/api/exchangerates/tables/a?format=json";
    const response = await fetch(apiUrl);
    const data = await response.json();
    let codeCounter = 0;
    console.log(data);

    document.querySelectorAll("img")[0].addEventListener('click', function() {
        if(codeCounter==0)
        {
            codeCounter = data[0].rates.length-1;
            document.querySelector("h1").innerHTML = data[0].rates[codeCounter].code;
            document.querySelectorAll("h2")[0].innerHTML = `Waluta: ${data[0].rates[codeCounter].currency}`;
            let mid = data[0].rates[codeCounter].mid;
            let fixedMid = mid.toFixed(2);
            document.querySelectorAll("h2")[1].innerHTML = `Kurs: ${fixedMid}`; 
            document.querySelector("label").innerHTML = `Przelicz ${data[0].rates[codeCounter].currency} na złotówki`;

            
        }
        else
        {
            codeCounter--;
            document.querySelector("h1").innerHTML = data[0].rates[codeCounter].code;
            document.querySelectorAll("h2")[0].innerHTML = `Waluta: ${data[0].rates[codeCounter].currency}`;
            let mid = data[0].rates[codeCounter].mid;
            let fixedMid = mid.toFixed(2);
            document.querySelectorAll("h2")[1].innerHTML = `Kurs: ${fixedMid}`; 
            document.querySelector("label").innerHTML = `Przelicz ${data[0].rates[codeCounter].currency} na złotówki`;
        }
    })
    
    document.querySelectorAll("img")[1].addEventListener('click', function() {
        if(codeCounter==data[0].rates.length-1)
        {
            codeCounter = 0;
            document.querySelector("h1").innerHTML = data[0].rates[codeCounter].code;
            document.querySelectorAll("h2")[0].innerHTML = `Waluta: ${data[0].rates[codeCounter].currency}`;
            let mid = data[0].rates[codeCounter].mid;
            let fixedMid = mid.toFixed(2);
            document.querySelectorAll("h2")[1].innerHTML = `Kurs: ${fixedMid}`; 
            document.querySelector("label").innerHTML = `Przelicz ${data[0].rates[codeCounter].currency} na złotówki`;
        }
        else
        {
            codeCounter++;
            document.querySelector("h1").innerHTML = data[0].rates[codeCounter].code;
            document.querySelectorAll("h2")[0].innerHTML = `Waluta: ${data[0].rates[codeCounter].currency}`;
            let mid = data[0].rates[codeCounter].mid;
            let fixedMid = mid.toFixed(2);
            document.querySelectorAll("h2")[1].innerHTML = `Kurs: ${fixedMid}`; 
            document.querySelector("label").innerHTML = `Przelicz ${data[0].rates[codeCounter].currency} na złotówki`;
        }
    })

    document.querySelector("button").addEventListener("click", function() {
        if(document.querySelector("input").value=="")
        {
            window.alert("Prosze wprowadzic wartosc!");
        }
        else
        {
            let result = document.querySelector("input").value * data[0].rates[codeCounter].mid;
            let fixedResult = result.toFixed(2);
            window.alert(`${fixedResult} zł`);
            document.querySelector("input").value = "";
        }
    })
}


App();
