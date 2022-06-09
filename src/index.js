import _ from 'lodash';
import './style.css';
import getWeatherInfo from './functions/getWeatherInfo.js';
import fullPageScroll from './functions/fullPageScroll';


const domElements = (() => {
    const panel1 = document.createElement('div');
    panel1.classList.add('panel');

    const header = (() => {
        const container = document.createElement('header');
        const city = document.createElement('h1');
        const time = document.createElement('h2');
        const date = document.createElement('h3');
        const temp = document.createElement('h4');
        const tempFeel = document.createElement('h5');

        
        const container2 = document.createElement('ul');
        const humidity = document.createElement('li');
        const pressure = document.createElement('li');
        const wind = document.createElement('li');
        container2.append(humidity, pressure, wind);


        const icon = document.createElement('img');

        container.append(city, time, date, temp, tempFeel, container2, icon)
        return {
            container,
            city,
            time,
            date,
            temp,
            tempFeel,
            humidity,
            pressure,
            wind,
            icon
        };
    })();

    const sidebar = (() => {
        const sidebar = document.createElement('aside')
        sidebar.textContent="SIDEBAR"

        return sidebar;
    })();

    panel1.append(header.container, sidebar);


    const panel2 = document.createElement('div');
    panel2.classList.add('panel');

    const main = (() => {
        const main = document.createElement('main')
        main.textContent="MAIN"

        return main;
    })();

    panel2.append(main);

    return{
        panel1,
        panel2,
        header,
        sidebar,
        main
    }
})();

export default domElements;

function component() {
    const element = document.createElement('div');
    element.classList.add('component')
    

    element.appendChild(domElements.panel1);
    element.appendChild(domElements.panel2);


    return element;
}

document.body.appendChild(component());


let city = 'New York';

getWeatherInfo(city);

fullPageScroll();