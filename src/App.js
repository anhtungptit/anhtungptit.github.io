import React, { useState } from 'react';
import './App.css';

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if(e.key === "Enter"){
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=cb0d94218b848718a5a80ce6502490e3`)
          .then(res => res.json())
          .then(data => {
            setWeather(data);
            setQuery('');
            console.log(data);
          })
    }
  }

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const month = months[d.getMonth()];
    const date = d.getDate();
    const day = days[d.getDay()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') ? ((weather.main.temp < 16) ? 'cold' : 'App')
       : 'App'}>
      <main>
      <div className="search-box">
        <input
          className="search-bar"
          type="text" 
          placeholder="Search....."
          onChange={e => setQuery(e.target.value)}
          onKeyPress={search}
          value={query}>
        </input>
      </div>
      {typeof weather.main !=="undefined" ? (
        <div className="box">
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather"  >{weather.weather[0].main}</div>
          </div>
        </div>
      ) : ('')}  
      </main> 
    </div>
  );
}

export default App;
