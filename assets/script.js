const APIKey = "f930239e29081bfdab855132d34c036f";
const queryURL = 'https://api.openweathermap.org/data/2.5/forecast';


async function getWeatherData(cityName, latitude, longitude) {
  let url;
  if (cityName) {
    url = `${queryURL}?q=${cityName}&appid=${APIKey}`;
  } else if (latitude && longitude) {
    url = `${queryURL}?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;
  } else {
    console.error('No location data provided!');
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}



// display weather data in the UI
function displayWeatherData(data) {
  if (!data) {
    console.error('No weather data found!');
    return;
  }

  console.log('data', data);
  console.log('data.city', data.city);
  
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

function getWeatherForUserLocation() {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await getWeatherData(null, latitude, longitude);
      displayWeatherData(data);
    },
    (error) => {
      console.error(error);
    }
  );
}

getWeatherForUserLocation();
