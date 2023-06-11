function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"];

    let day = days[date.getDay()];
   return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

return days[day];

}

function displayForecast(response) {
    let forecast = response.data.daily;
    
    let forecastElement = document.querySelector("#forecast")

let forecastHTML = `<div class="row">`;

 console.log(response.data);
forecast.forEach(function(forecastDay, index){
    if (index < 6){
forecastHTML =  forecastHTML + 
    `<div class="col-2">
            <div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}
            </div>
          <img
           src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="60px"
          />
          <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max">
          ${Math.round(forecastDay.temp.max)}°
          </span>
          <span class="weather-forecast-temp-min">
          ${Math.round(forecastDay.temp.min)}°
          </span>
          </div>
          </div>
        `;
    }
})
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");


    celsiusTemperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = (response.data.city);
    descriptionElement.innerHTML = (response.data.condition.description);
    humidityElement.innerHTML = (response.data.temperature.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", response.data.condition.icon_url);

    getForecast(response.data.coordinates);
}

function search(city) {
let apiKey = "o33e843f19cff60d65295cbta82c21ed";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Harrisburg");