import domElements from "..";
import { getDayName } from "./getDateNames";
import getLocalDate from "./getLocalDate"

export default async function getWeatherForecast(lat, lon, day) {
    /* fetch weather forecast */
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=82465ea8349914da9592b8c5629230a6&units=metric`, { mode: 'cors' });
    const forecastData = await response.json();

    /* remove the cards from the previous city */
    domElements.main.main.innerHTML = '';

    /* index of he first 3 hour forcast from the next day */
    let firstIndex = 0;
    for (let i = 0; i < forecastData.list.length; i++) {
        let y = getLocalDate(new Date(forecastData.list[i].dt * 1000), forecastData.city.timezone).getDate()
        if (y > day) {
            firstIndex = i;
            /* abort the for cycle, when its found */
            break;
        }
    }

    /* maxTemp, maxFeelsLike and minTemp are calculated on a daily basis */
    let maxTemp = 0;
    let minTemp = 200;
    let maxFeelsLike = 0;

    /* these are  */
    let d1;
    let d2;
    let d6;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
            /* get the name of the day */
            d1 = getDayName(getLocalDate(new Date(forecastData.list[firstIndex + i * 8 + j].dt * 1000), forecastData.city.timezone), 'en-US')

            /* Calculate the max, feelMax and min values */
            if (forecastData.list[firstIndex + i * 8 + j].main.temp > maxTemp) {
                maxTemp = forecastData.list[firstIndex + i * 8 + j].main.temp;
            }
            if (forecastData.list[firstIndex + i * 8 + j].main.temp > maxFeelsLike) {
                maxFeelsLike = forecastData.list[firstIndex + i * 8 + j].main.feels_like;
            }
            if (forecastData.list[firstIndex + i * 8 + j].main.temp < minTemp) {
                minTemp = forecastData.list[firstIndex + i * 8 + j].main.temp;
            }

            /* get the weather info and icon from the 15:00 weather forecast */
            if (j == 5) {
                d2 = forecastData.list[firstIndex + i * 8 + j].weather[0].main;
                d6 = forecastData.list[firstIndex + i * 8 + j].weather[0].icon.substr(0, 2);
            }

        }
        // buildCard()
        let d3 = maxTemp;
        let d4 = maxFeelsLike;
        let d5 = minTemp;

        buildCard(d1, d2, d3, d4, d5, d6)

        /* reset these values, so the next day they can be calculated again */
        maxTemp = 0;
        minTemp = 200;
        maxFeelsLike = 0;
    }
}

/* making of one card */
function buildCard(d1, d2, d3, d4, d5, d6) {
    const container = document.createElement('div')
    
    const day = document.createElement('h2');
    day.innerHTML = d1;

    const card = document.createElement('div');
    card.classList.add('card');
    
    const weather = document.createElement('h3');
    weather.innerHTML = d2;
    
    const icon = document.createElement('img');
    icon.src = "https://openweathermap.org/img/wn/" + d6 + "d@2x.png"

    const maxTemp = document.createElement('h4');
    maxTemp.innerHTML = d3;
    maxTemp.classList.add('temp');

    const maxFeelsLike = document.createElement('h6');
    maxFeelsLike.innerHTML = "feels like: " + d4;
    maxFeelsLike.classList.add('temp');

    const minTemp = document.createElement('h5');
    minTemp.innerHTML = d5;
    minTemp.classList.add('temp');


    card.append(weather, icon, maxTemp, maxFeelsLike, minTemp)
    container.append(day, card)
    domElements.main.main.appendChild(container);
}
