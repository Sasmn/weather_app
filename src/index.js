import _ from 'lodash';
import './style.css'


const domElements = (() => {
    const header = () => {
        const headerTitle = document.createElement('header')
        headerTitle.textContent="HEADER"

        return {
            headerTitle
        };
    }

    const main = () => {
        const main = document.createElement('main')
        main.textContent="MAIN"

        return main;
    }

    const sidebar = () => {
        const sidebar = document.createElement('aside')
        sidebar.textContent="SIDEBAR"

        return sidebar;
    }

    const todos = (() => {



    })();

    return{
        header,
        main,
        sidebar,
        todos,
    }
})();


function component() {
    const element = document.createElement('div');
    element.classList.add('component')
    

    element.appendChild(domElements.header().headerTitle);
    element.appendChild(domElements.sidebar());
    element.appendChild(domElements.main());


    return element;
}

document.body.appendChild(component());


let city = 'London';


async function getWeatherInfo(city){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=82465ea8349914da9592b8c5629230a6`, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
    const h = document.querySelector('header');
    const x = weatherData.main.temp;
    const test = document.createElement('div');
    test.innerHTML = weatherData.main.temp;
    domElements.header().headerTitle.appendChild(test);
    domElements.header().headerTitle.innerHTML = x;
    h.innerHTML = x;
    h.appendChild(test)
    console.log(domElements.header().headerTitle.innerHTML, h.innerHTML)
}


getWeatherInfo(city);