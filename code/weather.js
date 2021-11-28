//let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=7&APPID=296730df19d32c45959f5b8635c7e228`;
//let url = `https://api.openweathermap.org/data/2.5/onecall?city="London,uk"&units=metric&exclude=hourly,daily&appid=296730df19d32c45959f5b8635c7e228`;
let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid=296730df19d32c45959f5b8635c7e228`;
let urlCity = `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=296730df19d32c45959f5b8635c7e228`;

//old method
//-------------------------------------------
// const request = new XMLHttpRequest();

// request.open("GET", url, true);

// request.onload = function () {
// 	//Begin accessing JSON data here
// 	var data = JSON.parse(this.response);

// 	if (request.status < 400) {
// 		console.log(data);
// 	} else {
// 		console.log("Error!");
// 	}
// };

// request.send();

//using fetch
//-------------------------------------------
// fetch(url)
// 	.then((response) => {
// 		return response.json();
// 	})
// 	.then((result) => {
// 		console.log("fetched data: ", result);
// 		console.log(result.current.temp);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

//---------------------------------------------
//using fetch with callbacks in other places
//---------------------------------------------

//fetch(url).then(getJson).then(displayResult);

function getJson(response) {
	//if not response ok return null
	if (!response.ok) {
		console.log("not OK");
		return null;
	}
	//grab the type of response from response header
	let type = response.headers.get("content-type");
	//console.log(type);
	//check to see if response type is as expected
	//here we expect JSON data
	if (type !== "application/json; charset=utf-8") {
		throw new TypeError(`Expected JSON got ${type}`);
	}
	return response.json();
}

let currentIcon = document.querySelector(".current-icon");

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

const dailyrow = document.querySelector(".daily");
let today = new Date().getDay();

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

function getDayName(dayNumber) {
	const dayNames = ["Son", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
	return dayNames[dayNumber];
}

function getUnitSymbol(unit) {
	return unit === "metric" ? "C" : "F";
}
//error handler callback for fetch chain
//it is called at the detch chain
function errorHandler(e) {
	displayErrorMessage(e);
}

//local funcion to display error message
function displayErrorMessage(errMesage) {
	console.log("Error: ", errMesage);
}

//rerunnig request
//if fails wait 500 then recal request

// queryDatabase()
// 	.catch(wait(500).then(queryDatabase))
// 	.then(displayData)
// 	.catch(displayDatabaseError);

//-----------------------------------------------
//async and await keywords
//-----------------------------------------------

// async function getWeatherData(url) {
// 	let response = await fetch(url);
// 	let data = await response.json();
// 	return data;
//}

//using arrow functions
// getWeatherData(urlAPI)
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		console.log("Error occured");
// 	});

//using outer callback functions
// getWeatherData(urlAPI).then(displayWeather).catch(errorHandler);

// function displayWeather(data) {
// 	console.log("async data: ", data);
// }

//fetch two JSON at the same time
// async function getJSON(url) {
// 	let response = await fetch(url);
// 	let data = await response.json();
// 	return data;
// }

// async function getTwoJSON() {
// 	let value1 = await getJSON(urlAPI);
// 	let value2 = await getJSON(urlAPI);

// 	//instead we cal use promise.all()
// 	let [value3, value4] = await Promise.all([getJSON(urlAPI), getJSON(urlAPI)]);
// 	return [value3, value4];
// }

// getTwoJSON().then((value) => {
// 	console.log("value3: ", value[0]);
// 	console.log("value4: ", value[1]);
// });
