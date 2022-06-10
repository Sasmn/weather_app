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

        const backgroundImage = document.createElement('img');
        backgroundImage.classList.add('bgimg');


        container.append(city, time, date, temp, tempFeel, container2, icon, backgroundImage)
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
            icon,
            backgroundImage
        };
    })();

    const sidebar = (() => {
        const sidebar = document.createElement('aside')
        sidebar.textContent = "SIDEBAR"

        return sidebar;
    })();

    panel1.append(header.container);


    const panel2 = document.createElement('div');
    panel2.classList.add('panel');

    const main = (() => {
        const main = document.createElement('main')
        main.textContent = "MAIN"

        const backgroundImage = document.createElement('img');
        backgroundImage.classList.add('bgimg');

        main.append(backgroundImage);
        return {
            main,
            backgroundImage
        };
    })();

    panel2.append(main.main);

    const panel3 = document.createElement('div');
    panel3.classList.add('panel');
    panel3.style.backgroundColor = "beige";

    const panel4 = document.createElement('div');
    panel4.classList.add('panel');
    panel4.style.backgroundColor = "grey";

    const panel5 = document.createElement('div');
    panel5.classList.add('panel');
    panel5.style.backgroundColor = "black";


    return {
        panel1,
        panel2,
        header,
        sidebar,
        main,
        panel3,
        panel4,
        panel5
    }
})();

export default domElements;

function component() {
    const element = document.createElement('div');
    element.classList.add('component')


    element.appendChild(domElements.panel1);
    element.appendChild(domElements.panel2);
    element.appendChild(domElements.sidebar)
    element.append(domElements.panel3, domElements.panel4, domElements.panel5)


    return element;
}

document.body.appendChild(component());


let city = 'London';

// getWeatherInfo(city);

fullPageScroll();