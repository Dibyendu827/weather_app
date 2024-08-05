const searchInput = document.getElementById('search');
const searchIcon = document.getElementById('searchIcon');
const locIcon = document.getElementById('locIcon');
const myLocation = document.querySelector('.location');
const skyImage = document.querySelector('#skyImage');
const tempVal = document.querySelector('#tempVal');
const weatherDesc = document.querySelector('.weatherDesc');
const humidityVal = document.querySelector('.humidityVal');
const windSpeedVal = document.querySelector('.windSpeedVal');

searchIcon.addEventListener('click', ()=>{showWeather(getData)});

async function getData(loc){
    const apiKey = "0cf623b0300923528abb5d0b21bfd038";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${apiKey}`;
    const responce = await fetch(url);
    const data = await responce.json();
    if(!responce.ok){
        alert("City name was incorrect or not found.");
        return;
    }
    return data;
}


async function showWeather(getData){
    const loc = (searchInput.value) ? searchInput.value : "Kolkata";
    const data = await getData(loc);
    myLocation.textContent = `${data.name}, ${data.sys.country}`
    skyImage.attributes.src.value =  `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    tempVal.textContent = Math.floor(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    humidityVal.textContent = `${data.main.humidity}%`;
    windSpeedVal.textContent = `${Math.floor(data.wind.speed)} km/h`;
}

showWeather(getData);