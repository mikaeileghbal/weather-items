let city = "";

const app = document.getElementById("root");
const currentTemp = document.getElementById("currentTemp");
const currentDescription = document.getElementById("currentDescription");
const currentCity = document.getElementById("currentCity");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("city");

const logo = document.createElement("img");
logo.src = "";

const container = document.createElement("div");
container.setAttribute("class", "container");

const text = document.createElement("p");
//text.textContent = "Weather forecast for the next 7 days";
container.appendChild(text);

app.appendChild(logo);
app.appendChild(container);

//get current weather
getWeatherBtn.addEventListener("click", function (e) {
	e.preventDefault();
	//console.log(cityInput.value);
	city = cityInput.value;
	//console.log(city);
	//console.log(url);
	if (city !== "" && typeof city === "string") {
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=296730df19d32c45959f5b8635c7e228`;
		fetch(url).then(getJson).then(displayResult).catch(errorHandler);
	}
});
