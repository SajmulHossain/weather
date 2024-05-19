document.addEventListener('DOMContentLoaded', () => {
    const timeElement = document.getElementById('time');
    const weatherElement = document.getElementById('weather');

    function updateTime() {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        timeElement.textContent = `Current Time: ${formattedTime}`;
    }

    function fetchWeather(latitude, longitude) {
        const url = `https://api.weatherapi.com/v1/current.json?key=d979d7a66be841d9be3143557241905&q=${latitude},${longitude}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temperature = data.current.temp_c;
                const description = data.current.condition.text;
                weatherElement.textContent = `Current Weather: ${temperature}°C, ${description}`;
            })
            .catch(error => {
                weatherElement.textContent = 'Unable to retrieve weather data.';
                console.error('Error fetching weather data:', error);
            });
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                error => {
                    weatherElement.textContent = 'Unable to retrieve location.';
                    console.error('Error getting location:', error);
                }
            );
        } else {
            weatherElement.textContent = 'Geolocation is not supported by this browser.';
        }
    }

    // Update time every second
    setInterval(updateTime, 1000);
    // Get weather data
    getLocation();
});
