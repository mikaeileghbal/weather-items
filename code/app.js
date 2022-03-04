const weatherApp = (function () {
  const WEATHERR_ID = "296730df19d32c45959f5b8635c7e228";
  const CITY_ID = "296730df19d32c45959f5b8635c7e228";
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid=296730df19d32c45959f5b8635c7e228`;
  let urlCity = `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=296730df19d32c45959f5b8635c7e228`;

  let city = "";
  let unit = "metric";
  let lat = 0;
  let lon = 0;

  const app = document.getElementById("root");
  const currentTemp = document.getElementById("currentTemp");
  const currentDescription = document.getElementById("currentDescription");
  const currentCity = document.getElementById("currentCity");
  const getWeatherBtn = document.getElementById("getWeatherBtn");
  const cityInput = document.getElementById("city");
  const buttonUnit = document.querySelector(".button--unit");

  window.addEventListener("DOMContentLoaded", (event) => {
    city = "frankfurt";
    callWeather();
  });

  //get current weather
  getWeatherBtn.addEventListener("click", function (e) {
    e.preventDefault();
    city = cityInput.value;
    if (city !== "" && typeof city === "string") {
      callWeather();
    }
  });

  function callWeather() {
    setUrlCity(city);
    getCityLocation(urlCity);
  }

  function setUrl(unit) {
    urlAPI = new URL(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&units=${unit}&appid=296730df19d32c45959f5b8635c7e228`
      //`https://api.openweathermap.org/data/2.5/weather?${"units=" + unit + "&"}appid=296730df19d32c45959f5b8635c7e228`
    );
  }

  function setUrlCity(city) {
    urlCity = new URL(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=296730df19d32c45959f5b8635c7e228`
    );
    console.log("urlCity: ", urlCity);
  }

  function getWeatherData(url) {
    fetch(url).then(getJson).then(displayResult).catch(errorHandler);
    console.log("url: ", url);
  }

  function getCityLocation(url) {
    fetch(url).then(getJson).then(displayCity).catch(errorHandler);
  }

  function displayCity(data) {
    lat = data[0].lat;
    lon = data[0].lon;

    setUrl("metric");
    getWeatherData(urlAPI);
  }

  async function displayWeather(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  buttonUnit.addEventListener("click", (e) => {
    e.preventDefault();
    let element = e.target;
    console.log(element);
    element.parentNode.children[0].classList.remove("active");
    element.parentNode.children[1].classList.remove("active");
    element.classList.add("active");
    if (element.classList.contains("F")) {
      setDegreeF(element);
    } else {
      setDegreeC(element);
    }
  });

  function setDegreeF(element) {
    console.log("F");
    element.parentNode.children[2].classList.add("left");
    unit = "imperial";
    setUrl("imperial");
    getWeatherData(urlAPI);
  }

  function setDegreeC(element) {
    console.log("C");
    element.parentNode.children[2].classList.remove("left");
    unit = "metric";
    setUrl("metric");
    getWeatherData(urlAPI);
  }

  //callack function to represent actual data
  function displayResult(jsonData) {
    if (jsonData) {
      console.log("outer callback: ", jsonData);
      console.log(jsonData.current.temp);
      currentCity.textContent = city; //jsonData.name;
      currentIcon.src = ` http://openweathermap.org/img/wn/${jsonData.current.weather[0].icon}@2x.png`;
      currentTemp.innerHTML = `<span>${Math.round(
        jsonData.current.temp
      )}&deg ${getUnitSymbol(unit)}</span>`;
      currentDescription.textContent = jsonData.current.weather[0].description;

      fillDailyWeatherItems(jsonData.daily);
    } else {
      displayErrorMessage("Empty data");
    }
  }

  let currentIcon = document.querySelector(".current-icon");

  const dailyrow = document.querySelector(".daily");
  let today = new Date().getDay();

  function getDayName(dayNumber) {
    const dayNames = ["Son", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[dayNumber];
  }

  function getUnitSymbol(unit) {
    return unit === "metric" ? "C" : "F";
  }

  function fillDailyWeatherItems(daily) {
    console.log(daily[0]);
    const daysCount = 7;
    dailyrow.innerHTML = "";
    console.log("display called");
    for (let i = 0; i < daysCount; i++) {
      let { min, max } = daily[i].temp;
      let { main, icon } = daily[i].weather[0];

      let dayItem = `<div class="w-day">
		<div class="w-day-name">
			<span>${getDayName(today)}</span>
		</div>
		<div class="w-icon">
			<img class="icon" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="image" />
			
		</div>
		<div class="w-temp">
			<div class="temp-max">
				<span>${Math.round(max)}&deg;</span>
			</div>
			<div class="temp-min">
				<span>${Math.round(min)}&deg;</span>
			</div>
		</div>
		</div>`;

      dailyrow.innerHTML += dayItem;

      today = today + 1;
      if (today > 6) {
        today = 0;
      }
    }
  }

  function getJson(response) {
    //if not response ok return null
    if (!response.ok) {
      console.log("not OK");
      return null;
    }
    //grab the type of response from response header
    let type = response.headers.get("content-type");
    //check to see if response type is as expected
    //here we expect JSON data
    if (type !== "application/json; charset=utf-8") {
      throw new TypeError(`Expected JSON got ${type}`);
    }
    return response.json();
  }

  function errorHandler(e) {
    console.log("Error: ", errMesage);
  }
})();

// // test classes
// const fetcher = new Fetcher(
//   new URL(
//     `https://api.openweathermap.org/geo/1.0/direct?q=miandoab&limit=1&appid=296730df19d32c45959f5b8635c7e228`
//   )
// );

// fetcher.fetchData(displayCityData);

// function displayCityData(data) {
//   console.log("fetcher", data[0].lon);
// }

const weather = new Weather("miandoab");
weather.getCurrentWeather(displayW);
function displayW(data) {
  console.log("Weather claas:", data);
}
