import React from "react";

function WeatherInfo({weather}) {
  return (
  <div className="weatherInfo">
    <h1>{weather?.name}</h1>
    <h2>{Math.floor(weather?.main.temp)}℃ / {Math.floor(weather?.main.temp * 1.8 + 32)} Ｆ</h2>
    <h3>{weather?.weather[0].description}</h3>
    <h3>{Math.floor(weather?.main.temp_min)}℃ </h3>
    <h3>{Math.floor(weather?.main.temp_max)}℃</h3>
    <h3>습도:{weather?.main.humidity}%</h3>
    <h3>풍속:{weather?.wind.speed}/s</h3>
  </div>
  );
}

export default WeatherInfo;