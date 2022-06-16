export function swapCelFah(ForC) {
    /* select all the .temp class elements */
    const temp = document.querySelectorAll('.temp');

    /* converter functions */
    function convertToFahrenheit(n) {
        return (n * 9 / 5) + 32;
    }
    function convertToCelsius(n) {
        return (n - 32) * 5 / 9;
    }

    /* calculate the temp for each temp element */
    temp.forEach(t => {
        /* numb: only the number from string (with - and . included) */
        var numb = t.innerHTML.match(/[+-]?\d+(\.\d+)?/g);
        numb = numb.join("");

        /* newNumb: the new converted number, with 2 decimals */
        let newNumb;
        if (ForC == '°C') {
            newNumb = parseFloat(convertToCelsius(numb)).toFixed(2);
        }
        else {
            newNumb = parseFloat(convertToFahrenheit(numb)).toFixed(2);
        }

        /* setting the new texts */
        if (t.innerHTML.includes('feels like:')) {
            t.innerHTML = 'feels like: ' + newNumb + ForC;
        }
        else {
            t.innerHTML = newNumb + ForC;
        }
    });
}

export function addCelFah(ForC){
    /* select all the .temp class elements */
    const temp = document.querySelectorAll('.temp');

    /* convert to fahrenheit */
    function convertToFahrenheit(n) {
        return (n * 9 / 5) + 32;
    }

    temp.forEach(t => {
        /* numb: only the number from string (with - and . included) */
        var numb = t.innerHTML.match(/[+-]?\d+(\.\d+)?/g);
        numb = numb.join("");

        /* convert to Fahrenheit, if its selected (api is Celsius by default) */
        if (ForC == '°F') {
            numb = parseFloat(convertToFahrenheit(numb)).toFixed(2);
        }

        /* setting the new texts */
        if (t.innerHTML.includes('feels like:')) {
            t.innerHTML = 'feels like: ' + numb + ForC;
        }
        else {
            t.innerHTML = numb + ForC;
        }
    });
}