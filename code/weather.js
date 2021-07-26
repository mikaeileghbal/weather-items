
let city = "London,uk"
let url = `https://api.openweathermap.org/data/2.5/weather?q=Miandoab&units=metric&cnt=7&APPID=296730df19d32c45959f5b8635c7e228`;

var request = new XMLHttpRequest();

request.open("GET", url, true);

request.onload = function () {
    //Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status < 400) {
        data.forEach((element) => {
            console.log(element);
        });
    }
    else {
        console.log("Error!");
    }

};

request.send();

