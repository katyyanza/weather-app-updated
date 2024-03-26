function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperatureCurrentElement = document.querySelector(
    "#current-temperature"
  );
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let timeElement = document.querySelector("#time");
  let windSpeedElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-emoji" />`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = `; ${response.data.condition.description}`;

  timeElement.innerHTML = formatDate(date);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  temperatureCurrentElement.innerHTML = `${Math.round(temperature)} C°`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  console.log("Setting time to " + `${day} ${hours}:${minutes}`);
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "33f49abe5d02797fb490bco062ft9011";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log("Searching for " + city);
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  if (event) {
    event.preventDefault();
  }
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date"> ${day}</div>
    <div class="weather-forecast-icon">⛅️ </div>
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature">
        <strong> 16°</strong>
      </span>
      <span class="weather-forecast-temperature">9°</span>
    </div>
  </div>
`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Quito");

displayForecast();
