import _ from 'lodash';
import './style.css';
import getWeatherInfo from './functions/getWeatherInfo.js';


const domElements = (() => {
    const header = (() => {
        const container = document.createElement('header');
        const city = document.createElement('h1');
        const time = document.createElement('h2');
        const date = document.createElement('h3');
        const temp = document.createElement('h4');
        

        container.append(city, time, date, temp)
        return {
            container,
            city,
            time,
            date,
            temp
        };
    })();

    const main = (() => {
        const main = document.createElement('main')
        main.textContent="MAIN"

        return main;
    })();

    const sidebar = (() => {
        const sidebar = document.createElement('aside')
        sidebar.textContent="SIDEBAR"

        return sidebar;
    })();

    return{
        header,
        main,
        sidebar
    }
})();

export default domElements;

function component() {
    const element = document.createElement('div');
    element.classList.add('component')
    

    element.appendChild(domElements.header.container);
    element.appendChild(domElements.sidebar);
    element.appendChild(domElements.main);


    return element;
}

document.body.appendChild(component());


let city = 'New York';

getWeatherInfo(city);