// ye api key aur api url hai
const apiKey = "c12199381f0136a62cb366ba49135289";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// yaha class search mei se input, button aur class weather-icon ko ek ek variable mei store krta hai
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityName = document.querySelector(".city");
const temprature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");


// ye ek async function hai
async function checkWeather(city) {
  // ismein fetch kiye gye data ko response naam ke variable mei store kiya hai
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // yaha agr response kuch bhi nhi aaya toh ye error class ko show karega aur weather class ko hide krta hai
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }

  // agar respopnse aaya toh voh reponse ko parse krke data naam ke variable mei store krta hai
  else {
    let data = await response.json();

    // ye class city mei city ka naam show karega class temp mei temprature class humidity mmei humitdity aur class wind mei wind
    cityName.innerHTML = data.name;
    temprature.innerHTML =
      Math.round(data.main.temp) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";

    // joh bhi api mei uss particular location ka primary weather hoga uska icon display hoga
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    // yaha weather ko show karega aur error ko hide
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// yaha searchBtn class ke agar koi button pe click karega toh cheackweather function ko call karega aur joh bhi input mei city ka name daalega uska name checkWeather ko paas karega aur check weather uss city ka weather show karega
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
