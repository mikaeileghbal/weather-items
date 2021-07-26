
let city = "London"
let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}& cnt=7 & appid=296730df19d32c45959f5b8635c7e228`;

var request = new XMLHttpRequest();

request.open("GET", url, true);

request.onload = function () {
    //Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        console.log(data);
    }
    else {
        console.log("Error!");
    }

};

request.send();