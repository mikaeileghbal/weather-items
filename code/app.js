const weatherApp = (function () {
  const dailyrow = document.querySelector(".daily");
  let unit = "metric";
  let today = new Date().getDay();
  let city = "frankfurt";

  const getWeatherBtn = document.getElementById("getWeatherBtn");
  const cityInput = document.getElementById("city");
  const buttonUnit = document.querySelector(".button--unit");

  window.addEventListener("DOMContentLoaded", (event) => {
    callWeather(unit);
  });

  getWeatherBtn.addEventListener("click", function (e) {
    e.preventDefault();
    city = cityInput.value;
    if (city !== "" && typeof city === "string") {
      callWeather(unit);
    }
  });

  buttonUnit.addEventListener("click", (e) => {
    e.preventDefault();
    let element = e.target;
    setBtnUnitState(element);
    callWeather(unit);
  });

  function setBtnUnitState(element) {
    element.parentNode.children[0].classList.remove("active");
    element.parentNode.children[1].classList.remove("active");
    element.classList.add("active");
    if (element.classList.contains("F")) {
      setDegreeF(element);
    } else {
      setDegreeC(element);
    }
  }

  function callWeather(unit) {
    const weather = new Weather();
    weather.unit = unit;
    weather.city = city;
    weather.getCurrentWeather(displayWeather);
  }

  function displayWeather(jsonData) {
    if (jsonData) {
      let currentIcon = document.querySelector(".current-icon");
      const currentTemp = document.getElementById("currentTemp");
      const currentCity = document.getElementById("currentCity");
      const currentDescription = document.getElementById("currentDescription");

      currentCity.textContent = city;
      currentIcon.src = ` http://openweathermap.org/img/wn/${jsonData.current.weather[0].icon}@2x.png`;
      currentTemp.innerHTML = `<span>${Math.round(
        jsonData.current.temp
      )}&deg ${getUnitSymbol(unit)}</span>`;

      currentDescription.textContent = jsonData.current.weather[0].description;
      fillDailyWeatherItems(jsonData.daily);
    } else {
      console.log("Error");
    }
  }

  function fillDailyWeatherItems(daily) {
    const daysCount = 7;
    dailyrow.innerHTML = "";

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

  function getUnitSymbol(unit) {
    return unit === "metric" ? "C" : "F";
  }

  function getDayName(dayNumber) {
    const dayNames = ["Son", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[dayNumber];
  }

  function setDegreeF(element) {
    element.parentNode.children[2].classList.add("left");
    unit = "imperial";
  }

  function setDegreeC(element) {
    element.parentNode.children[2].classList.remove("left");
    unit = "metric";
  }
})();
