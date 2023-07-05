const API_KEY = "51401bfb057db09e748ed75e801f79c6";
const geo_API_URL = "http://api.openweathermap.org/geo/1.0/direct?q=";
const weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather?"

let latitude, longitude;

let searchBox = document.querySelector(".search-bar input");
let searchBtn = document.querySelector(".search-bar button");

async function getLatandLong(city) {
  const response = await fetch(geo_API_URL + city + `&appid=${API_KEY}`);
  var data = await response.json();
  latitude = data[0].lat;
  longitude = data[0].lon;

  if (data[0].country=="US"){
    document.querySelector(".city").innerHTML = data[0].name + ", " + data[0].state + ", " + data[0].country;
  } else if (data[0].country=="GB") {
    document.querySelector(".city").innerHTML = data[0].name + ", " + data[0].state;
  } else {
    document.querySelector(".city").innerHTML = data[0].name + ", " + data[0].country;
  }
}

async function getWeather(city) {
  await getLatandLong(city);
  const response = await fetch(weatherAPI_URL + "lat=" + latitude + "&lon=" + longitude + `&appid=${API_KEY}` + "&units=metric");
  var data = await response.json();
  console.log(data);
  var imageURL = "https://source.unsplash.com/1600x900/?" + city;
  document.body.style.backgroundImage = "url('" + imageURL + " ')";

  document.querySelector(".temp").innerHTML = Math.round(data.main.temp, 2) + "°C";
  document.querySelector(".weather").innerHTML = data.weather[0].main;
  var feels = document.querySelector(".feels-like");
  feels.querySelector("p").innerHTML = Math.round(data.main.feels_like, 2) + "°C";
  var hum = document.querySelector(".humidity");
  hum.querySelector("p").innerHTML = Math.round(data.main.humidity, 2) + "%";
}

getWeather("London");

searchBox.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    getWeather(searchBox.value);
  }
});

searchBtn = addEventListener("click", () => {
  getWeather(searchBox.value);
})

