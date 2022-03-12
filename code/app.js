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
    console.log("Display: ", jsonData);
    if (jsonData) {
      let currentIcon = document.querySelector(".current-icon");
      const currentTemp = document.getElementById("currentTempWrapper");
      const currentCity = document.getElementById("currentCity");
      const currentDescription = document.getElementById("currentDescription");

      // const paramsDew = document.getElementById("params-dew");
      // const paramsWind = document.getElementById("params-wind");
      // const paramsHumidity = document.getElementById("params-humidity");
      // const paramsPressure = document.getElementById("params-pressure");
      // const paramsVisibility = document.getElementById("params-visibility");

      const descBrief = document.getElementById("description-brief");
      descBrief.textContent = jsonData.current.weather[0].description;

      currentCity.textContent = city;
      currentIcon.src = ` http://openweathermap.org/img/wn/${jsonData.current.weather[0].icon}@2x.png`;
      currentTemp.innerHTML = `<span id="currentTemp">${Math.round(
        jsonData.current.temp
      )}</span><span id="degree">&deg${getUnitSymbol(unit)}</span>`;

      document
        .querySelector(".params")
        .replaceChildren(fillParameters(jsonData.current));

      // paramsDew.textContent = jsonData.current.dew_point;
      // paramsWind.textContent = jsonData.current.wind_speed;
      // paramsHumidity.textContent = jsonData.current.humidity;
      // paramsPressure.textContent = jsonData.current.pressure;
      // paramsVisibility.textContent = jsonData.current.visibility;

      currentDescription.textContent = jsonData.current.weather[0].description;
      fillDailyWeatherItems(jsonData.daily);
    } else {
      console.log("Error");
    }
  }

  function fillParameters({
    wind_speed,
    humidity,
    visibility,
    pressure,
    dew_point,
  }) {
    const items = { wind_speed, humidity, visibility, pressure, dew_point };
    const labels = {
      wind_speed: "wind",
      humidity: "humidity",
      visibility: "visibility",
      pressure: "pressure",
      dew_point: "dew point",
    };
    const paramClasses = [
      "params-item",
      "params-item-term",
      "params-item-value",
    ];
    const paramFragment = new DocumentFragment();

    for (key in items) {
      const div = document.createElement("div");
      div.setAttribute("class", paramClasses[0]);

      const term = document.createElement("span");
      term.setAttribute("class", paramClasses[1]);
      term.textContent = labels[key];
      div.appendChild(term);

      const value = document.createElement("span");
      value.setAttribute("class", paramClasses[2]);
      value.textContent = items[key];
      div.appendChild(value);

      paramFragment.appendChild(div);
    }

    return paramFragment;

    //  <div class="params-item">
    //     <span class="params-item-term">wind</span>
    //     <span class="params-item-value" id="params-wind">4 mph</span>
    //   </div>
    //   <div class="params-item">
    //     <span class="params-item-term">humidity</span>
    //     <span class="params-item-value" id="params-humidity">69%</span>
    //   </div>
    //   <div class="params-item">
    //     <span class="params-item-term">visibility</span>
    //     <span class="params-item-value" id="params-visibility"
    //       >3.1 mi</span
    //     >
    //   </div>
    //   <div class="params-item">
    //     <span class="params-item-term">pressure</span>
    //     <span class="params-item-value" id="params-pressure"
    //       >26.76 in</span
    //     >
    //   </div>
    //   <div class="params-item">
    //     <span class="params-item-term">dew point</span>
    //     <span class="params-item-value" id="params-dew">43&deg;</span>
    //   </div>
  }

  function fillDailyWeatherItems(daily) {
    const daysCount = 8;
    let itemFragment = new DocumentFragment();

    for (let i = 0; i < daysCount; i++) {
      let { min, max } = daily[i].temp;
      let { main, icon } = daily[i].weather[0];

      const itemTemplate = document.getElementById("weather-item");
      const item = itemTemplate.content.cloneNode(true);

      const dayName = item.querySelector(".w-day-name > span");
      console.log(dayName);
      dayName.textContent = getDayName(today);

      const iconImg = item.querySelector(".icon");
      iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      const tempMax = item.querySelector(".temp-max > span");
      tempMax.insertAdjacentText("afterbegin", Math.round(max));

      const tempMin = item.querySelector(".temp-min > span");
      tempMin.insertAdjacentText("afterbegin", Math.round(min));

      itemFragment.appendChild(item);

      today = today + 1;
      if (today > 6) {
        today = 0;
      }
    }

    dailyrow.replaceChildren(itemFragment);
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
