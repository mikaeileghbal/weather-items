class Fetcher {
  constructor(urlAPI) {
    this.urlAPI = urlAPI;
  }

  getJson(response) {
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
    console.log("fetch");
    const response = await fetch(this.urlAPI);
    const result = await this.getJson(response);
    return result;
  }
}

class Weather {
  #WEATHERR_ID = "296730df19d32c45959f5b8635c7e228";
  #lat = 34;
  #lon = 20;
  #city;
  #unit = "metric";
  #urlAPI;
  #urlCity;
  constructor(city) {
    this.#city = city;
    this.#urlAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${
      this.#lat
    }&lon=${this.#lon}&&units=${this.#unit}&appid=${this.#WEATHERR_ID}`;
    this.#urlCity = `https://api.openweathermap.org/geo/1.0/direct?q=${
      this.#city
    }&limit=1&appid=${this.#WEATHERR_ID}`;
  }

  /**
   * @param {string} unit
   */
  set unit(unit) {
    this.#unit = unit;
  }

  #setCoordinates(data) {
    console.log("data coords");
    this.#lat = data[0].lat;
    this.#lon = data[0].lon;
  }

  #getWeather(callback) {
    const fetcher = new Fetcher(this.#urlAPI);
    fetcher.fetchData(callback);
  }
  getCurrentWeather(callback) {
    console.log("call weather");
    const fetcher = new Fetcher(this.#urlCity);
    fetcher.fetchData().then(() => {
      const fetcherWeather = new Fetcher(this.#urlAPI);
      fetcherWeather.fetchData().then(callback);
    });
  }

  errorHandler(e) {
    console.log("Error: ", errMesage);
  }
}
