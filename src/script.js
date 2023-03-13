function showTemperature(response) {
  let temperatureElement = Math.round(response.data.main.temp);

  let temperatureFigure = document.querySelector("#temperature");
  temperatureFigure.innerHTML = `${temperatureElement}`;

  document.querySelector(".city").innerHTML = response.data.name;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);

  let city = response.data.name;

  let temperatureDescription = response.data.weather[0].description;

  let description = document.querySelector("#description");
  description.innerHTML = `${temperatureDescription}`;

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${temperature}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
  console.log(searchInput.value);

  let apiKey = "b35c686ba9565ba0ab254c2230937552";

  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector(".search-bar");
form.addEventListener("submit", search);

let currentTime = new Date();

let time = document.querySelector("#time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentTime.getDay()];

let currentHours = currentTime.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}

let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

time.innerHTML = `${currentDay} | ${currentHours}:${currentMinutes}`;
