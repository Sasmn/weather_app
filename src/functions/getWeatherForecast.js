import domElements from "..";
import { getDayName } from "./getDateNames";

export default async function getWeatherForecast(lat, lon, day, ForC) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=82465ea8349914da9592b8c5629230a6&units=metric`, { mode: 'cors' });
    const forecastData = await response.json();

    console.log(forecastData);


    let currentDay = day;
    let firstIndex = 0;

    for (let i = 0; i < forecastData.list.length; i++) {
        let x = new Date(forecastData.list[i].dt * 1000).getDate();
        if (x > day) {
            firstIndex = i;
            break;
        }
    }

    let maxTemp = 0;
    let minTemp = 200;
    let maxFeelsLike = 0;
    let d1 = undefined;
    let d2 = undefined;
    let d6 = undefined;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
            d1 = getDayName(new Date(forecastData.list[firstIndex + i * 8 + j].dt * 1000), 'en-US')
            if (forecastData.list[firstIndex + i * 8 + j].main.temp > maxTemp) {
                maxTemp = forecastData.list[firstIndex + i * 8 + j].main.temp;
            }

            if (forecastData.list[firstIndex + i * 8 + j].main.temp > maxFeelsLike) {
                maxFeelsLike = forecastData.list[firstIndex + i * 8 + j].main.feels_like;
            }

            if (forecastData.list[firstIndex + i * 8 + j].main.temp < minTemp) {
                minTemp = forecastData.list[firstIndex + i * 8 + j].main.temp;
            }

            if (j == 5) {
                d2 = forecastData.list[firstIndex + i * 8 + j].weather[0].main;
                d6 = forecastData.list[firstIndex + i * 8 + j].weather[0].icon.substr(0, 2);
            }

        }
        // buildCard()
        let d3 = maxTemp;
        let d4 = maxFeelsLike;
        let d5 = minTemp;

        buildCard(d1, d2, d3, d4, d5, d6, ForC)

        maxTemp = 0;
        minTemp = 200;
        maxFeelsLike = 0;
    }
}

function buildCard(d1, d2, d3, d4, d5, d6, ForC) {
    const container = document.createElement('div')
    
    const day = document.createElement('h2');
    day.innerHTML = d1;

    const card = document.createElement('div');
    card.classList.add('card');
    
    const weather = document.createElement('h3');
    weather.innerHTML = d2;
    
    const icon = document.createElement('img');
    icon.src = "http://openweathermap.org/img/wn/" + d6 + "d@2x.png"

    const maxTemp = document.createElement('h4');
    maxTemp.innerHTML = d3 + " " + ForC;

    const maxFeelsLike = document.createElement('h6');
    maxFeelsLike.innerHTML = "feels like: " + d4 + " " + ForC;

    const minTemp = document.createElement('h5');
    minTemp.innerHTML = d5 + " " + ForC;

    // card.style.backgroundImage = "url(http://openweathermap.org/img/wn/" + d6 + "d@2x.png)";

    card.append(weather, icon, maxTemp, maxFeelsLike, minTemp)

    container.append(day, card)

    domElements.main.main.appendChild(container);
}
