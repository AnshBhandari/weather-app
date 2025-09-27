// openweathermap.org
// yadima5190@weirby.com
// OpenWeatherMap

const apiKey = "b622ad46eff1ff28defba14c68b09996";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const errorEl = document.querySelector(".error p");
    const errorBox = document.querySelector(".error");
    const weatherBox = document.querySelector(".weather");

    if (city.trim() === "") {
        errorEl.textContent = "City name can't be empty!";
        errorBox.style.display = "block";
        weatherBox.style.display = "none";
        return; // stop further execution
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    if (response.status === 404) {
        errorEl.textContent = "Invalid City Name!";
        errorBox.style.display = "block";
        weatherBox.style.display = "none";
    } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        if (data.weather[0].main === "Clouds") weatherIcon.src = "images/clouds.png";
        else if (data.weather[0].main === "Clear") weatherIcon.src = "images/clear.png";
        else if (data.weather[0].main === "Rain") weatherIcon.src = "images/rain.png";
        else if (data.weather[0].main === "Drizzle") weatherIcon.src = "images/drizzle.png";
        else if (data.weather[0].main === "Mist") weatherIcon.src = "images/mist.png";
        else if (data.weather[0].main === "Haze") weatherIcon.src = "images/haze.png";

        weatherBox.style.display = "block";
        errorBox.style.display = "none";
    }
}

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value)
});


