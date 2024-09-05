const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
	const api_key = "62000428e6befa13a1561707a4aa40b4";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
	
	const weather_data = await fetch(`${url}`).then(response => response.json());

	if(weather_data.cod === `404`){
		location_not_found.style.display = "flex";
		weather_body.style.display = "none";
		console.log("error")
		return;
	}

	weather_body.style.display = "flex";
	location_not_found.style.display = "none";



	// console log(weather_data);
	temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
	description.innerHTML = `${weather_data.weather[0].description}`;
	humidity.innerHTML = `${weather_data.main.humidity}%`;
	wind_speed.innerHTML = `${weather_data.wind.speed}km/hr`;

	switch(weather_data.weather[0].main){
		case 'Clouds':
			weather_img.src="/asset/cloud.png";
		case 'Clear':
			weather_img.src="/asset/clear.png";
		case 'Rain':
			weather_img.src="/asset/rain.png";
		case 'Mist':
			weather_img.src="/asset/mist.png";
		case 'Snow':
			weather_img.src="/asset/snow.png";
	}
}
searchBtn.addEventListener('click', ()=>{
	checkWeather(inputBox.value)
});