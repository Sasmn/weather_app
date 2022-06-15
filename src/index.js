import _ from 'lodash';
import './style.css';
import getWeatherInfo from './functions/getWeatherInfo.js';
import fullPageScroll from './functions/fullPageScroll';


const domElements = (() => {
    const panel1 = document.createElement('div');
    panel1.classList.add('panel');

    const header = (() => {
        const container = document.createElement('header');

        const div = document.createElement('div');
        const main = document.createElement('h1');
        const iconContainer = document.createElement('div');
        const icon = document.createElement('img');
        iconContainer.appendChild(icon);
        
        div.append(main, iconContainer)
        
        const temp = document.createElement('h2');
        const time = document.createElement('h3');
        const date = document.createElement('h3');
        const tempFeel = document.createElement('h3');


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



    const panel2 = document.createElement('div');
    panel2.classList.add('panel');

    const main = (() => {
        const main = document.createElement('main')
        return {
            main
        };
    })();

    panel2.append(main.main);

    /*
    const panel3 = document.createElement('div');
    panel3.classList.add('panel');
    panel3.style.backgroundColor = "beige";

    const panel4 = document.createElement('div');
    panel4.classList.add('panel');
    panel4.style.backgroundColor = "grey";

    const panel5 = document.createElement('div');
    panel5.classList.add('panel');
    panel5.style.backgroundColor = "black";
    */


    const search = document.createElement('div');
    search.classList.add('search-container')

    const searchCity = document.createElement('label');
    searchCity.classList.add('search');

    const searchInput = document.createElement('input');
    searchInput.inputMode = "text";
    searchInput.setAttribute('id', "input_field")
    searchCity.htmlFor = "input_field";

    searchCity.append(searchInput);

    search.appendChild(searchCity);

    return {
        panel1,
        panel2,
        header,
        sidebar,
        main,
        searchInput,
        searchCity,
        search
    }
})();

export default domElements;

function component() {
    const element = document.createElement('div');
    element.classList.add('component')


    element.appendChild(domElements.panel1);
    element.appendChild(domElements.panel2);
    element.appendChild(domElements.sidebar.sidebar);
    element.appendChild(domElements.search)
    // element.append(domElements.panel3, domElements.panel4, domElements.panel5)


    return element;
}

document.body.appendChild(component());


let city = 'Budapest';

let ForC = '°C';

getWeatherInfo(city, ForC);

fullPageScroll();