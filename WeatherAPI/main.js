const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('p.error_msg');
const cityName = document.querySelector('h2.city_name');
const weatherImg = document.querySelector('img.weather_img');
const temp = document.querySelector('p.temp');
const weatherDesc= document.querySelector('p.weather_description');
const fealsLike= document.querySelector('span.feals_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const windSpeed = document.querySelector('.wind_speed');
const visibility = document.querySelector('span.visibility');
const clouds = document.querySelector('span.clouds');
const pollutionImg = document.querySelector('img.img_pollution');
const pollutionValue = document.querySelector('p.value');

const APIinfo = {
    link : 'https://api.openweathermap.org/data/2.5/weather?q=',
    key : '&appid=48e12e9c7a09a4f83af550ab660bb2e8',
    units : '&units=metric',
    lang : '&lang=pl'
}

function getWeather (){
    APIcity = input.value;
    apiURL =`${APIinfo.link}${APIcity}${APIinfo.key}${APIinfo.units}${APIinfo.lang}`;
    // console.log(apiURL);

    axios.get(apiURL).then((response) => {
        console.log(response.data);  

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        weatherImg.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temp.textContent = `${Math.round(response.data.main.temp)}℃`;
        weatherDesc.textContent = `${response.data.weather[0].description}`;
        fealsLike.textContent = `${Math.round(response.data.main.feels_like)}℃`;
        pressure.textContent = `${response.data.main.pressure}hPa`;
        humidity.textContent = `${response.data.main.humidity}%`;
        windSpeed.textContent = `${Math.round((response.data.wind.speed) * 3.6)}km/h`;
        visibility.textContent = `${response.data.visibility / 1000}km`;
        clouds.textContent = `${response.data.clouds.all}%`;
        errorMsg.textContent = '';

        apiURLpollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}${APIinfo.key}`;

        axios.get(apiURLpollution).then((res) => {
            console.log(res);
            pollutionValue.textContent = `${res.data.list[0].components.pm2_5}`;

            const pollutionValueNum = res.data.list[0].components.pm2_5;
            if (pollutionValueNum < 10) {
                pollutionImg.style.backgroundColor = '#51b728ff';
            } else if (pollutionValueNum >= 10 && pollutionValueNum < 25) {
                pollutionImg.style.backgroundColor = '#95dc19ff';
            }else if (pollutionValueNum >= 25 && pollutionValueNum < 50) {
                pollutionImg.style.backgroundColor = '#cfdc19ff';
            }else if (pollutionValueNum >= 50 && pollutionValueNum < 75) {
                pollutionImg.style.backgroundColor = '#dc8b19ff';
            }else {
                pollutionImg.style.backgroundColor = '#dc4a19ff';
            }
        })

    }).catch((error) => {
        // console.log(error.response.date);
        errorMsg.textContent = `${error.response.data.message}`;
        [cityName, temp, weatherDesc, fealsLike, pressure, humidity, windSpeed, visibility, clouds].forEach((el) => {
            el.textContent = '';
        })
        weatherImg.src = '';
        pollutionImg.style.backgroundColor = 'transparent';

    }).finally(() => {
        input.value = '';
    })
    
}

function getWeatherByEnter (e) {
    if(e.key === 'Enter') {
        getWeather();
    }
}

button.addEventListener('click', getWeather)
input.addEventListener('keypress', getWeatherByEnter)