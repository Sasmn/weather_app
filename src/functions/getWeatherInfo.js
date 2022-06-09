import domElements from "..";
import getDayName from "./getDayName";
import getWeatherForecast from "./getWeatherForecast";

export default async function getWeatherInfo(city) {
    console.log(city)
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=82465ea8349914da9592b8c5629230a6&units=metric`, { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData)


    var dateTZ = new Date(weatherData.dt*1000 + weatherData.timezone * 1000)

    var day = getDayName("en-US");


    domElements.header.city.innerHTML = city;
    domElements.header.time.innerHTML = `${dateTZ.getHours()}:${dateTZ.getMinutes()}`;
    domElements.header.date.innerHTML = `${day}, ${new Date().getDay()} ${new Date().toLocaleString('en-US', {month: 'long'})}`;
    domElements.header.temp.innerHTML = weatherData.main.temp;
    domElements.header.tempFeel.innerHTML = weatherData.main.feels_like;
    domElements.header.humidity.innerHTML = weatherData.main.humidity;
    domElements.header.pressure.innerHTML = weatherData.main.pressure;
    domElements.header.wind.innerHTML = weatherData.wind.speed;

    domElements.header.icon.src = "http://openweathermap.org/img/w/"+weatherData.weather[0].icon+".png";


    const response2 = await fetch(`https://api.unsplash.com/search/photos?client_id=uFwP6I7icJzIyYxxJBobFO0npj18cf42FwraQQ6mCw8&page=1&query=${city}`);
    const cityImage = await response2.json();

    domElements.header.backgroundImage.src = `${cityImage.results[0].urls.regular}`
/*
    const response3 = await fetch(`https://api.unsplash.com/search/photos?client_id=uFwP6I7icJzIyYxxJBobFO0npj18cf42FwraQQ6mCw8&page=1&query=${city}`);
    const cityImage2 = await response3.json();
*/
    domElements.main.backgroundImage.src = `${cityImage.results[1].urls.regular}`

    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;
    getWeatherForecast(lat, lon);
}
