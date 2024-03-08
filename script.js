// Function to fetch weather data for current location
 function fetchWeatherForCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1fa3feb3c2deb879498559dd175ebc8b`;
            fetchAndUpdate(url)
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
} 
window.addEventListener("load",fetchWeatherForCurrentLocation)
// Add event listener to the button for fetching weather data for user input
let button = document.querySelector("button");
button.addEventListener("click", () => {
    let inpVal = document.querySelector("input").value;
    if (inpVal !== "" && inpVal !== null) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inpVal}&appid=1fa3feb3c2deb879498559dd175ebc8b`;
        fetchAndUpdate(url);
    }
    document.querySelector("input").value = "";
});
async function fetchAndUpdate(url) {
    try {
        let response = await fetch(url);
        let res = await response.json();
        updateDetails(res);
    } catch (error) {
        alert(`Invalid city ${inpVal}`);
        console.error(error);
    }
}
// Function to update weather details in the DOM
function updateDetails(res) {
    let city = document.querySelector(".city");
    let temp = document.querySelector(".temp");
    let humidity = document.querySelector(".humidity");
    let wind = document.querySelector(".wind");
    city.innerHTML = res.name;
    let kelvinTemp = res.main.temp;
    let celsiusTemp = kelvinTemp - 273.15;
    temp.innerHTML = Math.round(celsiusTemp) + "°C";
    wind.innerHTML = res.wind.speed + " km/hr";
    humidity.innerHTML = res.main.humidity + "%";
    let weather_con = res.weather[0].main;
    let imgRes = document.querySelector(".weather-icon");
    imgRes.src = `images/${weather_con}.png`;
}
