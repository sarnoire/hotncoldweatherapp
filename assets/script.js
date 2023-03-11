var APIKey = "12341234123412341234123412341234";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


function searchCity() {
    // code to retrieve input value from the search form
    const searchForm = document.getElementById('search-form'); // get the search form element
    const searchInput = document.getElementById('search-input'); // get the search input element
    
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault(); // prevent the form from submitting
    
    const searchTerm = searchInput.value; // get the value of the search input
    });

    fetch(queryURL) // code to call an API and retrieve weather data for the city
    
    

    // code to update the HTML with the weather data
    // code to add the city to the search history
  }

document.querySelector('form').addEventListener('submit', searchCity);


const searchForm = document.getElementById('search-form'); // get the search form element
const searchInput = document.getElementById('search-input'); // get the search input element

searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the form from submitting

const searchTerm = searchInput.value; // get the value of the search input

  // do something with the search term, such as fetching weather data for the city
});

