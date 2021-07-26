
const app = document.getElementById("root");

const logo = document.createElement("img");
logo.src = "";

const container = document.createElement("div");
container.setAttribute("class", "container");

const text = document.createElement("p");
//text.textContent = "Weather forecast for the next 7 days";
container.appendChild(text);

app.appendChild(logo);
app.appendChild(container);