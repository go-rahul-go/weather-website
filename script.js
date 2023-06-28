
const container = document.querySelector(".container");

let inputPart = document.querySelector(".input-part")

let infoText = document.querySelector(".info-text")

let inputField = document.querySelector("input")

let getLocationButton = document.querySelector("button")

let arrowBack = document.querySelector("header i")

let weatherIcon = document.querySelector("weather-part img")

let api
var apiKey = "9355c11b4dac709d7d7cc6fd07a76a44"
function changeImage(description) {
    var weatherImg = document.querySelector(".weather-part img")
    switch(description)
    {
        case "clear":
            weatherImg.src="./icons/clear.svg";
            break;
        case "haze":
            weatherImg.src="./icons/haze.svg";
            break;
        case "scattered clouds":
            weatherImg.src="./icons/cloud.svg";
            break;
        case "thunderstorm with rain":
            weatherImg.src="./icons/storm.svg";
            break;
        case "light rain":
            weatherImg.src="./icons/rain.svg";
            break;
        case "snow":
            weatherImg.src="./icons/snow.svg";
            break;              

    }
}
function weatherDetails(info) {
    infoText.classList.replace("pending", "error")

    if (info.cod == "404") {
        infoText.innerText = `you entered ${inputField.value} which isn't a valid city`;
    }
    else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main
  
        container.querySelector(".temp, .numb").innerText = Math.floor(temp) - 273;
       
        changeImage(description);
        container.querySelector(".weather").innerHTML = description
        container.querySelector(".location span").innerHTML = `${city}, ${country}`;
        container.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like) - 273;
        container.querySelector(".humidity span").innerHTML = `${humidity}`;
        infoText.classList.remove("pending", "error")
        container.classList.add("active");
      
    }
}

function fetchWeatherData() {
    infoText.innerText = "Getting weather Info..."
    infoText.classList.add("pending")

    fetch(api)
        .then(response => response.json())
        .then((result) => {
            weatherDetails(result)
        })
}

function requestApi(city) {

    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetchWeatherData();
}






//get user's location

function onSuccess(position)
{
    const {longitude,latitude} = position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetchWeatherData();

}

function onError(error){
  infoText.innerText = error.message //..html text will display error message
  infoText.classList.add("error")
}

getLocationButton.addEventListener("click",(event)=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("Browser doen't support GeoLocation");
    }
})


inputField.addEventListener("keyup", (event) => {
    if (event.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
})

arrowBack.addEventListener("click", ()=>{
    container.classList.remove("active")
})