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
        const temp = document.createElement('h2');

        div.append(main, temp)

        const time = document.createElement('h3');
        const date = document.createElement('h3');
        const tempFeel = document.createElement('h3');


        const container2 = document.createElement('ul');
        const humidity = document.createElement('li');
        const pressure = document.createElement('li');
        const wind = document.createElement('li');
        container2.append(humidity, pressure, wind);

        const iconContainer = document.createElement('div');
        const icon = document.createElement('img');
        iconContainer.appendChild(icon);

        const backgroundImage = document.createElement('img');
        backgroundImage.classList.add('bgimg');


        container.append(div, iconContainer, tempFeel, container2, backgroundImage)
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
            icon,
            backgroundImage
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
    element.appendChild(domElements.sidebar.sidebar);
    // element.append(domElements.panel3, domElements.panel4, domElements.panel5)


    return element;
}

document.body.appendChild(component());


let city = 'Bratislava';

getWeatherInfo(city);

fullPageScroll();