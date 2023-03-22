const APIKey = "12341234123412341234123412341234";
const queryURL = 'https://api.openweathermap.org/data/2.5/forecast';


async function getWeatherData(lat, lon) {
  const url = `${queryUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// display weather data in the UI
function displayWeatherData(data) {
  // display the location name
  const locationName = data.city.name;
  const locationEl = document.querySelector('#location');
  locationEl.textContent = locationName;

// display the weather data for the next 5 days
const weatherData = data.list.slice(0, 5);
const forecastEl = document.querySelector('#forecast');
forecastEl.innerHTML = '';
weatherData.forEach((weather) => {
  const date = new Date(weather.dt_txt);
  const temp = Math.round(weather.main.temp - 273.15);
  const description = weather.weather[0].description;

  const weatherEl = document.createElement('div');
  weatherEl.classList.add('weather');
  weatherEl.innerHTML = `
    <div class="date">${date.toDateString()}</div>
    <div class="temperature">${temp} &deg;C</div>
    <div class="description">${description}</div>
  `;
  forecastEl.appendChild(weatherEl);
});
}

// get the user's location and display the weather data
function getWeatherForUserLocation() {
navigator.geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;
    const data = await getWeatherData(latitude, longitude);
    displayWeatherData(data);
  },
  (error) => {
    console.error(error);
  }
);
}

getWeatherForUserLocation();
