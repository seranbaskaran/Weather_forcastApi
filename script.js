const apiKey = '7bec4e4d1e90d9db1eafef3af3d8ee1e';
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
// Get references to input field, button, and elements for additional information and weather icon
const locationInput = document.getElementById('location-input');
const getWeatherButton = document.getElementById('get-weather-button');
const humidityElement = document.getElementById('humidity');
const dewPointElement = document.getElementById('dew-point');
const visibilityElement = document.getElementById('visibility');
const windSpeedElement = document.getElementById('wind-speed');
const dateTimeElement = document.getElementById('date-time');
const weatherIconElement = document.getElementById('weather-icon');

// Add an event listener to the button
getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value;

    // Check if the location input is empty
    if (!location) {
        alert('Please enter a location.');
        return;
    }

    // Fetch weather data for the specified location
    fetch(`${apiUrl}?q=${location}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Extract relevant weather information from the API response
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const city = data.name;
            const country = data.sys.country;
            const weatherCondition = data.weather[0].main;
            const humidity = data.main.humidity;
            const dewPoint = calculateDewPoint(data.main.temp, data.main.humidity);
            const visibility = data.visibility;
            const windSpeed = data.wind.speed;
            const dateTime = new Date(data.dt * 1000);

            // Display the weather information on the webpage
            const weatherDataElement = document.getElementById('weather-data');
            weatherDataElement.innerHTML = `
                <p>Location: ${city}, ${country}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p><span></span>
            `;

            // Display the weather icon based on the weather condition
            weatherIconElement.innerHTML = getWeatherIcon(weatherCondition);

            // Display additional weather information
            humidityElement.textContent = `${humidity}%`;
            dewPointElement.textContent = `${dewPoint}°C`;
            visibilityElement.textContent = `${visibility} meters`;
            windSpeedElement.textContent = `${windSpeed} m/s`;
            dateTimeElement.textContent = dateTime.toLocaleString();
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

// Function to calculate dew point (approximation)
function calculateDewPoint(temperature, humidity) {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100.0);
    const dewPoint = (b * alpha) / (a - alpha);
    return dewPoint.toFixed(2);
}

// Function to get the appropriate weather icon based on the weather condition
function getWeatherIcon(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
        case 'clouds':
            return '<i class="fa-solid fa-cloud"></i>';
        case 'clear':
            return '<i class="fa-solid fa-sun"></i>';
        case '':
            return ''
        case 'haze':
            return '<i class="fa-solid fa-smog"></i>'
        case 'party cloudy':
            return '<i class="fa-solid fa-cloud-sun"></i>'
        case 'rain':
            return '<i class="fa-solid fa-cloud-showers-heavy"></i>';
        case 'hail':
            return '<i class="fa-solid fa-hill-avalanche"></i>';
        case 'windy':
            return '<i class="fa-solid fa-wind"></i>';
        // Add more cases for other weather conditions as needed
        default:
            return '<i class="fa-solid fa-cloud-moon"></i>';
    }
}

// switch (weatherCondition.toLowerCase()) {
//     case 'clouds':
//         return '<i class="fas fa-cloud"></i>';
//     case 'clear':
//         return '<i class="fas fa-sun"></i>';
//     // Add more cases for other weather conditions as needed
//     default:
//         return '<i class="fas fa-question-circle"></i>';
// }
// Rest of your code remains the same


