import _ from 'lodash';
import './style.css';
import getWeatherInfo from './functions/getWeatherInfo.js';
import fullPageScroll from './functions/fullPageScroll';
import setViewport from './functions/setViewport';
import icon from './icons/right-arrow-svgrepo-com.svg'
import { swapCelFah, addCelFah } from './functions/updateCelFah';


const domElements = (() => {
    const panel1 = document.createElement('div');
    panel1.classList.add('panel');


    /* FIRST PANEL: CURRENT WEATHER */

    const header = (() => {
        const container = document.createElement('header');

        const div = document.createElement('div');
        const main = document.createElement('h1');
        const iconContainer = document.createElement('div');
        const icon = document.createElement('img');
        iconContainer.appendChild(icon);

        div.append(main, iconContainer)

        const temp = document.createElement('h2');
        temp.classList.add('temp');

        const time = document.createElement('h3');
        const date = document.createElement('h3');

        const tempFeel = document.createElement('h3');
        tempFeel.classList.add('temp');


        const container2 = document.createElement('ul');
        const humidity = document.createElement('li');
        const pressure = document.createElement('li');
        const wind = document.createElement('li');
        container2.append(humidity, pressure, wind);

        container.append(div, temp, tempFeel, container2)
        return {
            container,
            main,
            time,
            date,
            temp,
            tempFeel,
            humidity,
            pressure,
            wind,
            iconContainer,
            icon
        };
    })();

    panel1.append(header.container);


    /* FIXED CITY AND TIME */

    const sidebar = (() => {
        const sidebar = document.createElement('aside')

        const city = document.createElement('div');
        city.classList.add('city')

        const time = document.createElement('div');
        time.classList.add('time');


        sidebar.append(city, time)
        return {
            sidebar,
            city,
            time
        };
    })();


    /* SECOND PANEl: 4 DAY FORECAST */

    const panel2 = document.createElement('div');
    panel2.classList.add('panel');

    const main = (() => {
        const main = document.createElement('main')
        return {
            main
        };
    })();

    panel2.append(main.main);



    /* SEARCH FIELD */
    const search = document.createElement('div');
    search.classList.add('search-container')

    const searchCity = document.createElement('label');
    searchCity.classList.add('search');

    const searchInput = document.createElement('input');
    searchInput.type = "text";
    searchInput.setAttribute('id', "input_field")
    searchCity.htmlFor = "input_field";

    const submitIcon = document.createElement('img');
    submitIcon.src = icon;

    searchCity.append(searchInput);

    search.append(searchCity, submitIcon);


    /* CELSIUS - FAHRENHEIT TOGGLE */

    const label = document.createElement('label');
    label.classList.add('switch');

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    const span = document.createElement('span')
    span.classList.add('slider')

    const toggle = document.createElement('div')
    toggle.innerText = '°C'
    toggle.classList.add('toggle')

    span.appendChild(toggle);
    label.append(checkbox, span)


    /* loading screen */
    const loader = document.createElement('div');
    loader.classList.add('loader');

    return {
        panel1,
        panel2,
        header,
        sidebar,
        main,
        searchInput,
        searchCity,
        search,
        submitIcon,
        label,
        checkbox,
        toggle,
        loader
    }
})();

export default domElements;

function component() {
    const element = document.createElement('div');
    element.classList.add('component')


    element.appendChild(domElements.panel1);
    element.appendChild(domElements.panel2);
    element.appendChild(domElements.sidebar.sidebar);
    element.appendChild(domElements.search);
    element.appendChild(domElements.label);
    element.appendChild(domElements.loader);
    // element.append(domElements.panel3, domElements.panel4, domElements.panel5)

    return element;
}

document.body.appendChild(component());

/* LOADING OF THE FUNCTIONS */
setViewport();
fullPageScroll();

let city;
let ForC;

loadStorage();
console.log(ForC)
if (city == null) {
    city = 'Budapest';
}
if (ForC == null) {
    ForC = '°C';
}
else if (ForC == "°F") {
    domElements.checkbox.checked = true;
    domElements.toggle.innerHTML = ForC;
}

loadWeather(city);


/* SEARCH FILED - city search events */
domElements.submitIcon.addEventListener('click', () => {
    city = domElements.searchInput.value;
    loadWeather(city);
    updateStorage();
})

domElements.search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        city = domElements.searchInput.value;
        loadWeather(city)
        updateStorage()
    }
})

/* loading of weather datas */
function loadWeather(city) {
    domElements.loader.style.display = "block"
    domElements.search.style.animation = "";
    domElements.searchInput.value = '';
    domElements.searchInput.blur();

    getWeatherInfo(city).then(() => {
        addCelFah(ForC);
        domElements.loader.style.display = "none"
    });
}

/* when switch is toggled, update the metrics */
domElements.checkbox.addEventListener('click', () => {
    if (domElements.checkbox.checked) {
        ForC = '°F';
        domElements.toggle.innerHTML = ForC;
        swapCelFah(ForC);
    }
    else {
        ForC = '°C';
        domElements.toggle.innerHTML = ForC;
        swapCelFah(ForC);
    }
    updateStorage();
})


/* store city and Fahrenheit or Celsius in local storage */
function loadStorage() {
    city = localStorage.getItem('city');
    ForC = localStorage.getItem('ForC');
}

function updateStorage() {
    localStorage.setItem('city', city);
    localStorage.setItem('ForC', ForC);
}