document.addEventListener('DOMContentLoaded',()=>{



const apiKey="9c22edea45e12fbd762415721e8f7a47";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric";
// const forecastUrl="https://api.openweathermap.org/data/2.5/forecast?&units=metric";
// async function forecast() {
//     const cityForecast=await fetch(`${forecastUrl}&q=delhi&appid=${apiKey}`);
//     var citydef= await cityForecast.json();
//     console.log(citydef.list[7].main.temp)

// }
// forecast();

let defdate= new Date();
let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let day= days[ defdate.getDay()];
let month = months[defdate.getUTCMonth()];
let date= defdate.getDate();
let time= new Date();
console.log(time);
let hour= time.getHours();
let amPm = hour>=12?"PM":"AM";
let minute=time.getMinutes();
hour=hour%12||12;

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition)
//     }
//     else{
//         console.log("geolocation not supported")
//     }
// }
// function showPosition(position){
//     console.log(position.coords.latitude)
//     console.log(position.coords.longitude)
// }
// getLocation();

var container = document.getElementById('maincontainer');

var defaultOut=document.createElement('div');
defaultOut.classList.add("defaultOut");
defaultOut.id='defaultCont';
var defaultContainer = document.getElementById('defaultCont');
if(container){
    container.appendChild(defaultOut);
}
else{
    console.log("not found");
}

function getWeatherIcon(weatherDesc){
    const weatherIcons = {
        "clear sky": "sun.png",
        "few clouds": "cloudy (1).png",
        "scattered clouds": "mostly-cloudy (1).png",
        "broken clouds": "cloudy (2).png",
        "overcast clouds": "overcastcloud.png",
        "shower rain": "rain (1).png",
        "rain": "rain (1).png",
        "light rain": "rain (1).png",
        "moderate rain": "rain (1).png",
        "heavy intensity rain": "rain (1).png",
        "very heavy rain": "rain (1).png",
        "extreme rain": "rain (1).png",
        "freezing rain": "rain (1).png",
        "light intensity drizzle": "rain (1).png",
        "high intensity drizzle": "rain (1).png",
        "drizzle": "rain (1).png",
        "thunderstorm": "storm.png",
        "thunderstorm with light rain": "storm.png",
        "thunderstorm with rain": "storm.png",
        "thunderstorm with heavy rain": "storm.png",
        "thunderstorm with drizzle": "storm.png",
        "thunderstorm with heavy drizzle": "storm.png",
        "snow": "snowflake.png",
        "light snow": "snowflake.png",
        "heavy snow": "snowflake.png",
        "sleet": "snowflake.png",
        "light shower sleet": "snowflake.png",
        "shower sleet": "snowflake.png",
        "light rain and snow": "snowflake.png",
        "rain and snow": "snowflake.png",
        "light shower snow": "snowflake.png",
        "shower snow": "snowflake.png",
        "heavy shower snow": "snowflake.png",
        "mist": "mist (1).png",
        "smoke": "mist (1).png",
        "haze": "mist (1).png",
        "sand/dust whirls": "mist (1).png",
        "fog": "mist (1).png",
        "sand": "mist (1).png",
        "dust": "mist (1).png",
        "volcanic ash": "mist (1).png",
        "squalls": "mist (1).png",
        "tornado": "mist (1).png"
    };
    return weatherIcons[weatherDesc] || "default.png";
}

async function defaultWeather() {
    try{
    const defaultWeather=await fetch(`${apiUrl}&q=delhi&appid=${apiKey}`);
    var defaultdata= await defaultWeather.json();
    var defaultTemp= Math.round(defaultdata.main.temp);
    defaultOut.innerHTML=`
    <h1 class="head">Today</h1>
    <h2 class="date">${day} ${month} ${date}</h2>
    <div class="imgcont">
    <img src="" alt="" class="image" id="img">
    </div>
    <p class="temp">${defaultTemp}°C</p>
    <p class="desc">${defaultdata.weather[0].description}</p>
    <p class="name">${defaultdata.name}</p>
<div class="dataTable">
<div class="humidity"><img src="humidity.png" class="dataImg">  ${defaultdata.main.humidity} % <span class="dataTableText">Humidity</span></div>
<div class="windspeed"><img src="wind.png" class="dataImg">  ${defaultdata.wind.speed} km/h <span class="dataTableText">Wind Speed</span></div>
<div class="highlow"><img src="temperatures.png" class="dataImg">  ${defaultdata.main.temp_max} ° / ${defaultdata.main.temp_min} °<span class="dataTableText">high / low</span></div>
</div>
    `;
    const weatherDesc = defaultdata.weather[0].description.toLowerCase();
    const img = document.getElementById('img');
    img.src= getWeatherIcon(weatherDesc);
    
}
    catch(error){
        console.log("invalid",error);
    }
}

    

async function checkweather() {

    var cityInput=document.getElementById('cityInput').value;
    var cityOutput=document.getElementById('cityOutput');
    if(!cityOutput){
        document.getElementById('defaultCont').remove();
        cityOutput=document.createElement('div');
cityOutput.classList.add("output");
cityOutput.id='cityOutput';
container.appendChild(cityOutput)
if(!cityInput){
    console.log("please enter a city");
}
}

try{
    const response = await fetch(`${apiUrl}&q=${cityInput}&appid=${apiKey}`);
    var data = await response.json();
    var temperature = Math.round(data.main.temp)
    console.log(data)
    cityOutput.innerHTML=`
    <h1 class="head">Today</h1>
    <h2 class="date">${day} ${month} ${date}</h2>
    <div class="imgcont">
    <img src="" alt="" class="image" id="img">
    </div>
    <p class="temp">${temperature}°C</p>
    <p class="desc">${data.weather[0].description}</p>
    <p class="name">${data.name}</p>
<div class="dataTable">
<div class="humidity"><img src="humidity.png" class="dataImg">  ${data.main.humidity} % <span class="dataTableText">Humidity</span></div>
<div class="windspeed"><img src="wind.png" class="dataImg">  ${data.wind.speed} km/h <span class="dataTableText">Wind Speed</span></div>
<div class="highlow"><img src="temperatures.png" class="dataImg">  ${data.main.temp_max} ° / ${data.main.temp_min} °<span class="dataTableText">high / low</span></div>
</div>
    `
    const weatherDesc = data.weather[0].description.toLowerCase();
    const img = document.getElementById('img');
    img.src= getWeatherIcon(weatherDesc);
}
catch(error){
    console.log("error fetching data",error);
}
};
document.getElementById("btn").addEventListener('click', checkweather);
defaultWeather();


})
