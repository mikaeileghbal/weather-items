class Fetcher {
	constructor(urlAPI) {
		this.urlAPI = urlAPI;
	}

	#getJson(response) {
		if (!response.ok) {
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

	async fetchData() {
		const response = await fetch(this.urlAPI);
		const result = await this.#getJson(response);
		return result;
	}
}

class Weather {
	#WEATHERR_ID = "296730df19d32c45959f5b8635c7e228";
	#lat = 34;
	#lon = 20;
	#city = "frankfurt";
	#unit = "metric";

	constructor() {}

	/**
	 * @param {string} unit
	 */
	set unit(unit) {
		this.#unit = unit;
	}
	/**
	 * @param {string} city
	 */
	set city(city) {
		this.#city = city;
	}

	#getUrlAPI() {
		return `https://api.openweathermap.org/data/2.5/onecall?lat=${
			this.#lat
		}&lon=${this.#lon}&&units=${this.#unit}&appid=${this.#WEATHERR_ID}`;
	}

	#getUrlCity() {
		return `https://api.openweathermap.org/geo/1.0/direct?q=${
			this.#city
		}&limit=1&appid=${this.#WEATHERR_ID}`;
	}

	#setCoordinates(data) {
		this.#lat = data[0].lat;
		this.#lon = data[0].lon;
	}

	getCurrentWeather(callback) {
		const fetcher = new Fetcher(this.#getUrlCity());
		fetcher.fetchData().then((coordData) => {
			this.#setCoordinates(coordData);
			const fetcherWeather = new Fetcher(this.#getUrlAPI());
			fetcherWeather.fetchData().then(callback);
		});
	}

	#errorHandler(e) {
		console.log("Error: ", errMesage);
	}
}
