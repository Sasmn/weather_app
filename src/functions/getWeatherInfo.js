import domElements from "..";
import { getDayName, getMonthName } from "./getDateNames";
import getWeatherForecast from "./getWeatherForecast";
import getLocalDate from "./getLocalDate";

export default async function getWeatherInfo(city) {
    /* if the city didn't change, then do not fetch */
    if (city == domElements.sidebar.city.innerHTML) {
        return;
    }


    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=82465ea8349914da9592b8c5629230a6&units=metric`, { mode: 'cors' });
    /* if the input is not valid for the api, then shake the input field, and exit the function */
    if (!response.ok) {
        domElements.search.style.animation = "shake 0.5s";
        return;
    }
    let weatherData = await response.json();

    /* Set the infos of the current weather card */
    domElements.header.main.innerHTML = weatherData.weather[0].main;
    domElements.header.icon.src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon.substr(0, 2) + "d@2x.png";
    domElements.header.temp.innerHTML = weatherData.main.temp;
    domElements.header.tempFeel.innerHTML = "feels like: " + weatherData.main.feels_like;
    domElements.header.humidity.innerHTML = "humidity: " + weatherData.main.humidity + "%";
    domElements.header.pressure.innerHTML = "pressure: " + weatherData.main.pressure + " hPa";
    domElements.header.wind.innerHTML = "wind: " + weatherData.wind.speed + " m/s";

    /* Set the infos of the title */
    domElements.sidebar.city.innerHTML = city + ", " + weatherData.sys.country;
    let date = getLocalDate(new Date(), weatherData.timezone);
    domElements.sidebar.time.innerHTML = `${date.getHours()}:${date.getMinutes()}, ${getDayName(date, 'en-US')}, ${date.getDay()} ${getMonthName(date, 'en-US')}`

    /* fetch the background from Unsplash */
    const response2 = await fetch(`https://api.unsplash.com/search/photos?client_id=uFwP6I7icJzIyYxxJBobFO0npj18cf42FwraQQ6mCw8&page=1&query=${city}`);
    const cityImage = await response2.json();

    /* set the backgrounds for the panels */
    domElements.panel1.style.backgroundImage = `url(${cityImage.results[0].urls.regular})`
    domElements.panel2.style.backgroundImage = `url(${cityImage.results[1].urls.regular})`

    /* Call the forecast function with the coordinates */
    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;
    const day = date.getDate();
    
    /* wait, until the forecast is fetched, so the appropiate metrics can be added */
    await getWeatherForecast(lat, lon, day);
}