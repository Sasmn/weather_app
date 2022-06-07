import domElements from "..";

export default async function getWeatherForecast(lat, lon) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=82465ea8349914da9592b8c5629230a6&units=metric`, { mode: 'cors' });
    const forecastData = await response.json();

    console.log(forecastData);
}
