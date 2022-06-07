import _ from 'lodash';
import './style.css';
import getWeatherInfo from './functions/getWeatherInfo.js';


const domElements = (() => {
    const header = (() => {
        const headerTitle = document.createElement('header')

        return {
            headerTitle
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


function component() {
    const element = document.createElement('div');
    element.classList.add('component')
    

    element.appendChild(domElements.header.headerTitle);
    element.appendChild(domElements.sidebar);
    element.appendChild(domElements.main);


    return element;
}

document.body.appendChild(component());


let city = 'London';

const weatherdata = getWeatherInfo(city);