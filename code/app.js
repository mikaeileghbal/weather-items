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

//get current weather
getWeatherBtn.addEventListener("click", function (e) {
	e.preventDefault();
	city = cityInput.value;
	if (city !== "" && typeof city === "string") {
		setUrlCity(city);
		getCityLocation(urlCity);
	}
});

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
	// console.log("city data: ", data);
	// console.log("lat: ", data[0].lat);
	// console.log("lon: ", data[0].lon);
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
		console.log("F");
		element.parentNode.children[2].classList.add("left");
		unit = "imperial";
		setUrl("imperial");
		getWeatherData(urlAPI);
	} else {
		console.log("C");
		element.parentNode.children[2].classList.remove("left");
		unit = "metric";
		setUrl("metric");
		getWeatherData(urlAPI);
	}
});
