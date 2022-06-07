export default async function getWeatherInfo(city) {
    console.log(city)
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=82465ea8349914da9592b8c5629230a6&units=metric`, { mode: 'cors' });
    const weatherData = await response.json();

    return weatherData;
    domElements.header.headerTitle.innerHTML = weatherData.main.temp;
}
