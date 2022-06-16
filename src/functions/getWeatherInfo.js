import domElements from "..";
import { getDayName, getMonthName } from "./getDateNames";
import getWeatherForecast from "./getWeatherForecast";
import getLocalDate from "./getLocalDate";

export default async function getWeatherInfo(city, ForC) {
    console.log(city)
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=82465ea8349914da9592b8c5629230a6&units=metric`, { mode: 'cors' });
    if (!response.ok) {
        // alert(weatherData.message)
        domElements.search.style.animation = "shake 0.5s";
        return;
    }
    const weatherData = await response.json();
    domElements.main.main.innerHTML = '';



    domElements.header.main.innerHTML = weatherData.weather[0].main;
    domElements.header.icon.src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon.substr(0, 2) + "d@2x.png";

    domElements.header.temp.innerHTML = weatherData.main.temp + " " + ForC;
    domElements.header.tempFeel.innerHTML = "feels like: " + weatherData.main.feels_like + " " + ForC;
    domElements.header.humidity.innerHTML = "humidity: " + weatherData.main.humidity + "%";
    domElements.header.pressure.innerHTML = "pressure: " + weatherData.main.pressure + " hPa";
    domElements.header.wind.innerHTML = "wind: " + weatherData.wind.speed + " m/s";

    domElements.sidebar.city.innerHTML = city;

    let date = getLocalDate(new Date(), weatherData.timezone);
    domElements.sidebar.time.innerHTML = `${date.getHours()}:${date.getMinutes()}, ${getDayName(date, 'en-US')}, ${date.getDay()} ${getMonthName(date, 'en-US')}`

    const response2 = await fetch(`https://api.unsplash.com/search/photos?client_id=uFwP6I7icJzIyYxxJBobFO0npj18cf42FwraQQ6mCw8&page=1&query=${city}`);
    const cityImage = await response2.json();

    domElements.panel1.style.backgroundImage = `url(${cityImage.results[0].urls.regular})`
    domElements.panel2.style.backgroundImage = `url(${cityImage.results[1].urls.regular})`


    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;
    const day = date.getDate();
    getWeatherForecast(lat, lon, day, ForC);
}
